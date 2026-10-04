# Rainy Walk Home — Art Prompts

Generated from `src/story.js` (79 images). One prompt per placeholder;
each is self-contained, so paste it as-is into the image generator.

- **File name:** save as `art/scenes/<id>.webp` (16:9, about 1600×900).
- **Text in pictures** (nameplates, tag, phone message): generators garble words, so
  prompts ask for blank signs and screens. The game shows the words in HTML.
- **Consistency:** generate the character sheet first and use it as a reference image
  (or "character reference") for every scene if your tool supports it.
- **Regenerate:** run `node art/build-prompts.mjs` after editing `src/story.js` descriptions.

## Character sheet (generate first)

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, no text, no letters, no watermark. Character turnaround sheet on a plain light background, each character standing in a row, full body, front view, labeled by position only: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own; Ken: a small 7-year-old boy, bright-yellow school safety hat, red randoseru, clear plastic folder; Mrs. Sato: a kind elderly woman, short gray curly hair, lavender cardigan, purple umbrella, two cloth grocery bags; Mr. Kimura: a gentle elderly man, white hair, round glasses, brown cardigan, wooden cane; Mr. Tanaka: a friendly man in his 40s, striped pajamas, with a big fluffy golden dog; Mom: a woman in her 40s, dark hair in a low ponytail, beige sweater; Momo: a small white cat with gray spots, red collar with a small round silver tag.
```

## Player home outfit (generate second)

Used in home scenes after the player changes into dry clothes. Same child, same face and hair.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, no text, no letters, no watermark. Character sheet on a plain light background, full body, front view and side view of one child: the player, changed into dry home clothes: the same 11-year-old Japanese child, short black bob hair slightly messy from the towel, soft cream long-sleeve sweatshirt, loose navy lounge pants, socks; no jacket, no randoseru, no umbrella.
```

## Location references (generate before their scenes)

Recurring places are a film set. Generate the empty master plate once, approve it, then pass it as
the reference image for every scene listed. Each scene prompt also restates the layout in words.

### cat-search-area → `art/scenes/listen-01.webp`

Scenes: listen-01, listen-02, listen-04, listen-05, come-01, come-02, come-03, come-04, come-05, come-06, come-07, softly-01, softly-02.

Already exists; use that image as the reference.

### blue-houses → `art/scenes/wrongHouse-04.webp`

Scenes: wrongHouse-01, wrongHouse-02, wrongHouse-04, wrongHouse-05, wrongHouse-06, reunion-01, reunion-02.

Already exists; use that image as the reference.

## Speaker portraits (8)

Small round icons shown next to each line. Same style, head-and-shoulders, plain soft background.

- **portrait-player**: `Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, square 1:1 frame, no text, no letters, no watermark. Head-and-shoulders portrait, friendly expression, plain soft background. the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look).`
- **portrait-haru**: `Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, square 1:1 frame, no text, no letters, no watermark. Head-and-shoulders portrait, friendly expression, plain soft background. Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own.`
- **portrait-ken**: `Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, square 1:1 frame, no text, no letters, no watermark. Head-and-shoulders portrait, friendly expression, plain soft background. Ken: a small 7-year-old boy, bright-yellow school safety hat, red randoseru, clear plastic folder.`
- **portrait-sato**: `Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, square 1:1 frame, no text, no letters, no watermark. Head-and-shoulders portrait, friendly expression, plain soft background. Mrs. Sato: a kind elderly woman, short gray curly hair, lavender cardigan, purple umbrella, two cloth grocery bags.`
- **portrait-kimura**: `Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, square 1:1 frame, no text, no letters, no watermark. Head-and-shoulders portrait, friendly expression, plain soft background. Mr. Kimura: a gentle elderly man, white hair, round glasses, brown cardigan, wooden cane.`
- **portrait-tanaka**: `Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, square 1:1 frame, no text, no letters, no watermark. Head-and-shoulders portrait, friendly expression, plain soft background. Mr. Tanaka: a friendly man in his 40s, striped pajamas, with a big fluffy golden dog.`
- **portrait-mom**: `Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, square 1:1 frame, no text, no letters, no watermark. Head-and-shoulders portrait, friendly expression, plain soft background. Mom: a woman in her 40s, dark hair in a low ponytail, beige sweater.`
- **portrait-momo**: `Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, square 1:1 frame, no text, no letters, no watermark. Head-and-shoulders portrait, friendly expression, plain soft background. Momo: a small white cat with gray spots, red collar with a small round silver tag.`

## school (松原小学校)

### school-01

> Friday afternoon at the school gate of a Japanese elementary school (no readable signs). The player and classmate Haru walk out side by side with their randoseru. Dark clouds gather above, but no rain has fallen yet: the ground is dry. The player's blue umbrella is still closed, hanging from one hand. Haru has no umbrella. No other children nearby.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Friday afternoon at the school gate of a Japanese elementary school (no readable signs). The player and classmate Haru walk out side by side with their randoseru. Dark clouds gather above, but no rain has fallen yet: the ground is dry. The player's blue umbrella is still closed, hanging from one hand. Haru has no umbrella. No other children nearby. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Dry ground, no rain falling yet. Overcast late-afternoon light, dark gray clouds gathering. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### school-02

> Big raindrops start to fall. Player opens an umbrella. Haru looks up, no umbrella.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Big raindrops start to fall. Player opens an umbrella. Haru looks up, no umbrella. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

## umbrella (松原小学校の まえ)

### umbrella-01

> Heavy rain. Haru holds a school bag over his head, getting soaked. Player stands dry under an umbrella. Player glances at a small kids-phone; its screen is blank and flat-colored, and the message is added by the game.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Heavy rain. Haru holds a school bag over his head, getting soaked. Player stands dry under an umbrella. Player glances at a small kids-phone; its screen is blank and flat-colored, and the message is added by the game. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames. Leave signs, tags and screens blank and flat-colored; the game shows any words in HTML.
```

### umbrella-02

> Player and Haru squeeze under one small umbrella. Both have one wet shoulder. They walk slowly, smiling.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Player and Haru squeeze under one small umbrella. Both have one wet shoulder. They walk slowly, smiling. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### umbrella-03

> Player runs ahead. A gust of wind flips the blue umbrella in the player's hand inside out: inverted and bent by the wind, but not torn, snapped or missing pieces. Player is suddenly soaked. Haru, far behind, sees it.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Player runs ahead. A gust of wind flips the blue umbrella in the player's hand inside out: inverted and bent by the wind, but not torn, snapped or missing pieces. Player is suddenly soaked. Haru, far behind, sees it. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Strong wind and heavy rain, dramatic diagonal rain streaks, darker slate palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### umbrella-04

> Haru catches up, dripping wet, his hands empty; he has no umbrella. The soaked player holds their own blue umbrella, still flipped inside out, and is pushing the ribs back into shape; it is bent but not torn and will open again. Haru looks at the inside-out umbrella, then at the player, without smiling.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Haru catches up, dripping wet, his hands empty; he has no umbrella. The soaked player holds their own blue umbrella, still flipped inside out, and is pushing the ribs back into shape; it is bent but not torn and will open again. Haru looks at the inside-out umbrella, then at the player, without smiling. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

## papers (こうえんの ちかく)

### papers-01

> Strong wind. A small 2nd-grade boy (Ken, yellow hat) drops his folder. White worksheets fly everywhere across the sidewalk.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Strong wind. A small 2nd-grade boy (Ken, yellow hat) drops his folder. White worksheets fly everywhere across the sidewalk. Characters: Ken: a small 7-year-old boy, bright-yellow school safety hat, red randoseru, clear plastic folder. Strong wind and heavy rain, dramatic diagonal rain streaks, darker slate palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### papers-02

> Side view, the player facing right, leaping up from the wet sidewalk with the randoseru on their back. The left hand holds the blue umbrella out behind for balance, open and right-side out (it does not flip); the right arm stretches up and the right hand has just caught a flying white worksheet, the sheet pinched between fingers and thumb at the top of the jump. Natural, readable pose: both arms attached correctly, nothing mirrored. On the left, Ken, empty-handed, stares up in amazement; his open clear folder lies at his feet with a few loose sheets on the ground.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Side view, the player facing right, leaping up from the wet sidewalk with the randoseru on their back. The left hand holds the blue umbrella out behind for balance, open and right-side out (it does not flip); the right arm stretches up and the right hand has just caught a flying white worksheet, the sheet pinched between fingers and thumb at the top of the jump. Natural, readable pose: both arms attached correctly, nothing mirrored. On the left, Ken, empty-handed, stares up in amazement; his open clear folder lies at his feet with a few loose sheets on the ground. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Ken: a small 7-year-old boy, bright-yellow school safety hat, red randoseru, clear plastic folder. Strong wind and heavy rain, dramatic diagonal rain streaks, darker slate palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### papers-03

> Player and Haru kneel on the wet sidewalk, picking up papers together with Ken. Haru jumps in right away.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Player and Haru kneel on the wet sidewalk, picking up papers together with Ken. Haru jumps in right away. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own; Ken: a small 7-year-old boy, bright-yellow school safety hat, red randoseru, clear plastic folder. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### papers-04

> Player kneels and picks up papers with Ken. Haru watches, then slowly helps too.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Player kneels and picks up papers with Ken. Haru watches, then slowly helps too. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own; Ken: a small 7-year-old boy, bright-yellow school safety hat, red randoseru, clear plastic folder. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### papers-05

> Ken holds his folder tight, bows deeply.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Ken holds his folder tight, bows deeply. Characters: Ken: a small 7-year-old boy, bright-yellow school safety hat, red randoseru, clear plastic folder. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### papers-06

> Player keeps walking. SPLAT — a wet worksheet sticks flat to the player's face.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Player keeps walking. SPLAT — a wet worksheet sticks flat to the player's face. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look). Strong wind and heavy rain, dramatic diagonal rain streaks, darker slate palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames. Leave signs, tags and screens blank and flat-colored; the game shows any words in HTML.
```

