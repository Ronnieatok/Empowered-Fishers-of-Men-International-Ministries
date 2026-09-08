"use client";

import { useState } from "react";

/**
 * MinistryDepartments
 * -----------------------------------------------------------------------
 * 5 departments as expandable cards. "Interactive" = click/keyboard to
 * expand a short description, rather than navigating away — keeps
 * donors/partners on the conversion-focused single page.
 *
 * Accessibility: each trigger is a real <button> with aria-expanded and
 * aria-controls pointing at the panel it reveals.
 */

interface Department {
  id: string;
  name: string;
  summary: string;
}

const DEPARTMENTS: Department[] = [
  {
    id: "administration",
    name: "Administration",
    summary:
      "Governs finances, compliance, and reporting so every partner and donor gift is stewarded with integrity and full transparency.",
  },
  {
    id: "pastoral",
    name: "Pastoral",
    summary:
      "Provides spiritual covering, mentorship, and material support directly to the 37+ partner pastors serving in the field.",
  },
  {
    id: "missions",
    name: "Missions",
    summary:
      "Coordinates outreach into unreached and underserved communities across Kenya — evangelism, church planting, and discipleship.",
  },
  {
    id: "projects",
    name: "Projects",
    summary:
      "Delivers physical infrastructure — boreholes, clean water access, and veterinary support — that meets practical need alongside the Gospel.",
  },
  {
    id: "monitoring",
    name: "Monitoring",
    summary:
      "Tracks outcomes across every department and field partnership, ensuring accountability to donors and lasting impact on the ground.",
  },
];

export default function MinistryDepartments() {
  const [openId, setOpenId] = useState<string | null>(DEPARTMENTS[0].id);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section
      id="departments"
      aria-labelledby="departments-heading"
      className="scroll-mt-16 bg-charcoal-900 px-6 py-20 sm:px-10"
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
          How We&apos;re Organized
        </p>
        <h2 id="departments-heading" className="mt-3 text-3xl font-bold text-offwhite sm:text-4xl">
          Ministry Departments
        </h2>

        <div className="mt-10 divide-y divide-charcoal-700 rounded-lg border border-charcoal-700 bg-charcoal-800">
          {DEPARTMENTS.map((dept) => {
            const isOpen = openId === dept.id;
            const panelId = `dept-panel-${dept.id}`;
            const buttonId = `dept-trigger-${dept.id}`;

            return (
              <div key={dept.id}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(dept.id)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-charcoal-700/40"
                  >
                    <span className="text-lg font-semibold text-offwhite">
                      {dept.name}
                    </span>
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
                  <p className="text-sm leading-relaxed text-offwhite/75">
                    {dept.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
