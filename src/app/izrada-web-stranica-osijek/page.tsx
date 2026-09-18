import type { Metadata } from "next";
import { BigCta } from "@/components/sections/BigCta";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { PostCard } from "@/components/sections/PostCard";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { TiltCard } from "@/components/ui/TiltCard";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { blogUi, cityPages, localPage as L, services, site, ui } from "@/content";
import { getPosts } from "@/lib/blog";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";

const PATH = "/izrada-web-stranica-osijek";

export const metadata: Metadata = buildMetadata({ ...L.meta, path: PATH });

export default function LocalPage() {
  const posts = getPosts().slice(0, 3);
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ name: "Izrada web stranica Osijek", type: "Web design", description: L.meta.description, path: PATH, priceFrom: "500 €" }),
          breadcrumbJsonLd([{ name: "Početna", path: "" }, { name: "Izrada web stranica Osijek", path: PATH }]),
          faqJsonLd(L.faq.items),
        ]}
      />
      <PageHero
        label={L.label}
        title={L.title}
        lead={L.lead}
        aside={
          <div className="flex flex-col items-start gap-3 md:items-end">
            <Button href={L.cta.href} size="lg">
              {L.cta.label}
            </Button>
            <a href={site.contact.phoneHref} className="text-sm text-paper-2 hover:text-paper">
              ili nazovi {site.contact.phone}
            </a>
          </div>
        }
      />

      {/* Zašto lokalno */}
      <section className="container-x pb-[var(--section-y)]">
        <SectionLabel num="01" className="mb-5">
          {L.why.label}
        </SectionLabel>
        <SplitText as="h2" text={L.why.title} className="text-display-md mb-10 max-w-4xl" />
        <Reveal stagger="[data-reveal-item]" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {L.why.items.map((it, i) => (
            <div key={it.title} data-reveal-item>
              <TiltCard className="h-full rounded-lg" max={3}>
                <div className="flex h-full flex-col rounded-lg border border-line bg-ink-2/70 p-6">
                  <span className="text-label mb-8 text-paper-3">( 0{i + 1} )</span>
                  <h3 className="font-display text-xl font-bold tracking-tight">{it.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-paper-2">{it.text}</p>
                </div>
              </TiltCard>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Usluge */}
      <section className="theme-light section-y">
        <div className="container-x">
          <SectionLabel num="02" className="mb-5">
            {L.services.label}
          </SectionLabel>
          <SplitText as="h2" text={L.services.title} className="text-display-md mb-10" />
          <Reveal as="ul" stagger="[data-reveal-item]" className="divide-y divide-line border-y border-line">
            {services.map((s) => (
              <li key={s.slug} data-reveal-item>
                <TransitionLink
                  href={`/usluge/${s.slug}`}
                  data-cursor="view"
                  data-cursor-label={ui.cursor.open}
                  className="group grid gap-2 py-6 md:grid-cols-12 md:items-center"
                >
                  <span className="text-label text-paper-3 md:col-span-1">( {s.num} )</span>
                  <span className="font-display text-2xl font-bold tracking-tight md:col-span-4">{s.title} Osijek</span>
                  <span className="text-paper-2 md:col-span-5">{s.short}</span>
                  <span className="text-label text-paper-3 md:col-span-2 md:text-right">od {s.priceFrom}</span>
                </TransitionLink>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Područje + djelatnosti */}
      <section className="container-x section-y grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionLabel num="03" className="mb-5">
            {L.areas.label}
          </SectionLabel>
          <SplitText as="h2" text={L.areas.title} className="text-display-sm mb-5" />
          <Reveal>
            <p className="text-paper-2">{L.areas.text}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {site.serviceArea.map((c) => {
                const page = cityPages.find((x) => x.name === c);
                return (
                  <li key={c}>
                    {page ? (
                      <TransitionLink href={`/izrada-web-stranica/${page.slug}`} className="block rounded-full border border-line px-4 py-2 text-sm hover:border-line-strong">
                        {c} →
                      </TransitionLink>
                    ) : (
                      <span className="block rounded-full border border-line px-4 py-2 text-sm text-paper-2">{c}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="text-label mt-6 text-paper-3">{site.regions.join(" · ")}</p>
          </Reveal>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <SectionLabel num="04" className="mb-5">
            {L.industries.label}
          </SectionLabel>
          <SplitText as="h2" text={L.industries.title} className="text-display-sm mb-5" />
          <Reveal as="ul" stagger="[data-reveal-item]" className="divide-y divide-line border-y border-line">
            {L.industries.items.map((it) => (
              <li key={it} data-reveal-item className="py-3 text-sm text-paper-2 md:text-base">
                {it}
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <Faq label={L.faq.label} title={L.faq.title} items={L.faq.items} num="05" light />

      {posts.length > 0 && (
        <section className="container-x section-y">
          <SectionLabel num="06" className="mb-8">
            {blogUi.latest}
          </SectionLabel>
          <Reveal stagger="[data-reveal-item]" className="grid gap-4 md:grid-cols-3">
            {posts.map((p) => (
              <div key={p.slug} data-reveal-item>
                <PostCard post={p} />
              </div>
            ))}
          </Reveal>
        </section>
      )}

      <BigCta title={[L.cta2.title]} text={L.cta2.text} />
    </>
  );
}