### papers-07

> Player peels off the paper, red-faced, and hands it back to Ken.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Player peels off the paper, red-faced, and hands it back to Ken. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Ken: a small 7-year-old boy, bright-yellow school safety hat, red randoseru, clear plastic folder. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### papers-08

> One last worksheet blows down the street and disappears around a corner.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: One last worksheet blows down the street and disappears around a corner. Strong wind and heavy rain, dramatic diagonal rain streaks, darker slate palette. No people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

## sato (まがりかど)

### sato-01

> Around the corner: Mrs. Sato, an elderly neighbor with an umbrella and two heavy grocery bags. The worksheet hits her bag. One bag tips. An orange rolls toward the street drain.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Around the corner: Mrs. Sato, an elderly neighbor with an umbrella and two heavy grocery bags. The worksheet hits her bag. One bag tips. An orange rolls toward the street drain. Characters: Mrs. Sato: a kind elderly woman, short gray curly hair, lavender cardigan, purple umbrella, two cloth grocery bags. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### sato-02

> Player dives and stops the orange with one hand, just before the drain.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Player dives and stops the orange with one hand, just before the drain. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look). Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### sato-03

> Mrs. Sato takes a small pack of dried fish snacks (niboshi) from her bag and gives it to the player.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Mrs. Sato takes a small pack of dried fish snacks (niboshi) from her bag and gives it to the player. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Mrs. Sato: a kind elderly woman, short gray curly hair, lavender cardigan, purple umbrella, two cloth grocery bags. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### sato-04

> The three walk together along the wet street toward Mrs. Sato's gate. Mrs. Sato, in the middle, holds her own purple umbrella over herself; that umbrella is the only thing in her hands. On one side of her, the player carries one of her cloth grocery bags in one hand and holds the blue umbrella in the other. On her other side, Haru carries her second cloth grocery bag; he has no umbrella and walks close under the edge of her purple umbrella. Exactly two grocery bags and exactly two umbrellas in the picture: the purple one and the blue one.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: The three walk together along the wet street toward Mrs. Sato's gate. Mrs. Sato, in the middle, holds her own purple umbrella over herself; that umbrella is the only thing in her hands. On one side of her, the player carries one of her cloth grocery bags in one hand and holds the blue umbrella in the other. On her other side, Haru carries her second cloth grocery bag; he has no umbrella and walks close under the edge of her purple umbrella. Exactly two grocery bags and exactly two umbrellas in the picture: the purple one and the blue one. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own; Mrs. Sato: a kind elderly woman, short gray curly hair, lavender cardigan, holding only her own purple umbrella; the children carry her two cloth grocery bags. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### sato-05

> At her gate Mrs. Sato gives the player a small pack of dried fish snacks (niboshi).

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: At her gate Mrs. Sato gives the player a small pack of dried fish snacks (niboshi). Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Mrs. Sato: a kind elderly woman, short gray curly hair, lavender cardigan, purple umbrella, two cloth grocery bags. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### sato-06

> Player walks on. Haru stops and looks back at Mrs. Sato, who bends slowly to pick up the orange.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Player walks on. Haru stops and looks back at Mrs. Sato, who bends slowly to pick up the orange. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own; Mrs. Sato: a kind elderly woman, short gray curly hair, lavender cardigan, purple umbrella, two cloth grocery bags. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

## listen (じはんきの まえ)

### listen-01

> Quiet street. Beside the sidewalk: a red drink vending machine, a small roofed bicycle shelter with a few ordinary city bicycles parked in a rack, and a leafy bush. Player and Haru walk past in the rain. Nothing hidden is visible yet: no animals anywhere, not in the bush and not under the bicycles.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Quiet street. Beside the sidewalk: a red drink vending machine, a small roofed bicycle shelter with a few ordinary city bicycles parked in a rack, and a leafy bush. Player and Haru walk past in the rain. Nothing hidden is visible yet: no animals anywhere, not in the bush and not under the bicycles. LOCATION REFERENCE: cat-search-area (`art/scenes/listen-01.webp`). Use the established cat-search-area location reference. Preserve the exact same environment, camera angle, horizon, architecture, object placement and weather context; closer shots show part of the same set. Change only the characters, their poses and the action. Fixed layout: A quiet Japanese residential side street seen from the sidewalk at child eye level, the street receding toward the left-center. Along the right side of the sidewalk, from back to front: a small roofed bicycle shelter (thin dark metal posts, translucent flat roof) with four ordinary city bicycles parked side by side in a rack, front baskets toward the street, against a gray concrete-block wall; then, nearest the viewer at the right edge, a tall red drink vending machine facing the street, with a large rounded blue hydrangea bush in front of it at the far right. On the left side: a low stone wall and two-storey houses with lit windows. Wet gray paving, one round manhole cover mid-sidewalk, utility poles. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### listen-02

> Player stops and cups a hand to their ear. Close-up sound: a tiny meow from near the bicycles.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Player stops and cups a hand to their ear. Close-up sound: a tiny meow from near the bicycles. LOCATION REFERENCE: cat-search-area (`art/scenes/listen-01.webp`). Use the established cat-search-area location reference. Preserve the exact same environment, camera angle, horizon, architecture, object placement and weather context; closer shots show part of the same set. Change only the characters, their poses and the action. Fixed layout: A quiet Japanese residential side street seen from the sidewalk at child eye level, the street receding toward the left-center. Along the right side of the sidewalk, from back to front: a small roofed bicycle shelter (thin dark metal posts, translucent flat roof) with four ordinary city bicycles parked side by side in a rack, front baskets toward the street, against a gray concrete-block wall; then, nearest the viewer at the right edge, a tall red drink vending machine facing the street, with a large rounded blue hydrangea bush in front of it at the far right. On the left side: a low stone wall and two-storey houses with lit windows. Wet gray paving, one round manhole cover mid-sidewalk, utility poles. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look). Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### listen-03

