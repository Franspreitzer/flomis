import type { Metadata } from "next";
import { AiDemo } from "@/components/sections/AiDemo";
import { BigCta } from "@/components/sections/BigCta";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { LocalArea } from "@/components/sections/LocalArea";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { Process } from "@/components/sections/Process";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WorkSoon } from "@/components/sections/WorkSoon";
import { JsonLd } from "@/components/ui/JsonLd";
import { home } from "@/content";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: home.meta.title, description: home.meta.description, path: "" });

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(home.faq.items)} />
      <Hero />
      <MarqueeStrip />
      <ServicesGrid />
      <Process />
      <WorkSoon />
      <AiDemo />
      <Faq label={home.faq.label} title={home.faq.title} items={home.faq.items} />
      <LocalArea />
      <LatestPosts />
      <BigCta />
    </>
  );
}
