"use client";

import { useEffect, useState } from "react";

/**
 * BackToTop
 * -----------------------------------------------------------------------
 * Floating button that appears once the visitor has scrolled past the
 * hero, and smooth-scrolls back to #top on click. Scroll listener is
 * throttled via requestAnimationFrame to avoid firing state updates on
 * every single scroll event.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    function handleScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > 600);
        ticking = false;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/40 bg-charcoal-900/90 text-gold-400 shadow-gold backdrop-blur transition-all duration-200 hover:bg-charcoal-800 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-5 w-5 stroke-current"
        strokeWidth="2"
      >
        <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