> Haru grabs the player's sleeve and puts a finger to his lips.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Haru grabs the player's sleeve and puts a finger to his lips. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### listen-04

> Behind the vending machine: only an empty can.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Behind the vending machine: only an empty can. LOCATION REFERENCE: cat-search-area (`art/scenes/listen-01.webp`). Use the established cat-search-area location reference. Preserve the exact same environment, camera angle, horizon, architecture, object placement and weather context; closer shots show part of the same set. Change only the characters, their poses and the action. Fixed layout: A quiet Japanese residential side street seen from the sidewalk at child eye level, the street receding toward the left-center. Along the right side of the sidewalk, from back to front: a small roofed bicycle shelter (thin dark metal posts, translucent flat roof) with four ordinary city bicycles parked side by side in a rack, front baskets toward the street, against a gray concrete-block wall; then, nearest the viewer at the right edge, a tall red drink vending machine facing the street, with a large rounded blue hydrangea bush in front of it at the far right. On the left side: a low stone wall and two-storey houses with lit windows. Wet gray paving, one round manhole cover mid-sidewalk, utility poles. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. No people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### listen-05

> In the bush: wet leaves, a snail.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: In the bush: wet leaves, a snail. LOCATION REFERENCE: cat-search-area (`art/scenes/listen-01.webp`). Use the established cat-search-area location reference. Preserve the exact same environment, camera angle, horizon, architecture, object placement and weather context; closer shots show part of the same set. Change only the characters, their poses and the action. Fixed layout: A quiet Japanese residential side street seen from the sidewalk at child eye level, the street receding toward the left-center. Along the right side of the sidewalk, from back to front: a small roofed bicycle shelter (thin dark metal posts, translucent flat roof) with four ordinary city bicycles parked side by side in a rack, front baskets toward the street, against a gray concrete-block wall; then, nearest the viewer at the right edge, a tall red drink vending machine facing the street, with a large rounded blue hydrangea bush in front of it at the far right. On the left side: a low stone wall and two-storey houses with lit windows. Wet gray paving, one round manhole cover mid-sidewalk, utility poles. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. No people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

## come (じてんしゃおきば)

### come-01

