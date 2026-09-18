import type { Metadata } from "next";
import { BigCta } from "@/components/sections/BigCta";
import { PageHero } from "@/components/sections/PageHero";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { JsonLd } from "@/components/ui/JsonLd";
import { projects, workIntro } from "@/content";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ ...workIntro.meta, path: "/radovi" });

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Početna", path: "" }, { name: "Radovi", path: "/radovi" }])} />
      <PageHero label={workIntro.label} title={workIntro.title} lead={workIntro.lead} />
      <section className="container-x pb-[var(--section-y)]">
        <WorkGrid projects={projects} filters={workIntro.filters} />
      </section>
      <BigCta />
    </>
  );
}
