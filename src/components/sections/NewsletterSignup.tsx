"use client";

import { useState, FormEvent } from "react";
import { isValidEmail } from "@/hooks/useFormValidation";
import { submitToFormSubmit } from "@/lib/submitForm";
import { SITE_EMAIL } from "@/lib/siteContact";

/**
 * NewsletterSignup
 * -----------------------------------------------------------------------
 * Low-commitment capture for visitors who aren't ready to donate or
 * register yet — sits right before the Footer. Single-field form, own
 * tiny piece of local state rather than sharing DonationForm's larger
 * state shape.
 */
export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await submitToFormSubmit({
        _subject: "New EFMI newsletter signup",
        formType: "Newsletter Signup",
        email,
      });
      setSubmitted(true);
      setEmail("");
    } catch {
      setSubmitError(
        `Something went wrong sending that — please try again, or email us directly at ${SITE_EMAIL}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="border-y border-charcoal-700 bg-charcoal-900 px-6 py-14 sm:px-10"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <h2 id="newsletter-heading" className="text-xl font-bold text-offwhite sm:text-2xl">
          Stay Connected With EFMI
        </h2>
        <p className="max-w-md text-sm text-offwhite/70">
          Occasional updates from the field — no spam, unsubscribe any time.
        </p>

        {submitError && (
          <p role="alert" className="text-sm text-red-400">
            {submitError}
          </p>
        )}

        {submitted ? (
          <p role="status" className="font-semibold text-gold-400">
            You&apos;re subscribed — thank you.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <div className="flex-1 text-left">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                aria-invalid={!!error}
                aria-describedby={error ? "newsletter-email-error" : undefined}
                className="w-full min-h-11 rounded-md border border-charcoal-700 bg-charcoal-800 px-4 py-2.5 text-offwhite placeholder:text-offwhite/40 focus:border-gold-500"
                placeholder="you@example.com"
              />
              {error && (
                <p id="newsletter-email-error" className="mt-1.5 text-sm text-red-400">
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="min-h-11 shrink-0 rounded-md bg-gold-500 px-6 text-sm font-semibold text-charcoal-950 transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
