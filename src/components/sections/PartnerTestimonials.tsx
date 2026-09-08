/**
 * PartnerTestimonials
 * -----------------------------------------------------------------------
 * Single powerful testimonial ("Knife and Bread") presented as a large
 * pull-quote card. Structured to extend to a carousel/grid later without
 * changing the data shape.
 */

interface Testimonial {
  quote: string;
  attribution: string;
  role: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I came home after a long day in the field to find nothing — only a knife and a loaf of bread on the table. That night I learned what it meant to serve with empty hands but a full heart. When EFMI stood behind me, I was no longer alone in that struggle.",
    attribution: "Partner Pastor",
    role: "Rural Ministry, Kenya",
  },
];

export default function PartnerTestimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-navy-900 px-6 py-20 sm:px-10"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
          From the Field
        </p>
        <h2 id="testimonials-heading" className="mt-3 text-3xl font-bold text-offwhite sm:text-4xl">
          The Knife and the Bread
        </h2>

        {TESTIMONIALS.map((t) => (
          <blockquote
            key={t.attribution + t.role}
            className="mt-10 rounded-lg border border-gold-500/30 bg-charcoal-900/60 p-8 sm:p-10"
          >
            {/* Decorative quote mark — hidden from AT, purely visual */}
            <span
              aria-hidden="true"
              className="font-display text-6xl leading-none text-gold-500/40"
            >
              &ldquo;
            </span>
            <p className="mt-2 text-lg italic leading-relaxed text-offwhite/90 sm:text-xl">
              {t.quote}
            </p>
            <footer className="mt-6 text-sm">
              <span className="font-semibold text-gold-400">{t.attribution}</span>
              <span className="text-offwhite/60"> — {t.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
