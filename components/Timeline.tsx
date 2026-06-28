"use client";

import { useEffect, useRef, useState } from "react";

type Milestone = {
  year: string;
  title: string;
  desc: string;
  final?: boolean;
};

const MILESTONES: Milestone[] = [
  {
    year: "1976",
    title: "Started Electrical Apprenticeship",
    desc: "Wally Nassif enters the electrical trade, beginning a lifelong pursuit of the craft.",
  },
  {
    year: "1984",
    title: "Master Electrician",
    desc: "Years of hands-on work culminate in the master electrician credential.",
  },
  {
    year: "1992",
    title: "Florida State Certified Electrical Contractor",
    desc: "Officially licensed to take on larger, more complex projects across the state.",
  },
  {
    year: "2000+",
    title: "Commercial & Industrial Expansion",
    desc: "Scaling into commercial buildouts and industrial power distribution systems.",
  },
  {
    year: "2015+",
    title: "Generator Sales & Service",
    desc: "Adding standby power solutions to keep homes and businesses running through any outage.",
  },
  {
    year: "2020+",
    title: "EV Charging Infrastructure",
    desc: "Embracing the future with electric-vehicle charging for homes and commercial sites.",
  },
  {
    year: "2026",
    title: "Celebrating 50 Years in the Trade",
    desc: "Half a century of trusted electrical excellence — and still building the future.",
    final: true,
  },
];

export default function Timeline() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section timeline-section" id="timeline">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow center">The Journey</span>
          <h2>Five Decades of Powering Progress</h2>
          <p>
            From a first apprenticeship to a half-century milestone — every step
            built on the last.
          </p>
        </div>

        <div className={`timeline ${visible ? "is-visible" : ""}`} ref={ref}>
          <div className="timeline-line" aria-hidden="true">
            <span className="fill" />
          </div>

          {MILESTONES.map((m, i) => (
            <div
              key={m.year}
              className={`tl-item reveal ${i % 2 === 0 ? "left" : "right"} ${
                visible ? "is-visible" : ""
              }`}
              style={{ transitionDelay: `${i * 140}ms` }}
            >
              <span className={`tl-dot ${m.final ? "final" : ""}`} aria-hidden="true" />
              <div className={`tl-card ${m.final ? "gold" : ""}`}>
                <div className="tl-year">{m.year}</div>
                <div className="tl-title">{m.title}</div>
                <div className="tl-desc">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
