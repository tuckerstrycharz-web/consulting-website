# Landing Page Creation & Edit Guide
### Reference for every new page and every edit on this site

Read this file in full before writing a single line of HTML. It is the source of truth for design, code structure, and the review process that must happen before reporting any page as done.

---

## 0. Reference Files (Always Read First)

Before starting any page, read these files to load the current source of truth:

| File | What it defines |
|------|----------------|
| `formatting/Landingpageexample.html` | Master CSS design system — all variables, section classes, component classes, nav, footer |
| `formatting/workflow-icon-style-guide.md` | n8n workflow canvas rules — nodes, connectors, sub-nodes, port dots, branch labels |
| `formatting/LANDING_PAGE_GUIDE.md` | This file — review process, aesthetic rules, pitfall checklist |

Do not recreate styles that already exist in `Landingpageexample.html`. Import them by copying the `<style>` block verbatim and extending it, never by rewriting from scratch.

---

## 1. Aesthetic Standard — Apple / iOS Quality

Every page on this site should feel like it belongs on apple.com or as a native iOS app screen. This is not negotiable and applies to every element.

**What this means in practice:**

- **Typography**: `Inter` (loaded from Google Fonts) as the primary face. Fallback: `-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif`. Always set `-webkit-font-smoothing: antialiased`.
- **Letter-spacing**: Negative on all headings. `-0.035em` for H1, `-0.025em` for H2, `-0.015em` for brand/nav. Never positive tracking on body text.
- **Line-height**: `1.1` on large headings, `1.7` on body paragraphs, `1.0` on single-line labels.
- **Weight**: 700 for display/H1, 600 for H2 and card titles, 500 for labels, 400 for body.
- **Color**: Almost exclusively the grayscale token system below. No accent colors except in badges and workflow indicators.
- **Borders**: Always `1px solid var(--gray4)` on light sections. On dark sections: `1px solid rgba(255,255,255,0.08)`.
- **Radius**: `var(--radii-pill)` (9999px) on buttons. `12–16px` on cards and canvases. `8px` on small icon boxes.
- **Shadows**: Subtle. On light sections: `0 1px 4px rgba(0,0,0,0.06)`. On dark canvases: `0 2px 12px rgba(0,0,0,0.5)`.
- **Motion**: Only where it adds clarity. `transition: all 0.15s` on hover states. CSS draw-in animations on SVG paths (stroke-dashoffset) where a diagram should feel dynamic.
- **Whitespace**: Generous. Section padding is `80px 48px`. Never let content feel cramped.

**Never:**
- Use emojis anywhere — not in body copy, not in card titles, not in lists, nowhere.
- Use drop shadows that are large or colored.
- Use border-radius above 16px on structural elements.
- Use more than two font families per page (Inter + optionally Cormorant Garamond for display italics).
- Use any color fill on elements unless it maps to a defined token or badge pattern.
- Use purple (`--accent`) anywhere except AI/Automation contexts (see Section 15).

---

## 2. CSS Design Token System

These variables are defined in `Landingpageexample.html` and must be present in every page's `<style>` block:

```css
:root {
  --gray1:  #fcfcfc;
  --gray2:  #f8f8f8;
  --gray3:  #f3f3f3;
  --gray4:  #ededed;
  --gray5:  #e8e8e8;
  --gray6:  #e2e2e2;
  --gray7:  #dbdbdb;
  --gray8:  #c7c7c7;
  --gray9:  #8f8f8f;
  --gray10: #858585;
  --gray11: #6f6f6f;
  --gray12: #171717;
  --radii-pill: 9999px;

  /* AI / Automation accent */
  --accent:        #7a5af8;
  --accent-subtle: rgba(122, 90, 248, 0.10);
  --accent-border: rgba(122, 90, 248, 0.22);
}
```

**Usage map:**
- `--gray1–3`: Page and section backgrounds (tinted sections)
- `--gray4–6`: Borders, dividers, subtle backgrounds
- `--gray7–8`: Muted icons, decorative dots
- `--gray9–10`: Secondary body text, labels, meta
- `--gray11`: Body text (slightly muted)
- `--gray12`: Primary text, headings, dark backgrounds
- `--accent`: Purple — AI/Automation identity ONLY (see Section 15)
- `--accent-subtle`: Lavender tint — backgrounds of AI reply bubbles, icon boxes
- `--accent-border`: Purple border at low opacity — AI component outlines

