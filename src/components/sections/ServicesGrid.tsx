import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { TiltCard } from "@/components/ui/TiltCard";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { home, services, ui } from "@/content";
import { cn } from "@/lib/utils";

/** Usluge kao interaktivne kartice: tilt + spotlight + svjetleći rub (bento raspored). */
export function ServicesGrid() {
  const s = home.services;
  return (
    <section className="container-x relative pt-[var(--section-y)] pb-[calc(var(--section-y)*0.5)]">
      <div className="mb-12 grid gap-8 md:mb-20 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <SectionLabel num="01" className="mb-5">
            {s.label}
          </SectionLabel>
          <SplitText as="h2" text={s.title} className="text-display-md max-w-[22ch]" />
        </div>
        <Reveal className="md:col-span-4 md:justify-self-end">
          <p className="text-lead max-w-sm">{s.lead}</p>
        </Reveal>
      </div>

      <Reveal stagger="[data-reveal-item]" className="grid gap-4 md:grid-cols-6">
        {services.map((sv, i) => {
          const span = i === 0 || i === 1 ? "md:col-span-3" : "md:col-span-2";
          return (
            <div key={sv.slug} data-reveal-item className={cn(span, "h-full")}>
              <TiltCard className="h-full rounded-lg">
                <TransitionLink
                  href={`/usluge/${sv.slug}`}
                  data-cursor="view"
                  data-cursor-label={ui.cursor.open}
                  className="group flex h-full min-h-[280px] flex-col justify-between rounded-lg border border-line bg-ink-2/80 p-6 transition-colors duration-500 hover:bg-ink-3/80 md:min-h-[320px] md:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-label text-paper-3">( {sv.num} )</span>
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong transition-[transform,background-color,border-color] duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-paper group-hover:bg-paper group-hover:text-ink"
                    >
                      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M3 13 13 3M5 3h8v8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <h3 className="text-display-sm mb-3">{sv.title}</h3>
                    <p className="max-w-md text-[0.95rem] leading-relaxed text-paper-2">{sv.card}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {sv.tags.map((t) => (
                        <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[0.68rem] tracking-wider text-paper-3">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TransitionLink>
              </TiltCard>
            </div>
          );
        })}
        <div data-reveal-item className="md:col-span-6">
          <div className="flex flex-col items-start justify-between gap-6 rounded-lg bg-paper p-6 text-ink md:flex-row md:items-center md:p-8">
            <p className="max-w-2xl font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl lg:text-4xl">
              {s.promo.text}
            </p>
            <Button href={s.promo.cta.href} variant="light" size="md" className="shrink-0">
              {s.promo.cta.label}
            </Button>
          </div>
        </div>
      </Reveal>

    </section>
  );
}
