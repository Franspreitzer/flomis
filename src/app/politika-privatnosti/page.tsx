import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { privacy } from "@/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = { ...buildMetadata({ ...privacy.meta, path: "/politika-privatnosti" }), robots: { index: true, follow: false } };

export default function PrivacyPage() {
  return <LegalPage label={privacy.label} title={privacy.title} updated={privacy.updated} sections={privacy.sections} path="/politika-privatnosti" />;
}
