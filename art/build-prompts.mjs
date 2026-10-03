// Builds art/ART_PROMPTS.md from the story's placeholder visuals.
// Run from anywhere: node art/build-prompts.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { STORY } = await import(pathToFileURL(path.join(root, 'src/story.js')));

const STYLE = 'Warm children\'s picture-book illustration, soft watercolor and gouache texture, '
  + 'clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, '
  + 'no text, no letters, no watermark.';

const LIGHT = {
  cloudy: 'Overcast late-afternoon light, gray-blue sky.',
  rain: 'Steady rain, wet reflective pavement, cool blue-gray palette.',
  storm: 'Strong wind and heavy rain, dramatic diagonal rain streaks, darker slate palette.',
  warm: 'Warm golden indoor or after-rain light, cozy amber palette.',
};

// Fixed character sheet so every prompt draws the same people.
const CAST = [
  ['player', /player|two children|the children/i,
    'the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, '
    + 'dark-blue randoseru school backpack, blue umbrella (gender-neutral look)'],
  ['haru', /Haru|two children|the children/i,
    'Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella'],
  ['ken', /Ken\b|2nd-grade|younger student/,
    'Ken: a small 7-year-old boy, bright-yellow school safety hat, red randoseru, clear plastic folder'],
  ['sato', /Mrs\. Sato(?!'s)|elderly neighbor/,
    'Mrs. Sato: a kind elderly woman, short gray curly hair, lavender cardigan, purple umbrella, '
    + 'two cloth grocery bags'],
  ['kimura', /Mr\. Kimura|elderly man/,
    'Mr. Kimura: a gentle elderly man, white hair, round glasses, brown cardigan, wooden cane'],
  ['tanaka', /man in pajamas|The man|the man\b/,
    'Mr. Tanaka: a friendly man in his 40s, striped pajamas, with a big fluffy golden dog'],
  ['mom', /Mom( stands|'s face|'s phone| smiles)/,
    'Mom: a woman in her 40s, dark hair in a low ponytail, beige sweater'],
  ['momo', /\b(cat|Momo)\b(?!\s*(stickers|door))/i,
    'Momo: a small white cat with gray spots, red collar with a small round silver tag'],
];

const usesText = (d) => /[A-Z]{4,}|"/.test(d);

// Collect unique stable art ids in story order.
const seen = new Map();
const order = [];
function walk(sceneId, beats) {
  for (const beat of beats) {
    const v = beat.visual;
    if (v?.type === 'placeholder') {
      if (!seen.has(v.id)) {
        const item = { scene: sceneId, id: v.id, visual: v, uses: 0 };
        seen.set(v.id, item);
        order.push(item);
      }
      seen.get(v.id).uses += 1;
    }
    for (const choice of beat.interaction?.choices || []) walk(sceneId, choice.beats || []);
  }
}
for (const [id, scene] of Object.entries(STORY.scenes)) walk(id, scene.beats);

// Hand corrections where the description implies who is (or is not) in frame.
const OVERRIDES = {
  'wrongHouse-01': ['haru'],
  'tag-03': ['player', 'haru'],
  'reunion-02': ['haru'],
  'bag-01': ['haru', '-momo'],
};

function prompt({ id, visual }) {
  const d = visual.description;
  const fix = OVERRIDES[id] || [];
  const who = CAST
    .filter(([key, re]) => (re.test(d) || fix.includes(key)) && !fix.includes(`-${key}`))
    .map(([, , text]) => text);
  const parts = [STYLE, `Scene: ${d}`];
  if (who.length) parts.push(`Characters: ${who.join('; ')}.`);
  parts.push(LIGHT[visual.tone] || LIGHT.rain);
  if (/memory bubble|thought bubble/i.test(d)) {
    parts.push('Show the memory inside a soft cloud-shaped bubble with a faded, dreamy edge.');
  }
  if (usesText(d)) {
    parts.push('Leave signs, tags and screens blank and flat-colored; the words are added afterwards.');
  }
  return parts.join(' ');
}

const out = [];
out.push('# Rainy Walk Home — Art Prompts', '');
out.push(`Generated from \`src/story.js\` (${order.length} images). One prompt per placeholder;`);
out.push('each is self-contained, so paste it as-is into the image generator.', '');
out.push('- **File name:** save as `art/scenes/<id>.webp` (16:9, about 1600×900).');
out.push('- **Text in pictures** (nameplates, tag, phone message): generators garble words, so');
out.push('  prompts ask for blank signs. Add the words afterwards in any editor.');
out.push('- **Consistency:** generate the character sheet first and use it as a reference image');
out.push('  (or "character reference") for every scene if your tool supports it.');
out.push('- **Regenerate:** run `node art/build-prompts.mjs` after editing `src/story.js` descriptions.', '');

out.push('## Character sheet (generate first)', '');
out.push('```', `${STYLE.replace('16:9 wide frame, ', '')} Character turnaround sheet on a plain `
  + 'light background, each character standing in a row, full body, front view, labeled by position only: '
  + `${CAST.map(([, , t]) => t).join('; ')}.`, '```', '');

out.push('## Speaker portraits (8)', '');
out.push('Small round icons shown next to each line. Same style, head-and-shoulders, plain soft background.', '');
for (const [key, , text] of CAST) {
  out.push(`- **portrait-${key}**: \`${STYLE.replace('16:9 wide frame', 'square 1:1 frame')} `
    + `Head-and-shoulders portrait, friendly expression, plain soft background. ${text}.\``);
}
out.push('');

let current = '';
for (const item of order) {
  if (item.scene !== current) {
    current = item.scene;
    const place = STORY.scenes[current].placeJa || '';
    out.push(`## ${current} ${place ? `(${place})` : ''}`.trim(), '');
  }
  out.push(`### ${item.id}${item.uses > 1 ? ` — used ${item.uses}×` : ''}`, '');
  out.push(`> ${item.visual.description}`, '');
  out.push('```', prompt(item), '```', '');
}

fs.mkdirSync(path.join(root, 'art'), { recursive: true });
fs.writeFileSync(path.join(root, 'art/ART_PROMPTS.md'), out.join('\n'));
console.log(`${order.length} scene prompts written`);
