# AI Identity Component Reference

Visual and code reference for every component that carries the AI/Automation identity on this site.

**Rule:** Any graphic, widget, diagram, or card that involves AI doing something must include at least one of these components. Purple is the visual signal that says "AI is acting here."

---

## Color Palette

| Token | Value | Use |
|-------|-------|-----|
| `--accent` | `#7a5af8` | Text, icons, solid badges, orb base |
| `--accent-subtle` | `rgba(122,90,248,0.10)` | AI bubble backgrounds, icon box fills |
| `--accent-border` | `rgba(122,90,248,0.22)` | Borders on AI pills, icon boxes |
| Light purple (hover) | `rgba(122,90,248,0.16)` | Hover states on AI elements |
| AI node (canvas) | `#2d2060` | Dark purple for AI nodes in workflow canvases |
| AI icon (on dark) | `#a78bfa` | Sparkle icon color when on dark/purple backgrounds |

---

## Component 1 — AI Sparkle Icon

The 4-pointed sparkle is the universal AI mark. Use it wherever an "AI Agent" label or AI action is identified.

**Two sizes:**

```html
<!-- 14×14 — pill badges, inline labels, small card headers -->
<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style="color:var(--accent)">
  <path d="M7.5 1.5C7.8 4.8 9.2 6.2 12.5 6.5C9.2 6.8 7.8 8.2 7.5 11.5C7.2 8.2 5.8 6.8 2.5 6.5C5.8 6.2 7.2 4.8 7.5 1.5Z"/>
  <path d="M12.5 2C12.7 3.4 13.6 4.3 15 4.5C13.6 4.7 12.7 5.6 12.5 7C12.3 5.6 11.4 4.7 10 4.5C11.4 4.3 12.3 3.4 12.5 2Z"/>
</svg>

<!-- 20×20 — feature card headers, section icons -->
<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="color:var(--accent)">
  <path d="M12 2C12.4 7.2 14.8 9.6 20 10C14.8 10.4 12.4 12.8 12 18C11.6 12.8 9.2 10.4 4 10C9.2 9.6 11.6 7.2 12 2Z"/>
  <path d="M19 2C19.3 4.2 20.8 5.7 23 6C20.8 6.3 19.3 7.8 19 10C18.7 7.8 17.2 6.3 15 6C17.2 5.7 18.7 4.2 19 2Z"/>
</svg>
```

**When on a dark/purple background**, set `style="color:#a78bfa"` or `color:#fff` for maximum contrast.

📸 Reference: `AI purple logos and components/Screenshot 2026-06-18 at 10.31.30 PM.png`

---

## Component 2 — "AI Agent" Pill Badge

The primary identity label for any AI agent. Appears in chat widget headers, card eyebrows, and inline wherever the agent is named.

```html
<span class="ai-agent-pill">
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M7.5 1.5C7.8 4.8 9.2 6.2 12.5 6.5C9.2 6.8 7.8 8.2 7.5 11.5C7.2 8.2 5.8 6.8 2.5 6.5C5.8 6.2 7.2 4.8 7.5 1.5Z"/>
    <path d="M12.5 2C12.7 3.4 13.6 4.3 15 4.5C13.6 4.7 12.7 5.6 12.5 7C12.3 5.6 11.4 4.7 10 4.5C11.4 4.3 12.3 3.4 12.5 2Z"/>
  </svg>
  AI Agent
</span>
```

```css
.ai-agent-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 9999px;
  background: rgba(122,90,248,0.10);
  border: 1px solid rgba(122,90,248,0.22);
  color: #7a5af8;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
}
```

**Variants:**
- Standard (on light bg): as above
- On dark section: add `border-color: rgba(122,90,248,0.35)` for better visibility
- Centered with dividers (chat header): wrap in flex row with `<hr>` lines on each side, `flex: 1; border-color: var(--gray5)`

📸 Reference: `AI purple logos and components/Screenshot 2026-06-18 at 10.31.30 PM.png`

---

## Component 3 — AI Reply Bubble (Chat Widgets)

In any chat-style interface, AI messages use a lavender bubble. Human messages use gray.

```html
<!-- AI message -->
<div class="chat-msg chat-msg--ai">
  <div class="chat-msg__label">
    <!-- 14×14 sparkle SVG -->
    AI Agent
  </div>
  <div class="chat-bubble chat-bubble--ai">
    Message text here.
  </div>
</div>

<!-- Human message -->
<div class="chat-msg chat-msg--human">
  <div class="chat-bubble chat-bubble--human">
    Message text here.
  </div>
</div>
```

```css
.chat-msg { margin-bottom: 16px; }
.chat-msg--human { display: flex; justify-content: flex-end; }

.chat-bubble {
  max-width: 80%; padding: 12px 16px;
  font-size: 14px; line-height: 1.55; color: #1a1a1a;
}
.chat-bubble--human {
  background: #f0f0f0;
  border-radius: 18px 18px 4px 18px;
}
.chat-bubble--ai {
  background: rgba(122,90,248,0.10);
  border-radius: 4px 18px 18px 18px;
}

.chat-msg__label {
  display: flex; align-items: center; gap: 5px;
  font-size: 12px; font-weight: 600; color: #7a5af8;
  margin-bottom: 5px;
}
```

