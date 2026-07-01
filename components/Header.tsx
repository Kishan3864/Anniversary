"use client";

import { useEffect, useState } from "react";

import Bolt from "./Bolt";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Our Story", href: "#legacy" },
  { label: "Our Journey", href: "#timeline" },
  { label: "Why Choose Us", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-close the mobile drawer when the viewport grows back to desktop.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1100) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`site-header ${scrolled ? "scrolled" : ""} ${open ? "menu-open" : ""}`}
    >
      <div className="topbar">
        <div className="container">
          <div className="tb-left">
            <a href="tel:+15615822600">📞 (561) 582-2600</a>
            <a href="mailto:info@nassifelectric.com">✉ info@nassifelectric.com</a>
            <span>FL Lic. EC13001410 · Licensed · Insured · Bonded</span>
          </div>
          <div className="tb-right"><Bolt />24/7 Emergency Service</div>
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

          <nav className="nav" id="primary-nav" aria-label="Primary">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
            <a className="btn btn-green nav-cta" href="#contact" onClick={closeMenu}>
              Request Service
            </a>
          </nav>

          <div className="header-right">
            <a className="header-phone" href="tel:+15615822600">
              <span>Call Us Today</span>
              <b>(561) 582-2600</b>
            </a>
            <a
              className="btn btn-green header-cta"
              href="#contact"
              style={{ padding: "0.7rem 1.1rem" }}
            >
              Request Service
            </a>
            <button
              type="button"
              className="menu-toggle"
              aria-label="Toggle menu"
              aria-controls="primary-nav"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
