# CLAUDE.md — working notes for Claude Code

This folder is a single React hero component (`HumanFirstHero`) that will be
embedded on another site, likely just below the header. The owner will mostly
ask you to **add or swap images** and tune copy/colors. Keep changes minimal and
inside the seams described below.

## File map
- `HumanFirstHero.jsx` — the component + scoped CSS (in the `CSS` template at the bottom). Logic lives here; avoid editing unless changing behavior.
- `heroContent.js` — **the content file**. Image list (`ART`) and jargon list (`JARGON`). Almost every request should be satisfied by editing this file only.
- `App.example.jsx` — sample mount; safe to delete.
- `preview.html` — standalone, no-build version for eyeballing.

## How to add an image (the common task)
Edit `ART` in `heroContent.js`. Add an object with:
- `src` — preferred. Either an imported local asset or a full https URL.
  - Local: put the file in `src/assets/art/`, `import x from "./assets/art/x.jpg"`, then `src: x`.
  - Remote: `src: "https://…"`.
- `word` — one lowercase word that relates to the image in a human / human-achievement sense (e.g. love, wonder, sweat, persevere, build, rest). This is the soul of the piece — pick it thoughtfully per image, not generically.
- `title` (and optional `artist`) — used for `alt` text. Always provide `title` for accessibility.
- `w`, `h` (optional but encouraged) — the source image's pixel dimensions. They reserve layout space so the masonry doesn't jump while loading.

Alternatively an item may use `uuid` instead of `src` for a National Gallery
Open Access piece (resolves to `https://api.nga.gov/iiif/<uuid>/full/600,/0/default.jpg`).

## Sizing rules — DO NOT BREAK THESE
- Images must **never be cropped**. They render at natural aspect ratio: `.hfh-tile img { width:100%; height:auto }`. Do not add fixed heights or `object-fit:cover` back to tiles.
- Layout is a **two-column masonry**. `ART` is split at its midpoint: first half → left column, second half → right column. To balance column heights, alternate portrait/landscape as you order the array (don't put all tall images in one half).
- The seamless scroll works by duplicating each column's items inside the component (`[...items, ...items]`) and animating `translateY(-50%)`. Because it's percentage-based it self-corrects to any total height — so variable image sizes are fine. Don't hardcode pixel scroll distances.
- The overlay word scales to the tile via container query units (`15cqmin`) and blends in via `mix-blend-mode:overlay` at ~0.7 peak opacity, faded by a rAF loop based on distance from the stream's vertical center. Keep it subtle: the picture should read first, the word second.

## Copy / styling tweaks
- Headline halves: `lead` ("Humans were meant to") and `bridge` ("not") props.
- Brand color: `accent` prop, or `--accent` on `.hfh`.
- Band height (e.g. for a shorter header): `streamHeight` prop, e.g. `"320px"`.
- Jargon list: `JARGON` in `heroContent.js`.
- Scroll speeds: `duration` on the two `<ArtColumn>`s (36s / 46s) and the ticker animation (26s) in the CSS.

## Constraints / gotchas
- React 16.8+ (hooks). No external deps; do not add a CSS framework — styles are scoped under `.hfh` on purpose so this can live on any page.
- Fonts load via `@import` inside the component CSS (Cormorant Garamond, Inter, JetBrains Mono). If the host site has a strict CSP, switch to a `<link>` in the host `<head>` instead.
- Respect `prefers-reduced-motion` (already wired — animations stop).
- Keep font sizes ≥ ~12px; keep `alt` text on every image.
- If embedding inside an existing dark header, you can remove the component's own `background`/`border-radius`/`max-width` on `.hfh` to let it sit flush — confirm with the owner before doing so.

## Verify after changes
Open `preview.html` (or run the app) and check: images load at natural ratios,
columns stay roughly balanced, words fade in only near center, and nothing is
cropped. Test a narrow viewport (<760px) — it should stack.
