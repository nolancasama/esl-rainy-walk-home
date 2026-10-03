export function speak(text) {
  const synthesis = globalThis.speechSynthesis;
  const Utterance = globalThis.SpeechSynthesisUtterance;

  if (!synthesis || !Utterance || !text) {
    return false;
  }

  try {
    synthesis.cancel();
    const utterance = new Utterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    synthesis.speak(utterance);
    return true;
  } catch {
    return false;
  }
}
