# Workflow & Icon Style Guide
### Visual language for nodes, icons, and workflow diagrams

This document defines how every workflow visualization — any sequence of steps depicted visually — should look across the site. The aesthetic is directly derived from n8n's canvas UI adapted to fit the site's existing Inter/gray-scale design system.

---

## Core Rule

> Any time a workflow, automation sequence, or series of steps is depicted visually, use the n8n node-canvas structure described below. Do not use bullet lists, numbered rows, or plain chips for these — use the node + connector language.

---

## 1. Canvas Background

The workflow canvas is always dark. Even when placed inside a light section, the SVG or div wrapper gets a dark background.

```
Background color:   #111111  (or var(--gray12))
Dot grid pattern:   radial-gradient dots, rgba(255,255,255,0.06) at 1px, spacing 20px
Border-radius:      16px (when inside a card/wrapper)
Border:             1px solid rgba(255,255,255,0.08)
Padding:            40px 48px
```

**CSS for dot-grid canvas background:**
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

---

## 2. Node Types

### 2a. Main Workflow Node (Rectangular)

Used for: trigger steps, action steps, AI agents, decision points.

```
Shape:          Rounded rectangle
Border-radius:  12px
Width:          ~160–200px (auto based on label)
Height:         ~64–72px
Fill:           #2a2a2a  (slightly lighter than canvas)
Border:         1px solid rgba(255,255,255,0.10)
Box-shadow:     0 2px 12px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.4)
```

**Node internal layout** (horizontal, flex row):
```
[Icon box 40×40] [Label stack]
```

- **Icon box**: 40×40px, border-radius 8px, background rgba(255,255,255,0.06), contains SVG icon at 20×20px or service brand icon
- **Node name**: 13px, font-weight 600, color rgba(255,255,255,0.88), letter-spacing -0.01em
- **Operation/sub-label**: 11px, font-weight 400, color rgba(255,255,255,0.35), margin-top 2px

**CSS:**
```css
.wf-node {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #2a2a2a;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.5);
  min-width: 140px;
}
.wf-node-icon {
  width: 40px; height: 40px;
  border-radius: 8px;
  background: rgba(255,255,255,0.06);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  color: rgba(255,255,255,0.7);
}
.wf-node-name {
  font-size: 13px; font-weight: 600;
  color: rgba(255,255,255,0.88);
  letter-spacing: -0.01em; line-height: 1.3;
}
.wf-node-op {
  font-size: 11px; color: rgba(255,255,255,0.35);
  margin-top: 2px; line-height: 1.3;
}
```

### 2b. AI / Agent Node (Wider Rectangular, Emphasized)

Same as main node but slightly larger and slightly higher contrast border — this is the "brain" of the workflow.

```
Width:          ~200–240px
Border:         1px solid rgba(255,255,255,0.16)
Fill:           #323232  (slightly lighter)
Box-shadow:     0 0 0 3px rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.6)
```

Icon: robot/bot SVG, or Anthropic "A" logo when depicting Claude.

### 2c. Sub-Node / Tool Node (Circular)

Used for: Chat Model, Memory, Tools, Output Parser — the auxiliary nodes that hang below a main node via dashed lines.

```
Shape:          Circle
Width/Height:   64px
Fill:           #252525
Border:         1px solid rgba(255,255,255,0.10)
Box-shadow:     0 2px 8px rgba(0,0,0,0.4)
```

**Label** sits below the circle:
- Line 1: 12px, font-weight 500, color rgba(255,255,255,0.72), text-align center
- Line 2 (operation): 10px, color rgba(255,255,255,0.3), text-align center

```css
.wf-sub-node {
  width: 64px; height: 64px;
  border-radius: 50%;
  background: #252525;
  border: 1px solid rgba(255,255,255,0.10);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
.wf-sub-node-label {
  font-size: 12px; font-weight: 500;
  color: rgba(255,255,255,0.72);
  text-align: center; margin-top: 8px;
}
.wf-sub-node-op {
  font-size: 10px; color: rgba(255,255,255,0.3);
  text-align: center; margin-top: 2px;
}
```

