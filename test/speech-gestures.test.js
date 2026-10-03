import assert from 'node:assert/strict';
import test from 'node:test';
import { catchDetected, runDetected } from '../src/gestures.js';
import { isSpeechMatch } from '../src/speech.js';

test('speech matching accepts forgiving come and hello phrases', () => {
  const accepted = ['come', 'calm', 'come here', 'hello', 'hi there'];
  for (const phrase of ['Come!', 'calm', 'come here', 'Hello!', 'hi there']) {
    assert.equal(isSpeechMatch(phrase, accepted), true, phrase);
  }
  assert.equal(isSpeechMatch('go', ['come']), false);
  assert.equal(isSpeechMatch('hello', ['come']), false);
});

test('run and catch decisions handle positive and negative synthetic series', () => {
  assert.equal(runDetected(Array(12).fill(20)), true);
  assert.equal(runDetected([1, 2, 3, 11]), false);
  assert.equal(catchDetected([{ total: 30, upper: 20 }]), true);
  assert.equal(catchDetected([{ total: 30, upper: 3 }]), false);
});
