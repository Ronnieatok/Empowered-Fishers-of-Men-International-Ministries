/**
 * ProblemSolutionSection
 * -----------------------------------------------------------------------
 * Two-column split: "The Problem" (charcoal, muted) vs "The Strategy"
 * (gold-accented) — a visual before/after that reinforces the donation
 * ask right above the DonationForm.
 */

const PROBLEMS = [
  "Pastors serving in remote areas with little to no financial support",
  "Water shortages affecting congregations and surrounding communities",
  "Low literacy limiting access to Scripture and discipleship materials",
  "Isolation — ministers with no network of prayer or encouragement",
];

const STRATEGIES = [
  "Empowering and equipping pastors with training and material support",
  "Digging boreholes to provide clean, reliable water access",
  "Offering veterinary services that sustain livestock-dependent households",
  "Building a covering network of daily prayer and pastoral encouragement",
];

export default function ProblemSolutionSection() {
  return (
    <section
      aria-labelledby="problem-solution-heading"
      className="bg-charcoal-950 px-6 py-20 sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="problem-solution-heading" className="sr-only">
          The Problem and Our Strategy
        </h2>

        <div className="grid overflow-hidden rounded-lg border border-charcoal-700 md:grid-cols-2">
          {/* The Problem */}
          <div className="bg-charcoal-900 p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-offwhite/50">
              The Problem
            </p>
            <h3 className="mt-3 text-2xl font-bold text-offwhite">
              Ministers on the field are carrying too much alone.
            </h3>
            <ul className="mt-6 space-y-4">
              {PROBLEMS.map((item) => (
                <li key={item} className="flex gap-3 text-offwhite/70">
                  <span aria-hidden="true" className="mt-0.5 text-lg leading-none text-offwhite/40">
                    &#8722;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* The Strategy */}
          <div className="bg-navy-900 p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              The Strategy
            </p>
            <h3 className="mt-3 text-2xl font-bold text-offwhite">
              We stand behind them — in prayer and in practice.
            </h3>
            <ul className="mt-6 space-y-4">
              {STRATEGIES.map((item) => (
                <li key={item} className="flex gap-3 text-offwhite/85">
                  <span aria-hidden="true" className="mt-0.5 text-lg leading-none text-gold-500">
                    &#10003;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
