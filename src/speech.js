export function normalizeEnglish(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .trim()
    .replace(/\s+/g, ' ');
}

export function isSpeechMatch(transcript, accepted = []) {
  const heard = normalizeEnglish(transcript);
  const tokens = heard.split(' ');

  return accepted.some((entry) => {
    const answer = normalizeEnglish(entry);

    return heard === answer || (!answer.includes(' ') && tokens.includes(answer));
  });
}

export class TapToTalk {
  constructor({
    SpeechRecognition = globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition,
    onCorrect = () => {},
    onHeard = () => {},
    onStatus = () => {},
    onUnavailable = () => {},
  } = {}) {
    Object.assign(this, {
      SpeechRecognition,
      onCorrect,
      onHeard,
      onStatus,
      onUnavailable,
      listening: false,
    });
  }

  start(accepted) {
    if (!this.SpeechRecognition) {
      this.onUnavailable('unsupported');
      return;
    }

    const recognition = new this.SpeechRecognition();
    this.recognition = recognition;
    this.listening = true;
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 5;
    recognition.onresult = (event) => {
      for (const result of event.results) {
        for (const alternative of result) {
          this.onHeard(alternative.transcript);

          if (isSpeechMatch(alternative.transcript, accepted)) {
            this.onCorrect(alternative.transcript);
            this.stop();
            return;
          }
        }
      }
    };
    recognition.onerror = (event) => {
      if (['not-allowed', 'service-not-allowed'].includes(event.error)) {
        this.onUnavailable('denied');
      } else {
        this.onStatus('Try again');
      }
    };
    recognition.onend = () => {
      this.listening = false;
    };

    try {
      recognition.start();
    } catch {
      this.onUnavailable('start');
    }
  }

  stop() {
    try {
      this.recognition?.stop();
    } catch {
      // Browsers may reject a stop after recognition has already ended.
    }

    this.listening = false;
  }

  cancel() {
    this.stop();
  }
}
