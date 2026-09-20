import type { Metadata } from "next";
import { BigCta } from "@/components/sections/BigCta";
import { PageHero } from "@/components/sections/PageHero";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { projects, workComingSoon, workIntro } from "@/content";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ ...workIntro.meta, path: "/radovi" });

export default function WorkPage() {
  const soon = workIntro.soon;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Početna", path: "" }, { name: "Radovi", path: "/radovi" }])} />
      {workComingSoon ? (
        <>
          <PageHero
            label={soon.label}
            title={soon.title}
            lead={soon.lead}
            aside={
              <Button href={soon.cta.href} size="lg">
                {soon.cta.label}
              </Button>
            }
          />
          <section className="container-x pb-[var(--section-y)]">
            <Reveal as="ol" stagger="[data-reveal-item]" className="grid gap-4 md:grid-cols-3">
              {soon.steps.map((s, i) => (
                <li key={i} data-reveal-item className="rounded-lg border border-line bg-ink-2/60 p-7 md:min-h-[220px]">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-label text-paper-3">( 0{i + 1} )</span>
                    <span className={i === 0 ? "h-2.5 w-2.5 rounded-full bg-accent" : "h-2.5 w-2.5 rounded-full border border-line-strong"} />
                  </div>
                  <p className="font-display text-2xl font-bold tracking-tight">{s.when}</p>
                  <p className="mt-3 text-sm leading-relaxed text-paper-2 md:text-base">{s.text}</p>
                </li>
              ))}
            </Reveal>
          </section>
        </>
      ) : (
        <>
          <PageHero label={workIntro.label} title={workIntro.title} lead={workIntro.lead} />
          <section className="container-x pb-[var(--section-y)]">
            <WorkGrid projects={projects} filters={workIntro.filters} />
          </section>
        </>
      )}
      <BigCta />
    </>
  );
}
