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

const ph = (description, stage, tone = 'rain') => ({ type: 'placeholder', description, stage, tone });

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
  },

  // Who can speak. `icon` is a placeholder portrait.
  cast: {
    narrator: { name: '', icon: '' },
    you: { name: 'You', icon: '🧒' },
    haru: { name: 'Haru', icon: '👦' },
    mom: { name: 'Mom', icon: '👩', message: true },
    ken: { name: 'Ken', icon: '🧒🏻' },
    sato: { name: 'Mrs. Sato', icon: '👵' },
    tanaka: { name: 'Man', icon: '👨' },
    kimura: { name: 'Mr. Kimura', icon: '👴' },
    momo: { name: 'Cat', icon: '🐱' },
  },

  scenes: {
    // ── 1. School ends ────────────────────────────────────────────────
    school: {
      placeJa: 'がっこう',
      beats: [
        { visual: ph('Friday afternoon. School gate. Player and classmate Haru walk out with school bags. Dark clouds above.', '🏫 ☁️☁️ 🧒👦', 'cloudy'),
          say: { who: 'narrator', en: 'Friday. School is finished.', ja: '金曜日。学校がおわった。' } },
        { say: { who: 'haru', en: "Let's go home!", ja: 'いっしょに帰ろう！' },
          interaction: { type: 'choice', choices: [
            { verb: 'go', icon: '🚶', beats: [] },
          ] } },
        { visual: ph('Big raindrops start to fall. Player opens an umbrella. Haru looks up, no umbrella.', '🌧️ ☂️🧒 👦💧', 'rain'),
          say: { who: 'narrator', en: 'Drip... drop... Rain!', ja: 'ポツ…ポツ…雨だ！' } },
        { say: { who: 'haru', en: 'Oh no. No umbrella!', ja: 'うわ。かさがない！' }, goto: 'umbrella' },
      ],
    },

    // ── 2. Haru has no umbrella (dilemma: friend vs. Mom) ─────────────
    umbrella: {
      placeJa: 'がっこうの まえ',
      beats: [
        { visual: ph('Heavy rain. Haru holds a school bag over his head, getting soaked. Player stands dry under an umbrella. Player\'s kids-phone shows a message from Mom.', '🌧️🌧️ ☂️🧒  👦💦', 'rain'),
          say: { who: 'narrator', en: 'Haru has no umbrella.', ja: 'ハルはかさをもっていない。' } },
        { say: { who: 'mom', en: 'Come home soon.', ja: 'ママ：はやく帰ってきてね。' } },
        { say: { who: 'narrator', en: 'What do you do?', ja: 'どうする？' },
          interaction: { type: 'choice', choices: [
            { verb: 'help', icon: '☂️', effects: { set: { helpedHaru: true }, add: { haruBond: 2, lateLevel: 1 } },
              beats: [
                { visual: ph('Player and Haru squeeze under one small umbrella. Both have one wet shoulder. They walk slowly, smiling.', '☂️ 🧒👦 💧', 'rain'),
                  say: { who: 'haru', en: 'Thanks! Your shoulder is wet!', ja: 'ありがとう！ きみのかた、ぬれてるよ！' } },
                { say: { who: 'narrator', en: 'One umbrella. Two friends. Slow.', ja: 'ひとつのかさに ふたり。ゆっくり。' } },
              ] },
            { verb: 'run', icon: '🏃', effects: { set: { ranFromHaru: true }, add: { haruBond: -1, embarrassmentEvents: 1 } },
              beats: [
                { say: { who: 'narrator', en: 'Run! Run fast!', ja: 'はしれ！' },
                  interaction: { type: 'gesture', gesture: 'run', prompt: { en: 'Run in place!', ja: 'その場で 足ぶみして はしろう！' } } },
                { visual: ph('Player runs ahead. A gust of wind flips the umbrella inside out. Player is suddenly soaked. Haru, far behind, sees it.', '💨 🌂↯ 🧒💦 ....... 👦', 'storm'),
                  say: { who: 'narrator', en: 'Whoosh! Your umbrella flips!', ja: 'ビュー！ かさが うらがえしに！' } },
                { visual: ph('Haru catches up, dripping wet. He looks at the broken umbrella, then at the player, without smiling.', '🌂↯ 🧒💦 👦💦', 'rain'),
                  say: { who: 'haru', en: '...Hey. Wait for me.', ja: '…ねえ。まってよ。' } },
              ] },
          ] } },
        { say: { who: 'narrator', en: 'You walk together.', ja: 'いっしょに あるく。' }, goto: 'papers' },
      ],
    },

    // ── 3. Flying papers (embodied CATCH) ─────────────────────────────
    papers: {
      placeJa: 'こうえんの ちかく',
      beats: [
        { visual: ph('Strong wind. A small 2nd-grade boy (Ken, yellow hat) drops his folder. White worksheets fly everywhere across the sidewalk.', '💨📄📄 🧒🏻😱 📄💨', 'storm'),
          say: { who: 'narrator', en: 'Whoosh! Strong wind!', ja: 'ビューッ！ つよい風！' } },
        { say: { who: 'ken', en: 'My papers!', ja: 'ぼくのプリント！' },
          interaction: { type: 'choice', choices: [
            { verb: 'catch', icon: '🙌', beats: [
                { say: { who: 'narrator', en: 'Catch the paper!', ja: 'プリントを キャッチ！' },
                  interaction: { type: 'gesture', gesture: 'catch', prompt: { en: 'Reach up and catch!', ja: '手を上にのばして キャッチ！' } } },
                { visual: ph('Player jumps and catches a flying worksheet in mid-air. Ken stares in amazement.', '🙌📄 🧒✨ 🧒🏻😮', 'storm'),
                  effects: { set: { caughtPapers: true }, add: { competenceMoments: 1 } },
                  say: { who: 'ken', en: 'Wow! Thank you!', ja: 'すごい！ ありがとう！' } },
                { say: { who: 'haru', en: 'Nice catch!', ja: 'ナイスキャッチ！' } },
              ] },
            { verb: 'help', icon: '🤝', effects: { set: { helpedStudent: true }, add: { haruBond: 1, lateLevel: 1 } }, beats: [
                { when: warm, visual: ph('Player and Haru kneel on the wet sidewalk, picking up papers together with Ken. Haru jumps in right away.', '📄 🧒👦🧒🏻 📄', 'rain'),
                  say: { who: 'haru', en: 'I got this one!', ja: 'これ、とったよ！' } },
                { when: cool, visual: ph('Player kneels and picks up papers with Ken. Haru watches, then slowly helps too.', '📄 🧒🧒🏻 📄 ... 👦', 'rain'),
                  say: { who: 'narrator', en: 'Haru helps, too.', ja: 'ハルも てつだう。' } },
                { visual: ph('Ken holds his folder tight, bows deeply.', '🧒🏻🙇 📁', 'rain'),
                  say: { who: 'ken', en: 'Thank you!', ja: 'ありがとう！' } },
              ] },
            { verb: 'go', icon: '🚶', effects: { set: { ignoredStudent: true }, add: { embarrassmentEvents: 1 } }, beats: [
                { visual: ph('Player keeps walking. SPLAT — a wet worksheet sticks flat to the player\'s face.', '💨📄😵 🧒', 'storm'),
                  say: { who: 'narrator', en: 'Splat! A paper on your face!', ja: 'ベチャ！ かおに プリント！' } },
                { say: { who: 'haru', en: 'Ha ha! Look at you!', ja: 'あはは！ その顔！' } },
                { visual: ph('Player peels off the paper, red-faced, and hands it back to Ken.', '🧒😳📄 → 🧒🏻', 'rain'),
                  say: { who: 'ken', en: '...Thanks.', ja: '…ありがと。' } },
              ] },
          ] } },
        { visual: ph('One last worksheet blows down the street and disappears around a corner.', '📄💨 → 🏘️↱', 'storm'),
          say: { who: 'haru', en: 'Look! Around the corner!', ja: 'みて！ かどのむこう！' }, goto: 'sato' },
      ],
    },

    // ── 4. Mrs. Sato (respect + later payoff) ─────────────────────────
    sato: {
      placeJa: 'まがりかど',
      beats: [
        { visual: ph('Around the corner: Mrs. Sato, an elderly neighbor with an umbrella and two heavy grocery bags. The worksheet hits her bag. One bag tips. An orange rolls toward the street drain.', '👵☂️🛍️🛍️  🍊→ 🕳️', 'rain'),
          say: { who: 'sato', en: 'Oh! My orange!', ja: 'あら！ みかんが！' } },
        { when: (s) => s.lateLevel >= 1, say: { who: 'mom', en: 'Where are you?', ja: 'ママ：いま どこ？' } },
        { say: { who: 'narrator', en: 'Mrs. Sato has heavy bags.', ja: 'さとうさんの にもつは おもい。' },
          interaction: { type: 'choice', choices: [
            { verb: 'catch', icon: '🍊', effects: { set: { caughtOrange: true, helpedMrsSato: true, hasSnack: true }, add: { competenceMoments: 1 } }, beats: [
                { visual: ph('Player dives and stops the orange with one hand, just before the drain.', '🧒✋🍊 🕳️', 'rain'),
                  say: { who: 'sato', en: 'Good catch! Thank you.', ja: 'ナイスキャッチ！ ありがとう。' } },
                { visual: ph('Mrs. Sato takes a small pack of dried fish snacks (niboshi) from her bag and gives it to the player.', '👵🎁🐟 → 🧒', 'rain'),
                  say: { who: 'sato', en: 'Here. A little snack.', ja: 'はい、おやつ どうぞ。' } },
              ] },
            { verb: 'help', icon: '🛍️', effects: { set: { helpedMrsSato: true, hasSnack: true }, add: { haruBond: 1, lateLevel: 1 } }, beats: [
                { visual: ph('Player carries one grocery bag. Haru holds the umbrella over Mrs. Sato. They walk her to her gate.', '🧒🛍️ 👦☂️👵 🏠', 'rain'),
                  say: { who: 'sato', en: "Thank you. You've grown!", ja: 'ありがとう。大きくなったねえ！' } },
                { visual: ph('At her gate Mrs. Sato gives the player a small pack of dried fish snacks (niboshi).', '👵🎁🐟 → 🧒', 'rain'),
                  say: { who: 'sato', en: 'Here. A little snack.', ja: 'はい、おやつ どうぞ。' } },
              ] },
            { verb: 'go', icon: '🚶', beats: [
                { visual: ph('Player walks on. Haru stops and looks back at Mrs. Sato, who bends slowly to pick up the orange.', '🧒🚶 ... 👦👀 ... 👵🍊', 'rain'),
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
        { visual: ph('Quiet street. A vending machine, a bicycle shelter, and a bush. Rain sound. Player and Haru walking. Something small is hidden.', '🥤  🚲🚲  🌳   🧒👦', 'rain'),
          say: { who: 'momo', en: 'Meow...', ja: '（ニャー…）' } },
        { say: { who: 'haru', en: 'What was that?', ja: 'いまの なに？' },
          interaction: { type: 'choice', choices: [
            { verb: 'listen', icon: '👂', effects: { set: { heardCat: true }, add: { competenceMoments: 1 } }, beats: [
                { visual: ph('Player stops and cups a hand to their ear. Close-up sound: a tiny meow from near the bicycles.', '👂🧒  ...meow... 🚲', 'rain'),
                  say: { who: 'momo', en: 'Meow... meow...', ja: '（ニャー…ニャー…）' } },
                { say: { who: 'haru', en: "You're right! A cat!", ja: 'ほんとだ！ ねこだ！' } },
              ] },
            { verb: 'go', icon: '🚶', beats: [
                { visual: ph('Haru grabs the player\'s sleeve and puts a finger to his lips.', '👦🤫 ✋🧒', 'rain'),
                  say: { who: 'haru', en: 'Wait! Listen!', ja: 'まって！ きいて！' } },
                { say: { who: 'momo', en: 'Meow... meow...', ja: '（ニャー…ニャー…）' } },
              ] },
          ] } },
        { say: { who: 'narrator', en: 'Where is the cat?', ja: 'ねこは どこ？' },
          interaction: { type: 'choice', retry: true, choices: [
            { verb: 'look', object: '🥤', objectJa: 'じはんき', beats: [
                { visual: ph('Behind the vending machine: only an empty can.', '🥤 → 🥫', 'rain'), say: { who: 'narrator', en: 'No cat. Just a can.', ja: 'ねこは いない。かんだけ。' } },
              ] },
            { verb: 'look', object: '🌳', objectJa: 'しげみ', beats: [
                { visual: ph('In the bush: wet leaves, a snail.', '🌳 → 🐌', 'rain'), say: { who: 'narrator', en: 'No cat. A snail!', ja: 'ねこは いない。カタツムリ！' } },
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
        { visual: ph('Under the bicycles: a small wet white cat with gray spots, shivering, eyes wide. It wears a red collar with a tag.', '🚲🚲 🐱💧 (red collar)', 'rain'),
          say: { who: 'narrator', en: 'A cat! It is scared.', ja: 'ねこだ！ こわがっている。' } },
        { say: { who: 'haru', en: 'Say: "Come!"', ja: '「Come!」って いってみて！' },
          interaction: { type: 'speak', target: 'Come!', accepted: ['come', 'calm', 'cum', 'kam', 'come here', 'come on'], prompt: { en: 'Say: "Come!"', ja: '「カム！」と いってみよう' } } },
        { visual: ph('The cat peeks out and takes one small step toward the player. Then it stops.', '🚲 🐱👀 ... 🧒', 'rain'),
          say: { who: 'narrator', en: 'The cat looks at you.', ja: 'ねこが きみを みている。' },
          interaction: { type: 'choice', choices: [
            { verb: 'feed', icon: '🐟',
              goto: (s) => (s.hasSnack ? 'tag' : 'softly'),
              beats: [
                { when: (s) => s.hasSnack, effects: { set: { fedCat: true }, add: { competenceMoments: 1 } },
                  visual: ph('Player opens Mrs. Sato\'s fish snacks. The cat comes out, eats from the player\'s hand, and purrs.', '🧒✋🐟 🐱💕', 'rain'),
                  say: { who: 'narrator', en: "Mrs. Sato's snack! The cat eats.", ja: 'さとうさんの おやつ！ ねこが たべる。' } },
                { when: (s) => s.hasSnack && warm(s), say: { who: 'haru', en: 'It likes you!', ja: 'なついてる！' } },
                { when: (s) => !s.hasSnack, visual: ph('Player searches every pocket. Nothing. Only a pencil and an eraser.', '🧒🤷 ✏️ 🧽', 'rain'),
                  say: { who: 'narrator', en: 'Hmm... You have no food.', ja: 'うーん…たべものが ない。' } },
              ] },
            { verb: 'touch', icon: '✋', goto: 'softly', beats: [
                { visual: ph('Player reaches out fast. The cat hisses and backs deeper under the bicycles.', '✋→ 🐱💢 🚲', 'rain'),
                  say: { who: 'momo', en: 'Hiss!', ja: '（シャーッ！）' } },
                { say: { who: 'haru', en: 'Too fast!', ja: 'はやすぎ！' } },
              ] },
            { verb: 'go', icon: '🚶', goto: 'softly', beats: [
                { when: warm, visual: ph('Player turns to leave. Haru crouches by the bicycles and does not move.', '🧒🚶 ... 👦🐱', 'rain'),
                  say: { who: 'haru', en: 'Wait! It is cold!', ja: 'まって！ さむそうだよ！' } },
                { when: cool, visual: ph('Player turns to leave. Haru stays. He looks at the player with a frown.', '🧒🚶 ... 👦😠 🐱', 'rain'),
                  say: { who: 'haru', en: "Wait. We can't go.", ja: 'まって。ほうっておけないよ。' } },
              ] },
          ] } },
      ],
    },

    // Recovery path for the cat: everyone reaches the tag scene.
    softly: {
      placeJa: 'じてんしゃおきば',
      beats: [
        { visual: ph('Haru kneels low and quiet, and gestures to the player to kneel too.', '👦🧎 🧒🧎  🐱', 'rain'),
          say: { who: 'haru', en: "Shh. Let's be quiet.", ja: 'しーっ。しずかにしよう。' } },
        { say: { who: 'haru', en: 'Say it softly.', ja: 'やさしく いってみて。' },
          interaction: { type: 'speak', target: 'Come...', accepted: ['come', 'calm', 'cum', 'kam', 'come here', 'come on'], prompt: { en: 'Softly: "Come..."', ja: 'やさしく「カム…」' } } },
        { visual: ph('Slowly, slowly, the cat walks out and rubs against the player\'s knee.', '🧒🧎 🐱💕', 'rain'),
          effects: { add: { competenceMoments: 1 } },
          say: { who: 'narrator', en: 'The cat comes to you!', ja: 'ねこが きてくれた！' }, goto: 'tag' },
      ],
    },

    // ── 7. Find the owner (READ, Mrs. Sato payoff, THINK) ─────────────
    tag: {
      placeJa: 'じてんしゃおきば',
      beats: [
        { visual: ph('Close-up: the cat in the player\'s arms. A small round tag on the red collar has writing on it.', '🧒🤗🐱  🏷️', 'rain'),
          say: { who: 'haru', en: 'Look! A tag!', ja: 'みて！ なふだ！' },
          interaction: { type: 'choice', choices: [
            { verb: 'read', icon: '📖', effects: { set: { readTag: true }, add: { competenceMoments: 1 } }, beats: [
                { visual: ph('Close-up of the tag. Large clear letters: "I am MOMO. Blue house."', '🏷️  I am MOMO. 💙🏠 Blue house.', 'rain'),
                  say: { who: 'you', en: 'I am Momo. Blue house.', ja: 'ぼくは モモ。青い家。' } },
                { say: { who: 'haru', en: 'You can read it!', ja: 'よめたね！' } },
              ] },
          ] } },
        // Payoff: Mrs. Sato saw them from her window and comes out.
        { when: (s) => s.helpedMrsSato, effects: { set: { knowsKimura: true } },
          visual: ph('Mrs. Sato walks over with her umbrella. She recognizes the cat immediately and points down the street toward the park.', '👵☂️👉 🐱 🧒👦', 'rain'),
          say: { who: 'sato', en: "Momo! That's Mr. Kimura's cat.", ja: 'モモちゃん！ きむらさんの ねこよ。' } },
        { when: (s) => s.helpedMrsSato,
          say: { who: 'sato', en: 'Blue house, near the park.', ja: '公園の ちかくの 青い家よ。' } },
        { when: (s) => !s.helpedMrsSato,
          say: { who: 'haru', en: 'Blue house... Where?', ja: '青い家…どこ？' },
          interaction: { type: 'choice', choices: [
            { verb: 'think', icon: '🤔', effects: { add: { competenceMoments: 1 } }, beats: [
                { visual: ph('Thought bubble over the player: the street near the park, with blue houses.', '🧒💭 (🌳 💙🏠 💙🏠)', 'rain'),
                  say: { who: 'you', en: 'Near the park! Blue houses!', ja: '公園の ちかく！ 青い家がある！' } },
                { say: { who: 'haru', en: 'Good idea!', ja: 'いいね！' } },
              ] },
            { verb: 'run', icon: '🏃', effects: { add: { lateLevel: 1 } }, beats: [
                { visual: ph('Player and Haru run up and down three streets with the cat. Red house. Yellow house. Out of breath.', '🏃🐱👦 🟥🏠 🟨🏠 💦', 'rain'),
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
        { visual: ph('Street by the park. Two blue houses side by side. The first one has cat stickers in the window. Player marches up confidently, holding the cat.', '🌳  💙🏠(🐱stickers)  💙🏠   🧒🐱👦', 'rain'),
          say: { who: 'haru', en: 'Look! Cat stickers!', ja: 'みて！ ねこの シール！' } },
        { say: { who: 'narrator', en: 'Ding-dong!', ja: 'ピンポーン！' },
          interaction: { type: 'speak', target: 'Hello!', accepted: ['hello', 'hallo', 'hullo', 'hello there', 'hi', 'harrow'], prompt: { en: 'Say: "Hello!"', ja: '「ハロー！」と いおう' } } },
        { visual: ph('The door opens. A man in pajamas with a big dog. The dog barks. The cat\'s fur stands up. PLAYER FREEZES. HARU STARES. The man looks confused.', '🚪 👨🐕  ...  🧒😳🐱💢 👦😶', 'rain'),
          effects: { add: { embarrassmentEvents: 1 } },
          say: { who: 'tanaka', en: 'A cat? We have a dog.', ja: 'ねこ？ うちは 犬だよ。' } },
        { say: { who: 'narrator', en: '...', ja: '……' } },
        { say: { who: 'you', en: 'Oops...', ja: 'しまった…' } },
        { when: warm, say: { who: 'haru', en: 'Ha ha... Sorry!', ja: 'あはは…すみません！' } },
        { when: cool, visual: ph('Haru covers his face with one hand.', '👦🤦', 'rain'), say: { who: 'narrator', en: 'Haru covers his face.', ja: 'ハルが かおを かくす。' } },
        { say: { who: 'narrator', en: 'Which house is it?', ja: 'どっちの家？' },
          interaction: { type: 'choice', choices: [
            { verb: 'read', icon: '📖', effects: { add: { competenceMoments: 1 } }, beats: [
                { visual: ph('Close-up of two nameplates. This house: TANAKA. Next blue house: KIMURA, with a small cat door.', '🪧 TANAKA   |   🪧 KIMURA 🐾', 'rain'),
                  say: { who: 'you', en: 'Tanaka... and Kimura!', ja: 'たなか…と、きむら！' } },
                { when: (s) => s.knowsKimura, say: { who: 'haru', en: 'Mr. Kimura! Mrs. Sato said!', ja: 'きむらさん！ さとうさんが いってた！' } },
                { when: (s) => !s.knowsKimura, say: { who: 'haru', en: 'Look! A cat door!', ja: 'みて！ ねこの ドア！' } },
              ] },
            { verb: 'look', icon: '👀', beats: [
                { visual: ph('The cat wriggles and stares at the NEXT blue house, ears forward. A small cat door is in that house\'s front door.', '🐱👉 💙🏠🐾', 'rain'),
                  say: { who: 'narrator', en: 'Momo looks next door.', ja: 'モモが となりを みている。' } },
                { say: { who: 'haru', en: 'Next door!', ja: 'となりだ！' } },
              ] },
          ] } },
        { visual: ph('Player bows to the man. The man laughs and waves. The dog wags its tail.', '🧒🙇 👨😄👋 🐕', 'rain'),
          say: { who: 'tanaka', en: 'Ha ha! Good luck!', ja: 'あはは！ がんばってね！' }, goto: 'reunion' },
      ],
    },

    // ── 9. Return the cat (strongest accomplishment) ──────────────────
    reunion: {
      placeJa: 'きむらさんの いえ',
      beats: [
        { visual: ph('The second blue house. Nameplate KIMURA. Player stands at the door with the cat, Haru beside. Player takes a breath.', '💙🏠 🪧KIMURA  🧒🐱 👦', 'rain'),
          say: { who: 'narrator', en: 'Try again!', ja: 'もういちど！' },
          interaction: { type: 'speak', target: 'Hello!', accepted: ['hello', 'hallo', 'hullo', 'hello there', 'hi', 'harrow'], prompt: { en: 'Say: "Hello!"', ja: '「ハロー！」と いおう' } } },
        { visual: ph('The door opens. An elderly man with a cane and a worried face. The cat leaps from the player\'s arms into his.', '🚪 👴😟 ← 🐱💨  🧒 👦', 'rain'),
          effects: { set: { foundMomo: true }, add: { competenceMoments: 1 } },
          say: { who: 'kimura', en: 'Momo!', ja: 'モモ！' } },
        { visual: ph('Mr. Kimura hugs Momo, eyes wet. Momo purrs. He bows deeply to the two children.', '👴🤗🐱💕  🙇', 'warm'),
          say: { who: 'kimura', en: 'Thank you! Thank you!', ja: 'ありがとう！ ありがとう！' } },
        { when: (s) => s.fedCat, say: { who: 'kimura', en: 'She likes you.', ja: 'きみのことが すきなんだね。' } },
        { when: warm, visual: ph('Haru grins and raises a hand for a high-five. Player high-fives him.', '🧒🙌👦 ✨', 'warm'),
          say: { who: 'haru', en: 'We did it!', ja: 'やったね！' } },
        { when: cool, visual: ph('Haru gives a small nod and a small smile.', '🧒 👦🙂', 'warm'),
          say: { who: 'haru', en: '...Good job.', ja: '…よかったね。' } },
        { visual: ph('Mr. Kimura holds up his phone and takes a photo of the children with Momo.', '👴📸 🧒🐱👦', 'warm'),
          say: { who: 'kimura', en: 'Smile!', ja: 'はい、チーズ！' }, goto: 'bag' },
      ],
    },

    // ── 10. Reciprocity: now the player needs help ────────────────────
    bag: {
      placeJa: 'かえりみち',
      beats: [
        { visual: ph('Walking home. Rain is lighter. The player\'s school bag (randoseru) lid is open — they forgot to close it while holding the cat. Books slide out into a puddle.', '🌦️ 🎒↯ 📚📚💧 🧒😱 👦', 'rain'),
          effects: { add: { embarrassmentEvents: 1 } },
          say: { who: 'narrator', en: 'Oh no! Your bag is open!', ja: 'あっ！ ランドセルが あいてる！' } },
        { when: warm, visual: ph('Before the player can move, Haru is already kneeling in the puddle, picking up books.', '👦🧎📚 🧒', 'rain'),
          say: { who: 'haru', en: 'I got it!', ja: 'まかせて！' } },
        { when: cool, visual: ph('Haru stands still for a moment, watching. Then he sighs, kneels, and picks up a book.', '👦 ... 👦🧎📚', 'rain'),
          say: { who: 'haru', en: '...Here.', ja: '…はい。' } },
        { say: { who: 'narrator', en: 'Haru helps you.', ja: 'ハルが てつだってくれた。' },
          interaction: { type: 'choice', choices: [
            { verb: 'get', icon: '📚', beats: [
                { visual: ph('Player and Haru pick up the last wet books together.', '🧒📚👦', 'rain'),
                  say: { who: 'you', en: 'Thanks, Haru.', ja: 'ありがとう、ハル。' } },
              ] },
          ] } },
        // Callback: the younger student returns the favor.
        { when: (s) => s.caughtPapers || s.helpedStudent,
          visual: ph('Ken runs up with his mother\'s umbrella, holding the player\'s lost notebook. He looks up at the player with admiration.', '🧒🏻☂️📓 → 🧒', 'rain'),
          say: { who: 'ken', en: 'Your notebook! Here!', ja: 'ノート！ はい！' } },
        { when: (s) => s.caughtPapers || s.helpedStudent,
          say: { who: 'ken', en: "You're so cool!", ja: 'かっこいい！' } },
        { when: (s) => s.ignoredStudent,
          visual: ph('Ken runs up, holding the player\'s lost notebook. He hesitates, then hands it over.', '🧒🏻📓 → 🧒😳', 'rain'),
          say: { who: 'ken', en: 'Um... your notebook.', ja: 'あの…ノート。' } },
        { when: warm, visual: ph('Player and Haru wave goodbye at Haru\'s street corner, both laughing.', '🧒👋 👦👋 😄', 'rain'),
          say: { who: 'haru', en: 'See you Monday!', ja: 'また月曜日ね！' }, goto: 'home' },
        { when: cool, visual: ph('Player and Haru part at the corner. Haru gives a small wave.', '🧒👋 👦🙂', 'rain'),
          say: { who: 'haru', en: 'Bye. See you.', ja: 'じゃあね。' }, goto: 'home' },
      ],
    },

    // ── Final: home (WASH / WEAR / DRINK, quiet ending) ───────────────
    home: {
      placeJa: 'いえ',
      beats: [
        { when: (s) => s.lateLevel >= 2, visual: ph('Front door. Mom stands with arms crossed, then sees the player soaking wet.', '🚪 👩😠 🧒💦', 'rain'),
          say: { who: 'mom', en: 'You are very late!', ja: 'すごく おそいじゃない！' } },
        { when: (s) => s.lateLevel < 2, visual: ph('Front door. Mom stands with arms crossed, then sees the player soaking wet.', '🚪 👩😠 🧒💦', 'rain'),
          say: { who: 'mom', en: "You're late!", ja: 'おそかったね！' } },
        { visual: ph('Mom\'s face softens. She brings a towel.', '👩😮🧺 🧒💦', 'warm'),
          say: { who: 'mom', en: "Oh! You're so wet!", ja: 'あら！ びしょぬれ！' } },
        { say: { who: 'mom', en: 'What first?', ja: 'まず なにする？' },
          interaction: { type: 'choice', all: true, choices: [
            { verb: 'wash', icon: '🧼', beats: [
                { visual: ph('Player washes cold hands in warm water. Steam rises.', '🧼🙌♨️', 'warm'), say: { who: 'narrator', en: 'Warm water. Ahh.', ja: 'あったかい おゆ。ふぅ。' } },
              ] },
            { verb: 'wear', icon: '👕', beats: [
                { visual: ph('Player in dry, soft clothes, hair messy from the towel.', '🧒👕✨', 'warm'), say: { who: 'narrator', en: 'Dry clothes. Nice.', ja: 'かわいた ふく。きもちいい。' } },
              ] },
            { verb: 'drink', icon: '☕', beats: [
                { visual: ph('Player holds a mug of hot milk with both hands.', '🧒☕♨️', 'warm'), say: { who: 'mom', en: 'Hot milk. Drink.', ja: 'ホットミルクよ。のんで。' } },
              ] },
          ] } },
        { visual: ph('Mom\'s phone buzzes. A photo: the player, Haru and Momo with Mr. Kimura. Message: "Thank you! — Kimura"', '📱 🖼️(🧒🐱👦👴) "Thank you!"', 'warm'),
          say: { who: 'mom', en: 'A photo? Who is Momo?', ja: '写真？ モモって だれ？' } },
        { when: (s) => s.helpedMrsSato, say: { who: 'mom', en: 'Mrs. Sato called, too!', ja: 'さとうさんからも 電話が あったよ！' } },
        { visual: ph('Mom smiles and rubs the player\'s head. Outside the window, the rain is soft now.', '👩🤲🧒  🪟🌦️', 'warm'),
          say: { who: 'mom', en: "I'm proud of you.", ja: 'えらかったね。' } },
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
