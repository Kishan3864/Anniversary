"use client";

import { useEffect, useRef, useState } from "react";

// Gold + green only (no blue — it disappears on the dark hero background).
// Each family is ordered dark -> light so colors brighten as the 5s plays.
const GOLD = ["#a9781f", "#c2902b", "#d4af37", "#e3c256", "#f0da8a", "#fdf0b8"];
const GREEN = ["#2f9e14", "#3fb81e", "#4ae224", "#6fe84a", "#86f06a", "#a9f593"];

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

// Timing (ms) — one single 5s celebration with smooth in/out.
const DURATION = 5000;
const SPAWN_END = 3800; // stop launching new fireworks
const FADE_IN = 400; // ease the whole thing in
const FADE_START = 3900; // begin the smooth fade-out
const FADE_END = 4900; // fully faded
const END = 5000;
const DIM = 0.92; // keep colors a touch softer ("little dimmer")

// Color by elapsed time: darker gold/green early, lighter gold/green later.
const colorAt = (el: number) => {
  if (Math.random() < 0.06) return "#ffffff"; // occasional light sparkle
  const f = clamp(el / DURATION, 0, 1);
  const fam = Math.random() < 0.5 ? GOLD : GREEN;
  const idx = clamp(Math.round(f * (fam.length - 1) + rand(-1.5, 1.5)), 0, fam.length - 1);
  return fam[idx];
};

type Spark = {
  x: number; y: number; vx: number; vy: number;
  g: number; drag: number; r: number; color: string;
  life: number; max: number;
};

/**
 * CELEBRATION EFFECT No. 2 — "legendary" (fireworks only).
 * One single ~5-second canvas fireworks show. No confetti — just many small
 * spark particles bursting all over, in a gold/green palette that brightens
 * over time. Eases in at the start and fades out smoothly at the end.
 * Client-only (no hydration risk), respects reduced-motion.
 */
export default function CelebrationLegendary() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const parts: Spark[] = [];

    // A firework = a ring of many small spark pieces.
    const burst = (el: number, px?: number, py?: number) => {
      if (parts.length > 3200) return;
      const cx = px === undefined ? rand(W * 0.1, W * 0.9) : px;
      const cy = py === undefined ? rand(H * 0.1, H * 0.55) : py;
      const base = colorAt(el);
      const n = 80 + ((Math.random() * 45) | 0); // 80–124 small pieces
      const power = rand(3.5, 9);
      for (let i = 0; i < n; i++) {
        const ang = (i / n) * Math.PI * 2 + rand(-0.05, 0.05);
        const spd = rand(1.4, power);
        parts.push({
          x: cx, y: cy,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          g: 0.045, drag: rand(0.88, 0.92),
          r: rand(1.1, 3), // small pieces
          color: Math.random() < 0.65 ? base : colorAt(el),
          life: 0, max: rand(45, 90),
        });
      }
    };

    const start = performance.now();
    let opened = false;
    let nextFw = 220;
    let raf = 0;

    const frame = (now: number) => {
      const el = now - start;

      // opening volley — several bursts at once for a strong (but eased-in) start
      if (!opened) {
        for (let k = 0; k < 5; k++) burst(el);
        opened = true;
      }
      // sustained, frequent fireworks through the run
      while (el >= nextFw && el < SPAWN_END) {
        burst(el);
        if (Math.random() < 0.6) burst(el);
        nextFw += rand(150, 250);
      }

      ctx.clearRect(0, 0, W, H);

      // opening gold flash (fades with the global ease-in)
      if (el < 460) {
        const a = (1 - el / 460) * 0.24;
        const grad = ctx.createRadialGradient(W / 2, H * 0.4, 0, W / 2, H * 0.4, Math.max(W, H) * 0.7);
        grad.addColorStop(0, `rgba(212,175,55,${a})`);
        grad.addColorStop(1, "rgba(212,175,55,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      }

      // global opacity: smooth in at the start, smooth out at the end
      let gfade = 1;
      if (el < FADE_IN) gfade = el / FADE_IN;
      else if (el >= FADE_START) gfade = Math.max(0, 1 - (el - FADE_START) / (FADE_END - FADE_START));
      gfade *= DIM;

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.vy += p.g;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const alpha = (1 - p.life / p.max) * gfade;
        if (alpha <= 0.01 || p.life > p.max) {
          parts.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (el > END) {
        ctx.clearRect(0, 0, W, H);
        setShow(false);
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (!show) return null;
  return <canvas ref={canvasRef} className="celebrate-canvas" aria-hidden="true" />;
}
