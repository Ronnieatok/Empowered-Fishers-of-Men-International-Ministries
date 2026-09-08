import MorphImage from "@/components/ui/MorphImage";

/**
 * ChurchLeadership
 * -----------------------------------------------------------------------
 * Founder profile + supporting note on the wider leadership council.
 * Donors and partners want to know who is accountable for their gift —
 * this section puts a name and face to that before the donation ask.
 */
export default function ChurchLeadership() {
  return (
    <section
      id="leadership"
      aria-labelledby="leadership-heading"
      className="scroll-mt-16 bg-charcoal-950 px-6 py-20 sm:px-10"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
          Church Leadership
        </p>
        <h2 id="leadership-heading" className="mt-3 text-3xl font-bold text-offwhite sm:text-4xl">
          Meet Our Founder
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-[280px_1fr] md:items-start">
          {/* Portrait — continuous JS-driven blob morph, see MorphImage */}
          <MorphImage
            mode="ambient"
            src="/images/leader-founder-portrait.jpg"
            alt="Bishop Samwel Kaaleng, Founder of Empowered Fishers of Men International Ministries"
            width={560}
            height={700}
            loading="lazy"
            className="mx-auto w-full max-w-xs border border-gold-500/30 md:mx-0"
            imageClassName="h-auto w-full object-cover"
          />

          {/* Bio */}
          <div>
            <h3 className="text-2xl font-bold text-offwhite">Bishop Samwel Kaaleng</h3>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-gold-400">
              Founder &amp; Presiding Bishop
            </p>

            <div className="mt-5 space-y-4 text-offwhite/75">
              <p>
                Bishop Samwel Kaaleng founded Empowered Fishers of Men
                International Ministries out of a conviction that pastors
                serving in Kenya&apos;s most remote and underserved regions
                should never have to carry the work alone. What began as a
                personal commitment to stand behind a handful of ministers
                in the field has grown into an interdenominational network
                spanning dozens of partner churches.
              </p>
              <p>
                Under his leadership, EFMI has stayed anchored to a simple
                strategy: prayer covering paired with practical support —
                water access, veterinary services for livestock-dependent
                households, and material provision for pastors who often
                serve with very little. Bishop Kaaleng continues to travel
                into the field regularly, meeting partner pastors where
                they are rather than asking them to come to him.
              </p>
              <p>
                He works alongside a council of ordained ministers and lay
                leaders across Administration, Pastoral care, Missions,
                Projects, and Monitoring &mdash; the five departments that
                carry out EFMI&apos;s work day to day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
