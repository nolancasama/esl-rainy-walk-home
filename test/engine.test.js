import assert from 'node:assert/strict';
import test from 'node:test';
import { createRunner } from '../src/engine.js';

const say = (en) => ({ say: { en } });

test('applies when and set/add effects before showing a beat', () => {
  const story = { start: 'a', initialState: { count: 1 }, scenes: { a: { beats: [
    { effects: { set: { ready: true }, add: { count: 2 } } },
    { when: (state) => state.ready, ...say('ready') },
  ] } }, recap: [] };
  const runner = createRunner(story);
  assert.equal(runner.view.say.en, 'ready');
  assert.deepEqual(runner.state, { count: 3, ready: true });
});

test('automatically passes effects-only and goto-only beats', () => {
  const story = { start: 'a', initialState: {}, scenes: {
    a: { beats: [{ effects: { set: { passed: true } } }, { goto: 'b' }] },
    b: { beats: [say('arrived')] },
  }, recap: [] };
  const runner = createRunner(story);
  assert.equal(runner.view.sceneId, 'b');
  assert.equal(runner.view.say.en, 'arrived');
  assert.equal(runner.state.passed, true);
});

test('supports string and functional choice goto values', () => {
  const story = { start: 'a', initialState: {}, scenes: {
    a: { beats: [{ interaction: { type: 'choice', choices: [
      { verb: 'go', goto: 'string' },
      { verb: 'go', goto: () => 'function' },
    ] } }] },
    string: { beats: [say('string')] },
    function: { beats: [say('function')] },
  }, recap: [] };
  const direct = createRunner(story);
  direct.choose(0);
  assert.equal(direct.view.say.en, 'string');
  const functional = createRunner(story);
  functional.choose(1);
  assert.equal(functional.view.say.en, 'function');
});

test('retry, all, and nested interactions retain parent choice beats', () => {
  const story = { start: 'a', initialState: {}, scenes: { a: { beats: [
    { interaction: { type: 'choice', retry: true, choices: [
      { verb: 'go', beats: [] },
      { verb: 'help', success: true, beats: [{ interaction: { type: 'gesture' } }] },
    ] } },
    { interaction: { type: 'choice', all: true, choices: [
      { verb: 'go', beats: [] }, { verb: 'help', beats: [] },
    ] } },
    { interaction: { type: 'recap' } },
  ] } }, recap: [] };
  const runner = createRunner(story);
  runner.choose(0);
  assert.equal(runner.view.choices[0].disabled, true);
  runner.choose(1);
  assert.equal(runner.view.interaction.type, 'gesture');
  runner.complete();
  runner.choose(0);
  runner.choose(1);
  runner.next();
  assert.deepEqual(runner.view.recap, []);
});

test('filters recap items from final state', () => {
  const story = { start: 'a', initialState: { kept: false }, scenes: { a: { beats: [
    { effects: { set: { kept: true } } }, { interaction: { type: 'recap' } },
  ] } }, recap: [{ en: 'kept', when: (state) => state.kept }] };
  const runner = createRunner(story);
  runner.next();
  assert.deepEqual(runner.view.recap.map((item) => item.en), ['kept']);
});
