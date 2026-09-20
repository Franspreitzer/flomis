import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { getProject, projects, ui, workComingSoon, workIntro } from "@/content";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return workComingSoon ? [] : projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return buildMetadata({ ...p.meta, path: `/radovi/${p.slug}`, image: p.cover, type: "article" });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p || workComingSoon) notFound();
  const L = workIntro.caseLabels;
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Početna", path: "" },
          { name: "Radovi", path: "/radovi" },
          { name: p.title, path: `/radovi/${p.slug}` },
        ])}
      />
      <PageHero
        label={`${p.category} · ${p.year}`}
        title={p.title}
        size="lg"
        crumbs={[
          { label: "Početna", href: "/" },
          { label: "Radovi", href: "/radovi" },
          { label: p.title, href: `/radovi/${p.slug}` },
        ]}
        lead={p.short}
        aside={
          <dl className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div>
              <dt className="text-label mb-1 text-paper-3">{L.client}</dt>
              <dd>{p.client}</dd>
            </div>
            <div>
              <dt className="text-label mb-1 text-paper-3">{L.year}</dt>
              <dd>{p.year}</dd>
            </div>
            <div>
              <dt className="text-label mb-1 text-paper-3">{L.services}</dt>
              <dd>{p.services.join(", ")}</dd>
            </div>
            <div>
              <dt className="text-label mb-1 text-paper-3">{L.stack}</dt>
              <dd>{p.stack.join(", ")}</dd>
            </div>
          </dl>
        }
      />

      {/* Cover */}
      <section className="container-x">
        <Reveal y={60}>
          <ParallaxImage src={p.cover} alt={p.title} className="aspect-[16/9] w-full rounded-lg" sizes="100vw" priority amount={8} />
        </Reveal>
      </section>

      {/* Uvod, izazov, rješenje */}
      <section className="container-x section-y grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="text-lead">{p.intro}</p>
        </Reveal>
        <div className="space-y-12 lg:col-span-6 lg:col-start-7">
          <Reveal>
            <SectionLabel num="01" className="mb-4">
              {L.challenge}
            </SectionLabel>
            <p className="text-base leading-relaxed text-paper-2 md:text-lg">{p.challenge}</p>
          </Reveal>
          <Reveal>
            <SectionLabel num="02" className="mb-4">
              {L.solution}
            </SectionLabel>
            <p className="text-base leading-relaxed text-paper-2 md:text-lg">{p.solution}</p>
          </Reveal>
        </div>
      </section>

      {/* Rezultati */}
      <section className="theme-light section-y">
        <div className="container-x">
          <SectionLabel num="03" className="mb-8">
            {L.results}
          </SectionLabel>
          <Reveal stagger="[data-reveal-item]" className={`grid gap-px overflow-hidden rounded-lg border border-line bg-line ${p.results.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
            {p.results.map((r) => (
              <div key={r.label} data-reveal-item className="bg-paper p-8 md:p-10">
                <p className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-none tracking-tight">{r.value}</p>
                <p className="mt-3 text-base text-paper-2">{r.label}</p>
              </div>
            ))}
          </Reveal>
          {p.quote && (
            <Reveal className="mt-16 max-w-3xl">
              <SplitText as="p" text={`“${p.quote.text}”`} className="text-display-sm" />
              <p className="mt-5 text-sm text-paper-2">
                <span className="font-semibold text-ink">{p.quote.name}</span> · {p.quote.role}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* Galerija */}
      {p.gallery.length > 1 && (
        <section className="container-x section-y">
          <div className="grid gap-4 md:grid-cols-2">
            {p.gallery.slice(1).map((g, i) => (
              <Reveal key={g} y={50} className={i === 0 && p.gallery.length - 1 === 1 ? "md:col-span-2" : ""}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image src={g} alt={`${p.title} — ${i + 2}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Sljedeći projekt */}
      <section className="border-t border-line">
        <TransitionLink
          href={`/radovi/${next.slug}`}
          data-cursor="view"
          data-cursor-label={ui.cursor.view}
          className="group container-x flex flex-col justify-between gap-6 py-16 md:flex-row md:items-end md:py-24"
        >
          <div>
            <p className="text-label mb-4 text-paper-3">( {L.next} )</p>
            <h2 className="text-display-lg transition-colors duration-500 group-hover:text-paper">{next.title}</h2>
            <p className="mt-3 text-paper-2">{next.short}</p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg md:w-72">
            <Image
              src={next.cover}
              alt={next.title}
              fill
              sizes="(max-width: 768px) 100vw, 288px"
              className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
            />
          </div>
        </TransitionLink>
        <div className="container-x flex flex-wrap items-center gap-4 border-t border-line py-6">
          <Button href="/radovi" variant="ghost" arrow={false}>
            ← {L.back}
          </Button>
          {p.url && p.url !== "#" && (
            <Button href={p.url} external variant="ghost">
              {L.visit}
            </Button>
          )}
        </div>
      </section>
    </>
  );
}
