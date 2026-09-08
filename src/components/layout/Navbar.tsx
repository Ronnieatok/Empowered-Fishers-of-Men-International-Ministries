"use client";

import { useEffect, useState } from "react";

/**
 * Navbar
 * -----------------------------------------------------------------------
 * Fixed header with desktop inline links and a mobile slide-down menu.
 * - Locks body scroll while the mobile menu is open (prevents background
 *   scroll behind the overlay on touch devices).
 * - Closes on route-anchor click and on Escape.
 * - Hamburger button meets the 44x44px touch-target minimum.
 */

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Leadership", href: "#leadership" },
  { label: "Our Pastors", href: "#pastors" },
  { label: "Departments", href: "#departments" },
  { label: "Partner", href: "#partner" },
  { label: "FAQ", href: "#faq" },
  { label: "Donate", href: "#donate" },
  { label: "Membership", href: "#membership" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock/unlock body scroll when the mobile menu opens/closes.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape for keyboard users.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-charcoal-700/60 bg-charcoal-950/90 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-10"
      >
        <a
          href="#top"
          className="font-display text-base font-bold text-offwhite sm:text-lg"
          onClick={() => setIsOpen(false)}
        >
          EFMI
        </a>

        {/* Desktop links — hidden below lg (8 items needs tight spacing) */}
        <ul className="hidden items-center gap-3.5 lg:flex xl:gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="whitespace-nowrap text-[13px] font-medium text-offwhite/80 transition-colors hover:text-gold-400 xl:text-sm"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#donate"
          className="hidden rounded-md bg-gold-500 px-5 py-2 text-sm font-semibold text-charcoal-950 transition-colors hover:bg-gold-400 lg:inline-flex"
        >
          Donate
        </a>

        {/* Mobile hamburger — 44x44 tap target, visible below lg */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center rounded-md text-offwhite lg:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="h-6 w-6 stroke-current"
            strokeWidth="2"
          >
            {isOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        hidden={!isOpen}
        className="border-t border-charcoal-700/60 bg-charcoal-950 lg:hidden"
      >
        <ul className="flex flex-col px-6 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-base font-medium text-offwhite/90 hover:text-gold-400"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#donate"
              onClick={() => setIsOpen(false)}
              className="block rounded-md bg-gold-500 px-5 py-3 text-center text-base font-semibold text-charcoal-950 hover:bg-gold-400"
            >
              Donate
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