### 2d. Trigger Node (Rectangular + Indicator)

Same shape as main node. Has a small colored badge/icon to the left of the node body — the n8n orange lightning bolt. Use a small absolute-positioned element.

```
Indicator color: #ff6d42  (n8n orange) for scheduled/webhook triggers
Indicator color: #4ade80  (green) for "always on" live triggers
Indicator size:  14×14px, positioned 8px to the left of the node
```

---

## 3. Connection Lines

### 3a. Main Flow Connector (Solid Bezier)

```
stroke:         rgba(255,255,255,0.22)
stroke-width:   1.5
fill:           none
curve type:     cubic bezier (horizontal tangents)
Arrow style:    small filled arrowhead at midpoint (►) or use n8n-style forward-fill arrows
```

**SVG path convention** — always exit the right port horizontally and enter the left port horizontally:
```svg
<path d="M [x1],250 C [cx1],250 [cx2],250 [x2],250"
      stroke="rgba(255,255,255,0.22)" stroke-width="1.5" fill="none"/>
```

For vertical branching (true/false splits):
```svg
<!-- Branch up -->
<path d="M [exit_x],[y] C [mid_x],[y] [mid_x],[target_y] [target_x],[target_y]"
      stroke="rgba(255,255,255,0.22)" stroke-width="1.5" fill="none"/>
```

### 3b. Sub-Connection (Dashed Line)

Used from main/agent node down to circular sub-nodes (Chat Model, Memory, Tools).

```
stroke:            rgba(255,255,255,0.15)
stroke-width:      1
stroke-dasharray:  4 4
fill:              none
```

Small category labels float above these dashed lines:
```css
.wf-conn-label {
  font-size: 9px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.06em;
  color: rgba(255,255,255,0.22);
}
```

### 3c. Connection Port Dots

Small circles at the exit/entry points on each node's left and right sides.

```
r:      4px
fill:   rgba(255,255,255,0.28)
stroke: rgba(255,255,255,0.12)  stroke-width 1
```

For sub-node (circular) connection points — diamond shaped connectors:
```
Rotate a 6×6 square 45deg
fill: rgba(255,255,255,0.24)
```

### 3d. "Add Node" Button

Small `+` button that appears to the right of a node's output port.

```
Width/Height:   22px
Border-radius:  50%
Background:     rgba(255,255,255,0.06)
Border:         1px solid rgba(255,255,255,0.14)
Color:          rgba(255,255,255,0.4)
Font-size:      13px
```

---

## 4. Branch Labels

When a connector splits (e.g., `Is manager?` → true/false), the branch is labeled:

```css
.wf-branch-label {
  font-size: 10px; font-weight: 500;
  color: rgba(255,255,255,0.28);
  letter-spacing: -0.005em;
}
/* position: inline near the output port, e.g. "true" above top branch, "false" below */
```

---

## 5. Service Brand Icons (Integration Nodes)

When a node represents a third-party service, show the real brand icon — full color on a dark background node. Examples visible in screenshots: Slack (multicolor hash), Gmail (M), Google Calendar (colored grid), GitHub (white octocat), Jira (blue diamond), Anthropic (dark A).

**Icon treatment inside node:**
- Always 20×20px icon inside the 40×40 icon box
- Brand colors preserved at full saturation — the dark node bg makes them pop
- For our custom steps (no brand icon): use a white/light SVG icon at `rgba(255,255,255,0.65)`

---

## 6. Node Step Types & Their Visual Treatment

Map each step type to a visual style:

| Step type     | Node shape    | Icon style                          | Border accent                        |
|---------------|---------------|-------------------------------------|--------------------------------------|
| Trigger       | Rectangle     | Colored indicator badge (left side) | None                                 |
| AI / Agent    | Wide rectangle| Bot icon or brand AI icon           | Slightly brighter border             |
| Action/Tool   | Rectangle     | Service brand icon                  | None                                 |
| Decision      | Rectangle     | Split/fork icon (two arrows)        | None — add true/false branch labels  |
| Sub-node      | Circle        | Tool/service icon                   | None (dashed connection)             |
| Terminator    | Rectangle     | Completion icon (checkmark)         | None                                 |

