// Rainy Walk Home — story data. Pure data + small predicates; no DOM.
// Schema: see SPEC.md ("Story data contract"). The engine (src/engine.js)
// interprets this; another story can reuse the engine by exporting the same shape.
//
// Conventions:
// - Every `en` line is short (about 3-8 words). `ja` is shown only via ヒント.
// - `visual.description` is the replaceable art brief; `stage` is a cheap emoji stand-in.
// - Choices never say "wrong". They play consequence beats, change state, and reconverge.

const warm = (s) => s.haruBond >= 2;
const cool = (s) => s.haruBond < 2;

// `tone` is the picture's emotional palette (UI colours). `weather` is what is
// really happening outside and drives the ambience and the prompt lighting. A
// scene can feel warm while it rains, so the two are never the same variable.
export const WEATHERS = ['cloudy', 'rain', 'storm', 'clearing', 'light-rain', 'indoor-rain'];
const ph = (id, description, stage, tone = 'rain', weather = tone) => (
  { type: 'placeholder', id, description, stage, tone, weather });

// Ending tone, chosen from the three "help someone or keep going" dilemmas
// (umbrella, papers, Mrs. Sato). Never shown to the player; it only changes
// how Haru and the walk home feel. Every ending returns Momo and gets home.
// - warm:   close to Haru and helped at least twice
// - repair: kept going earlier, but the most recent dilemma was a help
// - quiet:  everything else (mostly hurried home)
export const ending = (s) => {
  if (s.haruBond >= 2 && s.helpCount >= 2) return 'warm';
  if (s.repaired) return 'repair';
  return 'quiet';
};
const endingIs = (name) => (s) => ending(s) === name;

// Effects for the dilemma choices. A help after an earlier skip marks a repair;
// a later skip undoes it, so "repair" means the change stuck.
const helped = { add: { helpCount: 1 } };
const skipped = { add: { skipCount: 1 }, set: { repaired: false } };
const noticeRepair = { when: (s) => s.skipCount > 0, effects: { set: { repaired: true } } };
const merge = (a, b) => ({ set: { ...a.set, ...b.set }, add: { ...a.add, ...b.add } });

