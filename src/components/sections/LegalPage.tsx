import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { nav, type LegalSection } from "@/content";

type Props = { label: string; title: string; updated: string; sections: LegalSection[]; path: string };

/** Zajednički layout za pravne stranice: sadržaj lijevo (sticky), tekst desno. */
export function LegalPage({ label, title, updated, sections, path }: Props) {
  return (
    <>
      <PageHero label={label} title={title} size="lg" lead={updated} />
      <section className="container-x grid gap-12 pb-[var(--section-y)] lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <nav aria-label="Sadržaj" className="lg:sticky lg:top-32">
            <ol className="space-y-2 border-l border-line pl-4 text-sm text-paper-2">
              {sections.map((s, i) => (
                <li key={i}>
                  <a href={`#s-${i + 1}`} className="transition-colors hover:text-paper">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-col gap-2 text-sm">
              {nav.legal
                .filter((l) => l.href !== path)
                .map((l) => (
                  <TransitionLink key={l.href} href={l.href} className="text-paper-3 underline underline-offset-4 hover:text-paper">
                    {l.label} →
                  </TransitionLink>
                ))}
            </div>
          </nav>
        </aside>
        <div className="space-y-12 lg:col-span-8 lg:col-start-5">
          {sections.map((s, i) => (
            <Reveal key={i} as="article" y={24}>
              <h2 id={`s-${i + 1}`} className="text-display-sm scroll-mt-32 mb-4">
                {s.title}
              </h2>
              {s.paragraphs.map((p, j) => (
                <p key={j} className="mb-4 text-base leading-relaxed text-paper-2 md:text-lg">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="mt-2 space-y-2">
                  {s.list.map((li, k) => (
                    <li key={k} className="flex gap-3 text-base leading-relaxed text-paper-2 md:text-lg">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
