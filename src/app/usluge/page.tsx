import type { Metadata } from "next";
import { BigCta } from "@/components/sections/BigCta";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { services, servicesIntro, ui } from "@/content";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ ...servicesIntro.meta, path: "/usluge" });

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Početna", path: "" }, { name: "Usluge", path: "/usluge" }])} />
      <PageHero
        label={servicesIntro.label}
        title={servicesIntro.title}
        lead={servicesIntro.lead}
        aside={
          <Button href={servicesIntro.cta.href} size="lg">
            {servicesIntro.cta.label}
          </Button>
        }
      />

      {/* Popis usluga kao veliki redovi */}
      <section className="container-x pb-[var(--section-y)]">
        <ul className="border-t border-line">
          {services.map((s) => (
            <Reveal as="li" key={s.slug} className="border-b border-line" y={30}>
              <TransitionLink
                href={`/usluge/${s.slug}`}
                data-cursor="view"
                data-cursor-label={ui.cursor.open}
                className="group grid gap-4 py-8 transition-colors duration-500 md:grid-cols-12 md:items-center md:py-12"
              >
                <span className="text-label text-paper-3 md:col-span-1">( {s.num} )</span>
                <h2 className="text-display-md md:col-span-5">
                  <span className="inline-block transition-transform duration-700 ease-out-expo group-hover:translate-x-3">{s.title}</span>
                </h2>
                <p className="max-w-md text-base text-paper-2 md:col-span-4 md:text-lg">{s.short}</p>
                <span className="flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
                  <span className="text-label text-paper-3 md:hidden">{s.tags.slice(0, 2).join(" · ")}</span>
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-line-strong transition-[transform,background-color,border-color,color] duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-paper group-hover:bg-paper group-hover:text-ink"
                  >
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M3 13 13 3M5 3h8v8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              </TransitionLink>
            </Reveal>
          ))}
        </ul>
      </section>

      <BigCta />
    </>
  );
}