> Low, close view inside the small roofed bicycle shelter beside the red vending machine. Several ordinary Japanese city bicycles stand neatly in a rack, each with two round wheels, a simple straight frame, a front basket, a seat, handlebars and pedals; no warped or merged parts. Under those bicycles, low on the dry pavement between the wheels, a small wet white cat with gray spots hides, shivering, eyes wide; it wears a red collar with a small round tag. The cat is clearly under the bicycles: not by a house, a doorway, a porch, or in bushes or plants. Open pavement around it so the hiding place is easy to read. Houses only far in the background.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Low, close view inside the small roofed bicycle shelter beside the red vending machine. Several ordinary Japanese city bicycles stand neatly in a rack, each with two round wheels, a simple straight frame, a front basket, a seat, handlebars and pedals; no warped or merged parts. Under those bicycles, low on the dry pavement between the wheels, a small wet white cat with gray spots hides, shivering, eyes wide; it wears a red collar with a small round tag. The cat is clearly under the bicycles: not by a house, a doorway, a porch, or in bushes or plants. Open pavement around it so the hiding place is easy to read. Houses only far in the background. LOCATION REFERENCE: cat-search-area (`art/scenes/listen-01.webp`). Use the established cat-search-area location reference. Preserve the exact same environment, camera angle, horizon, architecture, object placement and weather context; closer shots show part of the same set. Change only the characters, their poses and the action. Fixed layout: A quiet Japanese residential side street seen from the sidewalk at child eye level, the street receding toward the left-center. Along the right side of the sidewalk, from back to front: a small roofed bicycle shelter (thin dark metal posts, translucent flat roof) with four ordinary city bicycles parked side by side in a rack, front baskets toward the street, against a gray concrete-block wall; then, nearest the viewer at the right edge, a tall red drink vending machine facing the street, with a large rounded blue hydrangea bush in front of it at the far right. On the left side: a low stone wall and two-storey houses with lit windows. Wet gray paving, one round manhole cover mid-sidewalk, utility poles. Characters: Momo: a small white cat with gray spots, red collar with a small round silver tag. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, Momo is the only cat, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames. Leave signs, tags and screens blank and flat-colored; the game shows any words in HTML.
```

### come-02

> At the roofed bicycle shelter beside the red vending machine. The cat peeks out from under the parked bicycles and takes one small, careful step toward the player, then stops, one paw still raised. The player crouches on the sidewalk a short distance away, holding the blue umbrella; Haru watches quietly from just behind the player. The bicycles are ordinary and correctly drawn: two round wheels each, simple frames, baskets. Not by a house, a doorway or a porch.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: At the roofed bicycle shelter beside the red vending machine. The cat peeks out from under the parked bicycles and takes one small, careful step toward the player, then stops, one paw still raised. The player crouches on the sidewalk a short distance away, holding the blue umbrella; Haru watches quietly from just behind the player. The bicycles are ordinary and correctly drawn: two round wheels each, simple frames, baskets. Not by a house, a doorway or a porch. LOCATION REFERENCE: cat-search-area (`art/scenes/listen-01.webp`). Use the established cat-search-area location reference. Preserve the exact same environment, camera angle, horizon, architecture, object placement and weather context; closer shots show part of the same set. Change only the characters, their poses and the action. Fixed layout: A quiet Japanese residential side street seen from the sidewalk at child eye level, the street receding toward the left-center. Along the right side of the sidewalk, from back to front: a small roofed bicycle shelter (thin dark metal posts, translucent flat roof) with four ordinary city bicycles parked side by side in a rack, front baskets toward the street, against a gray concrete-block wall; then, nearest the viewer at the right edge, a tall red drink vending machine facing the street, with a large rounded blue hydrangea bush in front of it at the far right. On the left side: a low stone wall and two-storey houses with lit windows. Wet gray paving, one round manhole cover mid-sidewalk, utility poles. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own; Momo: a small white cat with gray spots, red collar with a small round silver tag. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, Momo is the only cat, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### come-03

> In front of the roofed bicycle shelter beside the red vending machine, the player crouches holding open a small pack of dried fish snacks. The cat has come out from under the parked bicycles and eats from the player's hand, eyes closed, purring. Haru crouches beside the player, smiling. Not by a house, a doorway or a porch.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: In front of the roofed bicycle shelter beside the red vending machine, the player crouches holding open a small pack of dried fish snacks. The cat has come out from under the parked bicycles and eats from the player's hand, eyes closed, purring. Haru crouches beside the player, smiling. Not by a house, a doorway or a porch. LOCATION REFERENCE: cat-search-area (`art/scenes/listen-01.webp`). Use the established cat-search-area location reference. Preserve the exact same environment, camera angle, horizon, architecture, object placement and weather context; closer shots show part of the same set. Change only the characters, their poses and the action. Fixed layout: A quiet Japanese residential side street seen from the sidewalk at child eye level, the street receding toward the left-center. Along the right side of the sidewalk, from back to front: a small roofed bicycle shelter (thin dark metal posts, translucent flat roof) with four ordinary city bicycles parked side by side in a rack, front baskets toward the street, against a gray concrete-block wall; then, nearest the viewer at the right edge, a tall red drink vending machine facing the street, with a large rounded blue hydrangea bush in front of it at the far right. On the left side: a low stone wall and two-storey houses with lit windows. Wet gray paving, one round manhole cover mid-sidewalk, utility poles. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own; Momo: a small white cat with gray spots, red collar with a small round silver tag. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, Momo is the only cat, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### come-04

> In front of the roofed bicycle shelter beside the red vending machine, the player has searched every pocket and finds nothing: only a pencil and an eraser in one open palm, the blue umbrella in the other hand, a small disappointed face. Under the parked bicycles behind, the cat peeks out, watching. Haru crouches nearby.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: In front of the roofed bicycle shelter beside the red vending machine, the player has searched every pocket and finds nothing: only a pencil and an eraser in one open palm, the blue umbrella in the other hand, a small disappointed face. Under the parked bicycles behind, the cat peeks out, watching. Haru crouches nearby. LOCATION REFERENCE: cat-search-area (`art/scenes/listen-01.webp`). Use the established cat-search-area location reference. Preserve the exact same environment, camera angle, horizon, architecture, object placement and weather context; closer shots show part of the same set. Change only the characters, their poses and the action. Fixed layout: A quiet Japanese residential side street seen from the sidewalk at child eye level, the street receding toward the left-center. Along the right side of the sidewalk, from back to front: a small roofed bicycle shelter (thin dark metal posts, translucent flat roof) with four ordinary city bicycles parked side by side in a rack, front baskets toward the street, against a gray concrete-block wall; then, nearest the viewer at the right edge, a tall red drink vending machine facing the street, with a large rounded blue hydrangea bush in front of it at the far right. On the left side: a low stone wall and two-storey houses with lit windows. Wet gray paving, one round manhole cover mid-sidewalk, utility poles. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own; Momo: a small white cat with gray spots, red collar with a small round silver tag. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, Momo is the only cat, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### come-05

> Player reaches out fast. The cat hisses and backs deeper under the bicycles.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Player reaches out fast. The cat hisses and backs deeper under the bicycles. LOCATION REFERENCE: cat-search-area (`art/scenes/listen-01.webp`). Use the established cat-search-area location reference. Preserve the exact same environment, camera angle, horizon, architecture, object placement and weather context; closer shots show part of the same set. Change only the characters, their poses and the action. Fixed layout: A quiet Japanese residential side street seen from the sidewalk at child eye level, the street receding toward the left-center. Along the right side of the sidewalk, from back to front: a small roofed bicycle shelter (thin dark metal posts, translucent flat roof) with four ordinary city bicycles parked side by side in a rack, front baskets toward the street, against a gray concrete-block wall; then, nearest the viewer at the right edge, a tall red drink vending machine facing the street, with a large rounded blue hydrangea bush in front of it at the far right. On the left side: a low stone wall and two-storey houses with lit windows. Wet gray paving, one round manhole cover mid-sidewalk, utility poles. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Momo: a small white cat with gray spots, red collar with a small round silver tag. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, Momo is the only cat, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### come-06

> Player turns to leave. Haru crouches by the bicycles and does not move.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Player turns to leave. Haru crouches by the bicycles and does not move. LOCATION REFERENCE: cat-search-area (`art/scenes/listen-01.webp`). Use the established cat-search-area location reference. Preserve the exact same environment, camera angle, horizon, architecture, object placement and weather context; closer shots show part of the same set. Change only the characters, their poses and the action. Fixed layout: A quiet Japanese residential side street seen from the sidewalk at child eye level, the street receding toward the left-center. Along the right side of the sidewalk, from back to front: a small roofed bicycle shelter (thin dark metal posts, translucent flat roof) with four ordinary city bicycles parked side by side in a rack, front baskets toward the street, against a gray concrete-block wall; then, nearest the viewer at the right edge, a tall red drink vending machine facing the street, with a large rounded blue hydrangea bush in front of it at the far right. On the left side: a low stone wall and two-storey houses with lit windows. Wet gray paving, one round manhole cover mid-sidewalk, utility poles. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### come-07

> Player turns to leave. Haru stays. He looks at the player with a frown.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Player turns to leave. Haru stays. He looks at the player with a frown. LOCATION REFERENCE: cat-search-area (`art/scenes/listen-01.webp`). Use the established cat-search-area location reference. Preserve the exact same environment, camera angle, horizon, architecture, object placement and weather context; closer shots show part of the same set. Change only the characters, their poses and the action. Fixed layout: A quiet Japanese residential side street seen from the sidewalk at child eye level, the street receding toward the left-center. Along the right side of the sidewalk, from back to front: a small roofed bicycle shelter (thin dark metal posts, translucent flat roof) with four ordinary city bicycles parked side by side in a rack, front baskets toward the street, against a gray concrete-block wall; then, nearest the viewer at the right edge, a tall red drink vending machine facing the street, with a large rounded blue hydrangea bush in front of it at the far right. On the left side: a low stone wall and two-storey houses with lit windows. Wet gray paving, one round manhole cover mid-sidewalk, utility poles. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

## softly (じてんしゃおきば)

### softly-01

> Haru kneels low and quiet, and gestures to the player to kneel too.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Haru kneels low and quiet, and gestures to the player to kneel too. LOCATION REFERENCE: cat-search-area (`art/scenes/listen-01.webp`). Use the established cat-search-area location reference. Preserve the exact same environment, camera angle, horizon, architecture, object placement and weather context; closer shots show part of the same set. Change only the characters, their poses and the action. Fixed layout: A quiet Japanese residential side street seen from the sidewalk at child eye level, the street receding toward the left-center. Along the right side of the sidewalk, from back to front: a small roofed bicycle shelter (thin dark metal posts, translucent flat roof) with four ordinary city bicycles parked side by side in a rack, front baskets toward the street, against a gray concrete-block wall; then, nearest the viewer at the right edge, a tall red drink vending machine facing the street, with a large rounded blue hydrangea bush in front of it at the far right. On the left side: a low stone wall and two-storey houses with lit windows. Wet gray paving, one round manhole cover mid-sidewalk, utility poles. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### softly-02

> Slowly, slowly, the cat walks out and rubs against the player's knee.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Slowly, slowly, the cat walks out and rubs against the player's knee. LOCATION REFERENCE: cat-search-area (`art/scenes/listen-01.webp`). Use the established cat-search-area location reference. Preserve the exact same environment, camera angle, horizon, architecture, object placement and weather context; closer shots show part of the same set. Change only the characters, their poses and the action. Fixed layout: A quiet Japanese residential side street seen from the sidewalk at child eye level, the street receding toward the left-center. Along the right side of the sidewalk, from back to front: a small roofed bicycle shelter (thin dark metal posts, translucent flat roof) with four ordinary city bicycles parked side by side in a rack, front baskets toward the street, against a gray concrete-block wall; then, nearest the viewer at the right edge, a tall red drink vending machine facing the street, with a large rounded blue hydrangea bush in front of it at the far right. On the left side: a low stone wall and two-storey houses with lit windows. Wet gray paving, one round manhole cover mid-sidewalk, utility poles. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Momo: a small white cat with gray spots, red collar with a small round silver tag. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, Momo is the only cat, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

## tag (じてんしゃおきば)

### tag-01

> Close-up: the cat in the player's arms. A small round tag on the red collar has writing on it.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Close-up: the cat in the player's arms. A small round tag on the red collar has writing on it. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Momo: a small white cat with gray spots, red collar with a small round silver tag. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, Momo is the only cat, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames. Leave signs, tags and screens blank and flat-colored; the game shows any words in HTML.
```

### tag-02

