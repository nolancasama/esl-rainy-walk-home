import { applyEffects, createState } from './state.js';

const resolveGoto = (goto, state) => (
  typeof goto === 'function' ? goto(state) : goto
);

function isPresentable(beat) {
  return Boolean(beat.say || beat.visual || beat.interaction);
}

export function createRunner(story, { initialState = {}, scene } = {}) {
  const state = createState({ ...story.initialState, ...initialState });
  const choiceSelections = new WeakMap();
  let sceneId = scene || story.start;
  let visual = null;
  let current = null;
  let stack = [];
  let recap = false;

  function jump(target) {
    const nextScene = resolveGoto(target, state);

    if (!story.scenes[nextScene]) {
      throw new Error(`Unknown scene: ${nextScene}`);
    }

    sceneId = nextScene;
    stack = [{ beats: story.scenes[sceneId].beats, index: 0, after: null }];
    current = null;
    step();
  }

  function finishFrame() {
    const frame = stack.pop();

    if (frame?.after) {
      frame.after();
    } else if (!stack.length) {
      current = null;
    }
  }

  function step() {
    while (!recap) {
      const frame = stack.at(-1);

      if (!frame) {
        current = null;
        return;
      }

      if (frame.index >= frame.beats.length) {
        finishFrame();

        if (current) {
          return;
        }

        continue;
      }

      const beat = frame.beats[frame.index++];

      if (beat.when && !beat.when(state)) {
        continue;
      }

      applyEffects(state, beat.effects);

      if (beat.visual) {
        visual = beat.visual;
      }

      // Effects-only and routing beats are state transitions, not empty screens.
      if (!isPresentable(beat)) {
        if (beat.goto) {
          jump(beat.goto);
          return;
        }

        continue;
      }

      current = beat;

      if (beat.interaction?.type === 'choice' && !choiceSelections.has(beat)) {
        choiceSelections.set(beat, new Set());
      }

      return;
    }
  }

  function continueBeat() {
    const beat = current;

    if (!beat) {
      return;
    }

    if (beat.goto) {
      jump(beat.goto);
      return;
    }

    current = null;
    step();
  }

  function choiceFinished(parent, interaction, choice, index) {
    const selected = choiceSelections.get(parent);

    if (choice.goto) {
      jump(choice.goto);
      return;
    }

    if (interaction.all) {
      selected.add(index);

      if (selected.size < interaction.choices.length) {
        current = parent;
        return;
      }
    }

    if (interaction.retry && !choice.success) {
      selected.add(index);
      current = parent;
      return;
    }

    current = parent;
    continueBeat();
  }

  function choose(index) {
    if (current?.interaction?.type !== 'choice') {
      return false;
    }

    const parent = current;
    const interaction = parent.interaction;
    const choice = interaction.choices[index];
    const selected = choiceSelections.get(parent);

    if (!choice || selected.has(index)) {
      return false;
    }

    applyEffects(state, choice.effects);
    stack.push({
      beats: choice.beats || [],
      index: 0,
      after: () => choiceFinished(parent, interaction, choice, index),
    });
    current = null;
    step();

    // A choice with no visible beats completes in the same turn.
    while (!current && stack.length) {
      step();
    }

    return true;
  }

  function complete() {
    const type = current?.interaction?.type;

    if (type !== 'speak' && type !== 'gesture') {
      return false;
    }

    continueBeat();
    return true;
  }

  function next() {
    if (!current) {
      return false;
    }

    if (current.interaction) {
      if (current.interaction.type === 'recap') {
        recap = true;
        return true;
      }

      return false;
    }

    continueBeat();
    return true;
  }

  function view() {
    const interaction = current?.interaction || null;

    return {
      sceneId,
      visual,
      say: current?.say || null,
      interaction,
      choices: interaction?.type === 'choice'
        ? interaction.choices.map((choice, index) => ({
          ...choice,
          disabled: choiceSelections.get(current)?.has(index),
        }))
        : [],
      hint: {
        say: current?.say?.ja,
        prompt: interaction?.prompt?.ja,
      },
      recap: recap
        ? story.recap.filter((item) => !item.when || item.when(state))
        : null,
    };
  }

  if (!story.scenes[sceneId]) {
    throw new Error(`Unknown scene: ${sceneId}`);
  }

  stack = [{ beats: story.scenes[sceneId].beats, index: 0, after: null }];
  step();

  return {
    get state() {
      return Object.freeze({ ...state });
    },
    get view() {
      return view();
    },
    next,
    choose,
    complete,
  };
}
