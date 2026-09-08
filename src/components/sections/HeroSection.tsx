"use client";

import Image from "next/image";

/**
 * HeroSection
 * -----------------------------------------------------------------------
 * Full-viewport hero with a dark-image background, gold-fade scrim (for
 * text contrast/WCAG AA on top of an arbitrary photo), headline, motto,
 * and dual CTAs (primary: Donate, secondary: Join Us).
 *
 * Notes:
 * - Uses next/image with `priority` since this is the LCP element.
 * - The scrim (bg-gold-fade) guarantees >=4.5:1 contrast for the offwhite
 *   text regardless of the underlying photo's brightness.
 * - Buttons are real <a> elements styled as buttons — keeps them
 *   keyboard/screen-reader navigable and linkable without JS.
 */
export default function HeroSection() {
  return (
    <section
      id="top"
      aria-label="Empowered Fishers of Men International Ministries introduction"
      className="relative isolate flex min-h-[100svh] w-full items-end overflow-hidden bg-charcoal-950 sm:min-h-[92dvh]"
    >
      {/* Background image */}
      <Image
        src="/images/hero-field-ministry.jpg"
        alt="Pastors and congregants gathered in prayer at an outdoor ministry event in Kenya"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Contrast scrim — dark navy/charcoal gradient rising from the bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gold-fade"
      />

      {/* Subtle top vignette so the nav bar (if transparent) stays legible */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal-950/80 to-transparent"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-20 pt-40 sm:px-10 sm:pb-28">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-charcoal-950/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
          Interdenominational &middot; Kenya
        </p>

        <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] text-offwhite sm:text-5xl md:text-6xl">
          Empowered Fishers of Men
          <span className="block text-gold-500">International Ministries</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-offwhite/85 sm:text-xl">
          Off to go where the people are and empower every Christian to
          become a witness.
        </p>

        {/* CTA group */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#donate"
            className="inline-flex items-center justify-center rounded-md bg-gold-500 px-8 py-4 text-base font-semibold text-charcoal-950 shadow-gold transition-colors duration-200 hover:bg-gold-400 focus-visible:bg-gold-400"
          >
            Donate Now
          </a>
          <a
            href="#membership"
            className="inline-flex items-center justify-center rounded-md border border-offwhite/30 bg-transparent px-8 py-4 text-base font-semibold text-offwhite transition-colors duration-200 hover:border-gold-500 hover:text-gold-400"
          >
            Join Us
          </a>
        </div>
      </div>
    </section>
  );
}
