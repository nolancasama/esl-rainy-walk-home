# Art fixes

Regeneration queue from the 2026-10-03 continuity audit. Use the prompt for each id
in `art/ART_PROMPTS.md` (generated from `src/story.js`; the descriptions there already
carry the corrections). Save over `art/scenes/<id>.webp`, keep the id, then run
`node art/build-manifest.mjs`, and remove any alias in `art/aliases.json` that the
new file makes unnecessary.

Continuity rules the prompts now enforce:

- **Weather:** it rains from `school-02` until the reunion. The rain stops at
  `reunion-03` (narrator: "The rain stops!"), with golden evening light. Light
  rain starts again at `bag-01` ("Drip, drip... Rain again!"). Home windows show
  golden dusk with a light drizzle. Golden light anywhere else is a mistake.
- **Umbrella:** the player's blue umbrella flips inside out in `umbrella-03` but
  is not broken; the player pushes it back in `umbrella-04`. Haru never has
  an umbrella of his own.
- **Wrong house:** two matching blue houses. Nothing on the first house says
  "cat"; the mistake is choosing too fast. Only the second house has a cat door.
- **Carrying Momo:** while the player carries Momo, Haru holds the blue umbrella.
- **Home outfit:** after the towel, the player wears a cream long-sleeve
  sweatshirt, navy lounge pants and socks. No jacket, randoseru or umbrella indoors.
- **No extra animals or children:** Momo is the only cat, and the golden dog only
  appears at the wrong house. Mom's home has no pets.
- **No readable text:** tags, nameplates and phone screens are blank; the game
  shows the words in HTML.

## Still to regenerate

1. `wrongHouse-01` — cat stickers and paw prints on the wrong house; Haru stands
   in its doorway as if he lives there.
2. `wrongHouse-02` — Momo loose on the step instead of in the player's arms; gate
   bars and a dark box clutter the doorway; the dog's anatomy needs to be clean.
3. `bag-01` — Momo is still in the player's arms after she has gone home; must
   also show the light rain starting again. (A golden-hour walking image was
   rejected for this slot: no spilled books and no returning rain.)

For the two wrong-house scenes, match the houses in the new `wrongHouse-04` and
`wrongHouse-06` (pale blue two-storey houses, wooden doors, stone gateposts) and
use them as reference images if the generator allows.

## Optional

4. `tag-04` — cherry blossoms in the June hydrangea season; a stray calico cat.
5. `reunion-05` — a small stray calico cat on a wall.
6. Background calico cats in `bag-06` read as a clue during the cat search.

Minor flaws accepted in the new art: in `home-02` the set-down randoseru is
brown, not navy; in `bag-03` a spare navy bag lies on the ground.

## Done (2026-10-03, second batch)

`photo-momo`, `home-02` to `home-08`, `umbrella-01`, `umbrella-04`, `papers-02`,
`papers-08`, `bag-04`, `wrongHouse-04`, `wrongHouse-06`, `bag-03`, `bag-05`, `bag-11`, and
`art/reference/player-home-outfit.webp`.

## Checked and fine as is

`home-01`, `reunion-01` to `reunion-04`, `reunion-06`, `umbrella-02`, `umbrella-03`,
`bag-15`, `wrongHouse-03`, `wrongHouse-05`, `tag-02`
(blank tag), `tag-03`, `tag-05`, `bag-02`, `bag-06`, `bag-10`, `bag-12`, `bag-13`,
`bag-17`, `bag-20`, `sato-04`, `softly-02`, `come-07`. Momo walking beside the
children in some of these, instead of being carried, is acceptable.
