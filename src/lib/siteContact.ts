/**
 * Site contact details — single source of truth.
 * -----------------------------------------------------------------------
 * The Footer, WhatsApp button, and anywhere else that surfaces EFMI's
 * contact info all import from here rather than hardcoding their own
 * copy. That's the actual guarantee that the WhatsApp number and the
 * Footer's phone link can never quietly drift out of sync — a shared
 * constant enforces it structurally, not just "they happen to match
 * today."
 *
 * TODO: if EFMI's WhatsApp Business number ever differs from this
 * general contact number, split PHONE_E164 and WHATSAPP_NUMBER back
 * into two separate values.
 */

export const SITE_EMAIL = "fishersofmen026@gmail.com";

/** Human-readable, for display text. */
export const PHONE_DISPLAY = "+254 791 918 955";

/** E.164 format with leading +, for tel: links. */
export const PHONE_E164 = "+254791918955";

/** Same number, digits only (no leading +), the format wa.me expects. */
export const WHATSAPP_NUMBER = "254791918955";

export const WHATSAPP_PREFILL_MESSAGE = "Hello Empowered Fishers of Men International Ministries, I'd like to get in touch.";
