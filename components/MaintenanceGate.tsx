"use client";

import { useEffect, useState } from "react";

const API = "/admin-api";

/**
 * Reads the lock status and, when the site is locked, covers it with an
 * on-hold notice for every visitor. The /admin page is never gated (so the
 * owner can always unlock). Fails OPEN — if the control service is unreachable,
 * the site stays visible.
 */
export default function MaintenanceGate() {
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const path = window.location.pathname.replace(/\/+$/, "");
    if (path.endsWith("/admin")) return; // never lock the control page

    let alive = true;
    fetch(`${API}/status`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d && d.locked === true) setLocked(true);
      })
      .catch(() => {
        /* control service unreachable → leave the site visible */
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [locked]);

  if (!locked) return null;

  return (
    <div className="maintenance" role="alert" aria-live="assertive">
      <div className="maintenance-inner">
        <span className="maintenance-icon" aria-hidden="true">
          <svg width="30" height="34" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="10" width="16" height="11" rx="2.5" stroke="#f6e29a" strokeWidth="1.7" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="#f6e29a" strokeWidth="1.7" strokeLinecap="round" />
            <circle cx="12" cy="15" r="1.5" fill="#f6e29a" />
            <path d="M12 16.3v2.2" stroke="#f6e29a" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </span>
        <h1>Website On Hold</h1>
        <p>
          This website is temporarily unavailable pending payment.
          <br />
          Full service will be restored as soon as the account is settled.
        </p>
      </div>
    </div>
  );
}
