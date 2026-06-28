"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

type Stat = {
  /** numeric target to count up to, or a word to display */
  value: number | string;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 50, label: "Years of Experience" },
  { value: "Thousands", label: "Satisfied Customers" },
  { value: "Millions", label: "Feet of Wire Installed" },
  { value: "Countless", label: "Problems Solved" },
];

function CountUp({ target }: { target: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1600;
        let raf = 0;
        let startTs: number | null = null;
        const step = (ts: number) => {
          if (startTs === null) startTs = ts;
          const p = Math.min((ts - startTs) / duration, 1);
          // easeOutExpo
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          setN(Math.round(eased * target));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        observer.disconnect();
        return () => cancelAnimationFrame(raf);
      }
    }, { threshold: 0.4 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{n}</span>;
}

export default function Counters() {
  return (
    <section className="section counters">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow center">By The Numbers</span>
          <h2>Half a Century of Impact</h2>
        </div>
        <div className="counters-grid">
          {STATS.map((s, i) => (
            <Reveal key={s.label} className="counter-card" delay={i * 100}>
              <div className={`counter-num ${typeof s.value === "string" ? "text" : ""}`}>
                {typeof s.value === "number" ? <CountUp target={s.value} /> : s.value}
                {s.suffix ?? ""}
              </div>
              <div className="counter-label">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
