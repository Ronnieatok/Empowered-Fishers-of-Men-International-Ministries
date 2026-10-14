"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { isValidEmail, isRequired, FieldErrors } from "@/hooks/useFormValidation";
import { submitToFormSubmit } from "@/lib/submitForm";
import { SITE_EMAIL } from "@/lib/siteContact";

interface PartnerFormState {
  organization: string;
  contactName: string;
  email: string;
  message: string;
}

const INITIAL_STATE: PartnerFormState = {
  organization: "",
  contactName: "",
  email: "",
  message: "",
};

const PARTNER_TYPES = [
  "Churches & denominations",
  "NGOs & development organizations",
  "Businesses & corporate giving programs",
  "Mission agencies & sending churches",
];

/**
 * PartnerWithUs
 * -----------------------------------------------------------------------
 * Organizational partnership CTA — distinct from individual donation or
 * membership. Churches, NGOs, and businesses inquire here rather than
 * being funneled into the individual donor forms below.
 *
 * Same state/validation pattern as DonationForm and
 * MembershipRegistrationForm for consistency, using the shared
 * useFormValidation helpers.
 */
export default function PartnerWithUs() {
  const [form, setForm] = useState<PartnerFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!isRequired(form.organization)) next.organization = "Organization name is required.";
    if (!isRequired(form.contactName)) next.contactName = "Contact person is required.";
    if (!isValidEmail(form.email)) next.email = "Enter a valid email address.";
    if (!isRequired(form.message)) next.message = "Tell us a bit about the partnership you have in mind.";
    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitToFormSubmit({
        _subject: `New EFMI partnership inquiry — ${form.organization}`,
        formType: "Partnership Inquiry",
        ...form,
      });

      setSubmitted(true);
      setForm(INITIAL_STATE);
    } catch {
      setSubmitError(
        `Something went wrong sending your inquiry — please try again, or email us directly at ${SITE_EMAIL}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="partner"
      aria-labelledby="partner-heading"
      className="scroll-mt-16 bg-navy-900 px-6 py-20 sm:px-10"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-start">
        {/* Copy */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
            Partnership
          </p>
          <h2 id="partner-heading" className="mt-3 text-3xl font-bold text-offwhite sm:text-4xl">
            Partner With Us
          </h2>
          <p className="mt-4 text-offwhite/80">
            EFMI works alongside churches, NGOs, mission agencies, and
            businesses who share a commitment to standing behind pastors
            in the field. Partnership can take many forms — joint outreach,
            project co-funding, resource sharing, or a standing giving
            relationship.
          </p>

          <ul className="mt-6 space-y-2.5">
            {PARTNER_TYPES.map((type) => (
              <li key={type} className="flex gap-3 text-offwhite/80">
                <span aria-hidden="true" className="mt-0.5 text-gold-500">
                  &#10003;
                </span>
                <span>{type}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Inquiry form */}
        <div>
          {submitError && (
            <p role="alert" className="mb-4 text-sm text-red-400">
              {submitError}
            </p>
          )}
          {submitted ? (
            <div
              role="status"
              className="rounded-lg border border-gold-500/40 bg-charcoal-800 p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-gold-500">Thank you.</h3>
              <p className="mt-3 text-offwhite/85">
                We&apos;ve received your partnership inquiry and will be in
                touch soon to explore how we can work together.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-md border border-offwhite/30 px-5 py-2 text-sm font-semibold text-offwhite hover:border-gold-500 hover:text-gold-400"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5 rounded-lg border border-charcoal-700 bg-charcoal-800 p-6 sm:p-8"
            >
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-offwhite">
                  Organization Name
                </label>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  value={form.organization}
                  onChange={handleChange}
                  aria-invalid={!!errors.organization}
                  aria-describedby={errors.organization ? "organization-error" : undefined}
                  className="mt-1.5 w-full rounded-md border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-offwhite placeholder:text-offwhite/40 focus:border-gold-500"
                  placeholder=""
                />
                {errors.organization && (
                  <p id="organization-error" className="mt-1.5 text-sm text-red-400">
                    {errors.organization}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-offwhite">
                  Contact Person
                </label>
                <input
                  id="contactName"
                  name="contactName"
                  type="text"
                  value={form.contactName}
                  onChange={handleChange}
                  aria-invalid={!!errors.contactName}
                  aria-describedby={errors.contactName ? "contactName-error" : undefined}
                  className="mt-1.5 w-full rounded-md border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-offwhite placeholder:text-offwhite/40 focus:border-gold-500"
                  placeholder=""
                />
                {errors.contactName && (
                  <p id="contactName-error" className="mt-1.5 text-sm text-red-400">
                    {errors.contactName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="partner-email" className="block text-sm font-medium text-offwhite">
                  Email
                </label>
                <input
                  id="partner-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "partner-email-error" : undefined}
                  className="mt-1.5 w-full rounded-md border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-offwhite placeholder:text-offwhite/40 focus:border-gold-500"
                  placeholder=""
                />
                {errors.email && (
                  <p id="partner-email-error" className="mt-1.5 text-sm text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-offwhite">
                  Tell us about the partnership you have in mind
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="mt-1.5 w-full rounded-md border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-offwhite placeholder:text-offwhite/40 focus:border-gold-500"
                  placeholder=""
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-sm text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-gold-500 px-6 py-3.5 text-base font-semibold text-charcoal-950 shadow-gold transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending…" : "Send Inquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
