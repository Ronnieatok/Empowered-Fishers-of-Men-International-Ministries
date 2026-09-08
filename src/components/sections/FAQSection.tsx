"use client";

import { useState } from "react";

/**
 * FAQSection
 * -----------------------------------------------------------------------
 * Answers common donor/partner objections right before the donation ask.
 * Same single-open accordion pattern as MinistryDepartments, reused here
 * for UI consistency across the site.
 */

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "how-used",
    question: "How is my donation used?",
    answer:
      "Gifts go directly toward the strategy laid out on this site: prayer covering and practical support for partner pastors, borehole and clean water projects, veterinary services for livestock-dependent households, and administrative costs that keep the ministry accountable and running.",
  },
  {
    id: "mpesa",
    question: "Can I donate using M-Pesa?",
    answer:
      "Yes. Select M-Pesa as your payment method in the donation form below — you'll receive a payment prompt on your phone to complete the gift, no card needed.",
  },
  {
    id: "recurring",
    question: "Can I set up a recurring gift instead of a one-time donation?",
    answer:
      "Yes. The donation form lets you choose monthly, quarterly, or annual giving in addition to one-time gifts.",
  },
  {
    id: "membership-vs-donation",
    question: "What's the difference between membership and donating?",
    answer:
      "Membership (Ksh 500/year or Ksh 100/month) makes you a formal part of the EFMI community with standing and voice in the ministry. Donations are gifts toward specific work in the field and don't require membership.",
  },
  {
    id: "partner-org",
    question: "Can my church or organization partner with EFMI directly?",
    answer:
      "Yes — see the Partner With Us section above. Churches, NGOs, mission agencies, and businesses can co-fund projects, share resources, or build an ongoing giving relationship with the ministry.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-16 bg-charcoal-950 px-6 py-20 sm:px-10"
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
          Questions
        </p>
        <h2 id="faq-heading" className="mt-3 text-3xl font-bold text-offwhite sm:text-4xl">
          Frequently Asked Questions
        </h2>

        <div className="mt-10 divide-y divide-charcoal-700 rounded-lg border border-charcoal-700 bg-charcoal-900">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            const panelId = `faq-panel-${faq.id}`;
            const buttonId = `faq-trigger-${faq.id}`;

            return (
              <div key={faq.id}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(faq.id)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-charcoal-800/60"
                  >
                    <span className="font-semibold text-offwhite">{faq.question}</span>
                    <span
                      aria-hidden="true"
                      className={`shrink-0 text-2xl leading-none text-gold-500 transition-transform duration-200 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-6 pb-6"
                >
                  <p className="text-sm leading-relaxed text-offwhite/75">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
