"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getConsent } from "./CookieBanner";

/**
 * Google Analytics 4 — učitava se ISKLJUČIVO nakon privole "Prihvati sve" (GDPR).
 * ID ide u NEXT_PUBLIC_GA_ID (npr. G-XXXXXXXXXX). Bez ID-a ne radi ništa.
 */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!id) return;
    const check = () => getConsent() === "all" && setEnabled(true);
    const t = window.setTimeout(check, 0);
    const onConsent = (e: Event) => (e as CustomEvent<string>).detail === "all" && setEnabled(true);
    window.addEventListener("flomis:consent", onConsent);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("flomis:consent", onConsent);
    };
  }, [id]);

  if (!id || !enabled) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
