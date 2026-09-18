"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { WorkCard } from "@/components/sections/WorkCard";
import { type Project } from "@/content";
import { cn } from "@/lib/utils";

type Props = { projects: Project[]; filters: readonly string[] };

/** Grid projekata s filtrom po kategoriji (animirani layout). */
export function WorkGrid({ projects, filters }: Props) {
  const [active, setActive] = useState(filters[0]);
  const reduced = useReducedMotion();
  const list = active === filters[0] ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div role="tablist" aria-label="Filtriraj radove" className="mb-10 flex flex-wrap gap-2 md:mb-14">
        {filters.map((f) => {
          const on = f === active;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(f)}
              data-cursor="link"
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300",
                on ? "border-accent bg-accent text-ink" : "border-line-strong text-paper-2 hover:border-paper hover:text-paper",
              )}
            >
              {f}
              <span className="ml-2 font-mono text-[0.65rem] opacity-70">
                {f === filters[0] ? projects.length : projects.filter((p) => p.category === f).length}
              </span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p, i) => (
            <motion.li
              key={p.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <WorkCard project={p} aspect="aspect-[4/3]" priority={i < 3} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
