"use client";

import dynamic from "next/dynamic";

// Ništa od ovoga ne renderira SSR sadržaj → učitava se tek nakon hidratacije (manje JS-a na kritičnom putu).
const CookieBanner = dynamic(() => import("./CookieBanner").then((m) => m.CookieBanner), { ssr: false });
const AssistantWidget = dynamic(() => import("./AssistantWidget").then((m) => m.AssistantWidget), { ssr: false });

export function ClientExtras() {
  return (
    <>
      <CookieBanner />
      <AssistantWidget />
    </>
  );
}
