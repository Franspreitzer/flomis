import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { home } from "@/content";

/** Početna: umjesto portfolija dok nema stvarnih projekata — iskren "uskoro" + razlog da klijent bude prvi. */
export function WorkSoon() {
  const w = home.work;
  return (
    <section className="theme-light section-y">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-6">
          <SectionLabel num="03" className="mb-5">
            {w.label}
          </SectionLabel>
          <SplitText as="h2" text={w.title} className="text-display-md" />
          <Reveal>
            <p className="text-lead mt-6 max-w-xl text-ink">{w.lead}</p>
            <div className="mt-8">
              <Button href={w.ctaHref} variant="light" size="md">
                {w.cta}
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal as="ul" stagger="[data-reveal-item]" className="divide-y divide-line border-y border-line lg:col-span-5 lg:col-start-8">
          {w.perks.map((p, i) => (
            <li key={p.title} data-reveal-item className="grid gap-2 py-5 md:grid-cols-12">
              <span className="text-label text-paper-3 md:col-span-2">( 0{i + 1} )</span>
              <div className="md:col-span-10">
                <p className="font-display text-lg font-bold tracking-tight">{p.title}</p>
                <p className="mt-1 text-sm text-paper-2">{p.text}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