---

## 7. How to Adapt to Light Sections

The canvas is always dark. When used inside a **light section** of the site:
- Wrap the canvas in a `border-radius: 16px; overflow: hidden` container
- The canvas keeps its `#111` dot-grid background
- Add `box-shadow: 0 4px 32px rgba(0,0,0,0.12)` to the wrapper to ground it in the light page
- No changes to node colors — the dark canvas creates its own contrast bubble

When used inside a **dark section** (section-dark, section-black):
- No wrapper shadow needed — it bleeds naturally into the section background
- Optionally drop the canvas border and use only the dot-grid to differentiate

---

## 8. Typography Inside Nodes (Site Font Stack Applied)

Use the site's Inter stack, not system fonts:

```css
font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
-webkit-font-smoothing: antialiased;
```

Sizes:
- Node name: 13px / 600
- Node operation: 11px / 400
- Sub-node label: 12px / 500
- Sub-node operation: 10px / 400
- Branch label: 10px / 500
- Sub-connection category label: 9px / 600 uppercase

---

## 9. Sizing & Spacing Reference

```
Node horizontal gap (between nodes in sequence):  80–120px
Node vertical gap (between branch rows):          80–100px
Sub-node gap below parent:                        60–80px
Canvas min-width:                                 700px (scroll horizontally on mobile)
Standard canvas height (3-5 node flow):           320–420px
```

---

## 10. Example HTML/SVG Patterns

### Linear 4-step flow (SVG-based)

```html
<div class="workflow-canvas" style="position:relative; padding:40px 48px;">
  <svg width="100%" viewBox="0 0 900 120" fill="none">
    <!-- Connection lines -->
    <path d="M 200,60 C 240,60 260,60 300,60"
          stroke="rgba(255,255,255,0.22)" stroke-width="1.5"/>
    <path d="M 500,60 C 540,60 560,60 600,60"
          stroke="rgba(255,255,255,0.22)" stroke-width="1.5"/>
    <path d="M 800,60 C 840,60 860,60 880,60"
          stroke="rgba(255,255,255,0.22)" stroke-width="1.5"/>
    <!-- Port dots -->
    <circle cx="200" cy="60" r="4" fill="rgba(255,255,255,0.28)"/>
    <circle cx="300" cy="60" r="4" fill="rgba(255,255,255,0.28)"/>
    <!-- ... more ports ... -->
  </svg>
  <!-- Nodes positioned absolute over the SVG -->
  <div class="wf-node" style="position:absolute; left:0; top:28px">...</div>
  <div class="wf-node" style="position:absolute; left:300px; top:28px">...</div>
</div>
```

### Branching flow pattern (true/false split)

Use SVG paths that fork from one central node output point. The top branch goes up+right, the bottom branch goes down+right. Both terminate in rectangular nodes. Branch labels `true` / `false` float near the fork point.

### Sub-node attachment pattern

A main node sits on the canvas. Below it, at 70px distance, 2–4 circular sub-nodes are positioned. Dashed SVG lines connect from ports on the bottom edge of the main node down to the top of each circle. Category labels (e.g., "Chat Model", "Memory", "Tool") appear as tiny uppercase text above each dashed line.

---

## 11. What NOT to Do

- Do not use plain `→` arrow text between chips for workflow sequences
- Do not use the `example-flow` / `example-chip` pattern for multi-step workflows (reserve chips for very short inline examples with 2–3 steps max)
- Do not use bullet points to represent steps that should be depicted as a flow
- Do not put workflow nodes on a white background without the dot-grid canvas wrapper
- Do not use color fills on node bodies (keep them dark; color lives only in the icon)
- Do not mix node shapes arbitrarily — circles are sub-nodes only; rectangles are main flow nodes
