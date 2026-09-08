"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import {
  isValidEmail,
  isValidKenyanPhone,
  isRequired,
  isPositiveNumber,
  FieldErrors,
} from "@/hooks/useFormValidation";
import { submitToFormSubmit } from "@/lib/submitForm";
import { SITE_EMAIL } from "@/lib/siteContact";

type Frequency = "one-time" | "monthly" | "quarterly" | "annually";
type PaymentMethod = "card" | "mpesa";

interface DonationFormState {
  name: string;
  email: string;
  phone: string;
  frequency: Frequency;
  amount: string;
  paymentMethod: PaymentMethod;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

const INITIAL_STATE: DonationFormState = {
  name: "",
  email: "",
  phone: "",
  frequency: "monthly",
  amount: "",
  paymentMethod: "card",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
};

const FREQUENCIES: { value: Frequency; label: string }[] = [
  { value: "one-time", label: "One-Time" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "annually", label: "Annually" },
];

// Preset amounts speed up the common case; "amount" input stays editable
// for custom gifts.
const PRESET_AMOUNTS = ["500", "1000", "2500", "5000"];

/**
 * DonationForm
 * -----------------------------------------------------------------------
 * Self-contained donation organism. Handles its own state + validation.
 * The card fields are a Stripe/PayPal UI *simulation* only — in
 * production these inputs must be replaced with the processor's hosted
 * fields / Elements so raw card data never touches this component or
 * your server (PCI-DSS scope reduction).
 */
export default function DonationForm() {
  const [form, setForm] = useState<DonationFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Captured at submit time since `form` gets reset to INITIAL_STATE
  // right after a successful submission — the success message still
  // needs to know which method was actually used.
  const [lastPaymentMethod, setLastPaymentMethod] = useState<PaymentMethod>("card");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the field's error as soon as the user edits it
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function selectPreset(amount: string) {
    setForm((prev) => ({ ...prev, amount }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.amount;
      return next;
    });
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};

    if (!isRequired(form.name)) next.name = "Full name is required.";
    if (!isValidEmail(form.email)) next.email = "Enter a valid email address.";
    if (!isValidKenyanPhone(form.phone))
      next.phone = "Enter a valid phone number (e.g. 07XXXXXXXX).";
    if (!isPositiveNumber(form.amount))
      next.amount = "Enter an amount greater than 0.";

    // Card fields — simulated processor validation only, and only
    // required when the card payment method is selected.
    if (form.paymentMethod === "card") {
      if (!/^\d{13,19}$/.test(form.cardNumber.replace(/\s+/g, "")))
        next.cardNumber = "Enter a valid card number.";
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.cardExpiry))
        next.cardExpiry = "Use MM/YY format.";
      if (!/^\d{3,4}$/.test(form.cardCvc)) next.cardCvc = "Enter a valid CVC.";
    }

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
      // This sends an email to EFMI with the donor's intent to give — it
      // does NOT process any payment. No card is charged and no M-Pesa
      // STK push is triggered. See the success message below, which is
      // worded to match that reality: EFMI follows up to collect payment.
      await submitToFormSubmit({
        _subject: `New donation inquiry — ${form.name} (${form.paymentMethod})`,
        formType: "Donation Inquiry",
        ...form,
      });

      setLastPaymentMethod(form.paymentMethod);
      setSubmitted(true);
      setForm(INITIAL_STATE);
    } catch {
      setSubmitError(
        `Something went wrong sending your gift request — please try again, or email us directly at ${SITE_EMAIL}.`
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
        <h3 className="text-2xl font-bold text-gold-500">Thank you.</h3>
        <p className="mt-3 text-offwhite/85">
          {lastPaymentMethod === "mpesa"
            ? "We've received your gift request. Our team will contact you shortly to complete the M-Pesa payment."
            : "We've received your gift request. Our team will be in touch shortly to complete your donation."}
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 rounded-md border border-offwhite/30 px-5 py-2 text-sm font-semibold text-offwhite hover:border-gold-500 hover:text-gold-400"
        >
          Make another gift
        </button>
      </div>
    );
  }

  return (
    <section
      id="donate"
      aria-labelledby="donate-heading"
      className="scroll-mt-16 bg-charcoal-900 px-6 py-20 sm:px-10"
    >
      <div className="mx-auto max-w-2xl">
        <h2 id="donate-heading" className="text-3xl font-bold text-offwhite sm:text-4xl">
          Sow Into the Field
        </h2>
        <p className="mt-3 text-offwhite/70">
          &ldquo;Each of you should give what you have decided in your heart
          to give&hellip; for God loves a cheerful giver.&rdquo;{" "}
          <span className="text-gold-400">2 Cor. 9:6-8</span>
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
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-offwhite">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="mt-1.5 w-full rounded-md border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-offwhite placeholder:text-offwhite/40 focus:border-gold-500"
              placeholder="Jane Wanjiru"
            />
            {errors.name && (
              <p id="name-error" className="mt-1.5 text-sm text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email + Phone */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-offwhite">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="mt-1.5 w-full rounded-md border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-offwhite placeholder:text-offwhite/40 focus:border-gold-500"
                placeholder="jane@example.com"
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-sm text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-offwhite">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className="mt-1.5 w-full rounded-md border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-offwhite placeholder:text-offwhite/40 focus:border-gold-500"
                placeholder="07XX XXX XXX"
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1.5 text-sm text-red-400">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Frequency */}
          <fieldset>
            <legend className="block text-sm font-medium text-offwhite">
              Donation Frequency
            </legend>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {FREQUENCIES.map((f) => (
                <label
                  key={f.value}
                  className={`flex min-h-11 cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-center text-sm font-medium transition-colors ${
                    form.frequency === f.value
                      ? "border-gold-500 bg-gold-500/10 text-gold-400"
                      : "border-charcoal-700 text-offwhite/80 hover:border-gold-500/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="frequency"
                    value={f.value}
                    checked={form.frequency === f.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {f.label}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-offwhite">
              Amount (KES)
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => selectPreset(amt)}
                  className={`min-h-11 rounded-md border px-4 py-1.5 text-sm font-semibold transition-colors ${
                    form.amount === amt
                      ? "border-gold-500 bg-gold-500/10 text-gold-400"
                      : "border-charcoal-700 text-offwhite/80 hover:border-gold-500/50"
                  }`}
                >
                  {Number(amt).toLocaleString()}
                </button>
              ))}
            </div>
            <input
              id="amount"
              name="amount"
              type="number"
              min="1"
              inputMode="decimal"
              value={form.amount}
              onChange={handleChange}
              aria-invalid={!!errors.amount}
              aria-describedby={errors.amount ? "amount-error" : undefined}
              className="mt-2 w-full rounded-md border border-charcoal-700 bg-charcoal-900 px-4 py-2.5 text-offwhite placeholder:text-offwhite/40 focus:border-gold-500"
              placeholder="Custom amount"
            />
            {errors.amount && (
              <p id="amount-error" className="mt-1.5 text-sm text-red-400">
                {errors.amount}
              </p>
            )}
          </div>

          {/* Payment method toggle */}
          <fieldset>
            <legend className="block text-sm font-medium text-offwhite">
              Payment Method
            </legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(
                [
                  { value: "card" as const, label: "Card" },
                  { value: "mpesa" as const, label: "M-Pesa" },
                ]
              ).map((method) => (
                <label
                  key={method.value}
                  className={`flex min-h-11 cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-center text-sm font-medium transition-colors ${
                    form.paymentMethod === method.value
                      ? "border-gold-500 bg-gold-500/10 text-gold-400"
                      : "border-charcoal-700 text-offwhite/80 hover:border-gold-500/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={form.paymentMethod === method.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {method.label}
                </label>
              ))}
            </div>
          </fieldset>

          {form.paymentMethod === "mpesa" ? (
            /* M-Pesa flow — no card fields needed. This does NOT trigger
               an automatic STK push (that requires Daraja API
               integration, not yet wired up); EFMI follows up manually
               to collect payment via M-Pesa. Copy below reflects that. */
            <div className="rounded-md border border-charcoal-700 bg-charcoal-900 p-4">
              <p className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-offwhite/60">
                M-Pesa
                <span className="text-gold-400">Lipa na M-Pesa</span>
              </p>
              <p className="text-sm text-offwhite/75">
                {form.phone
                  ? `We'll reach out on ${form.phone} to complete this gift via M-Pesa.`
                  : "Enter your phone number above — we'll reach out there to complete this gift via M-Pesa."}
              </p>
            </div>
          ) : (
            /* Card details — simulation only, see component-level note */
            <div className="rounded-md border border-charcoal-700 bg-charcoal-900 p-4">
            <p className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-offwhite/60">
              Card Details
              <span className="text-gold-400">Secured (simulated)</span>
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="sr-only">
                  Card number
                </label>
                <input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={form.cardNumber}
                  onChange={handleChange}
                  aria-invalid={!!errors.cardNumber}
                  aria-describedby={errors.cardNumber ? "cardNumber-error" : undefined}
                  className="w-full rounded-md border border-charcoal-700 bg-charcoal-800 px-4 py-2.5 text-offwhite placeholder:text-offwhite/40 focus:border-gold-500"
                  placeholder="Card number"
                />
                {errors.cardNumber && (
                  <p id="cardNumber-error" className="mt-1.5 text-sm text-red-400">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 min-[380px]:grid-cols-2">
                <div>
                  <label htmlFor="cardExpiry" className="sr-only">
                    Expiry date
                  </label>
                  <input
                    id="cardExpiry"
                    name="cardExpiry"
                    type="text"
                    autoComplete="cc-exp"
                    value={form.cardExpiry}
                    onChange={handleChange}
                    aria-invalid={!!errors.cardExpiry}
                    aria-describedby={errors.cardExpiry ? "cardExpiry-error" : undefined}
                    className="w-full rounded-md border border-charcoal-700 bg-charcoal-800 px-4 py-2.5 text-offwhite placeholder:text-offwhite/40 focus:border-gold-500"
                    placeholder="MM/YY"
                  />
                  {errors.cardExpiry && (
                    <p id="cardExpiry-error" className="mt-1.5 text-sm text-red-400">
                      {errors.cardExpiry}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="cardCvc" className="sr-only">
                    CVC
                  </label>
                  <input
                    id="cardCvc"
                    name="cardCvc"
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    value={form.cardCvc}
                    onChange={handleChange}
                    aria-invalid={!!errors.cardCvc}
                    aria-describedby={errors.cardCvc ? "cardCvc-error" : undefined}
                    className="w-full rounded-md border border-charcoal-700 bg-charcoal-800 px-4 py-2.5 text-offwhite placeholder:text-offwhite/40 focus:border-gold-500"
                    placeholder="CVC"
                  />
                  {errors.cardCvc && (
                    <p id="cardCvc-error" className="mt-1.5 text-sm text-red-400">
                      {errors.cardCvc}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-gold-500 px-6 py-3.5 text-base font-semibold text-charcoal-950 shadow-gold transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Processing…" : "Give Now"}
          </button>
        </form>
      </div>
    </section>
  );
}
