# Human-first AI — hero component

A homepage hero that contrasts what humans are *meant* to do (a flowing wall of
real artwork) against what they shouldn't have to (a cold, scrolling column of
business jargon), under the line **"Humans were meant to … not …"**

A single human word (love, wonder, sweat, …) blends into each artwork and surfaces
as the image passes the center of the stream.

![preview](./preview.png)

## What's in here

| File | Purpose |
|------|---------|
| `HumanFirstHero.jsx` | The component. You rarely edit this. |
| `heroContent.js` | **Edit this** to add your images and change the jargon list. |
| `App.example.jsx` | A tiny usage example. Delete after wiring it in. |
| `preview.html` | Open in a browser to see it run with no build step. |
| `CLAUDE.md` | Instructions for Claude Code when adding images. |

## Quick start

Requires React 16.8+ (uses hooks). No other dependencies — fonts and styles are
self-contained in the component.

```jsx
import HumanFirstHero from "./HumanFirstHero";

<HumanFirstHero onCtaClick={() => navigate("/solutions")} />
```

## Adding your own images

Edit `heroContent.js`. Each item takes either a `src` (URL or imported local
image) or an NGA `uuid`, plus a `word`:

```js
import sunrise from "./assets/art/sunrise.jpg";

export const ART = [
  { src: sunrise, word: "wonder", title: "Sunrise over the bay" },
  { src: "https://example.com/painting.jpg", word: "love", title: "Portrait" },
  // ...
];
```

**Images are never cropped.** Each renders at its natural aspect ratio
(portrait / landscape / square) and the tiles flow as a two-column masonry. The
list is split down the middle — first half → left column, second half → right
column — so alternate orientations as you order it for a balanced look. Adding
optional `w` / `h` (the source pixel dimensions) prevents layout shift while
images load.

## Customizing

| Prop | Default | Notes |
|------|---------|-------|
| `accent` | `#f5b14c` | Brand color (eyebrow dot, emphasis, CTA). |
| `streamHeight` | `480px` | Height of the art/jargon band. Use `"320px"` etc. for a shorter header band. |
| `lead` / `bridge` | "Humans were meant to" / "not" | The headline halves. |
| `tagline` | … | Accepts a string or JSX. |
| `ctaLabel` / `onCtaClick` | … | The button. |
| `art` / `jargon` | from `heroContent.js` | Override inline if you prefer. |

You can also override colors/sizing by targeting the CSS variables on `.hfh`
(`--bg`, `--stream-h`, `--tile-gap`, etc.).

## Using it as / near a header

It's a full-width section, taller than a typical nav bar. For a compact header
band, set a shorter `streamHeight` (e.g. `"300px"`) and place it directly under
your nav. It respects `prefers-reduced-motion` (animation stops). On screens
under 760px it stacks the art above a shortened jargon strip.

## Licensing note

The default images are National Gallery of Art **Open Access (CC0)** works — free
for any use. Anything you add is your responsibility to clear; make sure you have
rights to the images you drop into `heroContent.js`.
