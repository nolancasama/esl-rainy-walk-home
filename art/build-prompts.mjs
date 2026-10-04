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

// Keyed by `visual.weather` (what is happening outside), not by emotional tone.
const LIGHT = {
  cloudy: 'Dry ground, no rain falling yet. Overcast late-afternoon light, dark gray clouds gathering.',
  rain: 'Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky.',
  storm: 'Strong wind and heavy rain, dramatic diagonal rain streaks, darker slate palette.',
  // The story's one weather break (reunion), said aloud at reunion-03 and bag-01.
  clearing: 'The rain has just stopped: no rain falling, warm golden evening light breaking through '
    + 'the clouds, wet shining ground and puddles, cozy amber palette.',
  'light-rain': 'Light rain falling again after a short break, wet reflective pavement, soft blue-gray '
    + 'evening palette.',
  'indoor-rain': 'Indoors: warm lamplight, cozy amber palette; through the windows, golden dusk with '
    + 'a light drizzle on the glass.',
};

// Recurring places are a film set: one master layout, reused by every shot there.
// Each prompt repeats the layout in words for generators without image references.
const LOCATIONS = {
  'cat-search-area': {
    // Approved 2026-10-04: listen-01 is the master shot of this set.
    reference: 'art/scenes/listen-01.webp',
    layout: 'A quiet Japanese residential side street seen from the sidewalk at child eye level, '
      + 'the street receding toward the left-center. Along the right side of the sidewalk, from back to '
      + 'front: a small roofed bicycle shelter (thin dark metal posts, translucent flat roof) with four '
      + 'ordinary city bicycles parked side by side in a rack, front baskets toward the street, against '
      + 'a gray concrete-block wall; then, nearest the viewer at the right edge, a tall red drink vending '
      + 'machine facing the street, with a large rounded blue hydrangea bush in front of it at the far '
      + 'right. On the left side: a low stone wall and two-storey houses with lit windows. Wet gray '
      + 'paving, one round manhole cover mid-sidewalk, utility poles.',
    ids: ['listen-01', 'listen-02', 'listen-04', 'listen-05', 'come-01', 'come-02', 'come-03',
      'come-04', 'come-05', 'come-06', 'come-07', 'softly-01', 'softly-02'],
  },
  'blue-houses': {
    reference: 'art/scenes/wrongHouse-04.webp',
    layout: 'Two matching pale-blue two-storey houses side by side, seen from the street: the LEFT '
      + 'house is Mr. Tanaka\'s, the RIGHT house is Mr. Kimura\'s. Both have dark gray tiled roofs, a '
      + 'small porch roof over a wooden front door with a warm wall lamp beside it, and large lit '
      + 'ground-floor windows. In front of each: a low gray block wall with blue hydrangeas, a square '
      + 'stone gatepost with a blank pale nameplate, a short straight stone path to one low entry step. '
      + 'The left house has a black slatted metal gate standing open; the right house\'s wooden door '
      + 'has a small cat door at the bottom. Nothing else on either house suggests a cat. A wet '
      + 'sidewalk runs along the front of both houses.',
    ids: ['wrongHouse-01', 'wrongHouse-02', 'wrongHouse-04', 'wrongHouse-05', 'wrongHouse-06',
      'reunion-01', 'reunion-02'],
  },
};
const LOCATION_OF = Object.fromEntries(Object.entries(LOCATIONS)
  .flatMap(([name, place]) => place.ids.map((id) => [id, name])));

function locationText(name) {
  const { reference, layout } = LOCATIONS[name];
  return `LOCATION REFERENCE: ${name} (\`${reference}\`). Use the established ${name} location `
    + 'reference. Preserve the exact same environment, camera angle, horizon, architecture, object '
    + 'placement and weather context; closer shots show part of the same set. Change only the '
    + `characters, their poses and the action. Fixed layout: ${layout}`;
}

