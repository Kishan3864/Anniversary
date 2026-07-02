"use client";

import { useEffect, useRef } from "react";

import Flag from "./Flag";

const COLORS = ["#fdf0b8", "#d4af37", "#ffffff", "#f0da8a", "#ffe9a3"];
const rand = (a: number, b: number) => a + Math.random() * (b - a);

type Spark = {
  x: number; y: number;   // current position (canvas space)
  by: number;             // birth y — reference for cloth-coupling + lift-off
  vx: number; vy: number;
  size: number; maxSize: number;
  life: number; max: number; emerge: number;
  rise: boolean;          // true = lifts off the cloth; false = micro glint on it
  color: string; tw: number; phase: number; glow: boolean;
};

type FieldCfg = {
  max: number; minSize: number; maxSize: number; alpha: number; topup: number;
  riseRatio: number;      // fraction of particles that lift off (rest stay glinting)
  lift: number;           // upward acceleration applied to risers
};

/**
 * Runs one continuous sparkle field on `canvas`. Particles are born ON the flag
 * cloth (inside its measured elliptical area), bloom into view as if peeling off
 * the fabric, then either stay as micro glints on the surface or lift off and
 * rise — swaying with the cloth near the flag and breaking free as they climb,
 * so it reads as sparkles genuinely emitting from the flag. Returns a cleanup fn.
 */
function startSparkles(canvas: HTMLCanvasElement, flagEl: HTMLElement, cfg: FieldCfg) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0, H = 0, cx = 0, cy = 0, fw = 0, fh = 0, emblemR = 0;

  const measure = () => {
    const cRect = canvas.getBoundingClientRect();
    W = cRect.width;
    H = cRect.height;
    canvas.width = Math.max(1, Math.floor(W * dpr));
    canvas.height = Math.max(1, Math.floor(H * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const fRect = flagEl.getBoundingClientRect();
    fw = fRect.width;
    fh = fRect.height;
    cx = fRect.left - cRect.left + fw / 2;
    cy = fRect.top - cRect.top + fh / 2;
    emblemR = fh * 0.52;
  };
  measure();
  const ro = new ResizeObserver(measure);
  ro.observe(canvas);
  ro.observe(flagEl);

  const sparks: Spark[] = [];

  const spawn = () => {
    if (fw <= 0 || fh <= 0) return;
    // Birth on the cloth: a point inside the flag's elliptical (masked) area,
    // avoiding the dead centre that sits hidden behind the seal.
    const rx = fw * 0.5, ry = fh * 0.5;
    let px = cx, py = cy;
    for (let attempt = 0; attempt < 8; attempt++) {
      const ang = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random());
      px = cx + Math.cos(ang) * rx * r * 0.98;
      py = cy + Math.sin(ang) * ry * r * 0.94;
      if (Math.hypot(px - cx, py - cy) > emblemR * 0.5) break;
    }
    const rise = Math.random() < cfg.riseRatio;
    const big = rise && Math.random() < 0.22;
    const maxSize = big
      ? rand(cfg.maxSize, cfg.maxSize + 1.4)
      : rand(cfg.minSize, cfg.maxSize);
    sparks.push({
      x: px, y: py, by: py,
      vx: rand(-0.1, 0.1),
      vy: rise ? -rand(0.15, 0.4) : -rand(0.01, 0.1), // gentle detach; lift ramps up later
      size: 0, // blooms from 0 → maxSize (peels off the fabric)
      maxSize,
      life: 0,
      emerge: rand(6, 16),
      max: rise ? rand(90, 200) : rand(28, 78),
      rise,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      tw: rand(0.08, 0.2),
      phase: rand(0, Math.PI * 2),
      glow: big,
    });
  };

  const drawSpark = (s: Spark, alpha: number) => {
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha * cfg.alpha));
    ctx.fillStyle = s.color;
    if (s.glow) {
      ctx.shadowColor = s.color;
      ctx.shadowBlur = s.size * 2.4;
    }
    ctx.translate(s.x, s.y);
    const a = s.size * 0.42;
    const l = s.size * 2.7;
    ctx.beginPath();
    ctx.moveTo(0, -l); ctx.lineTo(a, 0); ctx.lineTo(0, l); ctx.lineTo(-a, 0); ctx.closePath();
    ctx.moveTo(-l, 0); ctx.lineTo(0, a); ctx.lineTo(l, 0); ctx.lineTo(0, -a); ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 0, s.size * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  let raf = 0;
  let running = true;
  let clock = 0; // field-local frame clock, drives the cloth sway coupling

  const draw = () => {
    if (!running) return;
    clock++;
    ctx.clearRect(0, 0, W, H);
    let toAdd = cfg.topup;
    while (toAdd-- > 0 && sparks.length < cfg.max) spawn();

    const flagTop = cy - fh * 0.5;
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.life++;

      if (s.life < s.emerge) {
        // bloom: swell up on the cloth surface
        s.size = s.maxSize * (s.life / s.emerge);
      } else if (s.rise) {
        // lift-off: buoyant upward acceleration, gradually shrinking
        s.vy -= cfg.lift;
        if (s.vy < -1.7) s.vy = -1.7;
        s.size *= 0.997;
      } else {
        // micro glint clinging to the fabric — barely moves, slowly fades
        s.size *= 0.99;
      }

      // horizontal sway coupled to the cloth; strong at birth, fades as it rises
      const risen = s.by - s.y;
      const prox = Math.max(0, 1 - risen / (fh * 1.1));
      const sway = Math.sin(clock * 0.05 + s.phase) * 0.5 * prox;
      s.x += s.vx + sway;
      s.y += s.vy;
      s.vx *= 0.99;

      if (s.life >= s.max || s.size < 0.15 || s.y < flagTop - fh * 0.55) {
        sparks.splice(i, 1);
        continue;
      }

      const lr = s.life / s.max;
      const twinkle = 0.45 + 0.55 * Math.sin(s.life * s.tw + s.phase);
      const fadeIn = s.life < s.emerge ? s.life / s.emerge : 1;
      const fadeOut = lr > 0.7 ? 1 - (lr - 0.7) / 0.3 : 1;
      // fade out as the particle climbs above the flag (it has left the cloth)
      const above = Math.max(0, flagTop - s.y);
      const leave = Math.max(0, 1 - above / (fh * 0.55));
      drawSpark(s, fadeIn * fadeOut * twinkle * leave);
    }
    raf = requestAnimationFrame(draw);
  };

  const io = new IntersectionObserver(
    (entries) => {
      const vis = entries[0]?.isIntersecting ?? true;
      if (vis && !running) {
        running = true;
        raf = requestAnimationFrame(draw);
      } else if (!vis && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    },
    { threshold: 0 }
  );
  io.observe(canvas);

  raf = requestAnimationFrame(draw);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
  };
}

