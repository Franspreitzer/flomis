import type { Metadata } from "next";
import { BigCta } from "@/components/sections/BigCta";
import { PageHero } from "@/components/sections/PageHero";
import { Counter } from "@/components/ui/Counter";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { TiltCard } from "@/components/ui/TiltCard";
import { lastUpdated, press, site } from "@/content";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ ...press.meta, path: "/press" });

/** Popis činjenica kao schema.org ItemList — da ga AI i imenici mogu pročitati doslovno. */
function factsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${site.url}/press#cinjenice`,
    name: press.facts.title,
    inLanguage: "hr",
    about: { "@id": `${site.url}/#organization` },
    isPartOf: { "@id": `${site.url}/press#webpage` },
    itemListElement: press.facts.items.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: f.label,
      item: { "@type": "PropertyValue", name: f.label, value: f.value },
    })),
  };
}

export default function PressPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ path: "/press", name: press.meta.title, description: press.meta.description, type: "AboutPage", dateModified: lastUpdated("/press") }),
          breadcrumbJsonLd([{ name: "Početna", path: "" }, { name: "Press", path: "/press" }]),
          factsJsonLd(),
        ]}
      />

      <PageHero
        label={press.label}
        title={press.title}
        lead={press.lead}
        crumbs={[
          { label: "Početna", href: "/" },
          { label: press.label, href: "/press" },
        ]}
      />

      {/* Službeni podaci */}
      <section className="container-x pb-[var(--section-y)]">
        <SectionLabel num="01" className="mb-5">
          {press.facts.label}
        </SectionLabel>
        <SplitText as="h2" text={press.facts.title} className="text-display-md mb-10" />
        <Reveal stagger="[data-reveal-item]" className="grid border-t border-line sm:grid-cols-2">
          {press.facts.items.map((f) => (
            <div key={f.label} data-reveal-item className="border-b border-line py-5 sm:odd:pr-8 sm:even:border-l sm:even:pl-8">
              <p className="text-label mb-2 text-paper-3">{f.label}</p>
              <p className="text-base leading-relaxed md:text-lg">
                {"href" in f && f.href ? (
                  <a href={f.href} className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent">
                    {f.value}
                  </a>
                ) : (
                  f.value
                )}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Brojke */}
      <section className="theme-light section-y">
        <div className="container-x">
          <SectionLabel num="02" className="mb-5">
            {press.numbers.label}
          </SectionLabel>
          <SplitText as="h2" text={press.numbers.title} className="text-display-md mb-10" />
          <Reveal as="ul" stagger="[data-reveal-item]" className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {press.numbers.items.map((n) => (
              <li key={n.label} data-reveal-item className="bg-paper px-6 py-8">
                {"raw" in n ? (
                  <span className="font-display text-4xl font-bold tracking-tight md:text-5xl">{n.raw}</span>
                ) : (
                  <Counter
                    value={n.value}
                    suffix={"suffix" in n ? n.suffix : ""}
                    className="font-display text-4xl font-bold tracking-tight md:text-5xl"
                  />
                )}
                <p className="mt-2 text-sm text-paper-2">{n.label}</p>
              </li>
            ))}
          </Reveal>
          <Reveal>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-paper-3">{press.numbers.note}</p>
          </Reveal>
        </div>
      </section>

      {/* Gotovi opisi */}
      <section className="container-x section-y">
        <SectionLabel num="03" className="mb-5">
          {press.boilerplate.label}
        </SectionLabel>
        <SplitText as="h2" text={press.boilerplate.title} className="text-display-md" />
        <Reveal>
          <p className="text-lead mt-5 max-w-2xl">{press.boilerplate.lead}</p>
        </Reveal>
        <Reveal as="div" stagger="[data-reveal-item]" className="mt-10 space-y-6">
          {press.boilerplate.items.map((b) => (
            <article key={b.length} data-reveal-item className="rounded-lg border border-line bg-ink-2/60 p-6 md:p-8">
              <h3 className="text-label mb-4 text-paper-3">{b.length}</h3>
              <p className="max-w-3xl text-base leading-relaxed text-paper md:text-lg">{b.text}</p>
            </article>
          ))}
        </Reveal>
      </section>

      {/* Logo */}
      <section className="container-x pb-[var(--section-y)]">
        <SectionLabel num="04" className="mb-5">
          {press.assets.label}
        </SectionLabel>
        <SplitText as="h2" text={press.assets.title} className="text-display-md" />
        <Reveal>
          <p className="text-lead mt-5 max-w-2xl">{press.assets.lead}</p>
        </Reveal>
        <Reveal as="ul" stagger="[data-reveal-item]" className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {press.assets.items.map((a) => (
            <li key={a.file} data-reveal-item>
              <TiltCard className="h-full rounded-lg border border-line bg-ink-2/60 p-6">
                <h3 className="font-display text-lg font-bold tracking-tight">{a.name}</h3>
                <p className="mt-2 text-sm text-paper-3">{a.note}</p>
                <a
                  href={a.file}
                  download
                  className="mt-6 inline-flex items-center gap-2 text-sm text-accent underline decoration-line-strong underline-offset-4 transition-colors hover:text-paper"
                >
                  {press.assets.download}
                  <span aria-hidden="true">↓</span>
                </a>
              </TiltCard>
            </li>
          ))}
        </Reveal>
      </section>

      {/* Boje i pravila */}
      <section className="container-x pb-[var(--section-y)]">
        <SectionLabel num="05" className="mb-5">
          {press.brand.label}
        </SectionLabel>
        <SplitText as="h2" text={press.brand.title} className="text-display-md mb-10" />
        <Reveal as="ul" stagger="[data-reveal-item]" className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {press.brand.colors.map((c) => (
            <li key={c.hex} data-reveal-item className="rounded-lg border border-line p-4">
              <span
                aria-hidden="true"
                className="block h-20 w-full rounded border border-line-strong"
                style={{ backgroundColor: c.hex }}
              />
              <p className="mt-4 font-display text-base font-bold tracking-tight">{c.name}</p>
              <p className="font-mono text-sm text-paper-2">{c.hex}</p>
              <p className="mt-1 text-sm text-paper-3">{c.note}</p>
            </li>
          ))}
        </Reveal>
        <Reveal as="ul" stagger="[data-reveal-item]" className="mt-10 max-w-3xl space-y-3">
          {press.brand.rules.map((r) => (
            <li key={r} data-reveal-item className="flex gap-3 text-base leading-relaxed text-paper-2">
              <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-line-strong" />
              {r}
            </li>
          ))}
        </Reveal>
      </section>

      <BigCta
        title={[press.contact.title]}
        text={press.contact.text}
        button={press.contact.button}
        label={press.contact.label}
      />
    </>
  );
}
