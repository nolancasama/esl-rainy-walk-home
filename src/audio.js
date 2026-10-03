import { SOUND_FILES } from './sound-files.js';

const STORAGE_KEY = 'rainy-walk-home:sound';
const FILE_SFX = new Set(['meow', 'hiss', 'purr', 'bark', 'door', 'orange']);
const PROCEDURAL_SFX = new Set([
  'bell',
  'raindrops',
  'gust',
  'flutter',
  'splat',
  'splash',
  'phone',
  'doorbell',
  'mug',
]);
const AMBIENCE_TONES = new Set(['title', 'cloudy', 'rain', 'storm', 'warm']);

let soundEnabled = readSoundSetting();
let unlocked = false;
let context = null;
let master = null;
let ambience = null;
let requestedTone = 'title';
const playingFiles = new Set();

function readSoundSetting() {
  try {
    return globalThis.localStorage?.getItem(STORAGE_KEY) !== 'off';
  } catch {
    return true;
  }
}

function writeSoundSetting(enabled) {
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, enabled ? 'on' : 'off');
  } catch {
    // Storage can be unavailable in private or locked-down browser profiles.
  }
}

function getContext() {
  if (context) return context;
  const AudioContext = globalThis.AudioContext || globalThis.webkitAudioContext;
  if (!AudioContext) return null;

  try {
    context = new AudioContext();
    master = context.createGain();
    master.gain.value = soundEnabled ? 0.72 : 0;
    master.connect(context.destination);
    return context;
  } catch {
    context = null;
    master = null;
    return null;
  }
}

function safeResume() {
  try {
    return context?.resume?.().catch(() => {});
  } catch {
    return undefined;
  }
}

function makeNoiseBuffer(ctx, seconds = 2) {
  const frameCount = Math.max(1, Math.floor(ctx.sampleRate * seconds));
  const buffer = ctx.createBuffer(1, frameCount, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i += 1) data[i] = Math.random() * 2 - 1;
  return buffer;
}

function noiseLayer(ctx, output, {
  type = 'lowpass', frequency = 900, q = 0.6, volume = 0.1, modulation,
} = {}) {
  const source = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  source.buffer = makeNoiseBuffer(ctx);
  source.loop = true;
  filter.type = type;
  filter.frequency.value = frequency;
  filter.Q.value = q;
  gain.gain.value = volume;
  source.connect(filter).connect(gain).connect(output);

  const sources = [source];
  if (modulation) {
    const lfo = ctx.createOscillator();
    const depth = ctx.createGain();
    lfo.frequency.value = modulation.rate;
    depth.gain.value = modulation.depth;
    lfo.connect(depth).connect(gain.gain);
    lfo.start();
    sources.push(lfo);
  }
  source.start();
  return sources;
}

function createAmbience(ctx, tone, now) {
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.connect(master);
  const sources = [];

  if (tone === 'cloudy') {
    sources.push(...noiseLayer(ctx, gain, {
      type: 'bandpass', frequency: 420, q: 0.5, volume: 0.07,
      modulation: { rate: 0.11, depth: 0.025 },
    }));
  } else if (tone === 'rain') {
    sources.push(...noiseLayer(ctx, gain, {
      type: 'highpass', frequency: 1250, volume: 0.12,
      modulation: { rate: 0.17, depth: 0.018 },
    }));
  } else if (tone === 'storm') {
    sources.push(...noiseLayer(ctx, gain, {
      type: 'highpass', frequency: 950, volume: 0.2,
      modulation: { rate: 0.21, depth: 0.035 },
    }));
    sources.push(...noiseLayer(ctx, gain, {
      type: 'bandpass', frequency: 330, q: 0.45, volume: 0.11,
      modulation: { rate: 0.09, depth: 0.045 },
    }));
  } else if (tone === 'warm') {
    sources.push(...noiseLayer(ctx, gain, {
      type: 'lowpass', frequency: 620, volume: 0.045,
      modulation: { rate: 0.13, depth: 0.01 },
    }));
  } else {
    sources.push(...noiseLayer(ctx, gain, {
      type: 'highpass', frequency: 1550, volume: 0.055,
      modulation: { rate: 0.14, depth: 0.01 },
    }));
    sources.push(...noiseLayer(ctx, gain, {
      type: 'bandpass', frequency: 390, q: 0.5, volume: 0.045,
      modulation: { rate: 0.1, depth: 0.018 },
    }));
  }

  return { tone, gain, sources };
}

function stopAmbience(layer, when) {
  if (!layer) return;
  for (const source of layer.sources) {
    try { source.stop(when); } catch { /* Already stopped. */ }
  }
}

function applyAmbience(tone) {
  if (!soundEnabled || !unlocked || !master) return;
  const ctx = context;
  const now = ctx.currentTime;
  const fadeEnd = now + 1;
  if (ambience?.tone === tone) return;

  const previous = ambience;
  ambience = createAmbience(ctx, tone, now);
  ambience.gain.gain.linearRampToValueAtTime(1, fadeEnd);
  if (previous) {
    previous.gain.gain.cancelScheduledValues(now);
    previous.gain.gain.setValueAtTime(previous.gain.gain.value, now);
    previous.gain.gain.linearRampToValueAtTime(0, fadeEnd);
    stopAmbience(previous, fadeEnd + 0.05);
  }
}

