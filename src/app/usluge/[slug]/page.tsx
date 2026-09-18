import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BigCta } from "@/components/sections/BigCta";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { TiltCard } from "@/components/ui/TiltCard";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { getService, serviceLabels, services, ui } from "@/content";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return buildMetadata({ ...s.meta, path: `/usluge/${s.slug}` });
}

const labels = serviceLabels;

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ name: s.title, description: s.meta.description, path: `/usluge/${s.slug}`, priceFrom: s.priceFrom }),
          breadcrumbJsonLd([
            { name: "Početna", path: "" },
            { name: "Usluge", path: "/usluge" },
            { name: s.title, path: `/usluge/${s.slug}` },
          ]),
          faqJsonLd(s.faq),
        ]}
      />

      <PageHero
        label={`${s.num} · ${s.title}`}
        title={s.hero.title}
        lead={s.hero.lead}
        crumbs={[
          { label: labels.crumbs.home, href: "/" },
          { label: labels.crumbs.services, href: "/usluge" },
          { label: s.title, href: `/usluge/${s.slug}` },
        ]}
        aside={
          <div className="flex flex-col items-start gap-4 md:items-end">
            <p className="text-label text-paper-3">
              {labels.priceFrom} <span className="ml-2 font-display text-2xl font-bold tracking-tight text-paper">{s.priceFrom}</span>
            </p>
            <Button href="/kontakt" size="lg">
              {labels.quote}
            </Button>
          </div>
        }
      />

      {/* Prednosti */}
      <section className="container-x pb-[var(--section-y)]">
        <SectionLabel num="01" className="mb-10">
          {labels.benefits}
        </SectionLabel>
        <Reveal stagger="[data-reveal-item]" className="grid gap-4 md:grid-cols-2">
          {s.benefits.map((b, i) => (
            <div key={b.title} data-reveal-item>
              <TiltCard className="h-full rounded-lg" max={4}>
                <div className="flex h-full flex-col justify-between rounded-lg border border-line bg-ink-2/80 p-7 md:p-9">
                  <span className="text-label mb-10 text-paper-3">( 0{i + 1} )</span>
                  <div>
                    <h2 className="text-display-sm mb-3">{b.title}</h2>
                    <p className="max-w-md text-base leading-relaxed text-paper-2 md:text-lg">{b.text}</p>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Uključeno + sticky CTA */}
      <section className="theme-light section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel num="02" className="mb-5">
              {labels.included}
            </SectionLabel>
            <SplitText as="h2" text={s.short} className="text-display-md mb-10" />
            <Reveal as="ul" stagger="[data-reveal-item]" className="divide-y divide-line border-y border-line">
              {s.included.map((it, i) => (
                <li key={it} data-reveal-item className="flex items-start gap-5 py-4 md:py-5">
                  <span className="text-label mt-1 shrink-0 text-paper-3">( {String(i + 1).padStart(2, "0")} )</span>
                  <span className="text-base font-medium md:text-lg">{it}</span>
                </li>
              ))}
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal className="lg:sticky lg:top-32">
              <div className="rounded-lg bg-ink p-8 text-paper">
                <p className="text-label mb-3 text-paper-3">( {labels.priceFrom} )</p>
                <p className="font-display text-4xl font-bold tracking-tight">{s.priceFrom}</p>
                <p className="mt-4 text-sm leading-relaxed text-paper-2">{s.cta.text}</p>
                <div className="mt-6">
                  <Button href="/kontakt" size="md">
                    {labels.quote}
                  </Button>
                </div>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li key={t} className="rounded-full border border-paper/15 px-3 py-1 font-mono text-[0.66rem] tracking-wider text-paper-2">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Proces */}
      <section className="container-x section-y">
        <SectionLabel num="03" className="mb-10">
          {labels.process}
        </SectionLabel>
        <Reveal as="ol" stagger="[data-reveal-item]" className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-5">
          {s.process.map((p, i) => (
            <li key={p.title} data-reveal-item className="bg-ink p-6 md:min-h-[240px] md:p-7">
              <span className="font-display text-4xl font-bold text-paper-3/60">0{i + 1}</span>
              <h3 className="mt-8 font-display text-xl font-bold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper-2">{p.text}</p>
            </li>
          ))}
        </Reveal>
      </section>

      <Faq label={labels.faq} title={s.title} items={s.faq} num="04" cta={false} />

      {/* Ostale usluge */}
      <section className="container-x section-y border-t border-line">
        <SectionLabel num="05" className="mb-8">
          {labels.other}
        </SectionLabel>
        <Reveal as="ul" stagger="[data-reveal-item]" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((o) => (
            <li key={o.slug} data-reveal-item>
              <TransitionLink
                href={`/usluge/${o.slug}`}
                data-cursor="view"
                data-cursor-label={ui.cursor.open}
                className="group flex h-full flex-col justify-between rounded-lg border border-line p-6 transition-colors duration-500 hover:border-line-strong hover:bg-ink-2"
              >
                <span className="text-label text-paper-3">( {o.num} )</span>
                <span className="mt-10">
                  <span className="block font-display text-xl font-bold tracking-tight transition-colors group-hover:text-paper">{o.title}</span>
                  <span className="mt-1 block text-sm text-paper-2">{o.short}</span>
                </span>
              </TransitionLink>
            </li>
          ))}
        </Reveal>
      </section>

      <BigCta title={[s.cta.title]} text={s.cta.text} />
    </>
  );
}