// Fixed character sheet so every prompt draws the same people. Entries with a
// null pattern are outfit variants, chosen only through OVERRIDES.
const CAST = [
  ['player', /player|two children|the children/i,
    'the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, '
    + 'dark-blue randoseru school backpack, blue umbrella (gender-neutral look)'],
  ['playerArrived', null,
    'the player, just home: the same 11-year-old Japanese child, short black bob hair (wet), '
    + 'soaked light-green zip jacket; randoseru and umbrella already put down, not worn or held'],
  ['playerHome', null,
    'the player, changed into dry home clothes: the same 11-year-old Japanese child, short black '
    + 'bob hair slightly messy from the towel, soft cream long-sleeve sweatshirt, loose navy lounge '
    + 'pants, socks; no jacket, no randoseru, no umbrella'],
  ['haru', /Haru|two children|the children/i,
    'Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own'],
  ['ken', /Ken\b|2nd-grade|younger student/,
    'Ken: a small 7-year-old boy, bright-yellow school safety hat, red randoseru, clear plastic folder'],
  ['sato', /Mrs\. Sato(?!'s)|elderly neighbor/,
    'Mrs. Sato: a kind elderly woman, short gray curly hair, lavender cardigan, purple umbrella, '
    + 'two cloth grocery bags'],
  ['satoEscorted', null,
    'Mrs. Sato: a kind elderly woman, short gray curly hair, lavender cardigan, holding only her own '
    + 'purple umbrella; the children carry her two cloth grocery bags'],
  ['kimura', /Mr\. Kimura|elderly man/,
    'Mr. Kimura: a gentle elderly man, white hair, round glasses, brown cardigan, wooden cane'],
  ['tanaka', /man in pajamas|The man|the man\b/,
    'Mr. Tanaka: a friendly man in his 40s, striped pajamas, with a big fluffy golden dog'],
  ['mom', /Mom( stands|'s face|'s phone| smiles)/,
    'Mom: a woman in her 40s, dark hair in a low ponytail, beige sweater'],
  ['momo', /\b(cat|Momo)\b(?!\s*(stickers|door))/i,
    'Momo: a small white cat with gray spots, red collar with a small round silver tag'],
];

const usesText = (d) => /[A-Z]{4,}|"/.test(d) || /phone|nameplate|screen|\btag\b/i.test(d);
const MONTAGES = new Set(['tag-05']);

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
const photos = Object.values(STORY.photos || {}).map((visual) => ({ id: visual.id, visual, uses: 1 }));

// Hand corrections where the description implies who is (or is not) in frame.
const HOME = ['playerHome', '-player'];
const OVERRIDES = {
  'wrongHouse-01': ['haru'],
  'tag-03': ['player', 'haru'],
  'sato-04': ['satoEscorted', '-sato'],
  'reunion-02': ['haru'],
  'reunion-05': ['-kimura'],
  'bag-01': ['haru', '-momo', '-kimura'],
  'home-02': ['playerArrived', '-player'],
  'home-03': HOME,
  'home-04': HOME,
  'home-05': HOME,
  'home-06': HOME,
  'home-07': HOME,
  'home-08': HOME,
  'photo-momo': ['-kimura'],
};

function prompt({ id, visual }) {
  const d = visual.description;
  const fix = OVERRIDES[id] || [];
  const keys = CAST
    .filter(([key, re]) => (re?.test(d) || fix.includes(key)) && !fix.includes(`-${key}`))
    .map(([key]) => key);
  const who = keys.map((key) => CAST.find(([k]) => k === key)[2]);
  const parts = [STYLE, `Scene: ${d}`];
  if (LOCATION_OF[id]) parts.push(locationText(LOCATION_OF[id]));
  if (who.length) parts.push(`Characters: ${who.join('; ')}.`);
  parts.push(LIGHT[visual.weather] || LIGHT.rain);
  // Generators add stray cats, dogs and children; in a lost-cat story those read as plot.
  const animals = `${keys.includes('momo') ? 'Momo is the only cat' : 'no cats'}, `
    + `${keys.includes('tanaka') ? 'the golden dog is the only dog' : 'no dogs'}`;
  parts.push(who.length ? `Only the listed characters appear: no extra people, ${animals}.`
    : `No people, ${animals}.`);
  const bubble = /memory bubble|thought bubble/i.test(d);
  if (bubble) {
    parts.push('Show the memory inside a soft cloud-shaped bubble with a faded, dreamy edge.');
  } else if (!MONTAGES.has(id)) {
    parts.push('One single moment in one continuous scene: each character appears only once; '
      + 'no comic panels or split frames.');
  }
  if (usesText(d)) {
    parts.push('Leave signs, tags and screens blank and flat-colored; the game shows any words in HTML.');
  }
  return parts.join(' ');
}

const PEOPLE = CAST.filter(([, re]) => re);
const out = [];
out.push('# Rainy Walk Home — Art Prompts', '');
out.push(`Generated from \`src/story.js\` (${order.length} images). One prompt per placeholder;`);
out.push('each is self-contained, so paste it as-is into the image generator.', '');
out.push('- **File name:** save as `art/scenes/<id>.webp` (16:9, about 1600×900).');
out.push('- **Text in pictures** (nameplates, tag, phone message): generators garble words, so');
out.push('  prompts ask for blank signs and screens. The game shows the words in HTML.');
out.push('- **Consistency:** generate the character sheet first and use it as a reference image');
out.push('  (or "character reference") for every scene if your tool supports it.');
out.push('- **Regenerate:** run `node art/build-prompts.mjs` after editing `src/story.js` descriptions.', '');

out.push('## Character sheet (generate first)', '');
out.push('```', `${STYLE.replace('16:9 wide frame, ', '')} Character turnaround sheet on a plain `
  + 'light background, each character standing in a row, full body, front view, labeled by position only: '
  + `${PEOPLE.map(([, , t]) => t).join('; ')}.`, '```', '');

out.push('## Player home outfit (generate second)', '');
out.push('Used in home scenes after the player changes into dry clothes. Same child, same face and hair.', '');
out.push('```', `${STYLE.replace('16:9 wide frame, ', '')} Character sheet on a plain light background, full body, `
  + `front view and side view of one child: ${CAST.find(([k]) => k === 'playerHome')[2]}.`, '```', '');

out.push('## Location references (generate before their scenes)', '');
out.push('Recurring places are a film set. Generate the empty master plate once, approve it, then pass it as');
out.push('the reference image for every scene listed. Each scene prompt also restates the layout in words.', '');
for (const [name, place] of Object.entries(LOCATIONS)) {
  out.push(`### ${name} → \`${place.reference}\``, '', `Scenes: ${place.ids.join(', ')}.`, '');
  if (place.reference.startsWith('art/reference/')) {
    out.push('```', `${STYLE} Empty establishing plate, no people and no animals. ${place.layout} `
      + `${LIGHT.rain}`, '```', '');
  } else {
    out.push('Already exists; use that image as the reference.', '');
  }
}

out.push('## Speaker portraits (8)', '');
out.push('Small round icons shown next to each line. Same style, head-and-shoulders, plain soft background.', '');
for (const [key, , text] of PEOPLE) {
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

if (photos.length) {
  out.push('## Dedicated assets', '');
  out.push('Shown inside HTML message cards (`say.photo`), not as scene art. Save as `art/scenes/<id>.webp`.', '');
  for (const item of photos) {
    out.push(`### ${item.id}`, '', `> ${item.visual.description}`, '', '```', prompt(item), '```', '');
  }
}

fs.mkdirSync(path.join(root, 'art'), { recursive: true });
fs.writeFileSync(path.join(root, 'art/ART_PROMPTS.md'), out.join('\n'));
console.log(`${order.length} scene prompts and ${photos.length} dedicated assets written`);
