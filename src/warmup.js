import { VOCAB_BY_ID } from './vocab.js';

export const WARMUP_ITEMS = Object.freeze([
  Object.freeze({
    verb: 'help',
    stage: '📦 🙋',
    en: 'Heavy box. Help!',
    choices: Object.freeze(['look', 'help', 'run']),
    distractors: Object.freeze(['look', 'run']),
  }),
  Object.freeze({
    verb: 'catch',
    stage: '🥎 🤲',
    en: 'Catch the ball!',
    choices: Object.freeze(['read', 'catch', 'walk']),
    distractors: Object.freeze(['read', 'walk']),
  }),
  Object.freeze({
    verb: 'listen',
    stage: '🔔 👂',
    en: 'Listen to the bell.',
    choices: Object.freeze(['listen', 'run', 'look']),
    distractors: Object.freeze(['run', 'look']),
  }),
  Object.freeze({
    verb: 'look',
    stage: '🔭 🌙',
    en: 'Look at the moon.',
    choices: Object.freeze(['drink', 'look', 'write']),
    distractors: Object.freeze(['drink', 'write']),
  }),
  Object.freeze({
    verb: 'read',
    stage: '📖 🔤',
    en: 'Read the sign.',
    choices: Object.freeze(['catch', 'run', 'read']),
    distractors: Object.freeze(['catch', 'run']),
  }),
  Object.freeze({
    verb: 'run',
    stage: '🏁 👟',
    en: 'Run to the finish!',
    choices: Object.freeze(['read', 'run', 'listen']),
    distractors: Object.freeze(['read', 'listen']),
  }),
  Object.freeze({
    verb: 'feed',
    stage: '🦆 🌽',
    en: 'Feed the hungry duck.',
    choices: Object.freeze(['feed', 'catch', 'read']),
    distractors: Object.freeze(['catch', 'read']),
  }),
]);

export function warmupGloss(verb) {
  return VOCAB_BY_ID[verb]?.ja || '';
}