> Close-up of the small round silver tag on the red collar. The tag face is blank; its words are shown by the game.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Close-up of the small round silver tag on the red collar. The tag face is blank; its words are shown by the game. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. No people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames. Leave signs, tags and screens blank and flat-colored; the game shows any words in HTML.
```

### tag-03

> Mrs. Sato walks over with her umbrella. She recognizes the cat immediately and points down the street toward the park.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Mrs. Sato walks over with her umbrella. She recognizes the cat immediately and points down the street toward the park. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own; Mrs. Sato: a kind elderly woman, short gray curly hair, lavender cardigan, purple umbrella, two cloth grocery bags; Momo: a small white cat with gray spots, red collar with a small round silver tag. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, Momo is the only cat, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### tag-04

> Thought bubble over the player: the rainy street near the park, with two blue houses side by side and hydrangeas in bloom (early-summer rainy season, no cherry blossoms).

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Thought bubble over the player: the rainy street near the park, with two blue houses side by side and hydrangeas in bloom (early-summer rainy season, no cherry blossoms). Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look). Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. Show the memory inside a soft cloud-shaped bubble with a faded, dreamy edge.
```

### tag-05

> Player and Haru run up and down three streets with the cat. Red house. Yellow house. Out of breath.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Player and Haru run up and down three streets with the cat. Red house. Yellow house. Out of breath. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own; Momo: a small white cat with gray spots, red collar with a small round silver tag. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, Momo is the only cat, no dogs.
```

## wrongHouse (こうえんの まえ)

### wrongHouse-01

> Street by the park. Two almost identical blue houses side by side: same shape, same blue walls, same plain closed front doors. Neither house has any cat pictures, stickers, paw prints or decorations. The player, carrying Momo in both arms, hurries confidently toward the gate of the first house without looking closely. Haru walks one step behind on the sidewalk, pointing at the first house with one hand and, with the other, holding the blue umbrella that belongs to the player over both of them, since the player has both arms full.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Street by the park. Two almost identical blue houses side by side: same shape, same blue walls, same plain closed front doors. Neither house has any cat pictures, stickers, paw prints or decorations. The player, carrying Momo in both arms, hurries confidently toward the gate of the first house without looking closely. Haru walks one step behind on the sidewalk, pointing at the first house with one hand and, with the other, holding the blue umbrella that belongs to the player over both of them, since the player has both arms full. LOCATION REFERENCE: blue-houses (`art/scenes/wrongHouse-04.webp`). Use the established blue-houses location reference. Preserve the exact same environment, camera angle, horizon, architecture, object placement and weather context; closer shots show part of the same set. Change only the characters, their poses and the action. Fixed layout: Two matching pale-blue two-storey houses side by side, seen from the street: the LEFT house is Mr. Tanaka's, the RIGHT house is Mr. Kimura's. Both have dark gray tiled roofs, a small porch roof over a wooden front door with a warm wall lamp beside it, and large lit ground-floor windows. In front of each: a low gray block wall with blue hydrangeas, a square stone gatepost with a blank pale nameplate, a short straight stone path to one low entry step. The left house has a black slatted metal gate standing open; the right house's wooden door has a small cat door at the bottom. Nothing else on either house suggests a cat. A wet sidewalk runs along the front of both houses. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own; Momo: a small white cat with gray spots, red collar with a small round silver tag. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, Momo is the only cat, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### wrongHouse-02

> The first blue house. Simple, clean doorway: one plain wooden front door, one low step under a small porch roof; the open gate is behind the viewer and out of frame, and nothing stands in or beside the doorway: no metal bars, grates, railings or boxes. The door has just opened. The man in pajamas stands in the doorway, one hand on the door, looking confused. Beside him on the porch stands exactly one big fluffy golden dog, its whole body visible with four legs on the ground, mouth open in a loud bark; no other paws or limbs anywhere in the picture. A few steps in front of the porch, on the path, the player holds Momo tightly in both arms and freezes in surprise; Momo's fur puffs up, ears flat. Haru stands right beside the player, holding the blue umbrella that belongs to the player over both of them, since the player has both arms full, staring wide-eyed. Clear open space between the dog and the children. Startled but gentle, not scary.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: The first blue house. Simple, clean doorway: one plain wooden front door, one low step under a small porch roof; the open gate is behind the viewer and out of frame, and nothing stands in or beside the doorway: no metal bars, grates, railings or boxes. The door has just opened. The man in pajamas stands in the doorway, one hand on the door, looking confused. Beside him on the porch stands exactly one big fluffy golden dog, its whole body visible with four legs on the ground, mouth open in a loud bark; no other paws or limbs anywhere in the picture. A few steps in front of the porch, on the path, the player holds Momo tightly in both arms and freezes in surprise; Momo's fur puffs up, ears flat. Haru stands right beside the player, holding the blue umbrella that belongs to the player over both of them, since the player has both arms full, staring wide-eyed. Clear open space between the dog and the children. Startled but gentle, not scary. LOCATION REFERENCE: blue-houses (`art/scenes/wrongHouse-04.webp`). Use the established blue-houses location reference. Preserve the exact same environment, camera angle, horizon, architecture, object placement and weather context; closer shots show part of the same set. Change only the characters, their poses and the action. Fixed layout: Two matching pale-blue two-storey houses side by side, seen from the street: the LEFT house is Mr. Tanaka's, the RIGHT house is Mr. Kimura's. Both have dark gray tiled roofs, a small porch roof over a wooden front door with a warm wall lamp beside it, and large lit ground-floor windows. In front of each: a low gray block wall with blue hydrangeas, a square stone gatepost with a blank pale nameplate, a short straight stone path to one low entry step. The left house has a black slatted metal gate standing open; the right house's wooden door has a small cat door at the bottom. Nothing else on either house suggests a cat. A wet sidewalk runs along the front of both houses. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own; Mr. Tanaka: a friendly man in his 40s, striped pajamas, with a big fluffy golden dog; Momo: a small white cat with gray spots, red collar with a small round silver tag. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, Momo is the only cat, the golden dog is the only dog. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### wrongHouse-03

> Haru covers his face with one hand.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Haru covers his face with one hand. Characters: Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### wrongHouse-04

> Close-up of two gateposts side by side, one for each of the two matching blue houses (both houses are the same blue). Each gatepost has a plain, blank nameplate; the names are shown by the game. Behind the second gatepost, that house's front door has a small cat door at the bottom.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Close-up of two gateposts side by side, one for each of the two matching blue houses (both houses are the same blue). Each gatepost has a plain, blank nameplate; the names are shown by the game. Behind the second gatepost, that house's front door has a small cat door at the bottom. LOCATION REFERENCE: blue-houses (`art/scenes/wrongHouse-04.webp`). Use the established blue-houses location reference. Preserve the exact same environment, camera angle, horizon, architecture, object placement and weather context; closer shots show part of the same set. Change only the characters, their poses and the action. Fixed layout: Two matching pale-blue two-storey houses side by side, seen from the street: the LEFT house is Mr. Tanaka's, the RIGHT house is Mr. Kimura's. Both have dark gray tiled roofs, a small porch roof over a wooden front door with a warm wall lamp beside it, and large lit ground-floor windows. In front of each: a low gray block wall with blue hydrangeas, a square stone gatepost with a blank pale nameplate, a short straight stone path to one low entry step. The left house has a black slatted metal gate standing open; the right house's wooden door has a small cat door at the bottom. Nothing else on either house suggests a cat. A wet sidewalk runs along the front of both houses. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. No people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames. Leave signs, tags and screens blank and flat-colored; the game shows any words in HTML.
```

### wrongHouse-05

