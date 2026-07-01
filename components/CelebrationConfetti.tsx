"use client";

import { useEffect, useState } from "react";

/** Brand palette + gold anniversary accents for the confetti. */
const COLORS = [
  "#0909d8", // brand blue
  "#3b3bff",
  "#4ae224", // brand green
  "#86f06a",
  "#d4af37", // gold
  "#fdf0b8",
  "#ffffff",
];

type Piece = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rot: number;
  drift: number;
  round: boolean;
};

/**
 * CELEBRATION EFFECT No. 1 — "confetti rain".
 * A calm one-shot confetti fall on every page load. Pieces are generated
 * client-side (in useEffect) so there is no SSR hydration mismatch, and the
 * whole overlay removes itself when done.
 */
export default function CelebrationConfetti() {
  const [pieces, setPieces] = useState<Piece[] | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const COUNT = 150;
    const arr: Piece[] = Array.from({ length: COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1,
      duration: 3 + Math.random() * 2.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 9,
      rot: Math.random() * 360,
      drift: (Math.random() - 0.5) * 220,
      round: Math.random() < 0.28,
    }));
    setPieces(arr);

    const t = setTimeout(() => setDone(true), 6600);
    return () => clearTimeout(t);
  }, []);

  if (done || !pieces) return null;

  return (
    <div className="celebrate" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className={`confetti${p.round ? " round" : ""}`}
          style={
            {
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.round ? p.size : Math.max(3, Math.round(p.size * 0.5))}px`,
              background: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--drift": `${p.drift}px`,
              "--rot": `${p.rot}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
