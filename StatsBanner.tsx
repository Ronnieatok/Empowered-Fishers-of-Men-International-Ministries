/**
 * StatsBanner
 * -----------------------------------------------------------------------
 * Trust-building metrics strip. Sits directly under the Hero.
 * Server component (no interactivity) — keep it static/light for LCP.
 */

interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { value: "15+", label: "Pastors Partnered" },
  { value: "Lodwar, Kenya", label: "Where We Operate" },
  { value: "1 Hr", label: "Daily Prayer" },
  { value: "KES 10M+", label: "Raised To Date" },
];

export default function StatsBanner() {
  return (
    <section
      aria-label="Empowered Fishers of Men International Ministries impact statistics"
      className="border-y border-charcoal-700 bg-charcoal-900"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-y divide-charcoal-700 sm:grid-cols-4 sm:divide-y-0">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1.5 px-6 py-10 text-center"
          >
            <span className="font-display text-4xl font-bold text-gold-500 sm:text-5xl">
              {stat.value}
            </span>
            <span className="text-sm font-medium uppercase tracking-[0.15em] text-offwhite/70">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