> The cat wriggles and stares at the NEXT blue house, ears forward. A small cat door is in that house's front door.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: The cat wriggles and stares at the NEXT blue house, ears forward. A small cat door is in that house's front door. LOCATION REFERENCE: blue-houses (`art/scenes/wrongHouse-04.webp`). Use the established blue-houses location reference. Preserve the exact same environment, camera angle, horizon, architecture, object placement and weather context; closer shots show part of the same set. Change only the characters, their poses and the action. Fixed layout: Two matching pale-blue two-storey houses side by side, seen from the street: the LEFT house is Mr. Tanaka's, the RIGHT house is Mr. Kimura's. Both have dark gray tiled roofs, a small porch roof over a wooden front door with a warm wall lamp beside it, and large lit ground-floor windows. In front of each: a low gray block wall with blue hydrangeas, a square stone gatepost with a blank pale nameplate, a short straight stone path to one low entry step. The left house has a black slatted metal gate standing open; the right house's wooden door has a small cat door at the bottom. Nothing else on either house suggests a cat. A wet sidewalk runs along the front of both houses. Characters: Momo: a small white cat with gray spots, red collar with a small round silver tag. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, Momo is the only cat, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames. Leave signs, tags and screens blank and flat-colored; the game shows any words in HTML.
```

### wrongHouse-06

> In front of the first blue house, the player bows politely to the man in pajamas, still holding Momo in both arms. Haru stands beside the player, holding the blue umbrella that belongs to the player over both of them, since the player has both arms full, and bows a little too. The man laughs and waves from his doorway; the big golden dog beside him wags its tail, calm now.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: In front of the first blue house, the player bows politely to the man in pajamas, still holding Momo in both arms. Haru stands beside the player, holding the blue umbrella that belongs to the player over both of them, since the player has both arms full, and bows a little too. The man laughs and waves from his doorway; the big golden dog beside him wags its tail, calm now. LOCATION REFERENCE: blue-houses (`art/scenes/wrongHouse-04.webp`). Use the established blue-houses location reference. Preserve the exact same environment, camera angle, horizon, architecture, object placement and weather context; closer shots show part of the same set. Change only the characters, their poses and the action. Fixed layout: Two matching pale-blue two-storey houses side by side, seen from the street: the LEFT house is Mr. Tanaka's, the RIGHT house is Mr. Kimura's. Both have dark gray tiled roofs, a small porch roof over a wooden front door with a warm wall lamp beside it, and large lit ground-floor windows. In front of each: a low gray block wall with blue hydrangeas, a square stone gatepost with a blank pale nameplate, a short straight stone path to one low entry step. The left house has a black slatted metal gate standing open; the right house's wooden door has a small cat door at the bottom. Nothing else on either house suggests a cat. A wet sidewalk runs along the front of both houses. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own; Mr. Tanaka: a friendly man in his 40s, striped pajamas, with a big fluffy golden dog; Momo: a small white cat with gray spots, red collar with a small round silver tag. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, Momo is the only cat, the golden dog is the only dog. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

## reunion (きむらさんの いえ)

### reunion-01

> The second (right-hand) blue house: its wooden front door with the small cat door at the bottom, and its stone gatepost with a blank nameplate (the game shows the name). The player stands on the low step holding Momo in both arms and takes a deep breath before knocking. Haru stands beside the player, holding the blue umbrella that belongs to the player over both of them, since the player has both arms full. Still raining.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: The second (right-hand) blue house: its wooden front door with the small cat door at the bottom, and its stone gatepost with a blank nameplate (the game shows the name). The player stands on the low step holding Momo in both arms and takes a deep breath before knocking. Haru stands beside the player, holding the blue umbrella that belongs to the player over both of them, since the player has both arms full. Still raining. LOCATION REFERENCE: blue-houses (`art/scenes/wrongHouse-04.webp`). Use the established blue-houses location reference. Preserve the exact same environment, camera angle, horizon, architecture, object placement and weather context; closer shots show part of the same set. Change only the characters, their poses and the action. Fixed layout: Two matching pale-blue two-storey houses side by side, seen from the street: the LEFT house is Mr. Tanaka's, the RIGHT house is Mr. Kimura's. Both have dark gray tiled roofs, a small porch roof over a wooden front door with a warm wall lamp beside it, and large lit ground-floor windows. In front of each: a low gray block wall with blue hydrangeas, a square stone gatepost with a blank pale nameplate, a short straight stone path to one low entry step. The left house has a black slatted metal gate standing open; the right house's wooden door has a small cat door at the bottom. Nothing else on either house suggests a cat. A wet sidewalk runs along the front of both houses. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own; Momo: a small white cat with gray spots, red collar with a small round silver tag. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, Momo is the only cat, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames. Leave signs, tags and screens blank and flat-colored; the game shows any words in HTML.
```

### reunion-02

> The door opens. An elderly man with a cane and a worried face. The cat leaps from the player's arms into his.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: The door opens. An elderly man with a cane and a worried face. The cat leaps from the player's arms into his. LOCATION REFERENCE: blue-houses (`art/scenes/wrongHouse-04.webp`). Use the established blue-houses location reference. Preserve the exact same environment, camera angle, horizon, architecture, object placement and weather context; closer shots show part of the same set. Change only the characters, their poses and the action. Fixed layout: Two matching pale-blue two-storey houses side by side, seen from the street: the LEFT house is Mr. Tanaka's, the RIGHT house is Mr. Kimura's. Both have dark gray tiled roofs, a small porch roof over a wooden front door with a warm wall lamp beside it, and large lit ground-floor windows. In front of each: a low gray block wall with blue hydrangeas, a square stone gatepost with a blank pale nameplate, a short straight stone path to one low entry step. The left house has a black slatted metal gate standing open; the right house's wooden door has a small cat door at the bottom. Nothing else on either house suggests a cat. A wet sidewalk runs along the front of both houses. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own; Mr. Kimura: a gentle elderly man, white hair, round glasses, brown cardigan, wooden cane; Momo: a small white cat with gray spots, red collar with a small round silver tag. Rain, wet reflective pavement, cool blue-gray palette, overcast gray sky. Only the listed characters appear: no extra people, Momo is the only cat, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### reunion-03

> Outside Mr. Kimura's front door. Mr. Kimura hugs Momo, eyes wet; Momo purrs. He bows his head to the two children; the player holds the folded blue umbrella. The rain has just stopped: golden evening light breaks through the clouds and the wet street shines.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Outside Mr. Kimura's front door. Mr. Kimura hugs Momo, eyes wet; Momo purrs. He bows his head to the two children; the player holds the folded blue umbrella. The rain has just stopped: golden evening light breaks through the clouds and the wet street shines. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own; Mr. Kimura: a gentle elderly man, white hair, round glasses, brown cardigan, wooden cane; Momo: a small white cat with gray spots, red collar with a small round silver tag. The rain has just stopped: no rain falling, warm golden evening light breaking through the clouds, wet shining ground and puddles, cozy amber palette. Only the listed characters appear: no extra people, Momo is the only cat, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### reunion-04

> Haru grins and raises a hand for a high-five; the player high-fives him, both beaming. The rain has stopped; golden evening light on the wet street.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Haru grins and raises a hand for a high-five; the player high-fives him, both beaming. The rain has stopped; golden evening light on the wet street. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. The rain has just stopped: no rain falling, warm golden evening light breaking through the clouds, wet shining ground and puddles, cozy amber palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### reunion-05

> Haru turns back to the player with a small nod and a small, shy smile: friendly but still reserved. The rain has stopped; golden evening light on the wet street.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Haru turns back to the player with a small nod and a small, shy smile: friendly but still reserved. The rain has stopped; golden evening light on the wet street. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. The rain has just stopped: no rain falling, warm golden evening light breaking through the clouds, wet shining ground and puddles, cozy amber palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### reunion-06

