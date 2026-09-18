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
import { TransitionLink } from "@/components/ui/TransitionLink";
import { cityPages, cityTemplate as T, localPage, services, site, ui } from "@/content";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";

type Params = { params: Promise<{ grad: string }> };

export function generateStaticParams() {
  return cityPages.map((c) => ({ grad: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { grad } = await params;
  const c = cityPages.find((x) => x.slug === grad);
  if (!c) return {};
  return buildMetadata({ ...T.meta(c), path: `/izrada-web-stranica/${c.slug}` });
}

/** Lokalna stranica po gradu (Đakovo, Vinkovci, Vukovar…) — isti okvir, jedinstven tekst po gradu. */
export default async function CityPage({ params }: Params) {
  const { grad } = await params;
  const c = cityPages.find((x) => x.slug === grad);
  if (!c) notFound();
  const path = `/izrada-web-stranica/${c.slug}`;
  const faq = T.faq(c);
  const others = cityPages.filter((x) => x.slug !== c.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ name: `Izrada web stranica ${c.name}`, type: "Web design", description: T.meta(c).description, path, priceFrom: "500 €" }),
          breadcrumbJsonLd([
            { name: T.crumbs.home, path: "" },
            { name: T.crumbs.parent, path: "/izrada-web-stranica-osijek" },
            { name: c.name, path },
          ]),
          faqJsonLd(faq),
        ]}
      />
      <PageHero
        label={T.label(c)}
        title={T.title(c)}
        lead={T.lead(c)}
        crumbs={[
          { label: T.crumbs.home, href: "/" },
          { label: T.crumbs.parent, href: "/izrada-web-stranica-osijek" },
          { label: c.name, href: path },
        ]}
        aside={
          <div className="flex flex-col items-start gap-3 md:items-end">
            <Button href="/kontakt" size="lg">
              {ui.common.getQuote}
            </Button>
            <a href={site.contact.phoneHref} className="text-sm text-paper-2 hover:text-paper">
              ili nazovi {site.contact.phone}
            </a>
          </div>
        }
      />

      {/* Uvod specifičan za grad + zašto Flomis */}
      <section className="container-x grid gap-12 pb-[var(--section-y)] lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionLabel num="01" className="mb-5">
            {T.whyLabel}
          </SectionLabel>
          <SplitText as="h2" text={T.whyTitle(c)} className="text-display-sm mb-6" />
          <Reveal>
            <p className="text-lead">{c.intro}</p>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {localPage.why.items.map((it) => (
                <li key={it.title} className="py-4">
                  <p className="font-semibold">{it.title}</p>
                  <p className="mt-1 text-sm text-paper-2">{it.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <SectionLabel num="02" className="mb-5">
            {T.industriesLabel}
          </SectionLabel>
          <SplitText as="h2" text={T.industriesTitle(c)} className="text-display-sm mb-6" />
          <Reveal as="ul" stagger="[data-reveal-item]" className="space-y-2">
            {c.industries.map((it) => (
              <li key={it} data-reveal-item className="rounded-lg border border-line bg-ink-2/60 px-5 py-4 text-sm md:text-base">
                {it}
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Usluge */}
      <section className="theme-light section-y">
        <div className="container-x">
          <SectionLabel num="03" className="mb-5">
            {T.servicesLabel}
          </SectionLabel>
          <SplitText as="h2" text={T.servicesTitle} className="text-display-md mb-10" />
          <Reveal as="ul" stagger="[data-reveal-item]" className="divide-y divide-line border-y border-line">
            {services.map((s) => (
              <li key={s.slug} data-reveal-item>
                <TransitionLink href={`/usluge/${s.slug}`} className="group grid gap-2 py-6 md:grid-cols-12 md:items-center">
                  <span className="text-label text-paper-3 md:col-span-1">( {s.num} )</span>
                  <span className="font-display text-2xl font-bold tracking-tight md:col-span-4">
                    {s.title} {c.name}
                  </span>
                  <span className="text-paper-2 md:col-span-5">{s.short}</span>
                  <span className="text-label text-paper-3 md:col-span-2 md:text-right">od {s.priceFrom}</span>
                </TransitionLink>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <Faq label={T.faqLabel} title={T.faqTitle(c)} items={faq} num="04" />

      {/* Ostali gradovi */}
      <section className="container-x border-t border-line py-10">
        <p className="text-label mb-4 text-paper-3">{T.otherCities}</p>
        <ul className="flex flex-wrap gap-2">
          <li>
            <TransitionLink href="/izrada-web-stranica-osijek" className="block rounded-full border border-line px-4 py-2 text-sm hover:border-line-strong">
              Osijek
            </TransitionLink>
          </li>
          {others.map((o) => (
            <li key={o.slug}>
              <TransitionLink href={`/izrada-web-stranica/${o.slug}`} className="block rounded-full border border-line px-4 py-2 text-sm hover:border-line-strong">
                {o.name}
              </TransitionLink>
            </li>
          ))}
        </ul>
      </section>

      <BigCta title={[T.ctaTitle(c)]} text={T.ctaText} />
    </>
  );
}
