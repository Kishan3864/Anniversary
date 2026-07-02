"use client";

import { useState } from "react";

import Bolt from "../../components/Bolt";

const API = "/admin-api";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [locked, setLocked] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const r = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!r.ok) throw new Error("bad");
      const d = await r.json();
      setLocked(d.locked === true);
      setAuthed(true);
    } catch {
      setError("Incorrect password. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function toggle() {
    if (busy) return;
    const next = !locked;
    setBusy(true);
    setError("");
    try {
      const r = await fetch(`${API}/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, locked: next }),
      });
      if (!r.ok) throw new Error("bad");
      const d = await r.json();
      setLocked(d.locked === true);
    } catch {
      setError("Could not update. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="admin">
      <div className="admin-card">
        <div className="admin-badge" aria-hidden="true">
          <Bolt width={16} height={26} />
        </div>
        <h1>Site Control</h1>

        {!authed ? (
          <form onSubmit={login} className="admin-login">
            <label htmlFor="admin-pw">Admin password</label>
            <input
              id="admin-pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              autoFocus
            />
            <button type="submit" disabled={busy || !password}>
              {busy ? "Checking…" : "Unlock Panel"}
            </button>
            {error && <p className="admin-error">{error}</p>}
          </form>
        ) : (
          <div className="admin-panel">
            <button
              type="button"
              role="switch"
              aria-checked={locked}
              className={`admin-switch ${locked ? "is-locked" : ""}`}
              onClick={toggle}
              disabled={busy}
            >
              <span className="admin-switch-track">
                <span className="admin-switch-thumb" />
              </span>
              <span className="admin-switch-label">
                {locked ? "Locked" : "Unlocked"}
              </span>
            </button>

            <p className={`admin-status ${locked ? "is-locked" : ""}`}>
              {locked
                ? "The site is LOCKED — visitors see the “Under Maintenance” page."
                : "The site is LIVE — visitors see the site normally."}
            </p>
            {error && <p className="admin-error">{error}</p>}
          </div>
        )}
      </div>
    </main>
  );
}
