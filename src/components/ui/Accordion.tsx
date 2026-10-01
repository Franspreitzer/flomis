import { cn } from "@/lib/utils";

type Item = { q: string; a: string };
type Props = {
  items: readonly Item[];
  className?: string;
  defaultOpen?: number | null;
  /** Grupa za "samo jedan otvoren"; zadaj je ako su dvije harmonike na istoj stranici. */
  name?: string;
};

/**
 * FAQ harmonika na nativnom <details>/<summary>.
 * Svi odgovori su u HTML-u (čitaju ih i crawleri i AI asistenti), radi bez JS-a,
 * a atribut `name` drži otvorenim samo jedan panel.
 */
export function Accordion({ items, className, defaultOpen = 0, name = "faq" }: Props) {
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((it, i) => (
        <details key={i} name={name} open={i === defaultOpen} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left md:py-8 [&::-webkit-details-marker]:hidden">
            <h3 className="flex flex-1 items-baseline gap-4 md:gap-8">
              <span className="text-label mt-1 shrink-0 text-paper-3">
                ( {String(i + 1).padStart(2, "0")} )
              </span>
              <span className="font-display text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-paper md:text-2xl lg:text-3xl">
                {it.q}
              </span>
            </h3>
            <span
              aria-hidden="true"
              className="relative mt-1 h-8 w-8 shrink-0 rounded-full border border-line-strong transition-colors duration-300 group-hover:border-accent"
            >
              <span className="absolute left-1/2 top-1/2 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 bg-current" />
              <span className="absolute left-1/2 top-1/2 h-3.5 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-500 ease-out-expo group-open:rotate-90 group-open:scale-y-0" />
            </span>
          </summary>
          <div className="accordion-panel">
            <p className="max-w-2xl pb-8 text-base leading-relaxed text-paper-2 md:pl-[4.6rem] md:text-lg">
              {it.a}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
