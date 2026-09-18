"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { home, ui } from "@/content";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Slider recenzija: drag/swipe, tipke, autoplay (pauza na hover), sve transform/opacity. */
export function Testimonials() {
  const t = home.testimonials;
  const items = t.items;
  const [[index, dir], setIndex] = useState<[number, 1 | -1]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  const go = useCallback(
    (d: 1 | -1) => setIndex(([i]) => [(i + d + items.length) % items.length, d]),
    [items.length],
  );

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => go(1), 6500);
    return () => window.clearInterval(id);
  }, [paused, reduced, go]);

  const cur = items[index];

  return (
    <section className="container-x section-y overflow-hidden">
      <div className="mb-12 md:mb-16">
        <SectionLabel num="06" className="mb-5">
          {t.label}
        </SectionLabel>
        <SplitText as="h2" text={t.title} className="text-display-lg" />
      </div>

      <Reveal>
        <div
          className="relative grid gap-10 border-t border-line pt-10 md:grid-cols-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="md:col-span-1">
            <span aria-hidden="true" className="font-display text-[6rem] leading-[0.6] text-metal">
              “
            </span>
          </div>
          <div className="relative min-h-[260px] md:col-span-9 md:min-h-[300px]" data-cursor="drag">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.figure
                key={index}
                custom={dir}
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.6, ease: EASE }}
                drag={reduced ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
                className="cursor-grab active:cursor-grabbing"
              >
                <blockquote className="text-display-sm max-w-4xl font-display font-bold leading-[1.15]">{cur.quote}</blockquote>
                <figcaption className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
                  <span className="font-semibold">{cur.name}</span>
                  <span className="text-paper-2">{cur.role}</span>
                  {cur.tag && <span className="text-label text-paper-3">{cur.tag}</span>}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="flex items-end justify-between gap-6 md:col-span-2 md:flex-col md:items-end">
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Recenzija ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex([i, i > index ? 1 : -1])}
                  data-cursor="link"
                  className="p-1"
                >
                  <span className={cn("block h-1 w-6 rounded-full transition-colors duration-300", i === index ? "bg-accent" : "bg-line-strong")} />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                aria-label={ui.common.prev}
                data-cursor="link"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line-strong transition-colors hover:border-paper hover:text-paper"
              >
                ←
              </button>
              <button
                onClick={() => go(1)}
                aria-label={ui.common.next}
                data-cursor="link"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line-strong transition-colors hover:border-paper hover:text-paper"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
