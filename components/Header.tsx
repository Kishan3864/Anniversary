"use client";

import { useEffect, useState } from "react";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Our Story", href: "#legacy" },
  { label: "Our Journey", href: "#timeline" },
  { label: "Why Choose Us", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="topbar">
        <div className="container">
          <div className="tb-left">
            <a href="tel:+15615822600">📞 (561) 582-2600</a>
            <a href="mailto:info@nassifelectric.com">✉ info@nassifelectric.com</a>
            <span>FL Lic. EC13001410 · Licensed · Insured · Bonded</span>
          </div>
          <div className="tb-right">⚡ 24/7 Emergency Service</div>
        </div>
      </div>

      <div className="header-main">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="Wally Nassif Electrical Contracting Service — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="brand-logo"
              src="/wally-nassif-logo.png"
              alt="Wally Nassif Electrical Contracting Service"
              width={866}
              height={274}
            />
          </a>

          <nav className="nav" aria-label="Primary">
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-right">
            <a className="header-phone" href="tel:+15615822600">
              <span>Call Us Today</span>
              <b>(561) 582-2600</b>
            </a>
            <a className="btn btn-green" href="#contact" style={{ padding: "0.7rem 1.1rem" }}>
              Request Service
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
