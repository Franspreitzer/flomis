import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { home } from "@/content";

/** Brojke koje se odbrojavaju; svijetla sekcija za ritam stranice. */
export function Stats() {
  const s = home.stats;
  return (
    <section className="theme-light section-y">
      <div className="container-x">
        <div className="mb-12 md:mb-20">
          <SectionLabel num="03" className="mb-5 text-paper-2">
            {s.label}
          </SectionLabel>
          <SplitText as="h2" text={s.title} className="text-display-lg" />
        </div>
        <Reveal stagger="[data-reveal-item]" className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {s.items.map((it, i) => (
            <div
              key={it.label}
              data-reveal-item
              className={`border-b border-line py-8 pr-6 md:py-12 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "lg:border-r" : "lg:border-r"} lg:last:border-r-0`}
            >
              <p className="font-display text-[clamp(2.75rem,5.2vw,5.25rem)] font-bold leading-none tracking-tight">
                <Counter value={it.value} decimals={it.decimals} suffix={it.suffix} />
              </p>
              <p className="mt-4 max-w-[16ch] text-base font-medium text-paper-2 md:text-lg">{it.label}</p>
              {it.note && <p className="text-label mt-2 text-paper-3">{it.note}</p>}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
