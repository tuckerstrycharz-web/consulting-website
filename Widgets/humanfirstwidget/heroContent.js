// =============================================================================
// heroContent.js  —  EDIT THIS FILE to add your own images.
// This is the only file you need to touch to swap in artwork.
// =============================================================================
//
// Each ART item:
//   {
//     src:    string   // an image URL OR an imported local asset (see below).  Preferred.
//     uuid:   string   // (optional alternative to src) a National Gallery Open Access id.
//                      // If `src` is omitted, the image is built from the uuid:
//                      //   https://api.nga.gov/iiif/<uuid>/full/600,/0/default.jpg
//     word:   string   // the single word that blends over the image
//     title:  string   // used for alt text / accessibility
//     artist: string   // used for alt text (optional)
//     w, h:   number   // (optional) the source image's pixel width & height.
//                      // Providing these reserves the right space so the masonry
//                      // doesn't jump while images load. No effect on appearance.
//   }
//
// SIZING: images are NEVER cropped. Each one renders at its natural aspect ratio
// (portrait, landscape, or square) and the tiles stack as a two-column masonry,
// so mixed orientations flow together. The list below is split down the middle:
// the FIRST HALF fills the left column, the SECOND HALF fills the right column.
// For a balanced look, alternate orientations as you order the list.
//
// USING YOUR OWN LOCAL IMAGES (recommended):
//   1) drop files in  src/assets/art/
//   2) import them at the top of this file, e.g.
//        import sunrise from "./assets/art/sunrise.jpg";
//   3) reference them:  { src: sunrise, word: "wonder", title: "Sunrise" }
//   Using a bundler (Vite/Next/CRA) `import` returns the correct hashed URL.
//
// USING REMOTE URLS: just set `src` to the full https URL.
// =============================================================================

export const ART = [
  // ---- left column (first half) ----
  { src: "./Human Photos/Advance_Ulysses S Grant.webp", word: "advance", title: "Ulysses S. Grant" },
  { src: "./Human Photos/Breathe_.jpg", word: "breathe", title: "breathe" },
  { src: "./Human Photos/Build_.jpg", word: "build", title: "build" },
  { src: "./Human Photos/Change_Lincoln.jpg", word: "change", title: "Abraham Lincoln" },
  { src: "./Human Photos/Climb_.jpg", word: "climb", title: "climb" },
  { src: "./Human Photos/Defy_MLK.avif", word: "defy", title: "Martin Luther King Jr." },
  { src: "./Human Photos/Discover_Conquista-de-M\u00e9xico-por-Cort\u00e9s-Tenochtitlan-Painting.png", word: "discover", title: "Conquista de M\u00e9xico por Cort\u00e9s" },
  { src: "./Human Photos/Explore_Sir David Attenborough.jpg", word: "explore", title: "Sir David Attenborough" },
  { src: "./Human Photos/Innovate_.jpg", word: "innovate", title: "innovate" },
  { src: "./Human Photos/Jump_.jpg", word: "jump", title: "jump" },
  { src: "./Human Photos/Lift_.png", word: "lift", title: "lift" },
  { src: "./Human Photos/Listen_.jpg", word: "listen", title: "listen" },

  // ---- right column (second half) ----
  { src: "./Human Photos/Play_.jpg", word: "play", title: "play" },
  { src: "./Human Photos/Play_.png", word: "play", title: "play" },
  { src: "./Human Photos/Reflect_.png", word: "reflect", title: "reflect" },
  { src: "./Human Photos/Storytell_.jpg", word: "storytell", title: "storytell" },
  { src: "./Human Photos/Tame_.webp", word: "tame", title: "tame" },
  { src: "./Human Photos/Think_Auguste_Rodin_-_The_Thinker_1880.webp", word: "think", title: "The Thinker (1880)", artist: "Auguste Rodin" },
  { src: "./Human Photos/Uncover_.webp", word: "uncover", title: "uncover" },
  { src: "./Human Photos/Wonder_James Web Telescope.jpg", word: "wonder", title: "James Webb Telescope" },
  { src: "./Human Photos/Worship_.jpg", word: "worship", title: "worship" },
  { src: "./Human Photos/disrupt_.webp", word: "disrupt", title: "disrupt" },
  { src: "./Human Photos/witness_.webp", word: "witness", title: "witness" },
];

// The cold, scrolling business-speak on the right. Reorder / add / remove freely.
export const JARGON = [
  "SAAS", "Workflow", "Integrate", "Automate", "Analyze", "Report", "Audit", "Optimize",
  "Streamline", "Upsell", "Synergize", "Leverage", "Onboard", "Deploy", "Iterate", "Pivot",
  "Monetize", "Benchmark", "KPI review", "Funnel", "Pipeline", "Bandwidth", "Circle back",
  "Touch base", "Action item", "Deliverable", "Reconcile", "Scale",
];
