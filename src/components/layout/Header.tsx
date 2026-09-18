"use client";

import { m, useMotionValueEvent, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { nav, ui } from "@/content";
import { cn } from "@/lib/utils";
import { useAppState } from "./AppState";
import { MobileMenu } from "./MobileMenu";

/** Navigacija: sakrije se pri scrollu dolje, pojavi pri scrollu gore; fullscreen meni na mobitelu. */
export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { menuOpen, setMenuOpen } = useAppState();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (menuOpen) return;
    if (y > prev && y > 120) setHidden(true);
    else if (y < prev - 2) setHidden(false);
  });

  // Zatvori meni pri promjeni rute.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  return (
    <>
      <a
        href="#sadrzaj"
        className="sr-only z-[500] rounded-full bg-accent px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {ui.skipToContent}
      </a>
      <m.header
        initial={false}
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[170]"
      >
        <div
          className={cn(
            "container-x flex h-[var(--header-h)] items-center justify-between transition-[background-color,backdrop-filter,border-color] duration-500",
            scrolled && !menuOpen ? "border-b border-line bg-ink/70 backdrop-blur-md" : "border-b border-transparent",
          )}
        >
          <TransitionLink href="/" aria-label="Flomis — početna" className="relative z-10 block w-[118px] text-paper md:w-[136px]">
            <Logo className="transition-colors duration-300 hover:text-paper" />
          </TransitionLink>

          <nav aria-label="Glavna navigacija" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
            <ul className="flex items-center gap-1">
              {nav.main.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <TransitionLink
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative block px-4 py-2 text-[0.92rem] font-medium text-paper-2 transition-colors duration-300 hover:text-paper",
                        active && "text-paper",
                      )}
                    >
                      <span className="relative">
                        {item.label}
                        <span
                          className={cn(
                            "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-paper transition-transform duration-500 ease-out-expo group-hover:scale-x-100",
                            active && "scale-x-100",
                          )}
                        />
                      </span>
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <div className="hidden sm:block">
              <Button href={nav.cta.href} size="sm" variant={menuOpen ? "secondary" : "primary"}>
                {nav.cta.label}
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobilni-meni"
              aria-label={menuOpen ? ui.menuClose : ui.menuOpen}
              data-cursor="link"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-full bg-paper transition-transform duration-500 ease-out-expo",
                    menuOpen && "translate-y-[6px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 bottom-0 h-px w-full bg-paper transition-transform duration-500 ease-out-expo",
                    menuOpen && "-translate-y-[6px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </m.header>
      <MobileMenu />
    </>
  );
}
