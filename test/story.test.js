import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { SCENE_ART } from '../src/art-manifest.js';
import { createRunner } from '../src/engine.js';
import { STORY, ending } from '../src/story.js';
import { VOCAB_BY_ID } from '../src/vocab.js';

function walk(beats, visit) {
  for (const beat of beats) {
    visit(beat);
    for (const choice of beat.interaction?.choices || []) walk(choice.beats || [], visit);
  }
}

test('every placeholder has one stable id and resolves to existing art', () => {
  const descriptions = new Map();
  walk(Object.values(STORY.scenes).flatMap((scene) => scene.beats), (beat) => {
    if (beat.visual?.type !== 'placeholder') return;
    const { id, description } = beat.visual;
    assert.ok(id, `missing art id: ${description}`);
    if (descriptions.has(id)) assert.equal(descriptions.get(id), description, id);
    else descriptions.set(id, description);
  });

  assert.equal(descriptions.size, 79);
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  for (const id of descriptions.keys()) {
    assert.ok(fs.existsSync(path.join(root, `art/scenes/${id}.webp`)), `missing source art: ${id}`);
    assert.ok(SCENE_ART[id], `missing manifest entry: ${id}`);
    assert.ok(fs.existsSync(path.join(root, SCENE_ART[id])), `missing resolved art: ${id}`);
  }
});

function drive(runner, decisions) {
  let steps = 0;
  while (!runner.view.recap && steps++ < 400) {
    const view = runner.view;
    if (!view.interaction) runner.next();
    else if (view.interaction.type === 'choice') {
      if (!decisions.length) return view;
      runner.choose(decisions.shift());
    } else if (view.interaction.type === 'recap') runner.next();
    else runner.complete();
  }
  assert.ok(steps < 400, 'step cap');
  return runner.view;
}

test('story references valid scenes, vocabulary, and short speech', () => {
  walk(Object.values(STORY.scenes).flatMap((scene) => scene.beats), (beat) => {
    if (beat.say?.en) assert.ok(beat.say.en.trim().split(/\s+/).length <= 9, beat.say.en);
    for (const choice of beat.interaction?.choices || []) {
      // Verb buttons must be target vocabulary; phrase buttons carry their own Japanese.
      if (choice.label) assert.ok(choice.labelJa, choice.label);
      else assert.ok(VOCAB_BY_ID[choice.verb], choice.verb);
    }
  });
});

test('Haru warm and cool variants are each reachable', () => {
  const warm = createRunner(STORY);
  drive(warm, [0, 0]);
  assert.ok(warm.state.haruBond >= 2);
  const cool = createRunner(STORY);
  drive(cool, [0, 1]);
  assert.ok(cool.state.haruBond < 2);
});

test('Mrs. Sato help controls tag route and cat-feed outcome', () => {
  const helped = createRunner(STORY);
  drive(helped, [0, 0, 0, 0]);
  assert.equal(helped.state.helpedMrsSato, true);
  const notHelped = createRunner(STORY);
  drive(notHelped, [0, 1, 0, 2]);
  assert.equal(notHelped.state.helpedMrsSato, false);
  const fed = createRunner(STORY, {
    scene: 'come',
    initialState: { ...helped.state, hasSnack: true },
  });
  fed.next();
  fed.complete();
  fed.next();
  fed.choose(0);
  assert.equal(fed.state.fedCat, true);
  fed.next();
  fed.next();
  assert.equal(fed.view.sceneId, 'tag');
  const noSnack = createRunner(STORY, {
    scene: 'come',
    initialState: { ...notHelped.state, hasSnack: false },
  });
  noSnack.next();
  noSnack.complete();
  noSnack.next();
  noSnack.choose(0);
  assert.equal(noSnack.state.fedCat, false);
  noSnack.next();
  assert.equal(noSnack.view.sceneId, 'softly');
});

// Decisions: school GO, then umbrella (0 help, 1 run), papers (0 catch, 1 help, 2 go),
// Mrs. Sato (0 catch, 1 help, 2 go). The ending is settled after Mrs. Sato.
function endingAfter(decisions) {
  const runner = createRunner(STORY);
  drive(runner, [0, ...decisions]);
  return ending(runner.state);
}

test('endings follow the three helping dilemmas', () => {
  assert.equal(endingAfter([0, 0, 0]), 'warm', 'helped everyone');
  assert.equal(endingAfter([0, 2, 1]), 'warm', 'one lapse between helps');
  assert.equal(endingAfter([1, 1, 1]), 'repair', 'ran from Haru, then helped');
  assert.equal(endingAfter([1, 2, 0]), 'repair', 'helped at the last dilemma');
  assert.equal(endingAfter([1, 2, 2]), 'quiet', 'hurried every time');
  assert.equal(endingAfter([1, 0, 2]), 'quiet', 'a later skip undoes the repair');
  assert.equal(endingAfter([0, 2, 2]), 'quiet', 'helped Haru only');
});

test('repair ending plays the pause and the spoken thanks', () => {
  const runner = createRunner(STORY, { scene: 'bag', initialState: { skipCount: 1, repaired: true } });
  const lines = [];
  let steps = 0;
  while (runner.view.sceneId === 'bag' && steps++ < 50) {
    const view = runner.view;
    lines.push(view.say?.en);
    if (view.interaction?.type === 'speak') assert.equal(view.interaction.target, 'Thanks!');
    if (view.interaction?.type === 'choice') runner.choose(0);
    else if (view.interaction) runner.complete();
    else runner.next();
  }
  assert.ok(lines.includes('Haru stops.'));
  assert.ok(lines.includes("I'll help."));
  assert.ok(!lines.includes('You walk home alone.'));
});

test('DFS over every reachable choice sequence reaches recap within cap', () => {
  const queue = [[]];
  const endings = new Set();
  let completed = 0;
  while (queue.length) {
    const sequence = queue.pop();
    const runner = createRunner(STORY);
    const view = drive(runner, [...sequence]);
    if (view.recap) {
      completed += 1;
      endings.add(ending(runner.state));
      continue;
    }
    assert.equal(view.interaction?.type, 'choice');
    view.choices.forEach((choice, index) => {
      if (!choice.disabled) queue.push([...sequence, index]);
    });
  }
  assert.ok(completed > 1);
  assert.deepEqual([...endings].sort(), ['quiet', 'repair', 'warm']);
});
