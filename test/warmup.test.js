import assert from 'node:assert/strict';
import test from 'node:test';
import { VOCAB_BY_ID } from '../src/vocab.js';
import { WARMUP_ITEMS, warmupGloss } from '../src/warmup.js';

test('warm-up has the required seven verbs in order', () => {
  assert.deepEqual(WARMUP_ITEMS.map(({ verb }) => verb), [
    'help', 'catch', 'listen', 'look', 'read', 'run', 'feed',
  ]);
});

test('warm-up choices are valid, distinct vocabulary and include the answer', () => {
  for (const item of WARMUP_ITEMS) {
    assert.ok(VOCAB_BY_ID[item.verb], item.verb);
    assert.equal(item.choices.length, 3, item.verb);
    assert.equal(new Set(item.choices).size, 3, item.verb);
    assert.ok(item.choices.includes(item.verb), item.verb);
    assert.deepEqual(item.distractors, item.choices.filter((choice) => choice !== item.verb), item.verb);
    for (const choice of item.choices) {
      assert.ok(VOCAB_BY_ID[choice], `${item.verb}: ${choice}`);
    }
    assert.equal(warmupGloss(item.verb), VOCAB_BY_ID[item.verb].ja);
  }
  assert.ok(WARMUP_ITEMS.some(({ verb, choices }) => choices[0] !== verb));
});

test('warm-up cues are brief and stages avoid story dilemma props', () => {
  const forbiddenProps = ['☂️', '🌂', '🐱', '🛍️', '👵'];
  for (const item of WARMUP_ITEMS) {
    assert.ok(item.en.trim().split(/\s+/).length <= 5, item.en);
    assert.ok(!forbiddenProps.some((prop) => item.stage.includes(prop)), `${item.verb}: ${item.stage}`);
  }
});
