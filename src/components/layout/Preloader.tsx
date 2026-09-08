"use client";

import { useEffect, useState } from "react";

/**
 * Preloader
 * -----------------------------------------------------------------------
 * Full-screen loading overlay shown while the page's initial resources
 * (hero image, fonts) finish loading. Enforces a small minimum display
 * time so it doesn't flash-and-vanish on fast connections — a loading
 * state that appears for 40ms reads as a glitch, not as feedback.
 *
 * Rendered from the root layout (not HomepageTemplate) so it covers the
 * entire page, including the Navbar, from the very first paint.
 */
export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const MIN_DISPLAY_MS = 500;
    const FADE_MS = 400;
    const start = Date.now();

    function finish() {
      const elapsed = Date.now() - start;
      const remaining = Math.max(MIN_DISPLAY_MS - elapsed, 0);
      window.setTimeout(() => {
        setFadingOut(true);
        window.setTimeout(() => setVisible(false), FADE_MS);
      }, remaining);
    }

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
      return () => window.removeEventListener("load", finish);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-charcoal-950 transition-opacity duration-[400ms] ${
        fadingOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <span className="font-display text-2xl font-bold tracking-wide text-offwhite">
        EFMI
      </span>
      <span
        aria-hidden="true"
        className="h-9 w-9 animate-spin rounded-full border-2 border-gold-500/30 border-t-gold-500"
      />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
