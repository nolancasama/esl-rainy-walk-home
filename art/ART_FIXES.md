# Art fixes

Regeneration queue from the 2026-10-03 continuity audit, re-audited image by image
on 2026-10-04. Use the prompt for each id in `art/ART_PROMPTS.md` (generated from
`src/story.js`; the descriptions there already carry the corrections). Save over
`art/scenes/<id>.webp`, keep the id, then run `node art/build-manifest.mjs`, and
remove any alias in `art/aliases.json` that the new file makes unnecessary.

Continuity rules the prompts now enforce:

- **Weather** (`visual.weather`, separate from the emotional `tone`): dry and
  cloudy at `school-01`; rain from `school-02` until the reunion. The rain stops
  at `reunion-03` (narrator: "The rain stops!"), with golden evening light. Light
  rain starts again at `bag-01` ("Drip, drip... Rain again!"). Home windows show
  golden dusk with a light drizzle. Golden light anywhere else is a mistake.
- **Umbrella:** the player's blue umbrella flips inside out in `umbrella-03` but
  is not broken; the player pushes it back in `umbrella-04`. Haru never has
  an umbrella of his own. Mrs. Sato keeps her own purple umbrella; nobody else
  holds it.
- **Wrong house:** two matching blue houses. Nothing on the first house says
  "cat"; the mistake is choosing too fast. Only the second house has a cat door.
- **Carrying Momo:** while the player carries Momo, Haru holds the blue umbrella.
- **Home outfit:** after the towel, the player wears a cream long-sleeve
  sweatshirt, navy lounge pants and socks. No jacket, randoseru or umbrella indoors.
- **No extra animals or children:** Momo is the only cat, and the golden dog only
  appears at the wrong house. Mom's home has no pets.
- **No readable text:** tags, nameplates and phone screens are blank; the game
  shows the words in HTML.

## Location references (film sets)

Generate or approve the master plate first and pass it as the reference image for
every listed scene. Each scene prompt also restates the layout in words.

- **cat-search-area** → `art/reference/loc-cat-search.webp` (NEW, empty plate;
  prompt in `ART_PROMPTS.md`). Hydrangea bush front right, red vending machine
  behind it, roofed bicycle shelter behind and right of that, street receding
  left. Shared by `listen-01`–`listen-05` (not `-03`), `come-01`–`come-07`,
  `softly-01`, `softly-02`. Existing `listen-02`, `listen-04`, `listen-05`,
  `come-05`, `come-06` are close enough to keep. `come-07`, `softly-01` and
  `softly-02` show no landmarks; they're acceptable as tight shots.
- **blue-houses** → `art/scenes/wrongHouse-04.webp` (exists, no people). Left
  house = Tanaka (black gate), right house = Kimura (cat door). Shared by
  `wrongHouse-01/02/04/05/06`, `reunion-01`, `reunion-02`. `wrongHouse-05`,
  `wrongHouse-06` and `reunion-02` already match.

## Still to regenerate

1. `loc-cat-search` (reference plate, generate first and approve).
2. `listen-01`: a cat still peeks out of the bush before the search starts.
   Becomes the wide establishing shot of the cat-search set.
3. `come-01`: warped, oversized bicycle wheels; make the hiding place clear.
4. `come-02`: the cat is on a house doorstep, not at the bicycle shelter.
5. `come-03`: the cat eats by a house gate; Haru is missing.
6. `come-04`: a calico cat sits on a gatepost mid-search; not at the shelter.
7. `wrongHouse-01`: cat stickers and paw prints on the wrong house; Haru stands
   in its doorway as if he lives there.
8. `wrongHouse-02`: Momo loose on the step instead of in the player's arms; a
   gate and dark box clutter the doorway; the dog is on a leash.
9. `reunion-01`: Kimura's door has no cat door and a different design from the
   blue-houses set; Momo sits on the ground.
10. `sato-04`: Haru holds Mrs. Sato's purple umbrella with no handoff; three
    grocery bags instead of two.
11. `bag-01`: Momo is still in the player's arms after she has gone home; must
    also show the light rain starting again.
12. `school-01` (also the title art): the umbrella is open before the rain
    starts, the ground is wet, cherry blossoms in June, extra children.

## Optional

- `tag-04`: cherry blossoms in the thought bubble; a stray calico on a wall.
- `reunion-05`: a small stray calico on a wall (after Momo is home, so harmless).
- `papers-04`: a small calico on a wall, top right.
- `bag-06`: background calico cats.

## Fixed without new art (2026-10-04)

- `sato-03` showed a white-and-gray cat on a wall before the search, which looks
  like Momo. It now reuses `sato-05` (same gift of fish snacks) via
  `art/aliases.json`; the old file is in `art/unused/old-sato-03.webp`.

## Checked and fine as is

`papers-02` (the redone catch reads clearly: one hand pinches the sheet at the
top of the leap, the umbrella is held out behind for balance), `reunion-06`
(the small viewfinder matches `photo-momo`: player, Haru, Momo, blue umbrella),
`photo-momo` (no Mr. Kimura in it), `home-07` (no cat in the room; the phone
faces Mom), `home-02` to `home-08` (home outfit), `umbrella-03`, `umbrella-04`,
`sato-01`, `sato-02`, `sato-05`, `sato-06`, `home-01`, `reunion-02` to
`reunion-04`, `bag-02` to `bag-20` (except the optional ones above),
`wrongHouse-03` to `wrongHouse-06`, `tag-01` to `tag-03`, `tag-05`.

Minor flaws accepted: in `home-02` the set-down randoseru is brown, not navy; in
`bag-03` a spare navy bag lies on the ground; `reunion-03` shows a lattice door
rather than the blue-houses door (close shot, golden light).