> Mr. Kimura in the foreground, seen from behind over his shoulder, holds up his phone with both hands to take a photo. He is the photographer, not part of the pose. In front of him on the wet street, the player and Haru crouch side by side smiling at the camera, with Momo sitting between them. The rain has stopped; golden evening light.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Mr. Kimura in the foreground, seen from behind over his shoulder, holds up his phone with both hands to take a photo. He is the photographer, not part of the pose. In front of him on the wet street, the player and Haru crouch side by side smiling at the camera, with Momo sitting between them. The rain has stopped; golden evening light. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own; Mr. Kimura: a gentle elderly man, white hair, round glasses, brown cardigan, wooden cane; Momo: a small white cat with gray spots, red collar with a small round silver tag. The rain has just stopped: no rain falling, warm golden evening light breaking through the clouds, wet shining ground and puddles, cozy amber palette. Only the listed characters appear: no extra people, Momo is the only cat, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames. Leave signs, tags and screens blank and flat-colored; the game shows any words in HTML.
```

## bag (かえりみち)

### bag-01

> Walking home after returning Momo to Mr. Kimura; the children's arms are empty now. The golden break in the clouds is closing and light rain starts again. The player reaches back to open the blue umbrella, and the randoseru lid, left unlatched, swings open: books slide out into a puddle. Haru, beside the player, reacts in surprise.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Walking home after returning Momo to Mr. Kimura; the children's arms are empty now. The golden break in the clouds is closing and light rain starts again. The player reaches back to open the blue umbrella, and the randoseru lid, left unlatched, swings open: books slide out into a puddle. Haru, beside the player, reacts in surprise. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Light rain falling again after a short break, wet reflective pavement, soft blue-gray evening palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### bag-02

> Before the player can move, Haru is already kneeling in the puddle, picking up books.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Before the player can move, Haru is already kneeling in the puddle, picking up books. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Light rain falling again after a short break, wet reflective pavement, soft blue-gray evening palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### bag-03

> One single moment: Haru kneels by the spilled wet books with a quiet, slightly reluctant face and holds one wet book out to the player without quite looking up. The player stands nearby under the blue umbrella. Haru appears only once.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: One single moment: Haru kneels by the spilled wet books with a quiet, slightly reluctant face and holds one wet book out to the player without quite looking up. The player stands nearby under the blue umbrella. Haru appears only once. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Light rain falling again after a short break, wet reflective pavement, soft blue-gray evening palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### bag-04

> Haru stops. He looks at the wet books, then at the player. A short pause.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Haru stops. He looks at the wet books, then at the player. A short pause. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Light rain falling again after a short break, wet reflective pavement, soft blue-gray evening palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### bag-05

> Haru kneels in the puddle beside the player, still a little hesitant, and starts helping pick up wet books. The player kneels too. Only these two children are in the scene.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Haru kneels in the puddle beside the player, still a little hesitant, and starts helping pick up wet books. The player kneels too. Only these two children are in the scene. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Light rain falling again after a short break, wet reflective pavement, soft blue-gray evening palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### bag-06

> Player and Haru pick up the last wet books together. Haru almost smiles.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Player and Haru pick up the last wet books together. Haru almost smiles. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Light rain falling again after a short break, wet reflective pavement, soft blue-gray evening palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### bag-07

> Player and Haru pick up the last wet books together.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Player and Haru pick up the last wet books together. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Light rain falling again after a short break, wet reflective pavement, soft blue-gray evening palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### bag-08

> Ken runs up with his mother's umbrella, holding the player's lost notebook. He looks up at the player with admiration.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Ken runs up with his mother's umbrella, holding the player's lost notebook. He looks up at the player with admiration. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Ken: a small 7-year-old boy, bright-yellow school safety hat, red randoseru, clear plastic folder. Light rain falling again after a short break, wet reflective pavement, soft blue-gray evening palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### bag-09

> Ken runs up, holding the player's lost notebook. He hesitates, then hands it over.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Ken runs up, holding the player's lost notebook. He hesitates, then hands it over. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Ken: a small 7-year-old boy, bright-yellow school safety hat, red randoseru, clear plastic folder. Light rain falling again after a short break, wet reflective pavement, soft blue-gray evening palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### bag-10

> Player and Haru walk on together under one umbrella, all the way to the player's street.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Player and Haru walk on together under one umbrella, all the way to the player's street. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Light rain falling again after a short break, wet reflective pavement, soft blue-gray evening palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### bag-11

> Near the player's house, Haru hunches forward with his hands up like paws and his mouth open in a silly pretend bark, imitating the big dog from the wrong house. The player laughs under the blue umbrella. There is no real dog anywhere; Haru is only pretending.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Near the player's house, Haru hunches forward with his hands up like paws and his mouth open in a silly pretend bark, imitating the big dog from the wrong house. The player laughs under the blue umbrella. There is no real dog anywhere; Haru is only pretending. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Light rain falling again after a short break, wet reflective pavement, soft blue-gray evening palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### bag-12

> Haru and player laugh under the umbrella near player's house.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Haru and player laugh under the umbrella near player's house. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Light rain falling again after a short break, wet reflective pavement, soft blue-gray evening palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### bag-13

> At the player's gate, Haru waves, grinning.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: At the player's gate, Haru waves, grinning. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Light rain falling again after a short break, wet reflective pavement, soft blue-gray evening palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### bag-14

> Player and Haru walk side by side to the corner of the player's street.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Player and Haru walk side by side to the corner of the player's street. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Light rain falling again after a short break, wet reflective pavement, soft blue-gray evening palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### bag-15

> Memory bubble: the player's umbrella flipping inside out in the wind.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Memory bubble: the player's umbrella flipping inside out in the wind. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look). Light rain falling again after a short break, wet reflective pavement, soft blue-gray evening palette. Only the listed characters appear: no extra people, no cats, no dogs. Show the memory inside a soft cloud-shaped bubble with a faded, dreamy edge.
```

### bag-16

> Memory bubble: a wet worksheet stuck flat on the player's face.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Memory bubble: a wet worksheet stuck flat on the player's face. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look). Light rain falling again after a short break, wet reflective pavement, soft blue-gray evening palette. Only the listed characters appear: no extra people, no cats, no dogs. Show the memory inside a soft cloud-shaped bubble with a faded, dreamy edge.
```

### bag-17

> Memory bubble: Mr. Kimura hugging Momo, the player and Haru beside him.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Memory bubble: Mr. Kimura hugging Momo, the player and Haru beside him. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own; Mr. Kimura: a gentle elderly man, white hair, round glasses, brown cardigan, wooden cane; Momo: a small white cat with gray spots, red collar with a small round silver tag. Light rain falling again after a short break, wet reflective pavement, soft blue-gray evening palette. Only the listed characters appear: no extra people, Momo is the only cat, no dogs. Show the memory inside a soft cloud-shaped bubble with a faded, dreamy edge.
```

### bag-18

> At the corner, Haru waves. It is a real smile now.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: At the corner, Haru waves. It is a real smile now. Characters: Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Light rain falling again after a short break, wet reflective pavement, soft blue-gray evening palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### bag-19

> At a corner, Haru stops and points down another street.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: At a corner, Haru stops and points down another street. Characters: Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Light rain falling again after a short break, wet reflective pavement, soft blue-gray evening palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### bag-20

> Haru goes another way. The player walks the last street alone. The rain is lighter.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Haru goes another way. The player walks the last street alone. The rain is lighter. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own. Light rain falling again after a short break, wet reflective pavement, soft blue-gray evening palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

## home (いえ)

### home-01 — used 2×

> Front door. Mom stands with arms crossed, then sees the player soaking wet.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Front door. Mom stands with arms crossed, then sees the player soaking wet. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Mom: a woman in her 40s, dark hair in a low ponytail, beige sweater. Light rain falling again after a short break, wet reflective pavement, soft blue-gray evening palette. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### home-02