export async function unlockAudio() {
  try {
    unlocked = true;
    if (!soundEnabled) return false;
    const ctx = getContext();
    if (!ctx) return false;
    await safeResume();
    applyAmbience(requestedTone);
    return ctx.state === 'running';
  } catch {
    return false;
  }
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function setSoundEnabled(enabled) {
  try {
    soundEnabled = Boolean(enabled);
    writeSoundSetting(soundEnabled);

    if (!soundEnabled) {
      if (master && context) {
        master.gain.cancelScheduledValues(context.currentTime);
        master.gain.setValueAtTime(0, context.currentTime);
      }
      stopAmbience(ambience, context?.currentTime);
      ambience = null;
      for (const audio of playingFiles) {
        try { audio.pause(); } catch { /* Ignore media element failures. */ }
      }
      playingFiles.clear();
      try { context?.suspend?.().catch(() => {}); } catch { /* No output is already enforced by master. */ }
      return false;
    }

    if (unlocked) {
      const ctx = getContext();
      if (ctx && master) {
        master.gain.setValueAtTime(0.72, ctx.currentTime);
        void safeResume();
        applyAmbience(requestedTone);
      }
    }
    return true;
  } catch {
    return soundEnabled;
  }
}

export function setAmbience(tone) {
  try {
    requestedTone = AMBIENCE_TONES.has(tone) ? tone : 'cloudy';
    applyAmbience(requestedTone);
  } catch {
    // Audio must never interrupt story progression.
  }
}

export function setTitleAmbience() {
  setAmbience('title');
}

function tone(ctx, output, frequency, start, duration, volume = 0.12, type = 'sine') {
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + Math.min(0.025, duration / 4));
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(output);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

function noiseShot(ctx, output, start, duration, {
  frequency = 1200, type = 'bandpass', volume = 0.12, attack = 0.015,
} = {}) {
  const source = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  source.buffer = makeNoiseBuffer(ctx, Math.max(0.1, duration));
  filter.type = type;
  filter.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.connect(filter).connect(gain).connect(output);
  source.start(start);
  source.stop(start + duration + 0.02);
  return gain;
}

function playProcedural(name, ctx) {
  const now = ctx.currentTime + 0.01;
  if (name === 'bell') {
    [659.25, 523.25, 587.33, 392].forEach((frequency, index) => {
      tone(ctx, master, frequency, now + index * 0.34, 0.75, 0.09);
    });
  } else if (name === 'raindrops') {
    [0, 0.12, 0.29, 0.46].forEach((offset, index) => {
      noiseShot(ctx, master, now + offset, 0.07, {
        frequency: 2100 + index * 310, volume: 0.075, attack: 0.005,
      });
    });
  } else if (name === 'gust') {
    noiseShot(ctx, master, now, 1.15, { frequency: 440, volume: 0.18, attack: 0.38 });
  } else if (name === 'flutter') {
    for (let i = 0; i < 6; i += 1) {
      noiseShot(ctx, master, now + i * 0.095, 0.12, {
        frequency: 1050 + (i % 2) * 500, volume: 0.055, attack: 0.015,
      });
    }
  } else if (name === 'splat') {
    noiseShot(ctx, master, now, 0.24, { frequency: 360, volume: 0.16, attack: 0.008 });
    tone(ctx, master, 105, now, 0.28, 0.08, 'triangle');
  } else if (name === 'splash') {
    noiseShot(ctx, master, now, 0.7, { frequency: 760, volume: 0.2, attack: 0.018 });
    [0.06, 0.16, 0.27].forEach((offset) => {
      noiseShot(ctx, master, now + offset, 0.13, { frequency: 1850, volume: 0.065 });
    });
  } else if (name === 'phone') {
    [0, 0.24].forEach((offset) => {
      tone(ctx, master, 155, now + offset, 0.14, 0.09, 'square');
      tone(ctx, master, 190, now + offset, 0.14, 0.045, 'square');
    });
  } else if (name === 'doorbell') {
    tone(ctx, master, 659.25, now, 0.75, 0.11);
    tone(ctx, master, 493.88, now + 0.42, 0.9, 0.1);
  } else if (name === 'mug') {
    tone(ctx, master, 115, now, 0.2, 0.09, 'triangle');
    noiseShot(ctx, master, now, 0.14, { frequency: 280, volume: 0.065, attack: 0.006 });
  }
}

function playFile(name, ctx) {
  if (!FILE_SFX.has(name) || !SOUND_FILES.includes(name)) return;
  try {
    const audio = new Audio(new URL(`../audio/sfx/${name}.mp3`, import.meta.url));
    const source = ctx.createMediaElementSource(audio);
    source.connect(master);
    playingFiles.add(audio);
    const cleanup = () => {
      playingFiles.delete(audio);
      try { source.disconnect(); } catch { /* Already disconnected. */ }
    };
    audio.addEventListener('ended', cleanup, { once: true });
    audio.addEventListener('error', cleanup, { once: true });
    audio.play().catch(cleanup);
  } catch {
    // A missing codec, media API, or supplied file is a silent no-op.
  }
}

export function playSfx(name) {
  try {
    if (!soundEnabled || !unlocked) return false;
    const ctx = getContext();
    if (!ctx || !master) return false;
    void safeResume();
    if (PROCEDURAL_SFX.has(name)) playProcedural(name, ctx);
    else if (FILE_SFX.has(name)) playFile(name, ctx);
    else return false;
    return true;
  } catch {
    return false;
  }
}

export function stopAudio() {
  try {
    stopAmbience(ambience, context?.currentTime);
    ambience = null;
    for (const audio of playingFiles) {
      try { audio.pause(); } catch { /* Ignore media element failures. */ }
    }
    playingFiles.clear();
  } catch {
    // Safe for page teardown and replay cleanup.
  }
}
