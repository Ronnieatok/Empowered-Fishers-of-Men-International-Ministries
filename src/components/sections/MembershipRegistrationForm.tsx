"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import {
  isValidEmail,
  isValidKenyanPhone,
  isRequired,
  FieldErrors,
} from "@/hooks/useFormValidation";
import { submitToFormSubmit } from "@/lib/submitForm";
import { SITE_EMAIL } from "@/lib/siteContact";

interface MembershipFormState {
  fullName: string;
  address: string;
  phone: string;
  email: string;
  billingCycle: "annual" | "monthly";
}

const INITIAL_STATE: MembershipFormState = {
  fullName: "",
  address: "",
  phone: "",
  email: "",
  billingCycle: "annual",
};

/**
 * MembershipRegistrationForm
 * -----------------------------------------------------------------------
 * Self-contained membership sign-up. Mirrors DonationForm's state/
 * validation pattern for consistency, using the shared
 * useFormValidation helpers.
 */
export default function MembershipRegistrationForm() {
  const [form, setForm] = useState<MembershipFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
    if (!isRequired(form.fullName)) next.fullName = "Full name is required.";
    if (!isRequired(form.address)) next.address = "Address is required.";
    if (!isValidKenyanPhone(form.phone))
      next.phone = "Enter a valid phone number (e.g. 07XXXXXXXX).";
    if (!isValidEmail(form.email)) next.email = "Enter a valid email address.";
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
        _subject: `New EFMI membership registration — ${form.fullName}`,
        formType: "Membership Registration",
        ...form,
      });

      setSubmitted(true);
      setForm(INITIAL_STATE);
    } catch {
      setSubmitError(
        `Something went wrong sending your registration — please try again, or email us directly at ${SITE_EMAIL}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="mx-auto max-w-md rounded-lg border border-gold-500/40 bg-charcoal-800 p-8 text-center"
      >
        <h3 className="text-2xl font-bold text-gold-500">Welcome to EFMI.</h3>
        <p className="mt-3 text-offwhite/85">
          Your registration has been received. Look out for a confirmation
          email with payment instructions.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 rounded-md border border-offwhite/30 px-5 py-2 text-sm font-semibold text-offwhite hover:border-gold-500 hover:text-gold-400"
        >
          Register another member
        </button>
      </div>
    );
  }

  return (
    <section
      id="membership"
      aria-labelledby="membership-heading"
      className="scroll-mt-16 bg-charcoal-900 px-6 py-20 sm:px-10"
    >
      <div className="mx-auto max-w-2xl">
        <h2 id="membership-heading" className="text-3xl font-bold text-offwhite sm:text-4xl">
          Become a Member
        </h2>
        <p className="mt-3 text-offwhite/70">
          Membership is{" "}
          <span className="font-semibold text-gold-400">Ksh 500/year</span>{" "}
          or{" "}
          <span className="font-semibold text-gold-400">Ksh 100/month</span>.
          Choose the cycle that works for you below.
        </p>

        {submitError && (
          <p role="alert" className="mt-6 text-sm text-red-400">
            {submitError}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-10 space-y-6 rounded-lg border border-charcoal-700 bg-charcoal-800 p-6 sm:p-8"
        >
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-offwhite">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className="mt-1.5 w-full rounded-md border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-offwhite placeholder:text-offwhite/40 focus:border-gold-500"
              placeholder="Samwel Kaaleng"
            />
            {errors.fullName && (
              <p id="fullName-error" className="mt-1.5 text-sm text-red-400">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-offwhite">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              aria-invalid={!!errors.address}
              aria-describedby={errors.address ? "address-error" : undefined}
              className="mt-1.5 w-full rounded-md border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-offwhite placeholder:text-offwhite/40 focus:border-gold-500"
              placeholder="P.O. Box, Town, County"
            />
            {errors.address && (
              <p id="address-error" className="mt-1.5 text-sm text-red-400">
                {errors.address}
              </p>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="m-phone" className="block text-sm font-medium text-offwhite">
                Phone No.
              </label>
              <input
                id="m-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "m-phone-error" : undefined}
                className="mt-1.5 w-full rounded-md border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-offwhite placeholder:text-offwhite/40 focus:border-gold-500"
                placeholder="07XX XXX XXX"
              />
              {errors.phone && (
                <p id="m-phone-error" className="mt-1.5 text-sm text-red-400">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="m-email" className="block text-sm font-medium text-offwhite">
                Email
              </label>
              <input
                id="m-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "m-email-error" : undefined}
                className="mt-1.5 w-full rounded-md border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-offwhite placeholder:text-offwhite/40 focus:border-gold-500"
                placeholder="jane@example.com"
              />
              {errors.email && (
                <p id="m-email-error" className="mt-1.5 text-sm text-red-400">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <fieldset>
            <legend className="block text-sm font-medium text-offwhite">
              Billing Cycle
            </legend>
            <div className="mt-2 grid grid-cols-1 gap-2 min-[380px]:grid-cols-2">
              {(["annual", "monthly"] as const).map((cycle) => (
                <label
                  key={cycle}
                  className={`flex min-h-11 cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-center text-sm font-medium transition-colors ${
                    form.billingCycle === cycle
                      ? "border-gold-500 bg-gold-500/10 text-gold-400"
                      : "border-charcoal-700 text-offwhite/80 hover:border-gold-500/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="billingCycle"
                    value={cycle}
                    checked={form.billingCycle === cycle}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {cycle === "annual" ? "Annual — Ksh 500" : "Monthly — Ksh 100"}
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-gold-500 px-6 py-3.5 text-base font-semibold text-charcoal-950 shadow-gold transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting…" : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
}
