export function runDetected(
  energies,
  { threshold = 12, fps = 10, seconds = 1.2, windowSeconds = 3 } = {},
) {
  const recent = energies.slice(-Math.ceil(fps * windowSeconds));
  const requiredFrames = Math.ceil(fps * seconds);
  const activeFrames = recent.filter((value) => value > threshold).length;

  return activeFrames >= requiredFrames;
}

export function catchDetected(energies, { threshold = 22, upperRatio = 0.6 } = {}) {
  return energies.some((value) => {
    if (typeof value !== 'object') {
      return value > threshold;
    }

    return value.total > threshold && value.upper / Math.max(value.total, 1) >= upperRatio;
  });
}

export function createGestureDetector({
  gesture,
  onDetect = () => {},
  onLevel = () => {},
  preview = null,
} = {}) {
  let stream;
  let timer;
  let last;
  let detected = false;
  const readings = [];

  function stop() {
    clearInterval(timer);
    stream?.getTracks?.().forEach((track) => track.stop());
    stream = null;
  }

  async function start() {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error('camera unavailable');
    }

    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });

    video.srcObject = stream;
    video.muted = true;
    video.playsInline = true;

    // Optional mirrored preview so the child can see the camera sees them.
    if (preview) {
      video.className = 'cam-preview';
      preview.replaceChildren(video);
    }
    await video.play();
    canvas.width = 160;
    canvas.height = 120;
    timer = setInterval(() => {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
      let total = 0;
      let upper = 0;

      if (last) {
        for (let index = 0; index < data.length; index += 4) {
          const difference = Math.abs(data[index] - last[index]);
          total += difference;

          if (Math.floor(index / 4 / canvas.width) < canvas.height / 2) {
            upper += difference;
          }
        }
      }

      last = data;
      const energy = total / (canvas.width * canvas.height);
      readings.push(
        gesture === 'catch'
          ? { total: energy, upper: upper / (canvas.width * canvas.height) }
          : energy,
      );

      if (readings.length > 30) {
        readings.shift();
      }

      onLevel(energy);
      const hit = gesture === 'run'
        ? runDetected(readings)
        : catchDetected(readings);

      if (hit && !detected) {
        detected = true;
        onDetect();
        stop();
      }
    }, 100);

    return stream;
  }

  return { start, stop };
}
