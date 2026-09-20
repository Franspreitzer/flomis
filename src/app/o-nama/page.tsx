import type { Metadata } from "next";
import { Parens } from "@/components/brand/Parens";
import { BigCta } from "@/components/sections/BigCta";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { about, site } from "@/content";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ ...about.meta, path: "/o-nama" });

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Početna", path: "" }, { name: "O nama", path: "/o-nama" }])} />
      <PageHero label={about.label} title={about.title} lead={about.lead} />

      {/* Manifest */}
      <section className="container-x pb-[var(--section-y)]">
        <SectionLabel num="01" className="mb-8">
          {about.manifesto.label}
        </SectionLabel>
        <Reveal as="ul" stagger="[data-reveal-item]" className="grid border-t border-line md:grid-cols-2 lg:grid-cols-4">
          {about.manifesto.items.map((m, i) => (
            <li key={m.title} data-reveal-item className="border-b border-line py-8 pr-6 md:border-r md:last:border-r-0 lg:min-h-[320px]">
              <span className="text-label text-paper-3">( 0{i + 1} )</span>
              <h2 className="text-display-sm mt-10">{m.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-paper-2">{m.text}</p>
            </li>
          ))}
        </Reveal>
      </section>

      {/* Priča */}
      <section className="theme-light section-y">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionLabel num="02" className="mb-5">
                {about.story.label}
              </SectionLabel>
              <SplitText as="h2" text={about.story.title} className="text-display-lg" />
              <Reveal className="mt-10 hidden lg:block">
                <Parens className="w-40 text-ink/15" gap={6} strokeWidth={5} />
              </Reveal>
            </div>
          </div>
          <Reveal stagger="[data-reveal-item]" className="space-y-6 lg:col-span-6 lg:col-start-7">
            {about.story.paragraphs.map((p, i) => (
              <p key={i} data-reveal-item className={i === 0 ? "text-lead text-ink" : "text-lg leading-relaxed text-paper-2"}>
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Brojke */}
      <section className="container-x section-y">
        <Reveal stagger="[data-reveal-item]" className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-4">
          {about.values.items.map((v) => (
            <div key={v.label} data-reveal-item className="bg-ink p-8 md:p-10">
              <p className="font-display text-4xl font-bold tracking-tight md:text-5xl">{v.value}</p>
              <p className="text-label mt-3 text-paper-3">{v.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Misija */}
      <section className="theme-light section-y">
        <div className="container-x">
          <SectionLabel num="03" className="mb-5">
            {about.mission.label}
          </SectionLabel>
          <SplitText as="h2" text={about.mission.title} className="text-display-lg" />
          <Reveal className="mt-8 max-w-3xl space-y-4">
            {about.mission.statement.split("\n\n").map((para, i) => (
              <p key={i} className={i === 0 ? "text-lead text-ink" : "text-lg leading-relaxed text-paper-2"}>
                {para}
              </p>
            ))}
          </Reveal>
          <Reveal stagger="[data-reveal-item]" className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {about.mission.goals.map((g) => (
              <div key={g.num} data-reveal-item className="bg-paper p-7 md:min-h-[260px]">
                <span className="text-label text-paper-3">( {g.num} )</span>
                <h3 className="mt-8 font-display text-xl font-bold tracking-tight">{g.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper-2">{g.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Put / ciljevi */}
      <section className="container-x section-y">
        <div className="mb-10 grid gap-4 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <SectionLabel num="04" className="mb-5">
              {about.timeline.label}
            </SectionLabel>
            <SplitText as="h2" text={about.timeline.title} className="text-display-md" />
          </div>
        </div>
        <Reveal as="ol" stagger="[data-reveal-item]" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {about.timeline.items.map((t, i) => (
            <li key={i} data-reveal-item className="relative rounded-lg border border-line bg-ink-2/60 p-6">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-label text-paper-3">{t.when}</span>
                <span
                  className={t.done ? "h-2.5 w-2.5 rounded-full bg-accent" : "h-2.5 w-2.5 rounded-full border border-line-strong"}
                  aria-label={t.done ? "Ostvareno" : "Cilj"}
                />
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight">{t.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper-2">{t.text}</p>
            </li>
          ))}
        </Reveal>
      </section>

      {/* Alati */}
      <section className="border-y border-line py-8">
        <p className="container-x text-label mb-4 text-paper-3">( {about.stack.label} ) {about.stack.title}</p>
        <Marquee items={about.stack.items} duration={50} className="font-display text-3xl font-bold uppercase tracking-tight text-paper-2 md:text-5xl" />
      </section>

      <BigCta title={[about.cta.title]} text={about.cta.text} button={about.cta.button} label={site.tagline} />
    </>
  );
}
