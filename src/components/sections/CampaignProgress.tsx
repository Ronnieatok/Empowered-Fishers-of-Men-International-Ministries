/**
 * CampaignProgress ("Current Project")
 * -----------------------------------------------------------------------
 * A specific, named fundraising goal — donation pages convert better
 * against a concrete target than a vague "give to the general fund" ask.
 *
 * IMPORTANT: this deliberately does NOT show a "raised so far" figure or
 * progress bar. EFMI doesn't yet track how much has been raised toward
 * this specific project separately from overall giving — showing any
 * number here (even a conservative-looking one) would be fabricated
 * data on a page asking people for money. Once that figure is tracked,
 * reintroduce the progress bar (see git history on this file for the
 * previous version) with the real number.
 */

const CAMPAIGN = {
  title: "Kalobeyei Borehole Project",
  description:
    "Clean water access for a community of over 600 people currently walking several kilometers a day to the nearest water point.",
  goal: 500_000,
  currency: "KES",
};

export default function CampaignProgress() {
  return (
    <section
      aria-labelledby="campaign-heading"
      className="bg-navy-900 px-6 py-20 sm:px-10"
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
          Current Project
        </p>
        <h2 id="campaign-heading" className="mt-3 text-3xl font-bold text-offwhite sm:text-4xl">
          {CAMPAIGN.title}
        </h2>
        <p className="mt-3 text-offwhite/75">{CAMPAIGN.description}</p>

        <div className="mt-8 rounded-lg border border-charcoal-700 bg-charcoal-900 p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-sm text-offwhite/60">Project goal</span>
            <span className="text-2xl font-bold text-gold-500 sm:text-3xl">
              {CAMPAIGN.currency} {CAMPAIGN.goal.toLocaleString()}
            </span>
          </div>

          <a
            href="#donate"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-gold-500 px-6 py-3 text-sm font-semibold text-charcoal-950 shadow-gold transition-colors hover:bg-gold-400"
          >
            Help Us Reach the Goal
          </a>
        </div>
      </div>
    </section>
  );
}
