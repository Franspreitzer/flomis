import type { Metadata } from "next";
import { BigCta } from "@/components/sections/BigCta";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { TiltCard } from "@/components/ui/TiltCard";
import { pricing } from "@/content";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({ ...pricing.meta, path: "/paketi" });

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Početna", path: "" }, { name: "Paketi", path: "/paketi" }]), faqJsonLd(pricing.faq)]} />
      <PageHero
        label={pricing.label}
        title={pricing.title}
        lead={pricing.lead}
        aside={
          <nav aria-label={pricing.groupsNav} className="flex flex-wrap gap-2 md:justify-end">
            {pricing.groups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                data-cursor="link"
                className="rounded-full border border-line-strong px-4 py-2 text-sm text-paper-2 transition-colors hover:border-paper hover:text-paper"
              >
                {g.title}
              </a>
            ))}
          </nav>
        }
      />

      {pricing.groups.map((g, gi) => (
        <section key={g.id} id={g.id} className="container-x scroll-mt-28 pb-[var(--section-y)]">
          <div className="mb-10 grid gap-4 border-t border-line pt-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <SectionLabel num={`0${gi + 1}`} className="mb-4">
                {g.title}
              </SectionLabel>
              <SplitText as="h2" text={g.title} className="text-display-md" />
            </div>
            <Reveal className="md:col-span-4 md:justify-self-end">
              <p className="max-w-sm text-base text-paper-2 md:text-lg">{g.text}</p>
            </Reveal>
          </div>

          <Reveal stagger="[data-reveal-item]" className={cn("grid gap-4", g.plans.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3")}>
            {g.plans.map((p) => (
              <div key={p.name} data-reveal-item>
                <TiltCard className="h-full rounded-lg" max={3}>
                  <article
                    className={cn(
                      "relative flex h-full flex-col rounded-lg border p-7 md:p-8",
                      p.highlighted ? "border-accent bg-ink-2" : "border-line bg-ink-2/60",
                    )}
                  >
                    {p.highlighted && "badge" in p && (
                      <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-ink">
                        {p.badge}
                      </span>
                    )}
                    <h3 className="font-display text-2xl font-bold tracking-tight">{p.name}</h3>
                    <p className="mt-2 min-h-[3rem] text-sm text-paper-2">{p.tagline}</p>
                    <p className="mt-6 font-display text-4xl font-bold tracking-tight md:text-5xl">{p.price}</p>
                    {p.period && <p className="text-label mt-2 text-paper-3">{p.period}</p>}
                    <ul className="mt-8 flex-1 space-y-3 border-t border-line pt-6">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm leading-relaxed">
                          <span className="mt-0.5 font-mono text-xs text-paper-3">( ✓ )</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Button href="/kontakt" variant={p.highlighted ? "primary" : "secondary"} size="md" className="w-full">
                        {p.cta}
                      </Button>
                    </div>
                  </article>
                </TiltCard>
              </div>
            ))}
          </Reveal>
        </section>
      ))}

      <section className="theme-light section-y">
        <div className="container-x grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <SplitText as="h2" text={pricing.compare.title} className="text-display-md" />
            <Reveal>
              <p className="mt-5 max-w-2xl text-lg text-paper-2">{pricing.compare.text}</p>
            </Reveal>
          </div>
          <Reveal className="md:col-span-4 md:justify-self-end">
            <Button href={pricing.compare.cta.href} variant="light" size="lg">
              {pricing.compare.cta.label}
            </Button>
          </Reveal>
        </div>
        <p className="container-x text-label mt-10 text-paper-3">{pricing.note}</p>
      </section>

      <Faq label={pricing.faqLabel} title={pricing.faqTitle} items={pricing.faq} num="05" />
      <BigCta />
    </>
  );
}