export const STORY = {
  id: 'rainy-walk-home',
  title: 'Rainy Walk Home',
  titleJa: 'あめの かえりみち',
  start: 'school',

  initialState: {
    helpedHaru: false,
    ranFromHaru: false,
    caughtPapers: false,
    helpedStudent: false,
    ignoredStudent: false,
    helpedMrsSato: false,
    caughtOrange: false,
    hasSnack: false,
    heardCat: false,
    fedCat: false,
    readTag: false,
    knowsKimura: false,
    foundMomo: false,
    haruBond: 0,
    lateLevel: 0,
    embarrassmentEvents: 0,
    competenceMoments: 0,
    helpCount: 0,
    skipCount: 0,
    repaired: false,
  },

  // Who can speak. `icon` is a placeholder portrait.
  cast: {
    narrator: { name: '', icon: '' },
    you: { name: 'You', icon: '🧒' },
    haru: { name: 'Haru', icon: '👦' },
    mom: { name: 'Mom', icon: '👩' },
    ken: { name: 'Ken', icon: '🧒🏻' },
    sato: { name: 'Mrs. Sato', icon: '👵' },
    tanaka: { name: 'Man', icon: '👨' },
    kimura: { name: 'Mr. Kimura', icon: '👴' },
    momo: { name: 'Cat', icon: '🐱' },
  },

  // Art shown inside message cards (`say.photo`), not as scene art. Same
  // placeholder shape so prompts and the manifest treat them like scenes.
  photos: {
    'photo-momo': ph('photo-momo', 'The photo Mr. Kimura took, as a full-frame snapshot (no phone, no frame, no interface): the player and Haru crouch side by side on the wet street outside a house, smiling at the camera, with Momo sitting between them looking at the camera too. Haru makes a small peace sign. The rain has just stopped: golden evening light, wet shining ground. Mr. Kimura is not in the photo; he is the one taking it. Keep all three faces in the central horizontal band of the frame so a wide crop keeps them.', '📸 🧒🐱👦', 'warm', 'clearing'),
  },

  scenes: {
    // ── 1. School ends ────────────────────────────────────────────────
    school: {
      placeJa: '松原小学校',
      placeEn: 'Matsubara Elementary School',
      beats: [
        { visual: ph('school-01', 'Friday afternoon at the school gate of a Japanese elementary school (no readable signs). The player and classmate Haru walk out side by side with their randoseru. Dark clouds gather above, but no rain has fallen yet: the ground is dry. The player\'s blue umbrella is still closed, hanging from one hand. Haru has no umbrella. No other children nearby.', '🏫 ☁️☁️ 🧒👦', 'cloudy'),
          sfx: 'bell',
          say: { who: 'narrator', en: 'Friday. School is finished.', ja: '金曜日。学校がおわった。' } },
        { say: { who: 'haru', en: "Let's go home!", ja: 'いっしょに帰ろう！' },
          interaction: { type: 'choice', choices: [
            { verb: 'go', icon: '🚶', beats: [] },
          ] } },
        { visual: ph('school-02', 'Big raindrops start to fall. Player opens an umbrella. Haru looks up, no umbrella.', '🌧️ ☂️🧒 👦💧', 'rain'),
          sfx: 'raindrops',
          say: { who: 'narrator', en: 'Drip... drop... Rain!', ja: 'ポツ…ポツ…雨だ！' } },
        { say: { who: 'haru', en: 'Oh no. No umbrella!', ja: 'うわ。かさがない！' }, goto: 'umbrella' },
      ],
    },

    // ── 2. Haru has no umbrella (dilemma: friend vs. Mom) ─────────────
    umbrella: {
      placeJa: '松原小学校の まえ',
      beats: [
        { visual: ph('umbrella-01', 'Heavy rain. Haru holds a school bag over his head, getting soaked. Player stands dry under an umbrella. Player glances at a small kids-phone; its screen is blank and flat-colored, and the message is added by the game.', '🌧️🌧️ ☂️🧒  👦💦', 'rain'),
          say: { who: 'narrator', en: 'Haru has no umbrella.', ja: 'ハルはかさをもっていない。' } },
        { say: { who: 'mom', en: 'Come home soon.', ja: 'はやく帰ってきてね。', message: true }, sfx: 'phone' },
        { say: { who: 'narrator', en: 'What do you do?', ja: 'どうする？' },
          interaction: { type: 'choice', choices: [
            { verb: 'help', icon: '☂️', effects: merge(helped, { set: { helpedHaru: true }, add: { haruBond: 2, lateLevel: 1 } }),
              beats: [
                { visual: ph('umbrella-02', 'Player and Haru squeeze under one small umbrella. Both have one wet shoulder. They walk slowly, smiling.', '☂️ 🧒👦 💧', 'rain'),
                  say: { who: 'haru', en: 'Thanks! Your shoulder is wet!', ja: 'ありがとう！ きみのかた、ぬれてるよ！' } },
                { say: { who: 'narrator', en: 'One umbrella. Two friends. Slow.', ja: 'ひとつのかさに ふたり。ゆっくり。' } },
              ] },
            { verb: 'run', icon: '🏃', effects: merge(skipped, { set: { ranFromHaru: true }, add: { haruBond: -1, embarrassmentEvents: 1 } }),
              beats: [
                { say: { who: 'narrator', en: 'Run! Run fast!', ja: 'はしれ！' },
                  interaction: { type: 'gesture', gesture: 'run', prompt: { en: 'Run in place!', ja: 'その場で 足ぶみして はしろう！' } } },
                { visual: ph('umbrella-03', 'Player runs ahead. A gust of wind flips the blue umbrella in the player\'s hand inside out: inverted and bent by the wind, but not torn, snapped or missing pieces. Player is suddenly soaked. Haru, far behind, sees it.', '💨 🌂↯ 🧒💦 ....... 👦', 'storm'),
                  sfx: 'gust',
                  say: { who: 'narrator', en: 'Whoosh! Your umbrella flips!', ja: 'ビュー！ かさが うらがえしに！' } },
                { visual: ph('umbrella-04', 'Haru catches up, dripping wet, his hands empty; he has no umbrella. The soaked player holds their own blue umbrella, still flipped inside out, and is pushing the ribs back into shape; it is bent but not torn and will open again. Haru looks at the inside-out umbrella, then at the player, without smiling.', '🌂↯ 🧒💦 👦💦', 'rain'),
                  say: { who: 'haru', en: '...Hey. Wait for me.', ja: '…ねえ。まってよ。' } },
                { say: { who: 'narrator', en: 'You fix the umbrella.', ja: 'かさを なおした。' } },
              ] },
          ] } },
        { say: { who: 'narrator', en: 'You walk together.', ja: 'いっしょに あるく。' }, goto: 'papers' },
      ],
    },

    // ── 3. Flying papers (embodied CATCH) ─────────────────────────────
    papers: {
      placeJa: 'こうえんの ちかく',
      beats: [
        { visual: ph('papers-01', 'Strong wind. A small 2nd-grade boy (Ken, yellow hat) drops his folder. White worksheets fly everywhere across the sidewalk.', '💨📄📄 🧒🏻😱 📄💨', 'storm'),
          sfx: 'flutter',
          say: { who: 'narrator', en: 'Whoosh! Strong wind!', ja: 'ビューッ！ つよい風！' } },
        { say: { who: 'ken', en: 'My papers!', ja: 'ぼくのプリント！' },
          interaction: { type: 'choice', choices: [
            { verb: 'catch', icon: '🙌', effects: helped, beats: [
                noticeRepair,
                { say: { who: 'narrator', en: 'Catch the paper!', ja: 'プリントを キャッチ！' },
                  interaction: { type: 'gesture', gesture: 'catch', prompt: { en: 'Reach up and catch!', ja: '手を上にのばして キャッチ！' } } },
                { visual: ph('papers-02', 'Side view, the player facing right, leaping up from the wet sidewalk with the randoseru on their back. The left hand holds the blue umbrella out behind for balance, open and right-side out (it does not flip); the right arm stretches up and the right hand has just caught a flying white worksheet, the sheet pinched between fingers and thumb at the top of the jump. Natural, readable pose: both arms attached correctly, nothing mirrored. On the left, Ken, empty-handed, stares up in amazement; his open clear folder lies at his feet with a few loose sheets on the ground.', '🙌📄 🧒✨ 🧒🏻😮', 'storm'),
                  effects: { set: { caughtPapers: true }, add: { competenceMoments: 1 } },
                  say: { who: 'ken', en: 'Wow! Thank you!', ja: 'すごい！ ありがとう！' } },
                { say: { who: 'haru', en: 'Nice catch!', ja: 'ナイスキャッチ！' } },
              ] },
            { verb: 'help', icon: '🤝', effects: merge(helped, { set: { helpedStudent: true }, add: { haruBond: 1, lateLevel: 1 } }), beats: [
                noticeRepair,
                { when: warm, visual: ph('papers-03', 'Player and Haru kneel on the wet sidewalk, picking up papers together with Ken. Haru jumps in right away.', '📄 🧒👦🧒🏻 📄', 'rain'),
                  say: { who: 'haru', en: 'I got this one!', ja: 'これ、とったよ！' } },
                { when: cool, visual: ph('papers-04', 'Player kneels and picks up papers with Ken. Haru watches, then slowly helps too.', '📄 🧒🧒🏻 📄 ... 👦', 'rain'),
                  say: { who: 'narrator', en: 'Haru helps, too.', ja: 'ハルも てつだう。' } },
                { visual: ph('papers-05', 'Ken holds his folder tight, bows deeply.', '🧒🏻🙇 📁', 'rain'),
                  say: { who: 'ken', en: 'Thank you!', ja: 'ありがとう！' } },
              ] },
            { verb: 'go', icon: '🚶', effects: merge(skipped, { set: { ignoredStudent: true }, add: { embarrassmentEvents: 1 } }), beats: [
                { visual: ph('papers-06', 'Player keeps walking. SPLAT — a wet worksheet sticks flat to the player\'s face.', '💨📄😵 🧒', 'storm'),
                  sfx: 'splat',
                  say: { who: 'narrator', en: 'Splat! A paper on your face!', ja: 'ベチャ！ かおに プリント！' } },
                { say: { who: 'haru', en: 'Ha ha! Look at you!', ja: 'あはは！ その顔！' } },
                { visual: ph('papers-07', 'Player peels off the paper, red-faced, and hands it back to Ken.', '🧒😳📄 → 🧒🏻', 'rain'),
                  say: { who: 'ken', en: '...Thanks.', ja: '…ありがと。' } },
              ] },
          ] } },
        { visual: ph('papers-08', 'One last worksheet blows down the street and disappears around a corner.', '📄💨 → 🏘️↱', 'storm'),
          say: { who: 'haru', en: 'Look! Around the corner!', ja: 'みて！ かどのむこう！' }, goto: 'sato' },
      ],
    },

    // ── 4. Mrs. Sato (respect + later payoff) ─────────────────────────
    sato: {
      placeJa: 'まがりかど',
      beats: [
        { visual: ph('sato-01', 'Around the corner: Mrs. Sato, an elderly neighbor with an umbrella and two heavy grocery bags. The worksheet hits her bag. One bag tips. An orange rolls toward the street drain.', '👵☂️🛍️🛍️  🍊→ 🕳️', 'rain'),
          sfx: 'orange',
          say: { who: 'sato', en: 'Oh! My orange!', ja: 'あら！ みかんが！' } },
        { when: (s) => s.lateLevel >= 1, say: { who: 'mom', en: 'Where are you?', ja: 'いま どこ？', message: true }, sfx: 'phone' },
        { say: { who: 'narrator', en: 'Mrs. Sato has heavy bags.', ja: 'さとうさんの にもつは おもい。' },
          interaction: { type: 'choice', choices: [
            { verb: 'catch', icon: '🍊', effects: merge(helped, { set: { caughtOrange: true, helpedMrsSato: true, hasSnack: true }, add: { competenceMoments: 1 } }), beats: [
                noticeRepair,
                { visual: ph('sato-02', 'Player dives and stops the orange with one hand, just before the drain.', '🧒✋🍊 🕳️', 'rain'),
                  say: { who: 'sato', en: 'Good catch! Thank you.', ja: 'ナイスキャッチ！ ありがとう。' } },
                { visual: ph('sato-03', 'Mrs. Sato takes a small pack of dried fish snacks (niboshi) from her bag and gives it to the player.', '👵🎁🐟 → 🧒', 'rain'),
                  say: { who: 'sato', en: 'Here. A little snack.', ja: 'はい、おやつ どうぞ。' } },
              ] },
            { verb: 'help', icon: '🛍️', effects: merge(helped, { set: { helpedMrsSato: true, hasSnack: true }, add: { haruBond: 1, lateLevel: 1 } }), beats: [
                noticeRepair,
                { visual: ph('sato-04', 'The three walk together along the wet street toward Mrs. Sato\'s gate. Mrs. Sato, in the middle, holds her own purple umbrella over herself; that umbrella is the only thing in her hands. On one side of her, the player carries one of her cloth grocery bags in one hand and holds the blue umbrella in the other. On her other side, Haru carries her second cloth grocery bag; he has no umbrella and walks close under the edge of her purple umbrella. Exactly two grocery bags and exactly two umbrellas in the picture: the purple one and the blue one.', '🧒☂️🛍️ 👵☂️ 👦🛍️ 🏠', 'rain'),
                  say: { who: 'sato', en: "Thank you. You've grown!", ja: 'ありがとう。大きくなったねえ！' } },
                { visual: ph('sato-05', 'At her gate Mrs. Sato gives the player a small pack of dried fish snacks (niboshi).', '👵🎁🐟 → 🧒', 'rain'),
                  say: { who: 'sato', en: 'Here. A little snack.', ja: 'はい、おやつ どうぞ。' } },
              ] },
            { verb: 'go', icon: '🚶', effects: skipped, beats: [
                { visual: ph('sato-06', 'Player walks on. Haru stops and looks back at Mrs. Sato, who bends slowly to pick up the orange.', '🧒🚶 ... 👦👀 ... 👵🍊', 'rain'),
                  say: { who: 'narrator', en: 'Haru looks back.', ja: 'ハルが ふりかえる。' } },
                { say: { who: 'haru', en: '...Okay. Let\'s go.', ja: '…うん。いこう。' } },
              ] },
          ] } },
        { say: { who: 'narrator', en: 'Rain, rain, rain.', ja: 'あめ、あめ、あめ。' }, goto: 'listen' },
      ],
    },

    // ── 5. Hear the cat (LISTEN → LOOK) ───────────────────────────────
    listen: {
      placeJa: 'じはんきの まえ',
      beats: [
        { visual: ph('listen-01', 'Quiet street. Beside the sidewalk: a red drink vending machine, a small roofed bicycle shelter with a few ordinary city bicycles parked in a rack, and a leafy bush. Player and Haru walk past in the rain. Nothing hidden is visible yet: no animals anywhere, not in the bush and not under the bicycles.', '🥤  🚲🚲  🌳   🧒👦', 'rain'),
          say: { who: 'momo', en: 'Meow...', ja: '（ニャー…）' }, sfx: 'meow' },
        { say: { who: 'haru', en: 'What was that?', ja: 'いまの なに？' },
          interaction: { type: 'choice', choices: [
            { verb: 'listen', icon: '👂', effects: { set: { heardCat: true }, add: { competenceMoments: 1 } }, beats: [
                { visual: ph('listen-02', 'Player stops and cups a hand to their ear. Close-up sound: a tiny meow from near the bicycles.', '👂🧒  ...meow... 🚲', 'rain'),
                  say: { who: 'momo', en: 'Meow... meow...', ja: '（ニャー…ニャー…）' }, sfx: 'meow' },
                { say: { who: 'haru', en: "You're right! A cat!", ja: 'ほんとだ！ ねこだ！' } },
              ] },
            { verb: 'go', icon: '🚶', beats: [
                { visual: ph('listen-03', 'Haru grabs the player\'s sleeve and puts a finger to his lips.', '👦🤫 ✋🧒', 'rain'),
                  say: { who: 'haru', en: 'Wait! Listen!', ja: 'まって！ きいて！' } },
                { say: { who: 'momo', en: 'Meow... meow...', ja: '（ニャー…ニャー…）' }, sfx: 'meow' },
              ] },
          ] } },
        { say: { who: 'narrator', en: 'Where is the cat?', ja: 'ねこは どこ？' },
          interaction: { type: 'choice', retry: true, choices: [
            { verb: 'look', object: '🥤', objectJa: 'じはんき', beats: [
                { visual: ph('listen-04', 'Behind the vending machine: only an empty can.', '🥤 → 🥫', 'rain'), say: { who: 'narrator', en: 'No cat. Just a can.', ja: 'ねこは いない。かんだけ。' } },
              ] },
            { verb: 'look', object: '🌳', objectJa: 'しげみ', beats: [
                { visual: ph('listen-05', 'In the bush: wet leaves, a snail.', '🌳 → 🐌', 'rain'), say: { who: 'narrator', en: 'No cat. A snail!', ja: 'ねこは いない。カタツムリ！' } },
              ] },
            { verb: 'look', object: '🚲', objectJa: 'じてんしゃおきば', success: true, beats: [] },
          ] } },
        { goto: 'come' },
      ],
    },

    // ── 6. Get the cat to come (STT, then FEED/TOUCH/GO) ──────────────
    come: {
      placeJa: 'じてんしゃおきば',
      beats: [
        { visual: ph('come-01', 'Low, close view inside the small roofed bicycle shelter beside the red vending machine. Several ordinary Japanese city bicycles stand neatly in a rack, each with two round wheels, a simple straight frame, a front basket, a seat, handlebars and pedals; no warped or merged parts. Under those bicycles, low on the dry pavement between the wheels, a small wet white cat with gray spots hides, shivering, eyes wide; it wears a red collar with a small round tag. The cat is clearly under the bicycles: not by a house, a doorway, a porch, or in bushes or plants. Open pavement around it so the hiding place is easy to read. Houses only far in the background.', '🚲🚲 🐱💧', 'rain'),
          say: { who: 'narrator', en: 'A cat! It is scared.', ja: 'ねこだ！ こわがっている。' } },
        { say: { who: 'haru', en: 'Call the cat!', ja: 'ねこを よんでみて！' },
          interaction: { type: 'speak', target: 'Come!', accepted: ['come', 'calm', 'cum', 'kam', 'come here', 'come on'], prompt: { en: 'Say: "Come!"', ja: '「カム！」と いってみよう' } } },
        { visual: ph('come-02', 'At the roofed bicycle shelter beside the red vending machine. The cat peeks out from under the parked bicycles and takes one small, careful step toward the player, then stops, one paw still raised. The player crouches on the sidewalk a short distance away, holding the blue umbrella; Haru watches quietly from just behind the player. The bicycles are ordinary and correctly drawn: two round wheels each, simple frames, baskets. Not by a house, a doorway or a porch.', '🚲 🐱👀 ... 🧒', 'rain'),
          say: { who: 'narrator', en: 'The cat looks at you.', ja: 'ねこが きみを みている。' },
          interaction: { type: 'choice', choices: [
            { verb: 'feed', icon: '🐟',
              goto: (s) => (s.hasSnack ? 'tag' : 'softly'),
              beats: [
                { when: (s) => s.hasSnack, effects: { set: { fedCat: true }, add: { competenceMoments: 1 } },
                  visual: ph('come-03', 'In front of the roofed bicycle shelter beside the red vending machine, the player crouches holding open a small pack of dried fish snacks. The cat has come out from under the parked bicycles and eats from the player\'s hand, eyes closed, purring. Haru crouches beside the player, smiling. Not by a house, a doorway or a porch.', '🧒✋🐟 🐱💕', 'rain'),
                  sfx: 'purr',
                  say: { who: 'narrator', en: "Mrs. Sato's snack! The cat eats.", ja: 'さとうさんの おやつ！ ねこが たべる。' } },
                { when: (s) => s.hasSnack && warm(s), say: { who: 'haru', en: 'It likes you!', ja: 'なついてる！' } },
                { when: (s) => !s.hasSnack, visual: ph('come-04', 'In front of the roofed bicycle shelter beside the red vending machine, the player has searched every pocket and finds nothing: only a pencil and an eraser in one open palm, the blue umbrella in the other hand, a small disappointed face. Under the parked bicycles behind, the cat peeks out, watching. Haru crouches nearby.', '🧒🤷 ✏️ 🧽', 'rain'),
                  say: { who: 'narrator', en: 'Hmm... You have no food.', ja: 'うーん…たべものが ない。' } },
              ] },
            { verb: 'touch', icon: '✋', goto: 'softly', beats: [
                { visual: ph('come-05', 'Player reaches out fast. The cat hisses and backs deeper under the bicycles.', '✋→ 🐱💢 🚲', 'rain'),
                  say: { who: 'momo', en: 'Hiss!', ja: '（シャーッ！）' }, sfx: 'hiss' },
                { say: { who: 'haru', en: 'Too fast!', ja: 'はやすぎ！' } },
              ] },
            { verb: 'go', icon: '🚶', goto: 'softly', beats: [
                { when: warm, visual: ph('come-06', 'Player turns to leave. Haru crouches by the bicycles and does not move.', '🧒🚶 ... 👦🐱', 'rain'),
                  say: { who: 'haru', en: 'Wait! It is cold!', ja: 'まって！ さむそうだよ！' } },
                { when: cool, visual: ph('come-07', 'Player turns to leave. Haru stays. He looks at the player with a frown.', '🧒🚶 ... 👦😠 🐱', 'rain'),
                  say: { who: 'haru', en: "Wait. We can't go.", ja: 'まって。ほうっておけないよ。' } },
              ] },
          ] } },
      ],
    },

    // Recovery path for the cat: everyone reaches the tag scene.
    softly: {
      placeJa: 'じてんしゃおきば',
      beats: [
        { visual: ph('softly-01', 'Haru kneels low and quiet, and gestures to the player to kneel too.', '👦🧎 🧒🧎  🐱', 'rain'),
          say: { who: 'haru', en: "Shh. Let's be quiet.", ja: 'しーっ。しずかにしよう。' } },
        { say: { who: 'haru', en: 'Say it softly.', ja: 'やさしく いってみて。' },
          interaction: { type: 'speak', target: 'Come...', accepted: ['come', 'calm', 'cum', 'kam', 'come here', 'come on'], prompt: { en: 'Softly: "Come..."', ja: 'やさしく「カム…」' } } },
        { visual: ph('softly-02', 'Slowly, slowly, the cat walks out and rubs against the player\'s knee.', '🧒🧎 🐱💕', 'rain'),
          sfx: 'purr',
          effects: { add: { competenceMoments: 1 } },
          say: { who: 'narrator', en: 'The cat comes to you!', ja: 'ねこが きてくれた！' }, goto: 'tag' },
      ],
    },

    // ── 7. Find the owner (READ, Mrs. Sato payoff, THINK) ─────────────
    tag: {
      placeJa: 'じてんしゃおきば',
      beats: [
        { visual: ph('tag-01', 'Close-up: the cat in the player\'s arms. A small round tag on the red collar has writing on it.', '🧒🤗🐱  🏷️', 'rain'),
          say: { who: 'haru', en: 'Look! A tag!', ja: 'みて！ なふだ！' },
          interaction: { type: 'choice', choices: [
            { verb: 'read', icon: '📖', effects: { set: { readTag: true }, add: { competenceMoments: 1 } }, beats: [
                { visual: ph('tag-02', 'Close-up of the small round silver tag on the red collar. The tag face is blank; its words are shown by the game.', '🏷️  I am MOMO. 💙🏠 Blue house.', 'rain'),
                  say: { who: 'you', en: 'I am Momo. Blue house.', ja: 'ぼくは モモ。青い家。' } },
                { say: { who: 'haru', en: 'You can read it!', ja: 'よめたね！' } },
              ] },
          ] } },
        // Payoff: Mrs. Sato saw them from her window and comes out.
        { when: (s) => s.helpedMrsSato, effects: { set: { knowsKimura: true } },
          visual: ph('tag-03', 'Mrs. Sato walks over with her umbrella. She recognizes the cat immediately and points down the street toward the park.', '👵☂️👉 🐱 🧒👦', 'rain'),
          say: { who: 'sato', en: "Momo! That's Mr. Kimura's cat.", ja: 'モモちゃん！ きむらさんの ねこよ。' } },
        { when: (s) => s.helpedMrsSato,
          say: { who: 'sato', en: 'Blue house, near the park.', ja: '公園の ちかくの 青い家よ。' } },
        { when: (s) => !s.helpedMrsSato,
          say: { who: 'haru', en: 'Blue house... Where?', ja: '青い家…どこ？' },
          interaction: { type: 'choice', choices: [
            { verb: 'think', icon: '🤔', effects: { add: { competenceMoments: 1 } }, beats: [
                { visual: ph('tag-04', 'Thought bubble over the player: the rainy street near the park, with two blue houses side by side and hydrangeas in bloom (early-summer rainy season, no cherry blossoms).', '🧒💭 (🌳 💙🏠 💙🏠)', 'rain'),
                  say: { who: 'you', en: 'Near the park! Blue houses!', ja: '公園の ちかく！ 青い家がある！' } },
                { say: { who: 'haru', en: 'Good idea!', ja: 'いいね！' } },
              ] },
            { verb: 'run', icon: '🏃', effects: { add: { lateLevel: 1 } }, beats: [
                { visual: ph('tag-05', 'Player and Haru run up and down three streets with the cat. Red house. Yellow house. Out of breath.', '🏃🐱👦 🟥🏠 🟨🏠 💦', 'rain'),
                  say: { who: 'haru', en: 'Not here... Not here...', ja: 'ここじゃない…ここも ちがう…' } },
                { say: { who: 'narrator', en: 'Oh! Near the park!', ja: 'あ！ 公園の ちかく！' } },
              ] },
          ] } },
        { goto: 'wrongHouse' },
      ],
    },

    // ── 8. Wrong house (embarrassment → recovery) ─────────────────────
    wrongHouse: {
      placeJa: 'こうえんの まえ',
      beats: [
        { visual: ph('wrongHouse-01', 'Street by the park. Two almost identical blue houses side by side: same shape, same blue walls, same plain closed front doors. Neither house has any cat pictures, stickers, paw prints or decorations. The player, carrying Momo in both arms, hurries confidently toward the gate of the first house without looking closely. Haru walks one step behind on the sidewalk, pointing at the first house with one hand and, with the other, holding the blue umbrella that belongs to the player over both of them, since the player has both arms full.', '🌳  💙🏠  💙🏠   🧒🐱👦', 'rain'),
          say: { who: 'haru', en: 'Look! A blue house!', ja: 'みて！ 青い家！' } },
        { say: { who: 'narrator', en: 'Ding-dong!', ja: 'ピンポーン！' }, sfx: 'doorbell',
          interaction: { type: 'speak', target: 'Hello!', accepted: ['hello', 'hallo', 'hullo', 'hello there', 'hi', 'harrow'], prompt: { en: 'Say: "Hello!"', ja: '「ハロー！」と いおう' } } },
        { visual: ph('wrongHouse-02', 'The first blue house. Simple, clean doorway: one plain wooden front door, one low step under a small porch roof; the open gate is behind the viewer and out of frame, and nothing stands in or beside the doorway: no metal bars, grates, railings or boxes. The door has just opened. The man in pajamas stands in the doorway, one hand on the door, looking confused. Beside him on the porch stands exactly one big fluffy golden dog, its whole body visible with four legs on the ground, mouth open in a loud bark; no other paws or limbs anywhere in the picture. A few steps in front of the porch, on the path, the player holds Momo tightly in both arms and freezes in surprise; Momo\'s fur puffs up, ears flat. Haru stands right beside the player, holding the blue umbrella that belongs to the player over both of them, since the player has both arms full, staring wide-eyed. Clear open space between the dog and the children. Startled but gentle, not scary.', '🚪 👨🐕  ...  🧒😳🐱💢 👦😶', 'rain'),
          sfx: 'bark',
          effects: { add: { embarrassmentEvents: 1 } },
          say: { who: 'tanaka', en: 'A cat? We have a dog.', ja: 'ねこ？ うちは 犬だよ。' } },
        { say: { who: 'narrator', en: '...', ja: '……' } },
        { say: { who: 'you', en: 'Oops...', ja: 'しまった…' } },
        { when: warm, say: { who: 'haru', en: 'Ha ha... Sorry!', ja: 'あはは…すみません！' } },
        { when: cool, visual: ph('wrongHouse-03', 'Haru covers his face with one hand.', '👦🤦', 'rain'), say: { who: 'narrator', en: 'Haru covers his face.', ja: 'ハルが かおを かくす。' } },
        { say: { who: 'narrator', en: 'Which house is it?', ja: 'どっちの家？' },
          interaction: { type: 'choice', choices: [
            { verb: 'read', icon: '📖', effects: { add: { competenceMoments: 1 } }, beats: [
                { visual: ph('wrongHouse-04', 'Close-up of two gateposts side by side, one for each of the two matching blue houses (both houses are the same blue). Each gatepost has a plain, blank nameplate; the names are shown by the game. Behind the second gatepost, that house\'s front door has a small cat door at the bottom.', '🏷️ TANAKA   |   🏷️ KIMURA 🐾', 'rain'),
                  say: { who: 'you', en: 'Tanaka... and Kimura!', ja: 'たなか…と、きむら！' } },
                { when: (s) => s.knowsKimura, say: { who: 'haru', en: 'Mr. Kimura! Mrs. Sato said!', ja: 'きむらさん！ さとうさんが いってた！' } },
                { when: (s) => !s.knowsKimura, say: { who: 'haru', en: 'Look! A cat door!', ja: 'みて！ ねこの ドア！' } },
              ] },
            { verb: 'look', icon: '👀', beats: [
                { visual: ph('wrongHouse-05', 'The cat wriggles and stares at the NEXT blue house, ears forward. A small cat door is in that house\'s front door.', '🐱👉 💙🏠🐾', 'rain'),
                  say: { who: 'narrator', en: 'Momo looks next door.', ja: 'モモが となりを みている。' } },
                { say: { who: 'haru', en: 'Next door!', ja: 'となりだ！' } },
              ] },
          ] } },
        { visual: ph('wrongHouse-06', 'In front of the first blue house, the player bows politely to the man in pajamas, still holding Momo in both arms. Haru stands beside the player, holding the blue umbrella that belongs to the player over both of them, since the player has both arms full, and bows a little too. The man laughs and waves from his doorway; the big golden dog beside him wags its tail, calm now.', '🧒🙇 👨😄👋 🐕', 'rain'),
          say: { who: 'tanaka', en: 'Ha ha! Good luck!', ja: 'あはは！ がんばってね！' }, goto: 'reunion' },
      ],
    },

    // ── 9. Return the cat (strongest accomplishment) ──────────────────
    reunion: {
      placeJa: 'きむらさんの いえ',
      beats: [
        { visual: ph('reunion-01', 'The second (right-hand) blue house: its wooden front door with the small cat door at the bottom, and its stone gatepost with a blank nameplate (the game shows the name). The player stands on the low step holding Momo in both arms and takes a deep breath before knocking. Haru stands beside the player, holding the blue umbrella that belongs to the player over both of them, since the player has both arms full. Still raining.', '💙🏠 🏷️KIMURA  🧒🐱 👦', 'rain'),
          sfx: 'doorbell',
          say: { who: 'narrator', en: 'Try again!', ja: 'もういちど！' },
          interaction: { type: 'speak', target: 'Hello!', accepted: ['hello', 'hallo', 'hullo', 'hello there', 'hi', 'harrow'], prompt: { en: 'Say: "Hello!"', ja: '「ハロー！」と いおう' } } },
        { visual: ph('reunion-02', 'The door opens. An elderly man with a cane and a worried face. The cat leaps from the player\'s arms into his.', '🚪 👴😟 ← 🐱💨  🧒 👦', 'rain'),
          sfx: 'door',
          effects: { set: { foundMomo: true }, add: { competenceMoments: 1 } },
          say: { who: 'kimura', en: 'Momo!', ja: 'モモ！' } },
        // The rain stops here and starts again at bag-01; both changes are said out loud.
        { visual: ph('reunion-03', 'Outside Mr. Kimura\'s front door. Mr. Kimura hugs Momo, eyes wet; Momo purrs. He bows his head to the two children; the player holds the folded blue umbrella. The rain has just stopped: golden evening light breaks through the clouds and the wet street shines.', '👴🤗🐱💕  🙇 ☀️', 'warm', 'clearing'),
          say: { who: 'narrator', en: 'The rain stops!', ja: '雨が やんだ！' } },
        { say: { who: 'kimura', en: 'Thank you! Thank you!', ja: 'ありがとう！ ありがとう！' } },
        { when: (s) => s.fedCat, say: { who: 'kimura', en: 'She likes you.', ja: 'きみのことが すきなんだね。' } },
        { when: warm, visual: ph('reunion-04', 'Haru grins and raises a hand for a high-five; the player high-fives him, both beaming. The rain has stopped; golden evening light on the wet street.', '🧒🙌👦 ✨', 'warm', 'clearing'),
          say: { who: 'haru', en: 'We did it!', ja: 'やったね！' } },
        { when: cool, visual: ph('reunion-05', 'Haru turns back to the player with a small nod and a small, shy smile: friendly but still reserved. The rain has stopped; golden evening light on the wet street.', '🧒 👦🙂', 'warm', 'clearing'),
          say: { who: 'haru', en: '...Good job.', ja: '…よかったね。' } },
        { visual: ph('reunion-06', 'Mr. Kimura in the foreground, seen from behind over his shoulder, holds up his phone with both hands to take a photo. He is the photographer, not part of the pose. In front of him on the wet street, the player and Haru crouch side by side smiling at the camera, with Momo sitting between them. The rain has stopped; golden evening light.', '👴📸 🧒🐱👦', 'warm', 'clearing'),
          say: { who: 'kimura', en: 'Smile!', ja: 'はい、チーズ！' }, goto: 'bag' },
      ],
    },

    // ── 10. Reciprocity: now the player needs help ────────────────────
    // The three endings split here (see `ending`): how Haru helps, and
    // whether he walks the player home.
    bag: {
      placeJa: 'かえりみち',
      beats: [
        { visual: ph('bag-01', 'Walking home after returning Momo to Mr. Kimura; the children\'s arms are empty now. The golden break in the clouds is closing and light rain starts again. The player reaches back to open the blue umbrella, and the randoseru lid, left unlatched, swings open: books slide out into a puddle. Haru, beside the player, reacts in surprise.', '🌦️ 🎒↯ 📚📚💧 🧒😱 👦', 'rain', 'light-rain'),
          say: { who: 'narrator', en: 'Drip, drip... Rain again!', ja: 'ポツ、ポツ…また 雨！' } },
        { sfx: 'splash',
          effects: { add: { embarrassmentEvents: 1 } },
          say: { who: 'narrator', en: 'Oh no! Your bag is open!', ja: 'あっ！ ランドセルが あいてる！' } },
        { when: endingIs('warm'), visual: ph('bag-02', 'Before the player can move, Haru is already kneeling in the puddle, picking up books.', '👦🧎📚 🧒', 'rain', 'light-rain'),
          say: { who: 'haru', en: 'I got it!', ja: 'まかせて！' } },
        { when: endingIs('quiet'), visual: ph('bag-03', 'One single moment: Haru kneels by the spilled wet books with a quiet, slightly reluctant face and holds one wet book out to the player without quite looking up. The player stands nearby under the blue umbrella. Haru appears only once.', '👦 ... 👦🧎📚', 'rain', 'light-rain'),
          say: { who: 'haru', en: '...Here.', ja: '…はい。' } },
        // Repair: a pause, then Haru chooses to help, and the player thanks him out loud.
        { when: endingIs('repair'), visual: ph('bag-04', 'Haru stops. He looks at the wet books, then at the player. A short pause.', '👦 ... 📚💧 🧒', 'rain', 'light-rain'),
          say: { who: 'narrator', en: 'Haru stops.', ja: 'ハルが とまる。' } },
        { when: endingIs('repair'), visual: ph('bag-05', 'Haru kneels in the puddle beside the player, still a little hesitant, and starts helping pick up wet books. The player kneels too. Only these two children are in the scene.', '👦🧎📚 🧒', 'rain', 'light-rain'),
          say: { who: 'haru', en: "I'll help.", ja: 'てつだうよ。' } },
        { when: endingIs('repair'),
          say: { who: 'narrator', en: 'Haru helps you.', ja: 'ハルが てつだってくれた。' },
          interaction: { type: 'speak', target: 'Thanks!', accepted: ['thanks', 'thank you', 'thank', 'thanks haru', 'sank you', 'tank you', 'sanks', 'tanks'], prompt: { en: 'Say: "Thanks!"', ja: '「サンクス！」と いおう' } } },
        { when: endingIs('repair'), visual: ph('bag-06', 'Player and Haru pick up the last wet books together. Haru almost smiles.', '🧒📚👦🙂', 'rain', 'light-rain'),
          say: { who: 'haru', en: 'No problem.', ja: 'いいよ。' } },
        { when: (s) => ending(s) !== 'repair',
          say: { who: 'narrator', en: 'Haru helps you.', ja: 'ハルが てつだってくれた。' },
          interaction: { type: 'choice', choices: [
            { verb: 'get', icon: '📚', beats: [
                { visual: ph('bag-07', 'Player and Haru pick up the last wet books together.', '🧒📚👦', 'rain', 'light-rain'),
                  say: { who: 'you', en: 'Thanks, Haru.', ja: 'ありがとう、ハル。' } },
              ] },
          ] } },
        // Callback: the younger student returns the favor.
        { when: (s) => s.caughtPapers || s.helpedStudent,
          visual: ph('bag-08', 'Ken runs up with his mother\'s umbrella, holding the player\'s lost notebook. He looks up at the player with admiration.', '🧒🏻☂️📓 → 🧒', 'rain', 'light-rain'),
          say: { who: 'ken', en: 'Your notebook! Here!', ja: 'ノート！ はい！' } },
        { when: (s) => s.caughtPapers || s.helpedStudent,
          say: { who: 'ken', en: "You're so cool!", ja: 'かっこいい！' } },
        { when: (s) => s.ignoredStudent,
          visual: ph('bag-09', 'Ken runs up, holding the player\'s lost notebook. He hesitates, then hands it over.', '🧒🏻📓 → 🧒😳', 'rain', 'light-rain'),
          say: { who: 'ken', en: 'Um... your notebook.', ja: 'あの…ノート。' } },
        // Warm: Haru walks all the way home; they laugh about the wrong house.
        { when: endingIs('warm'), visual: ph('bag-10', 'Player and Haru walk on together under one umbrella, all the way to the player\'s street.', '☂️ 🧒👦 → 🏠', 'rain', 'light-rain'),
          say: { who: 'narrator', en: 'Haru walks you home.', ja: 'ハルが いえまで いっしょに あるく。' } },
        { when: endingIs('warm'), visual: ph('bag-11', 'Near the player\'s house, Haru hunches forward with his hands up like paws and his mouth open in a silly pretend bark, imitating the big dog from the wrong house. The player laughs under the blue umbrella. There is no real dog anywhere; Haru is only pretending.', '👦🐕 "Woof!"  🧒', 'rain', 'light-rain'),
          say: { who: 'haru', en: 'The dog! Woof, woof!', ja: 'あの犬！ ワン、ワン！' } },
        { when: endingIs('warm'),
          say: { who: 'you', en: 'That was embarrassing!', ja: 'はずかしかった！' } },
        { when: endingIs('warm'), visual: ph('bag-12', 'Haru and player laugh under the umbrella near player\'s house.', '☂️ 🧒😆👦😆 🏠', 'rain', 'light-rain'),
          say: { who: 'narrator', en: 'You both laugh.', ja: 'ふたりで わらう。' } },
        { when: endingIs('warm'), visual: ph('bag-13', 'At the player\'s gate, Haru waves, grinning.', '🏠 🧒👋 👦👋 😄', 'rain', 'light-rain'),
          say: { who: 'haru', en: 'See you Monday!', ja: 'また月曜日ね！' }, goto: 'home' },
        // Repair: Haru walks part of the way; a funny memory, then a good one.
        { when: endingIs('repair'), visual: ph('bag-14', 'Player and Haru walk side by side to the corner of the player\'s street.', '🧒 👦 → 🏘️', 'rain', 'light-rain'),
          say: { who: 'narrator', en: 'Haru walks with you.', ja: 'ハルが いっしょに あるく。' } },
        { when: (s) => endingIs('repair')(s) && s.ranFromHaru, visual: ph('bag-15', 'Memory bubble: the player\'s umbrella flipping inside out in the wind.', '💭 🌂↯ 🧒💦', 'rain', 'light-rain'),
          say: { who: 'haru', en: 'Your umbrella! Whoosh!', ja: 'きみの かさ！ ビュー！' } },
        { when: (s) => endingIs('repair')(s) && !s.ranFromHaru, visual: ph('bag-16', 'Memory bubble: a wet worksheet stuck flat on the player\'s face.', '💭 📄😵', 'rain', 'light-rain'),
          say: { who: 'haru', en: 'The paper on your face!', ja: 'かおに プリント！' } },
        { when: endingIs('repair'), say: { who: 'you', en: 'Ha ha... Yes.', ja: 'あはは…うん。' } },
        { when: endingIs('repair'), visual: ph('bag-17', 'Memory bubble: Mr. Kimura hugging Momo, the player and Haru beside him.', '💭 👴🐱💕 🧒👦', 'rain', 'light-rain'),
          say: { who: 'haru', en: 'But Momo! You were great.', ja: 'でも モモ！ すごかったよ。' } },
        { when: endingIs('repair'), visual: ph('bag-18', 'At the corner, Haru waves. It is a real smile now.', '🧒👋 👦😊', 'rain', 'light-rain'),
          say: { who: 'haru', en: 'See you Monday.', ja: 'また月曜日。' }, goto: 'home' },
        // Quiet: Haru goes his own way; the player walks the last street alone.
        { when: endingIs('quiet'), visual: ph('bag-19', 'At a corner, Haru stops and points down another street.', '🧒 ... 👦👉🏘️', 'rain', 'light-rain'),
          say: { who: 'haru', en: 'See you.', ja: 'じゃあね。' } },
        { when: endingIs('quiet'), visual: ph('bag-20', 'Haru goes another way. The player walks the last street alone. The rain is lighter.', '🧒🚶 🌦️ ... 👦🚶', 'rain', 'light-rain'),
          say: { who: 'narrator', en: 'You walk home alone.', ja: 'ひとりで かえる。' }, goto: 'home' },
      ],
    },

    // ── Final: home (WASH / WEAR / DRINK, then "How was your day?") ───
    home: {
      placeJa: 'いえ',
      beats: [
        { when: (s) => s.lateLevel >= 2, visual: ph('home-01', 'Front door. Mom stands with arms crossed, then sees the player soaking wet.', '🚪 👩😠 🧒💦', 'rain', 'light-rain'),
          sfx: 'door',
          say: { who: 'mom', en: 'You are very late!', ja: 'すごく おそいじゃない！' } },
        { when: (s) => s.lateLevel < 2, visual: ph('home-01', 'Front door. Mom stands with arms crossed, then sees the player soaking wet.', '🚪 👩😠 🧒💦', 'rain', 'light-rain'),
          sfx: 'door',
          say: { who: 'mom', en: "You're late!", ja: 'おそかったね！' } },
        { visual: ph('home-02', 'Inside the front entrance (genkan). Mom\'s face softens from worry; she wraps a big soft towel around the player\'s wet head and shoulders. The player is still in the soaked light-green jacket and has just set the randoseru down on the step; the wet blue umbrella stands in an umbrella stand by the door. Through the open door behind, light rain in the evening street.', '👩😮🧺 🧒💦', 'warm', 'indoor-rain'),
          say: { who: 'mom', en: "Oh! You're so wet!", ja: 'あら！ びしょぬれ！' } },
        { say: { who: 'mom', en: 'What first?', ja: 'まず なにする？' },
          interaction: { type: 'choice', all: true, choices: [
            { verb: 'wash', icon: '🧼', beats: [
                { visual: ph('home-03', 'Close-up at a bathroom sink: the player\'s cold hands under warm running water, steam rising, sleeves pushed up past the wrists. Only the hands, forearms and sink are in frame; no jacket, school bag or umbrella.', '🧼🙌♨️', 'warm', 'indoor-rain'), say: { who: 'narrator', en: 'Warm water. Ahh.', ja: 'あったかい おゆ。ふぅ。' } },
              ] },
            { verb: 'wear', icon: '👕', beats: [
                { visual: ph('home-04', 'In the warm living room, the player stands in dry, soft home clothes, hair messy from the towel, smiling and relaxed. The wet light-green jacket hangs on a hook in the background.', '🧒👕✨', 'warm', 'indoor-rain'), say: { who: 'narrator', en: 'Dry clothes. Nice.', ja: 'かわいた ふく。きもちいい。' } },
              ] },
            { verb: 'drink', icon: '☕', beats: [
                { visual: ph('home-05', 'The player sits at the kitchen table wrapped in a big soft beige blanket around the shoulders, holding a mug of hot milk with both hands; steam rises. Light rain on the window behind.', '🧒☕♨️', 'warm', 'indoor-rain'), say: { who: 'mom', en: 'Hot milk. Drink.', ja: 'ホットミルクよ。のんで。' }, sfx: 'mug' },
              ] },
          ] } },
        { when: endingIs('quiet'), visual: ph('home-06', 'The player sits alone at a table by the window with a warm drink, quiet and thoughtful, a little lonely, watching light rain tap the glass.', '🧒☕  🌧️', 'warm', 'indoor-rain'),
          say: { who: 'narrator', en: 'Tap, tap. The rain is quiet.', ja: 'ポツ、ポツ。しずかな 雨。' } },
        { say: { who: 'kimura', en: 'Thank you!', ja: 'ありがとう！', message: true, photo: 'photo-momo' }, sfx: 'phone' },
        { visual: ph('home-07', 'In the warm living room, Mom\'s phone buzzes. She sits holding it, looking at the screen and smiling in surprise. The phone faces Mom, so the viewer sees only its back and a soft glow; nothing on the screen is visible (the message and photo are added by the game). The player sits beside her in dry home clothes, looking on shyly. Only Mom and the player are in the room; no pets, no visitors. Light rain on the window.', '📱 🖼️(🧒🐱👦) "Thank you!"', 'warm', 'indoor-rain'),
          say: { who: 'mom', en: 'A photo? Who is Momo?', ja: '写真？ モモって だれ？' } },
        { when: (s) => s.helpedMrsSato, say: { who: 'mom', en: 'Mrs. Sato called, too!', ja: 'さとうさんからも 電話が あったよ！' } },
        { visual: ph('home-08', 'In the warm living room, Mom smiles and gently rubs the player\'s head; the player, in dry home clothes, smiles up at her. Outside the window, the rain is soft now: a light drizzle on the glass.', '👩🤲🧒  🌦️', 'warm', 'indoor-rain'),
          say: { who: 'mom', en: "I'm proud of you.", ja: 'えらかったね。' } },
        // Reflection: the answer only changes Mom's reply, never the ending.
        { say: { who: 'mom', en: 'How was your day?', ja: 'きょうは どうだった？' },
          interaction: { type: 'choice', choices: [
            { label: 'It was fun.', icon: '😄', labelJa: 'たのしかった。', beats: [
                { say: { who: 'you', en: 'It was fun.', ja: 'たのしかった。' } },
                { say: { who: 'mom', en: "I'm glad.", ja: 'よかった。' } },
              ] },
            { label: "I'm tired.", icon: '😪', labelJa: 'つかれた。', beats: [
                { say: { who: 'you', en: "I'm tired.", ja: 'つかれた。' } },
                { say: { who: 'mom', en: 'Rest now. Good job today.', ja: 'ゆっくり やすんでね。おつかれさま。' } },
              ] },
            { label: 'It was difficult.', icon: '😓', labelJa: 'たいへんだった。', beats: [
                { say: { who: 'you', en: 'It was difficult.', ja: 'たいへんだった。' } },
                { say: { who: 'mom', en: 'But you did it.', ja: 'でも、ちゃんと できたね。' } },
              ] },
          ] } },
        { say: { who: 'narrator', en: 'The rain is soft now.', ja: '雨は もう やさしい。' },
          interaction: { type: 'recap' } },
      ],
    },
  },

  // Ending recap: only lines whose condition is true are shown. No score.
  recap: [
    { when: (s) => s.helpedHaru, en: 'You helped Haru.', ja: 'ハルを たすけた。' },
    { when: (s) => s.caughtPapers, en: 'You caught the paper.', ja: 'プリントを キャッチした。' },
    { when: (s) => s.helpedStudent, en: 'You helped Ken.', ja: 'ケンを てつだった。' },
    { when: (s) => s.helpedMrsSato, en: 'You helped Mrs. Sato.', ja: 'さとうさんを たすけた。' },
    { when: (s) => s.heardCat, en: 'You heard the cat.', ja: 'ねこの こえを きいた。' },
    { when: (s) => s.fedCat, en: 'You fed Momo.', ja: 'モモに えさを あげた。' },
    { when: (s) => s.readTag, en: 'You read the tag.', ja: 'なふだを よんだ。' },
    { when: (s) => s.foundMomo, en: 'You found Momo’s home.', ja: 'モモの いえを 見つけた。' },
  ],
};
