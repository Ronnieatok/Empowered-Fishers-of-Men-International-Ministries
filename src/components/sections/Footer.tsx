import { SITE_EMAIL, PHONE_DISPLAY, PHONE_E164 } from "@/lib/siteContact";

/**
 * Footer
 * -----------------------------------------------------------------------
 * Standard 3-column footer: Quick Links, Contact Info, Social. Copyright
 * bar computes the year at build/render time — no manual updates needed.
 */

const QUICK_LINKS = [
  { label: "About", href: "#about" },
  { label: "Leadership", href: "#leadership" },
  { label: "Our Pastors", href: "#pastors" },
  { label: "Departments", href: "#departments" },
  { label: "Partner", href: "#partner" },
  { label: "FAQ", href: "#faq" },
  { label: "Donate", href: "#donate" },
  { label: "Membership", href: "#membership" },
];

const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

// Minimal inline social icons (kept tiny — avoids pulling an icon library
// for three glyphs).
function SocialIcon({ label }: { label: string }) {
  const common = "h-5 w-5 fill-current";
  if (label === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2C16.5 4.1 15.4 4 14.2 4c-2.6 0-4.4 1.6-4.4 4.5v2.3H7.1v3.2h2.7v8h3.7Z" />
      </svg>
    );
  }
  if (label === "YouTube") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
        <path d="M22 12s0-3.1-.4-4.6a3 3 0 0 0-2.1-2.1C17.9 5 12 5 12 5s-5.9 0-7.5.3a3 3 0 0 0-2.1 2.1C2 8.9 2 12 2 12s0 3.1.4 4.6a3 3 0 0 0 2.1 2.1C6.1 19 12 19 12 19s5.9 0 7.5-.3a3 3 0 0 0 2.1-2.1C22 15.1 22 12 22 12ZM10 15.5v-7l6 3.5-6 3.5Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" className="fill-charcoal-900" />
      <circle cx="17.2" cy="6.8" r="1.1" className="fill-charcoal-900" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal-700 bg-charcoal-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:px-10 md:grid-cols-3">
        {/* About / Brand */}
        <div>
          <p className="font-display text-lg font-bold text-offwhite">
            Empowered Fishers of Men
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-offwhite/60">
            Off to go where the people are and empower every Christian to
            become a witness.
          </p>
        </div>

        {/* Quick Links */}
        <nav aria-label="Footer quick links">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-500">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-offwhite/70 transition-colors hover:text-gold-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact + Social */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-500">
            Contact
          </h3>
          <address className="mt-4 space-y-2 text-sm not-italic text-offwhite/70">
            <p>Lodwar, Kenya</p>
            <p>
              <a href={`mailto:${SITE_EMAIL}`} className="hover:text-gold-400">
                {SITE_EMAIL}
              </a>
            </p>
            <p>
              <a href={`tel:${PHONE_E164}`} className="hover:text-gold-400">
                {PHONE_DISPLAY}
              </a>
            </p>
          </address>

          <div className="mt-5 flex gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-11 w-11 items-center justify-center text-offwhite/60 transition-colors hover:text-gold-400"
              >
                <SocialIcon label={social.label} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-charcoal-700 px-6 py-5 text-center text-xs text-offwhite/50 sm:px-10">
        &copy; {year} Empowered Fishers of Men International Ministries. All
        rights reserved.
      </div>
    </footer>
  );
}
