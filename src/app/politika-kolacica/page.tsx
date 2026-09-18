import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { cookies } from "@/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = { ...buildMetadata({ ...cookies.meta, path: "/politika-kolacica" }), robots: { index: true, follow: false } };

export default function CookiesPage() {
  return <LegalPage label={cookies.label} title={cookies.title} updated={cookies.updated} sections={cookies.sections} path="/politika-kolacica" />;
}
