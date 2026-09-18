"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { ui } from "@/content";
import { TransitionLink } from "@/components/ui/TransitionLink";

export type Consent = "all" | "essential";
const KEY = "flomis-consent";

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "all" || v === "essential" ? v : null;
  } catch {
    return null;
  }
}

/**
 * GDPR cookie banner. Nužni kolačići ne traže privolu; analitika se učitava
 * samo nakon "Prihvati sve" (slušaj `window` event "flomis:consent").
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (getConsent()) return;
    const t = window.setTimeout(() => setOpen(true), 1600);
    return () => window.clearTimeout(t);
  }, []);

  const decide = (c: Consent) => {
    try {
      localStorage.setItem(KEY, c);
    } catch {}
    window.dispatchEvent(new CustomEvent("flomis:consent", { detail: c }));
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          key="cookie"
          role="dialog"
          aria-labelledby="cookie-title"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-24 z-[180] max-w-md rounded-lg border border-line bg-ink-2/90 p-5 shadow-2xl backdrop-blur-md md:bottom-6 md:left-6 md:right-auto"
        >
          <p id="cookie-title" className="text-label mb-2 text-paper-3">
            ( {ui.cookie.title} )
          </p>
          <p className="text-sm leading-relaxed text-paper-2">
            {ui.cookie.text}
            <TransitionLink href="/politika-kolacica" className="underline underline-offset-4 hover:text-paper">
              {ui.cookie.linkLabel}
            </TransitionLink>
            .
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => decide("all")}
              data-cursor="link"
              className="h-10 rounded-full bg-accent px-5 text-sm font-semibold text-ink transition-colors hover:bg-paper"
            >
              {ui.cookie.acceptAll}
            </button>
            <button
              onClick={() => decide("essential")}
              data-cursor="link"
              className="h-10 rounded-full border border-line-strong px-5 text-sm font-semibold text-paper transition-colors hover:border-paper"
            >
              {ui.cookie.essentialOnly}
            </button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
