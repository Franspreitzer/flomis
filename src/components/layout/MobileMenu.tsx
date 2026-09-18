"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useEffect } from "react";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { nav, site } from "@/content";
import { useAppState } from "./AppState";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fullscreen animirani meni (mobitel/tablet). */
export function MobileMenu() {
  const { menuOpen, setMenuOpen } = useAppState();
  const lenis = useLenis();

  useEffect(() => {
    if (menuOpen) lenis?.stop();
    else lenis?.start();
  }, [menuOpen, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setMenuOpen]);

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          id="mobilni-meni"
          key="menu"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="fixed inset-0 z-[160] flex flex-col bg-ink pt-[var(--header-h)] lg:hidden"
          data-lenis-prevent
        >
          <div className="container-x flex flex-1 flex-col justify-between overflow-y-auto pb-8 pt-6">
            <nav aria-label="Mobilna navigacija">
              <ul className="space-y-1">
                {nav.main.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0, transition: { delay: 0.15 + i * 0.06, duration: 0.8, ease: EASE } }}
                      exit={{ y: "110%", transition: { duration: 0.3 } }}
                    >
                      <TransitionLink
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-baseline gap-4 py-1 font-display text-[clamp(2.6rem,11vw,5rem)] font-bold leading-[1] tracking-tight"
                      >
                        <span className="font-mono text-sm font-normal tracking-widest text-accent">
                          0{i + 1}
                        </span>
                        <span className="transition-colors duration-300 group-hover:text-paper">{item.label}</span>
                      </TransitionLink>
                    </motion.div>
                  </li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.7, ease: EASE } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="mt-10 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-line pt-6"
              >
                {nav.services.map((s) => (
                  <TransitionLink
                    key={s.href}
                    href={s.href}
                    onClick={() => setMenuOpen(false)}
                    className="py-1 text-sm text-paper-2 transition-colors hover:text-paper"
                  >
                    {s.label}
                  </TransitionLink>
                ))}
              </motion.div>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.6 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="mt-10 flex flex-wrap items-end justify-between gap-4 text-sm text-paper-2"
            >
              <div>
                <a href={`mailto:${site.contact.email}`} className="block text-paper">
                  {site.contact.email}
                </a>
                <a href={site.contact.phoneHref} className="block">
                  {site.contact.phone}
                </a>
              </div>
              <div className="flex gap-4">
                {site.social.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
