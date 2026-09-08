import MorphImage from "@/components/ui/MorphImage";

/**
 * PastorsNetwork ("Our Pastors")
 * -----------------------------------------------------------------------
 * Expands on the "37+ Pastors Partnered" stat with the human story behind
 * it: who these pastors are, what they face, and how EFMI stands behind
 * them. Sits between the founder profile and the department breakdown so
 * the funnel reads: leader -> the people he serves -> how the org is
 * structured to serve them.
 */

const SUPPORT_POINTS = [
  {
    title: "Daily Prayer Covering",
    body: "Every partner pastor is held in a standing hour of daily prayer, so no one carries the spiritual weight of their calling in isolation.",
  },
  {
    title: "Material & Financial Support",
    body: "Where a pastor's ministry has left their household without basic provision, EFMI steps in with direct, practical support.",
  },
  {
    title: "Training & Encouragement",
    body: "Regular gatherings and mentorship help pastors grow in ministry skill and stay resilient in remote, often isolating postings.",
  },
  {
    title: "A Network, Not a Program",
    body: "Partner pastors are connected to one another across regions — a peer network as much as a support structure.",
  },
];

export default function PastorsNetwork() {
  return (
    <section
      id="pastors"
      aria-labelledby="pastors-heading"
      className="scroll-mt-16 bg-charcoal-900 px-6 py-20 sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Image — continuous JS-driven blob morph, offset so it doesn't
              sync with the leadership portrait's animation cycle */}
          <MorphImage
            mode="ambient"
            startIndex={2}
            intervalMs={3800}
            src="/images/pastor-field-devotion.jpg"
            alt="A partner pastor reviewing his notes and Scripture while out in the field"
            width={700}
            height={900}
            loading="lazy"
            className="border border-charcoal-700 lg:order-2"
            imageClassName="h-auto w-full object-cover"
          />

          {/* Copy */}
          <div className="lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              Our Pastors
            </p>
            <h2 id="pastors-heading" className="mt-3 text-3xl font-bold text-offwhite sm:text-4xl">
              37+ Pastors, One Family
            </h2>
            <p className="mt-4 text-offwhite/75">
              Most of our partner pastors serve in areas with little
              infrastructure, unreliable water, and no salary to speak of —
              often preaching, counseling, and pastoring a congregation
              while also working the land to feed their own families.
              Isolation is as much a threat to their ministry as any
              material lack. EFMI exists to close that gap.
            </p>

            <dl className="mt-8 space-y-6">
              {SUPPORT_POINTS.map((point) => (
                <div key={point.title} className="border-l-2 border-gold-500/50 pl-5">
                  <dt className="font-semibold text-offwhite">{point.title}</dt>
                  <dd className="mt-1 text-sm text-offwhite/70">{point.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
