"use client";

import { useEffect, useState } from "react";

import { WHATSAPP_NUMBER, WHATSAPP_PREFILL_MESSAGE } from "@/lib/siteContact";

/**
 * WhatsAppButton
 * -----------------------------------------------------------------------
 * Floating WhatsApp contact button (bottom-left, mirrors BackToTop's
 * bottom-right position so the two never collide). A dismissible
 * greeting bubble appears a few seconds after load to invite the click,
 * then the button settles into an icon-only state. The dismissal choice
 * only lives in component state — it resets on page reload by design,
 * since a stale "message" from a prior visit reads as broken rather than
 * considerate.
 */
export default function WhatsAppButton() {
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowBubble(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_PREFILL_MESSAGE
  )}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-3">
      {showBubble && !dismissed && (
        <div className="relative max-w-[220px] animate-fadeInUp rounded-lg rounded-bl-none border border-charcoal-700 bg-charcoal-900 p-3 text-sm text-offwhite shadow-lg">
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss message"
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal-800 text-offwhite/70 hover:text-offwhite"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          👋 Need help or have a question? Chat with us on WhatsApp.
        </div>
      )}

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with EFMI on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-current">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.42a9.87 9.87 0 0 0 4.62 1.18h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.02h-.01a8.1 8.1 0 0 1-4.14-1.14l-.3-.18-3.08.81.82-3-.19-.31a8.07 8.07 0 0 1-1.25-4.29c0-4.46 3.63-8.09 8.15-8.09 2.18 0 4.22.85 5.76 2.39a8.08 8.08 0 0 1 2.39 5.75c0 4.46-3.63 8.09-8.15 8.09Zm4.47-6.06c-.24-.12-1.44-.71-1.67-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.02-.38-1.95-1.21-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
        </svg>
      </a>
    </div>
  );
}
