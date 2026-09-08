import { ReactNode } from "react";

/**
 * MissionGrid ("About Us")
 * -----------------------------------------------------------------------
 * Three-card grid: Vision, Purpose, Objectives. Objectives card lists
 * the sub-goals (Motivate, Encourage, Educate, ...) as a compact list
 * so the card doesn't dominate the grid on desktop.
 */

interface MissionCard {
  title: string;
  icon: ReactNode;
  body: ReactNode;
}

const OBJECTIVES = [
  "Motivate believers to active witness",
  "Encourage pastors serving in hard-to-reach areas",
  "Educate congregations in sound doctrine and life skills",
  "Equip local churches with practical resources",
  "Mobilize prayer covering across partner regions",
];

// Minimal inline icons (no external icon library dependency)
function IconEye() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-7 w-7 stroke-gold-500" strokeWidth="1.75">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCompass() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-7 w-7 stroke-gold-500" strokeWidth="1.75">
      <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 9l-2 6-6 2 2-6 6-2Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-7 w-7 stroke-gold-500" strokeWidth="1.75">
      <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="1" fill="currentColor" className="fill-gold-500" />
    </svg>
  );
}

const CARDS: MissionCard[] = [
  {
    title: "Vision",
    icon: <IconEye />,
    body: (
      <p className="text-offwhite/75">
        A Kenya — and a world — where every Christian actively lives out
        the Great Commission, and no pastor stands alone in the field.
      </p>
    ),
  },
  {
    title: "Purpose",
    icon: <IconCompass />,
    body: (
      <p className="text-offwhite/75">
        To go where the people are: standing behind local pastors in
        prayer and practical support so the Gospel reaches the
        underserved and unreached.
      </p>
    ),
  },
  {
    title: "Objectives",
    icon: <IconTarget />,
    body: (
      <ul className="space-y-2 text-offwhite/75">
        {OBJECTIVES.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true" className="mt-1 text-gold-500">
              &#8226;
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
];

export default function MissionGrid() {
  return (
    <section
      id="about"
      aria-labelledby="mission-heading"
      className="scroll-mt-16 bg-charcoal-950 px-6 py-20 sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
            Who We Are
          </p>
          <h2 id="mission-heading" className="mt-3 text-3xl font-bold text-offwhite sm:text-4xl">
            Vision, Purpose &amp; Objectives
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="rounded-lg border border-charcoal-700 bg-charcoal-900 p-7 transition-colors hover:border-gold-500/50"
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold text-offwhite">{card.title}</h3>
              <div className="mt-3 text-sm leading-relaxed">{card.body}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
