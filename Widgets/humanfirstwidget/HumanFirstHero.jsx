import React, { useEffect, useRef, useState } from "react";
import { ART as DEFAULT_ART, JARGON as DEFAULT_JARGON } from "./heroContent";

/**
 * HumanFirstHero
 * -----------------------------------------------------------------------------
 * A self-contained hero/section. Styles are injected via a scoped <style> block
 * (fonts included via @import), so it drops into any React 16.8+ app with zero
 * config — no Tailwind, no CSS modules, no font setup.
 *
 * Images are never cropped: each renders at its natural aspect ratio and the
 * tiles flow as a two-column masonry, so portrait / landscape / square mix
 * together. A single human word blends into each image (mix-blend), fading in
 * as the image passes the vertical center of the stream and out toward the edges.
 *
 * To change the content, edit heroContent.js (you usually won't touch this file).
 *
 * Props (all optional):
 *   art          array   see heroContent.js for the item shape
 *   jargon       array   the cold scrolling list
 *   accent       string  brand color (default amber #f5b14c)
 *   streamHeight string  height of the art/jargon band, e.g. "480px" or "60vh"
 *   eyebrow / lead / bridge / tagline / ctaLabel / onCtaClick
 */
export default function HumanFirstHero({
  art = DEFAULT_ART,
  jargon = DEFAULT_JARGON,
  accent = "#f5b14c",
  streamHeight,
  eyebrow = "Human-first AI",
  lead = "Humans were meant to",
  bridge = "not",
  tagline = (
    <>
      Automate what you hate — so you can get back to{" "}
      <span className="hfh-em">what we were meant for</span>.
    </>
  ),
  ctaLabel = "See our human-first solutions",
  onCtaClick,
}) {
  const mid = Math.ceil(art.length / 2);
  const colA = art.slice(0, mid);
  const colB = art.slice(mid);
  const streamRef = useRef(null);

  // Fade each word in as its tile nears the vertical center of the stream,
  // out toward the edges. Runs on rAF; cleaned up on unmount.
  useEffect(() => {
    const stream = streamRef.current;
    if (!stream) return;
    let raf;
    const MIN_OPACITY = 0.70;
    const tick = () => {
      const sr = stream.getBoundingClientRect();
      const cy = sr.top + sr.height / 2;
      const half = sr.height / 2 || 1;
      stream.querySelectorAll(".hfh-tile").forEach((t) => {
        const r = t.getBoundingClientRect();
        const d = Math.abs((r.top + r.height / 2) - cy);
        let proximity = 1 - d / (half * 0.78);
        proximity = Math.max(0, Math.min(1, proximity));
        proximity = proximity * proximity * (3 - 2 * proximity); // smoothstep ease
        const o = MIN_OPACITY + proximity * (1 - MIN_OPACITY);
        const w = t.querySelector(".hfh-word");
        if (w) w.style.opacity = o.toFixed(3);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [art]);

  const wrapStyle = { "--accent": accent };
  if (streamHeight) wrapStyle["--stream-h"] = streamHeight;

  return (
    <div className="hfh" style={wrapStyle}>
      <style>{CSS}</style>

      <div className="hfh-eyebrow"><span className="hfh-mark" />{eyebrow}</div>

      <div className="hfh-lead">
        <div className="hfh-lead-left">{lead}</div>
        <div className="hfh-lead-right">{bridge}</div>
      </div>

      <div className="hfh-cols">
        <div className="hfh-stream" ref={streamRef}>
          <ArtColumn items={colA} duration="72s" />
          <ArtColumn items={colB} duration="92s" />
        </div>

        <div className="hfh-ticker-wrap">
          <JargonPanel jargon={jargon} />
        </div>
      </div>

      <p className="hfh-tagline">{tagline}</p>
      <button className="hfh-cta" type="button" onClick={onCtaClick}>
        {ctaLabel} <span aria-hidden="true">&#8599;</span>
      </button>

      <p className="hfh-credit">
        Images © their respective rights holders.
      </p>
    </div>
  );
}

function srcFor(it) {
  if (it.src) return it.src;
  if (it.uuid) return `https://api.nga.gov/iiif/${it.uuid}/full/600,/0/default.jpg`;
  return "";
}

function ArtColumn({ items, duration }) {
  const loop = [...items, ...items]; // duplicate for a seamless loop
  return (
    <div className="hfh-col">
      <div className="hfh-track" style={{ animationDuration: duration }}>
        {loop.map((it, i) => (
          <figure className="hfh-tile" key={i}>
            <img
              src={srcFor(it)}
              width={it.w || undefined}
              height={it.h || undefined}
              loading="lazy"
              alt={it.artist ? `${it.title} by ${it.artist}` : (it.title || "")}
            />
            <span className="hfh-word">{it.word}</span>
          </figure>
        ))}
      </div>
    </div>
  );
}

function JargonPanel({ jargon }) {
  const N = Math.min(jargon.length, 9);
  const midIdx = Math.floor(N / 2);
  const [ps, setPs] = useState({
    words: jargon.slice(0, N),
    activeIdx: midIdx,
    phase: "flash", // "flash" | "delete" | "type"
    editText: jargon[midIdx],
  });
  const nextWordRef = useRef("");
  const poolIdxRef = useRef(N);

  useEffect(() => {
    const { phase, editText } = ps;

    if (phase === "flash") {
      const t = setTimeout(() => {
        nextWordRef.current = jargon[poolIdxRef.current % jargon.length];
        poolIdxRef.current++;
        setPs(s => ({ ...s, phase: "delete", editText: s.words[s.activeIdx] }));
      }, 1000);
      return () => clearTimeout(t);
    }

    if (phase === "delete") {
      if (editText.length === 0) {
        setPs(s => ({ ...s, phase: "type" }));
        return;
      }
      const t = setTimeout(() => setPs(s => ({ ...s, editText: s.editText.slice(0, -1) })), 55);
      return () => clearTimeout(t);
    }

    if (phase === "type") {
      const target = nextWordRef.current;
      if (editText.length >= target.length) {
        setPs(s => {
          const w = [...s.words];
          w[s.activeIdx] = target;
          return { ...s, words: w };
        });
        const t = setTimeout(() => setPs(s => ({
          ...s,
          activeIdx: (s.activeIdx + 1) % N,
          phase: "flash",
        })), 350);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPs(s => ({
        ...s,
        editText: target.slice(0, s.editText.length + 1),
      })), 65);
      return () => clearTimeout(t);
    }
  }, [ps.phase, ps.editText, ps.activeIdx, jargon]);

  const { words, activeIdx, phase, editText } = ps;
  const inEdit = phase === "delete" || phase === "type";

  return (
    <div className="hfh-jargon-panel">
      {words.map((w, i) => {
        const isActive = i === activeIdx;
        const text = isActive && inEdit ? editText : w;
        return (
          <div key={i} className={`hfh-line${isActive && phase === "flash" ? " hfh-line-flash" : ""}`}>
            <span className="hfh-pre">&gt;</span>
            <span>{text}</span>
            {isActive && inEdit && <span className="hfh-cursor" aria-hidden="true">|</span>}
          </div>
        );
      })}
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500;0,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
.hfh{
  --bg:#000000; --ink:#ffffff; --cold:#69727e; --cold-dim:#39424f; --panel:#080808;
  --stream-h:480px; --tile-gap:14px;
  background:var(--bg); color:var(--ink); padding:40px 28px;
  font-family:'Inter',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
  border-radius:16px; max-width:1080px; margin:0 auto; box-sizing:border-box;
}
.hfh *{box-sizing:border-box}
.hfh-eyebrow{display:flex;align-items:center;gap:9px;color:var(--accent);font-size:14px;font-weight:500;letter-spacing:.4px;margin-bottom:18px}
.hfh-mark{width:8px;height:8px;border-radius:50%;background:var(--accent)}
.hfh-lead{display:flex;gap:28px;align-items:flex-end;margin-bottom:18px}
.hfh-lead-left{flex:1.7;font-size:clamp(28px,4.6vw,52px);font-weight:500;line-height:1.08;color:var(--ink)}
.hfh-lead-right{flex:1;font-size:clamp(28px,4.6vw,52px);font-weight:500;line-height:1.08;color:var(--cold)}
.hfh-cols{display:flex;gap:28px;align-items:stretch}
.hfh-stream{
  flex:1.7;display:flex;gap:var(--tile-gap);height:var(--stream-h);overflow:hidden;
  -webkit-mask-image:linear-gradient(transparent,#000 8%,#000 92%,transparent);
  mask-image:linear-gradient(transparent,#000 8%,#000 92%,transparent);
}
.hfh-col{flex:1;overflow:hidden}
.hfh-track{display:flex;flex-direction:column;will-change:transform;animation-name:hfhrise;animation-timing-function:linear;animation-iteration-count:infinite}

/* Natural-size flow: no cropping, tiles keep their own aspect ratio (masonry). */
.hfh-tile{position:relative;margin:0 0 var(--tile-gap);border-radius:10px;overflow:hidden;border:1px solid rgba(245,177,76,.20);isolation:isolate;container-type:inline-size}
.hfh-tile img{display:block;width:100%;height:auto;background:#11131b}
.hfh-word{
  position:absolute;inset:0;z-index:2;display:flex;align-items:center;justify-content:center;
  font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(18px,15cqmin,46px);font-weight:600;
  font-style:italic;letter-spacing:.5px;text-transform:lowercase;color:#fff;
  mix-blend-mode:overlay;pointer-events:none;opacity:0.70;
}
@keyframes hfhrise{to{transform:translateY(-50%)}}
.hfh-ticker-wrap{
  flex:1;height:var(--stream-h);overflow:hidden;position:relative;
  background:var(--panel);border:1px solid rgba(105,114,126,.28);border-radius:12px;
  -webkit-mask-image:linear-gradient(transparent,#000 10%,#000 90%,transparent);
  mask-image:linear-gradient(transparent,#000 10%,#000 90%,transparent);
}
.hfh-jargon-panel{display:flex;flex-direction:column;justify-content:center;height:100%;padding:12px 18px;gap:2px}
.hfh-line{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:13px;color:var(--cold);padding:7px 0;letter-spacing:.3px;display:flex;gap:10px;align-items:baseline}
.hfh-line-flash{animation:hfh-word-flash 1s ease both}
@keyframes hfh-word-flash{
  0%{color:var(--cold);text-shadow:none}
  30%{color:var(--accent);text-shadow:0 0 14px rgba(245,177,76,.6)}
  65%{color:var(--accent);text-shadow:0 0 14px rgba(245,177,76,.6)}
  100%{color:var(--cold);text-shadow:none}
}
.hfh-pre{color:var(--cold-dim);font-size:12px}
.hfh-cursor{display:inline-block;color:var(--accent);animation:hfh-blink .75s step-end infinite;margin-left:1px}
@keyframes hfh-blink{50%{opacity:0}}
.hfh-tagline{margin:26px 0 0;font-size:clamp(15px,1.8vw,18px);color:#cdc6b6;line-height:1.6;max-width:620px}
.hfh-em{color:var(--accent)}
.hfh-cta{margin-top:20px;background:var(--accent);color:#1a1206;border:none;border-radius:10px;padding:13px 22px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:8px;transition:filter .15s,transform .05s}
.hfh-cta:hover{filter:brightness(1.06)}
.hfh-cta:active{transform:scale(.98)}
.hfh-credit{margin-top:22px;font-size:12px;color:#5a5d68}
@media (max-width:760px){
  .hfh{--stream-h:360px}
  .hfh-lead{flex-direction:column;gap:2px;align-items:flex-start}
  .hfh-lead-left,.hfh-lead-right{flex:none}
  .hfh-cols{flex-direction:column}
  .hfh-stream{flex:none}
  .hfh-ticker-wrap{flex:none;height:200px}
}
@media (prefers-reduced-motion: reduce){
  .hfh-track,.hfh-line-flash,.hfh-cursor{animation:none}
}
`;
