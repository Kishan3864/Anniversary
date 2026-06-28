"use client";

import { useEffect, useState } from "react";

const NAV = [
  { label: "Legacy", href: "#legacy" },
  { label: "Services", href: "#services" },
  { label: "Timeline", href: "#timeline" },
  { label: "Why Us", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="Wally Nassif Electrical — home">
          <svg className="brand-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="bm" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f4d778" />
                <stop offset="100%" stopColor="#b38728" />
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22" stroke="url(#bm)" strokeWidth="1.6" />
            <path
              d="M26 9 L14 27 H22 L20 39 L34 19 H25 L29 9 Z"
              fill="url(#bm)"
            />
          </svg>
          <span>
            <span className="brand-name">Wally Nassif</span>
            <span className="brand-sub" style={{ display: "block" }}>
              Electrical Contracting
            </span>
          </span>
        </a>

        <nav className="nav" aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-right">
          <span className="header-badge" aria-label="Celebrating 50 years, 1976 to 2026">
            <span className="spark" aria-hidden="true" />
            <b>50</b> Years · 1976–2026
          </span>
          <a className="btn btn-gold" href="#contact" style={{ padding: "0.7rem 1.1rem" }}>
            Free Estimate
          </a>
        </div>
      </div>
    </header>
  );
}