---

## 3. Section System

Every page is built from stacked sections. Use only these four section types. Never create a custom section background — choose the right one from this list.

```css
.section-light  { padding: 80px 48px; border-bottom: 1px solid var(--gray4); background: #fff; }
.section-tinted { padding: 80px 48px; border-bottom: 1px solid var(--gray4); background: var(--gray2); }
.section-dark   { padding: 80px 48px; border-bottom: 1px solid var(--gray4); background: var(--gray12); color: #fff; }
.section-black  { padding: 100px 48px; border-bottom: 1px solid #000; background: #000; color: #fff; }
.section-inner  { max-width: 1200px; margin: 0 auto; }
```

**Section sequencing rule:** Alternate light/tinted sections for visual rhythm. Dark and black sections are used sparingly — for dramatic statements, value props, and the CTA. Never stack two dark sections back to back.

**Typical page structure:**
1. Nav (sticky, white, blur)
2. Hero (white — centered, large H1, one-line sub)
3. [First content section] (white or tinted)
4. [Second content section] (opposite of above)
5. [Feature/diagram section] (white or tinted)
6. [Social proof / quote] (dark — `section-dark`)
7. [Detail / breakdown] (white)
8. [Who it's for] (tinted)
9. [Getting started / process] (dark)
10. CTA (black — `section-black`)
11. Footer (white)

---

## 4. Typography Classes

Use these classes consistently. Do not invent new heading styles.

```css
/* Eyebrow labels — small caps above a heading */
.s-eyebrow / .section-label {
  font-size: 11px; font-weight: 600; text-transform: uppercase;
  letter-spacing: 0.1em; color: var(--gray9); margin-bottom: 16px;
}
/* On dark sections */
.section-label-inv { color: rgba(255,255,255,0.4); }

/* Section headings */
.s-h2 / .section-h2 {
  font-size: clamp(20px, 2.6vw, 28px); font-weight: 600;
  letter-spacing: -0.025em; line-height: 1.25; color: var(--gray12);
}
.section-h2-inv { color: #fff; }

/* Page-level H1 (hero) */
.page-h1 {
  font-size: clamp(28px, 4vw, 48px); font-weight: 700;
  letter-spacing: -0.035em; line-height: 1.1; color: var(--gray12);
}

/* Body paragraph */
.s-body / .section-p {
  font-size: 15px; color: var(--gray10); line-height: 1.7;
}
.section-p-inv { color: rgba(255,255,255,0.55); }
```

---

## 5. Layout Primitives

```css
/* Two-column grid */
.two-col-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;
}

/* Three-column grid */
.three-col-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
}

/* Five-card dark grid (dark section feature lists) */
.five-grid {
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px;
  background: rgba(255,255,255,0.08); border-radius: 14px; overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
}
.five-card { background: #1c1c1c; padding: 24px 20px; }
```

---

## 6. Component Classes (from Landingpageexample.html)

These components exist and must be reused. Do not recreate them:

| Class | Purpose |
|-------|---------|
| `.method-card` | Tinted card with tag, title, body, and optional step list |
| `.step-table` | Numbered process table (Step / Action / Owner / Badge) |
| `.process-list` / `.process-row` | Numbered process list, hover-highlight |
| `.outcome-card` | Simple 2-col card grid for outcomes |
| `.doc-card` | Documentation/resource card with icon list |
| `.cta-band` | Full-width dark CTA with heading, subtext, and button group |
| `.btn`, `.btn-outline`, `.btn-dark`, `.btn-white`, `.btn-ghost-white` | All button variants |
| `.badge-human`, `.badge-auto`, `.badge-ai`, `.badge-decision` | Colored inline badges |
| `.scope-warn-card` | Black section warning cards with red label |
| `.quote-insight` | Dark quote card with label + body |

---

## 7. SVG Icon Rules

All icons on this site are inline SVGs in the SF Symbol style. No icon fonts, no emoji, no external image icons.

**Spec:**
- `viewBox="0 0 20 20"` (standard) or `14 14` for small nav/UI icons
- `fill="none"`, `stroke="currentColor"`, `stroke-width="1.4"`, `stroke-linecap="round"`, `stroke-linejoin="round"`
- No filled shapes — all outlines
- Color is inherited via `currentColor` so the parent sets the shade
- For icons inside workflow nodes: `stroke="rgba(255,255,255,0.65)"`, `stroke-width="1.1"`

**Never use emoji characters as icons**, even as placeholders.

---

## 8. Nav and Footer

Copy these verbatim from `Landingpageexample.html`. Do not redesign them.

**Nav:**
- Sticky, `z-index: 100`
- `background: rgba(255,255,255,0.94)`, `backdrop-filter: blur(14px)`
- `border-bottom: 1px solid var(--gray4)`
- Height `58px`, max-width `1200px`, padding `0 48px`
- Left: brand name. Center: nav links. Right: "Text us" (outline) + "Book a call" (dark) buttons

**Footer:**
- White, `border-top: 1px solid var(--gray4)`, padding `28px 48px`
- Left: brand. Right: footer links
- Font-size `13px`, color `var(--gray10)`

---

## 9. Workflow Canvas Rules (n8n Style)

**Core rule:** Any time a workflow, automation sequence, or series of steps is shown visually, use the n8n node-canvas structure. Never use bullet lists, numbered chips, or `→` arrows for multi-step flows.

Full specification is in `workflow-icon-style-guide.md`. Key rules:

**Canvas:**
```css
.workflow-canvas {
  background-color: #111;
  background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
  background-size: 20px 20px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.08);
  overflow: hidden;
}
```
The canvas is always dark — even inside a light section.

**Node types:**
- **Main node**: `#2a2a2a` fill, `rgba(255,255,255,0.10)` border, `rx="12"`
- **AI/Agent node**: `#323232` fill, `rgba(255,255,255,0.16)` border — used for the "brain" node
- **Sub-node**: Circle `64px`, `#252525` fill — hangs below via dashed lines
- **Trigger node**: Same as main + green dot (`#4ade80`) 8px to the left

**Connectors:**
- Main flow: `stroke="rgba(255,255,255,0.22)" stroke-width="1.5"` — solid bezier
- Sub-node: `stroke="rgba(255,255,255,0.15)" stroke-width="1" stroke-dasharray="4 4"` — dashed
- Port dots: `r="4" fill="rgba(255,255,255,0.28)" stroke="rgba(255,255,255,0.12)" stroke-width="1"`
- Branch labels: `font-size="10" fill="rgba(255,255,255,0.28)"` — place 12px past node right edge

---

## 10. SVG Layout Safety Rules

SVG inline text does NOT clip to its parent rect. It always renders beyond its coordinate. Every label must fit within the viewBox before shipping.

**Before writing any SVG workflow canvas, check every node:**

### Text Budget Formula
```
text_x + (font_size × char_count × 0.62) ≤ node_right_edge - 8px
```
Estimate text width as `font-size × character_count × 0.62`. If it overflows, widen the node — never leave text outside the rect boundary.

### ViewBox Boundary Check
```
rightmost_element_right_edge ≤ viewBox_width - 8px
```
Include text width in the rightmost element calculation, not just the rect.

### Port Coordinate Consistency
Exit port `cx` = `node_x + node_width` exactly. Entry port `cx` = `node_x` exactly. Connector M/C coordinates must match these port positions exactly — no hardcoded approximations.

### Branch Label Placement
Place branch label text at `x = node_right_edge + 12` and `y` positioned cleanly above/below the connector line, not at the same y as the exit port center.

### Mini Canvas Coordinate Template (3 nodes, 440px wide)
```
ViewBox:  0 0 440 110
Node 1:   rect x=14,  width=108  → right edge x=122;  text start ≤ 114
Connector 1→2: M 122,cy C 137,cy 152,cy 152,cy
Node 2 (AI): rect x=152, width=128 → right edge x=280; text start ≤ 272
Connector 2→3: M 280,cy C 295,cy 310,cy 310,cy
Node 3:   rect x=310, width=122  → right edge x=432;  text start ≤ 424
```

### Node Width Minimum for Labeled Nodes
```
min_width = icon_box_width(40) + gap(12) + label_text_width + right_margin(16)
```
"Score & Route" at 12px bold needs ~94px label → min node width = 40 + 12 + 94 + 16 = **162px**. Use 176px for comfort. Always round up.

---

## 11. The Review Process — Mandatory Before Reporting Done

Every new section, component, or full page must go through this process before telling the user it's complete. Do not skip steps.

### Step 1 — Build Review (While Writing)

Before writing HTML, mentally simulate the layout:
- Does every grid column have equal or intentional content weight?
- Is every card height consistent within its row?
- Does every text element have enough containing width?
- For SVG: run the text budget formula on every node label.

### Step 2 — Screenshot

After writing, take a screenshot of the rendered page. Use the Bash tool:

```bash
# Capture full page
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless --screenshot="/tmp/review.png" \
  --window-size=1280,900 \
  "file:///path/to/page.html"
```

Or use a specific element viewport if targeting one section. Read the screenshot with the Read tool immediately after capture.

### Step 3 — Analyze the Screenshot

Look specifically for:

| Problem | What to look for |
|---------|-----------------|
| Text overflow | Any text extending past its container or the viewport edge |
| Text clipping | Any word ending with truncated characters (e.g., "Meeti" instead of "Meeting") |
| SVG text outside node | Label text visually extending past the node rectangle boundary |
| Connector/label overlap | Branch labels sitting on top of connector lines or exit ports |
| Uneven card heights | Cards in the same row at different heights |
| Icon bleed | SVG icons that render outside their viewBox |
| Grid collapse | Any grid that stacked unexpectedly (usually a missing `min-width`) |
| Contrast fail | Light text on light background or dark text on dark background |
| Emoji character | Any character that renders as a colored glyph instead of a line icon |

### Step 4 — Fix Before Reporting

If the screenshot reveals any problem from the list above, fix it before telling the user the work is done. Apply the root fix — never patch around it (e.g., don't hide overflow when the text should be shorter or the container should be wider).

After fixing, take a second screenshot and verify the fix visually.

### Step 5 — Report

Only after a clean screenshot: tell the user what was built and what was changed. Reference what specific things were verified visually.

---

## 12. Common Mistakes — Never Repeat

These bugs have shipped before. Each one is banned.

| Bug | Root cause | Rule |
|----|-----------|------|
| "Book Meeti" clipped | SVG viewBox too narrow; node rect too small for label | Run text budget formula before writing any node |
| Branch label overlapping connector | Label x placed at same x as exit port dot | Branch labels go at `node_right_edge + 12px`, never at port x |
| Node text bleeding past rect | Node width not sized to fit label | Width = icon(40) + gap(12) + label_width + margin(16) minimum |
| Emoji in icons | Copied from a draft or autocomplete | Ctrl+F for emoji Unicode ranges before shipping |
| Two dark sections stacked | No check on section sequence | Review section order in the structure outline before writing |
| Custom styles duplicating existing classes | Not reading `Landingpageexample.html` first | Always read the reference CSS before adding new rules |
| Connector M coordinates not matching port cx | Coordinates estimated, not derived | Port cx = node_x + node_width; write port first, then connector |

---

## 13. Page Startup Checklist

Use this when starting a new page from scratch:

- [ ] Read `Landingpageexample.html` CSS in full
- [ ] Copy the `<style>` block verbatim as the base
- [ ] Define the section sequence and write it as HTML comments before filling content
- [ ] Verify no section is created without using one of the four section classes
- [ ] Confirm font stack includes Inter with Google Fonts preconnect links
- [ ] Confirm CSS variables `:root` block is present
- [ ] For any workflow/automation diagram: consult `workflow-icon-style-guide.md`
- [ ] For any SVG diagram: run text budget formula on every node before writing it

---

## 14. Edit Checklist

Use this when editing an existing page:

- [ ] Read the specific section being edited in full before changing anything
- [ ] Confirm no existing class is being overridden accidentally by a new rule
- [ ] For SVG edits: if a node rect width changes, update port dot cx, connector M coordinates, and branch label x in the same edit
- [ ] Take a screenshot after the edit — don't assume it renders correctly
- [ ] Check the screenshot for all problems in the Step 3 table before reporting done

---

## 15. Purple Accent Color — AI & Automation Identity

**Purple (`#7a5af8` / `var(--accent)`) is the brand signal for artificial intelligence and automation.** It is not a general accent color. It does not appear in headings, buttons, section labels, nav, footer, or decorative elements.

### Where purple IS used

| Element | Purple application |
|---------|-------------------|
| AI Agent pill badge | Background `var(--accent-subtle)`, text `var(--accent)`, border `var(--accent-border)` |
| AI reply bubbles in chat widgets | Background `var(--accent-subtle)` |
| "Auto-reply" / "AI" solid badges | Background `var(--accent)`, text `#fff` |
| AI icon boxes (feature cards) | Background `var(--accent-subtle)`, icon `var(--accent)` |
| Hub widget center node | Radial gradient with `var(--accent)` |
| Workflow canvas AI node | Slightly lighter node fill `#323232` + `var(--accent)` icon |
| AI logo orb (hero, section emphasis) | Purple gradient sphere (see `ai-identity-components.md`) |
| Comparison table AI column values | `color: var(--accent)` |
| Compare badge "AI" label | Background `var(--accent)`, `border-radius: var(--radii-pill)` |

### Where purple is NEVER used

- Page headings, body copy, or section labels
- Buttons outside of widget interiors
- Nav, footer, or section chrome
- Icons that are not specifically representing AI
- Card titles, stats, or decorative dividers

### The rule in one sentence

> If the thing doing the action is AI or automation, it gets purple. If the thing is a human, a section, or the UI chrome, it stays gray.

---

## 16. AI Identity Components — Required Usage Rules

Any time AI is featured in a graphic, widget, diagram, or interactive element, the following visual identity rules apply. Reference screenshots in `formatting/AI purple logos and components/` as visual spec.

### 16a. AI Sparkle Icon

All AI identity uses a 4-pointed sparkle (✦) icon in purple. This is not a generic star — it is specifically the AI mark.

**Inline SVG (use this exact path):**
```html
<!-- Small (16×16) — for pill badges and inline labels -->
<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style="color:var(--accent)">
  <path d="M7.5 1.5C7.8 4.8 9.2 6.2 12.5 6.5C9.2 6.8 7.8 8.2 7.5 11.5C7.2 8.2 5.8 6.8 2.5 6.5C5.8 6.2 7.2 4.8 7.5 1.5Z"/>
  <path d="M12.5 2C12.7 3.4 13.6 4.3 15 4.5C13.6 4.7 12.7 5.6 12.5 7C12.3 5.6 11.4 4.7 10 4.5C11.4 4.3 12.3 3.4 12.5 2Z"/>
</svg>

<!-- Large (24×24) — for card headers and section icons -->
<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="color:var(--accent)">
  <path d="M12 2C12.4 7.2 14.8 9.6 20 10C14.8 10.4 12.4 12.8 12 18C11.6 12.8 9.2 10.4 4 10C9.2 9.6 11.6 7.2 12 2Z"/>
  <path d="M19 2C19.3 4.2 20.8 5.7 23 6C20.8 6.3 19.3 7.8 19 10C18.7 7.8 17.2 6.3 15 6C17.2 5.7 18.7 4.2 19 2Z"/>
</svg>
```

### 16b. "AI Agent" Pill Badge

Used as a label wherever an AI agent is identified — chat headers, card eyebrows, section intros.

```html
<span class="ai-agent-pill">
  <!-- sparkle SVG from 16a (14×14) -->
  AI Agent
</span>
```

```css
.ai-agent-pill {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 5px 12px; border-radius: var(--radii-pill);
  background: var(--accent-subtle); border: 1px solid var(--accent-border);
  color: var(--accent); font-size: 13px; font-weight: 600;
}
```

Visual reference: `formatting/AI purple logos and components/Screenshot 2026-06-18 at 10.31.30 PM.png`

### 16c. AI Reply Bubble (Chat Widgets)

When an AI agent sends a message in a chat-style widget, the bubble uses the lavender tint — not gray.

```css
.chat-bubble--ai {
  background: var(--accent-subtle);
  border-radius: 14px 14px 14px 4px;
  padding: 12px 16px;
  color: var(--gray12);
}
/* Label above the bubble */
.chat-bubble--ai-label {
  display: flex; align-items: center; gap: 5px;
  font-size: 12px; font-weight: 600; color: var(--accent);
  margin-bottom: 4px;
}
```

The "AI Agent" sparkle + label appears above each AI bubble. Human messages use `background: var(--gray3)`, no purple.

Visual reference: `formatting/AI purple logos and components/Screenshot 2026-06-18 at 10.31.34 PM.png`

### 16d. AI Icon Box (Feature Cards)

When a feature card's capability is AI-powered, the icon box gets the purple treatment instead of the standard gray.

```css
.ai-icon-box {
  width: 44px; height: 44px; border-radius: 10px;
  background: var(--accent-subtle);
  border: 1px solid var(--accent-border);
  display: flex; align-items: center; justify-content: center;
  color: var(--accent);
}
```

Visual reference: `formatting/AI purple logos and components/Screenshot 2026-06-18 at 10.31.41 PM.png`

### 16e. "Auto-reply" / Action Badge

When AI takes an autonomous action (auto-reply, auto-schedule, etc.), label it with a solid purple pill.

```css
.ai-auto-badge {
  display: inline-flex; align-items: center;
  padding: 3px 10px; border-radius: var(--radii-pill);
  background: var(--accent); color: #fff;
  font-size: 11px; font-weight: 600; letter-spacing: 0.02em;
}
```

### 16f. AI Orb (Hero / Section Emphasis)

The purple orb is used in hero sections and anywhere a visual focal point for AI capability is needed. It is a CSS-rendered sphere — no image file required.

```html
<div class="ai-orb-wrap">
  <div class="ai-orb">
    <!-- large sparkle SVG (24×24, white) -->
    <!-- optional small sparkle offset upper-right -->
  </div>
  <div class="ai-orb-ring ai-orb-ring--1"></div>
  <div class="ai-orb-ring ai-orb-ring--2"></div>
  <div class="ai-orb-ring ai-orb-ring--3"></div>
</div>
```

```css
.ai-orb-wrap { position: relative; width: 200px; height: 200px; display: flex; align-items: center; justify-content: center; }
.ai-orb {
  width: 120px; height: 120px; border-radius: 50%; z-index: 2; position: relative;
  background: radial-gradient(circle at 38% 38%, #9d84fb, #7a5af8 55%, #5b3fd4);
  box-shadow: 0 8px 40px rgba(122,90,248,0.45), inset 0 -4px 12px rgba(0,0,0,0.25);
  display: flex; align-items: center; justify-content: center; color: #fff;
}
.ai-orb-ring {
  position: absolute; border-radius: 50%; border: 1px dashed rgba(122,90,248,0.25);
  pointer-events: none;
}
.ai-orb-ring--1 { width: 156px; height: 156px; }
.ai-orb-ring--2 { width: 196px; height: 196px; border-color: rgba(122,90,248,0.15); }
.ai-orb-ring--3 { width: 240px; height: 240px; border-color: rgba(122,90,248,0.08); }
```

Visual reference: `formatting/AI purple logos and components/Screenshot 2026-06-18 at 10.31.23 PM.png`

### 16g. Workflow Canvas — AI Node

In any n8n-style workflow canvas, the node that performs AI reasoning/generation uses the AI node style and gets the sparkle icon.

```
AI node fill:    #2d2060  (dark purple — distinct from regular #2a2a2a nodes)
AI node border:  rgba(122,90,248,0.35)
AI node icon:    sparkle SVG, color #a78bfa (lighter purple for contrast on dark)
AI node label:   white, same font spec as other nodes
```

This visually separates "AI does this step" from "system/trigger/human does this step" at a glance.

---

## 17. Section Black — Dark Sections with Tabs/Interactive Content

When a section uses `section-black` (pure `#000` background) and contains interactive tabs, compare tables, or estimate widgets, all child elements must be inverted for dark context. Key overrides:

```css
.section-black .section-label  { color: rgba(255,255,255,.35); }
.section-black .section-h2     { color: #fff; }
.section-black .section-p      { color: rgba(255,255,255,.45); }
.section-black .tab-bar-wrap   { border-bottom-color: rgba(255,255,255,.12); }
.section-black .tab-btn        { color: rgba(255,255,255,.38); }
.section-black .tab-btn.active { color: #fff; border-bottom-color: #fff; background: rgba(255,255,255,.08); }
.section-black .rev-card       { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.1); }
.section-black .compare-row    { border-bottom-color: rgba(255,255,255,.10); }
.section-black .c-label        { color: rgba(255,255,255,.38) !important; }
.section-black .c-human        { color: rgba(255,255,255,.65) !important; }
.section-black .c-ai           { color: var(--accent) !important; }
.section-black .estimate-wrap  { background: rgba(255,255,255,.05); border-color: rgba(255,255,255,.1); }
```

The AI column (`c-ai`) in compare tables retains `var(--accent)` purple — this is intentional contrast on dark.