> Inside the front entrance (genkan). Mom's face softens from worry; she wraps a big soft towel around the player's wet head and shoulders. The player is still in the soaked light-green jacket and has just set the randoseru down on the step; the wet blue umbrella stands in an umbrella stand by the door. Through the open door behind, light rain in the evening street.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Inside the front entrance (genkan). Mom's face softens from worry; she wraps a big soft towel around the player's wet head and shoulders. The player is still in the soaked light-green jacket and has just set the randoseru down on the step; the wet blue umbrella stands in an umbrella stand by the door. Through the open door behind, light rain in the evening street. Characters: the player, just home: the same 11-year-old Japanese child, short black bob hair (wet), soaked light-green zip jacket; randoseru and umbrella already put down, not worn or held; Mom: a woman in her 40s, dark hair in a low ponytail, beige sweater. Indoors: warm lamplight, cozy amber palette; through the windows, golden dusk with a light drizzle on the glass. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### home-03

> Close-up at a bathroom sink: the player's cold hands under warm running water, steam rising, sleeves pushed up past the wrists. Only the hands, forearms and sink are in frame; no jacket, school bag or umbrella.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: Close-up at a bathroom sink: the player's cold hands under warm running water, steam rising, sleeves pushed up past the wrists. Only the hands, forearms and sink are in frame; no jacket, school bag or umbrella. Characters: the player, changed into dry home clothes: the same 11-year-old Japanese child, short black bob hair slightly messy from the towel, soft cream long-sleeve sweatshirt, loose navy lounge pants, socks; no jacket, no randoseru, no umbrella. Indoors: warm lamplight, cozy amber palette; through the windows, golden dusk with a light drizzle on the glass. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### home-04

> In the warm living room, the player stands in dry, soft home clothes, hair messy from the towel, smiling and relaxed. The wet light-green jacket hangs on a hook in the background.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: In the warm living room, the player stands in dry, soft home clothes, hair messy from the towel, smiling and relaxed. The wet light-green jacket hangs on a hook in the background. Characters: the player, changed into dry home clothes: the same 11-year-old Japanese child, short black bob hair slightly messy from the towel, soft cream long-sleeve sweatshirt, loose navy lounge pants, socks; no jacket, no randoseru, no umbrella. Indoors: warm lamplight, cozy amber palette; through the windows, golden dusk with a light drizzle on the glass. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### home-05

> The player sits at the kitchen table wrapped in a big soft beige blanket around the shoulders, holding a mug of hot milk with both hands; steam rises. Light rain on the window behind.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: The player sits at the kitchen table wrapped in a big soft beige blanket around the shoulders, holding a mug of hot milk with both hands; steam rises. Light rain on the window behind. Characters: the player, changed into dry home clothes: the same 11-year-old Japanese child, short black bob hair slightly messy from the towel, soft cream long-sleeve sweatshirt, loose navy lounge pants, socks; no jacket, no randoseru, no umbrella. Indoors: warm lamplight, cozy amber palette; through the windows, golden dusk with a light drizzle on the glass. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### home-06

> The player sits alone at a table by the window with a warm drink, quiet and thoughtful, a little lonely, watching light rain tap the glass.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: The player sits alone at a table by the window with a warm drink, quiet and thoughtful, a little lonely, watching light rain tap the glass. Characters: the player, changed into dry home clothes: the same 11-year-old Japanese child, short black bob hair slightly messy from the towel, soft cream long-sleeve sweatshirt, loose navy lounge pants, socks; no jacket, no randoseru, no umbrella. Indoors: warm lamplight, cozy amber palette; through the windows, golden dusk with a light drizzle on the glass. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

### home-07

> In the warm living room, Mom's phone buzzes. She sits holding it, looking at the screen and smiling in surprise. The phone faces Mom, so the viewer sees only its back and a soft glow; nothing on the screen is visible (the message and photo are added by the game). The player sits beside her in dry home clothes, looking on shyly. Only Mom and the player are in the room; no pets, no visitors. Light rain on the window.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: In the warm living room, Mom's phone buzzes. She sits holding it, looking at the screen and smiling in surprise. The phone faces Mom, so the viewer sees only its back and a soft glow; nothing on the screen is visible (the message and photo are added by the game). The player sits beside her in dry home clothes, looking on shyly. Only Mom and the player are in the room; no pets, no visitors. Light rain on the window. Characters: the player, changed into dry home clothes: the same 11-year-old Japanese child, short black bob hair slightly messy from the towel, soft cream long-sleeve sweatshirt, loose navy lounge pants, socks; no jacket, no randoseru, no umbrella; Mom: a woman in her 40s, dark hair in a low ponytail, beige sweater. Indoors: warm lamplight, cozy amber palette; through the windows, golden dusk with a light drizzle on the glass. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames. Leave signs, tags and screens blank and flat-colored; the game shows any words in HTML.
```

### home-08

> In the warm living room, Mom smiles and gently rubs the player's head; the player, in dry home clothes, smiles up at her. Outside the window, the rain is soft now: a light drizzle on the glass.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: In the warm living room, Mom smiles and gently rubs the player's head; the player, in dry home clothes, smiles up at her. Outside the window, the rain is soft now: a light drizzle on the glass. Characters: the player, changed into dry home clothes: the same 11-year-old Japanese child, short black bob hair slightly messy from the towel, soft cream long-sleeve sweatshirt, loose navy lounge pants, socks; no jacket, no randoseru, no umbrella; Mom: a woman in her 40s, dark hair in a low ponytail, beige sweater. Indoors: warm lamplight, cozy amber palette; through the windows, golden dusk with a light drizzle on the glass. Only the listed characters appear: no extra people, no cats, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames.
```

## Dedicated assets

Shown inside HTML message cards (`say.photo`), not as scene art. Save as `art/scenes/<id>.webp`.

### photo-momo

> The photo Mr. Kimura took, as a full-frame snapshot (no phone, no frame, no interface): the player and Haru crouch side by side on the wet street outside a house, smiling at the camera, with Momo sitting between them looking at the camera too. Haru makes a small peace sign. The rain has just stopped: golden evening light, wet shining ground. Mr. Kimura is not in the photo; he is the one taking it. Keep all three faces in the central horizontal band of the frame so a wide crop keeps them.

```
Warm children's picture-book illustration, soft watercolor and gouache texture, clean readable shapes, quiet Japanese residential town, gentle expressions, 16:9 wide frame, no text, no letters, no watermark. Scene: The photo Mr. Kimura took, as a full-frame snapshot (no phone, no frame, no interface): the player and Haru crouch side by side on the wet street outside a house, smiling at the camera, with Momo sitting between them looking at the camera too. Haru makes a small peace sign. The rain has just stopped: golden evening light, wet shining ground. Mr. Kimura is not in the photo; he is the one taking it. Keep all three faces in the central horizontal band of the frame so a wide crop keeps them. Characters: the player: an 11-year-old Japanese child, short black bob hair, light-green zip jacket, dark-blue randoseru school backpack, blue umbrella (gender-neutral look); Haru: an 11-year-old Japanese boy, messy dark-brown hair, orange hoodie, black randoseru, no umbrella of his own; Momo: a small white cat with gray spots, red collar with a small round silver tag. The rain has just stopped: no rain falling, warm golden evening light breaking through the clouds, wet shining ground and puddles, cozy amber palette. Only the listed characters appear: no extra people, Momo is the only cat, no dogs. One single moment in one continuous scene: each character appears only once; no comic panels or split frames. Leave signs, tags and screens blank and flat-colored; the game shows any words in HTML.
```