📸 Reference: `AI purple logos and components/Screenshot 2026-06-18 at 10.31.34 PM.png`

---

## Component 4 — AI Icon Box (Feature Cards)

Feature cards for AI-powered capabilities use a purple icon box instead of the standard gray one.

```html
<div class="ai-icon-box">
  <!-- 20×20 sparkle SVG, or a relevant stroke icon in var(--accent) -->
</div>
```

```css
.ai-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(122,90,248,0.10);
  border: 1px solid rgba(122,90,248,0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7a5af8;
  flex-shrink: 0;
}
```

The icon inside can be the sparkle **or** a relevant stroke icon (e.g., phone for Voice Agent, calendar for scheduling AI). The purple box is what signals "this is AI-powered."

📸 Reference: `AI purple logos and components/Screenshot 2026-06-18 at 10.31.41 PM.png`

---

## Component 5 — "Auto-reply" / Action Badge

When AI takes an autonomous action, label it with a solid purple pill. This signals AI initiative (not human action).

```html
<span class="ai-auto-badge">Auto-reply</span>
<span class="ai-auto-badge">Auto-schedule</span>
<span class="ai-auto-badge">AI</span>
```

```css
.ai-auto-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 9999px;
  background: #7a5af8;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1;
}
```

📸 Reference: `AI purple logos and components/Screenshot 2026-06-18 at 10.31.41 PM.png`

---

## Component 6 — AI Orb (Hero / Emphasis)

The orb is a CSS-rendered purple sphere with concentric dashed rings. Use in hero sections or anywhere a strong visual anchor for AI is needed. No image file — pure CSS + SVG.

```html
<div class="ai-orb-wrap">
  <div class="ai-orb">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
      <path d="M12 2C12.4 7.2 14.8 9.6 20 10C14.8 10.4 12.4 12.8 12 18C11.6 12.8 9.2 10.4 4 10C9.2 9.6 11.6 7.2 12 2Z"/>
      <path d="M19 2C19.3 4.2 20.8 5.7 23 6C20.8 6.3 19.3 7.8 19 10C18.7 7.8 17.2 6.3 15 6C17.2 5.7 18.7 4.2 19 2Z" opacity="0.7"/>
    </svg>
  </div>
  <div class="ai-orb-ring ai-orb-ring--1"></div>
  <div class="ai-orb-ring ai-orb-ring--2"></div>
  <div class="ai-orb-ring ai-orb-ring--3"></div>
</div>
```

```css
.ai-orb-wrap {
  position: relative;
  width: 240px; height: 240px;
  display: flex; align-items: center; justify-content: center;
}
.ai-orb {
  width: 120px; height: 120px;
  border-radius: 50%; z-index: 2; position: relative;
  background: radial-gradient(circle at 38% 38%, #b09afb, #7a5af8 55%, #5b3fd4);
  box-shadow: 0 8px 40px rgba(122,90,248,0.45), inset 0 -4px 12px rgba(0,0,0,0.2);
  display: flex; align-items: center; justify-content: center;
}
.ai-orb-ring {
  position: absolute; border-radius: 50%;
  border: 1px dashed rgba(122,90,248,0.25);
  pointer-events: none;
}
.ai-orb-ring--1 { width: 158px; height: 158px; }
.ai-orb-ring--2 { width: 200px; height: 200px; border-color: rgba(122,90,248,0.14); }
.ai-orb-ring--3 { width: 242px; height: 242px; border-color: rgba(122,90,248,0.07); }
```

📸 Reference: `AI purple logos and components/Screenshot 2026-06-18 at 10.31.23 PM.png`

---

## Component 7 — Workflow Canvas AI Node

In n8n-style workflow canvases, the node performing AI reasoning uses a dark purple fill instead of the standard `#2a2a2a` dark gray.

```
Standard node:  fill="#2a2a2a"  border="rgba(255,255,255,0.10)"  icon stroke white
AI node:        fill="#2d2060"  border="rgba(122,90,248,0.40)"   icon color="#a78bfa"
```

The AI node's icon should be the sparkle SVG (not a generic icon), or a domain icon (brain, bolt, wand) in `#a78bfa`.

---

## Usage Checklist — Before Shipping Any AI Section

- [ ] Any chat widget: AI bubbles use `rgba(122,90,248,0.10)` background, not gray
- [ ] Any chat widget: AI sender label uses sparkle icon + "AI Agent" in purple text
- [ ] Any feature card for AI capability: icon box is purple (`ai-icon-box` class)
- [ ] Any compare table with AI column: AI column values use `color: var(--accent)`
- [ ] Any workflow canvas with an AI processing node: node uses `fill="#2d2060"` and `var(--accent)` border
- [ ] Any autonomous AI action shown in a widget: labeled with solid purple `ai-auto-badge`
- [ ] Hero or section that leads with AI as the topic: consider using the AI orb as a visual anchor
