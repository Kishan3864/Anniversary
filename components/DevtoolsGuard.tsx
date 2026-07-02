"use client";

import { useEffect } from "react";

/**
 * Deterrent that discourages casual inspection: blocks the right-click context
 * menu and the common devtools / view-source keyboard shortcuts. NOTE: this is
 * only a deterrent — page HTML/CSS/JS is always available to the browser and a
 * determined user can still open devtools via the browser menu. No secrets live
 * in the frontend, so this is purely to keep casual users out.
 */
export default function DevtoolsGuard() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => e.preventDefault();

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const blocked =
        key === "f12" || // devtools
        (e.ctrlKey && e.shiftKey && (key === "i" || key === "j" || key === "c")) || // devtools / inspector / console
        (e.ctrlKey && key === "u") || // view-source
        (e.ctrlKey && key === "s"); // save page
      if (blocked) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, []);

  return null;
}
