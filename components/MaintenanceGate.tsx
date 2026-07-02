"use client";

import { useEffect, useState } from "react";

import Bolt from "./Bolt";

const API = "/admin-api";

/**
 * Reads the maintenance lock status and, when the site is locked, covers it with
 * an "Under Maintenance" screen for every visitor. The /admin page is never
 * gated (so the owner can always get in to unlock). Fails OPEN — if the control
 * service is unreachable, the site stays visible.
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
        <span className="maintenance-bolt" aria-hidden="true">
          <Bolt width={22} height={36} />
        </span>
        <h1>Under Maintenance</h1>
        <p>
          Our website is temporarily down for scheduled maintenance.
          <br />
          We&apos;ll be back online shortly — thank you for your patience.
        </p>
        <a className="maintenance-call" href="tel:+15615822600">
          Need urgent help? Call (561) 582-2600
        </a>
        <span className="maintenance-brand">
          Wally Nassif Electrical Contracting Service
        </span>
      </div>
    </div>
  );
}
