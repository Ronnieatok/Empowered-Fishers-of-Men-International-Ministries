import { SITE_EMAIL } from "@/lib/siteContact";

/**
 * submitToFormSubmit
 * -----------------------------------------------------------------------
 * Posts form data to FormSubmit (https://formsubmit.co), which relays it
 * as an email to SITE_EMAIL — no backend server or API keys required.
 * Shared by every form on the site so they all fail/succeed the same way.
 *
 * ONE-TIME SETUP REQUIRED: the first submission FormSubmit ever receives
 * for a destination email triggers a confirmation email to that address.
 * Someone must open it and click the activation link before FormSubmit
 * will actually deliver any submissions — until then, this function's
 * request still resolves successfully (FormSubmit returns 200 either
 * way), but no email arrives on the other end. Submit any one of the
 * site's forms once after deploying to trigger that confirmation email.
 */
export async function submitToFormSubmit(
  payload: Record<string, unknown>
): Promise<void> {
  const response = await fetch(`https://formsubmit.co/ajax/${SITE_EMAIL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`FormSubmit request failed with status ${response.status}`);
  }
}