/**
 * Waving American flag behind the "50 Years" seal, with sparkles both BEHIND
 * (for depth) and in FRONT of the flag, born on the flag and drifting out.
 */
export default function HeroFlag() {
  const backRef = useRef<HTMLCanvasElement>(null);
  const frontRef = useRef<HTMLCanvasElement>(null);
  const flagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const flagEl = flagRef.current;
    if (!flagEl) return;
    const cleanups: Array<() => void> = [];
    if (backRef.current) {
      // depth layer: fewer, larger, softer embers lifting off behind the seal
      cleanups.push(
        startSparkles(backRef.current, flagEl, {
          max: 70, minSize: 1.2, maxSize: 3.2, alpha: 0.5, topup: 2, riseRatio: 0.72, lift: 0.006,
        })
      );
    }
    if (frontRef.current) {
      // surface layer: dense micro glints on the cloth + quick risers emitting off it
      cleanups.push(
        startSparkles(frontRef.current, flagEl, {
          max: 240, minSize: 0.6, maxSize: 2.2, alpha: 1, topup: 7, riseRatio: 0.42, lift: 0.012,
        })
      );
    }
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <canvas ref={backRef} className="hero-flag-sparks-back" aria-hidden="true" />
      <div className="hero-flag" aria-hidden="true">
        <svg className="hero-flag-defs" aria-hidden="true">
          <filter id="heroFlagWave" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence type="fractalNoise" baseFrequency="0.009 0.022" numOctaves="2" seed="7" result="noise">
              <animate
                attributeName="baseFrequency"
                dur="13s"
                values="0.009 0.022; 0.015 0.015; 0.009 0.022"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        <div className="hero-flag-img" ref={flagRef}>
          <Flag width={500} title="American flag" />
        </div>
      </div>
      <canvas ref={frontRef} className="hero-flag-sparks" aria-hidden="true" />
    </>
  );
}
