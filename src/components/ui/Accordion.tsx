"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { q: string; a: string };
type Props = { items: readonly Item[]; className?: string; defaultOpen?: number | null };

/** FAQ harmonika s pristupačnim gumbima (aria-expanded / aria-controls). */
export function Accordion({ items, className, defaultOpen = 0 }: Props) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const reduced = useReducedMotion();
  const id = useId();

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((it, i) => {
        const isOpen = open === i;
        const panel = `${id}-panel-${i}`;
        const btn = `${id}-btn-${i}`;
        return (
          <div key={i}>
            <h3>
              <button
                id={btn}
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                data-cursor="link"
                className="group flex w-full items-start justify-between gap-6 py-6 text-left md:py-8"
              >
                <span className="flex items-baseline gap-4 md:gap-8">
                  <span className="text-label mt-1 shrink-0 text-paper-3">
                    ( {String(i + 1).padStart(2, "0")} )
                  </span>
                  <span className="font-display text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-paper md:text-2xl lg:text-3xl">
                    {it.q}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="relative mt-1 h-8 w-8 shrink-0 rounded-full border border-line-strong transition-colors duration-300 group-hover:border-accent"
                >
                  <span className="absolute left-1/2 top-1/2 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 bg-current" />
                  <span
                    className={cn(
                      "absolute left-1/2 top-1/2 h-3.5 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-500 ease-out-expo",
                      isOpen && "rotate-90 scale-y-0",
                    )}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  id={panel}
                  role="region"
                  aria-labelledby={btn}
                  key="content"
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-8 text-base leading-relaxed text-paper-2 md:pl-[4.6rem] md:text-lg">
                    {it.a}
                  </p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
