/**
 * useFormValidation
 * -----------------------------------------------------------------------
 * Small, dependency-free validators shared across EFMI forms.
 * Kept outside components so DonationForm and MembershipRegistrationForm
 * both validate the same way (name/email/phone rules stay in sync).
 */

export type FieldErrors = Record<string, string>;

export function isValidEmail(value: string): boolean {
  // Pragmatic RFC-5322-ish check — good enough for client-side gating,
  // real verification still happens server-side / via the payment processor.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidKenyanPhone(value: string): boolean {
  // Accepts 07xxxxxxxx, 01xxxxxxxx, or +2547xxxxxxxx / +2541xxxxxxxx
  return /^(?:\+254|0)(7|1)\d{8}$/.test(value.replace(/\s+/g, ""));
}

export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function isPositiveNumber(value: string): boolean {
  const n = Number(value);
  return value.trim().length > 0 && !Number.isNaN(n) && n > 0;
}
