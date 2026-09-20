"use client";

import { m } from "framer-motion";
import dynamic from "next/dynamic";
import { useAppState } from "@/components/layout/AppState";
import { Parens } from "@/components/brand/Parens";
import { Button } from "@/components/ui/Button";
import { SplitText } from "@/components/ui/SplitText";
import { home } from "@/content";
import { useMedia, usePrefersReducedMotion } from "@/hooks/useMedia";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { ready, intro } = useAppState();
  const h = home.hero;
  const wide = useMedia("(min-width: 700px)");
  const reduced = usePrefersReducedMotion();
  const show3d = wide && !reduced;

  // SSR renderira sve vidljivo (LCP). Intro se odigra samo nakon preloadera;
  // dok preloader pokriva ekran elementi se trenutno sakriju, pa ulaze animirano.
  const fade = (delay: number) => ({
    initial: false as const,
    animate: intro && !ready ? { opacity: 0, y: 24, transition: { duration: 0 } } : { opacity: 1, y: 0, transition: { duration: 1, delay, ease: EASE } },
  });

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-[calc(var(--header-h)+2rem)]">
      {/* 3D / fallback */}
      {show3d ? (
        <HeroScene />
      ) : (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <Parens className="w-[85vw] max-w-[520px] text-paper/[0.07] motion-safe:animate-drift" gap={4} />
        </div>
      )}

      <div className="container-x relative z-10 pb-10 md:pb-14">
        <m.p {...fade(0.05)} className="text-label mb-6 flex items-center gap-3 text-paper-2">
          <span className="text-metal-2">( )</span> {h.eyebrow}
        </m.p>

        <SplitText
          as="h1"
          text={h.title}
          accentWord={h.accentWord}
          className="text-display-xl max-w-[12ch]"
          trigger={intro ? ready : "none"}
          delay={0.1}
          stagger={0.06}
        />

        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:items-end">
          <m.p {...fade(0.55)} className="text-lead max-w-xl whitespace-pre-line md:col-span-6">
            {h.lead}
          </m.p>
          <m.div {...fade(0.7)} className="flex flex-wrap items-center gap-4 md:col-span-6 md:justify-end">
            <Button href={h.ctaPrimary.href} size="lg">
              {h.ctaPrimary.label}
            </Button>
            <Button href={h.ctaSecondary.href} size="lg" variant="secondary">
              {h.ctaSecondary.label}
            </Button>
          </m.div>
        </div>

        <m.div
          {...fade(0.9)}
          className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6 md:mt-16"
        >
          <ul className="flex flex-wrap gap-8 md:gap-14">
            {h.stats.map((s) => (
              <li key={s.label}>
                <p className="font-display text-2xl font-bold tracking-tight md:text-3xl">{s.value}</p>
                <p className="text-label mt-1 text-paper-3">{s.label}</p>
              </li>
            ))}
          </ul>
          <p className="text-label hidden items-center gap-3 text-paper-3 md:flex">
            {h.scrollHint}
            <span className="relative block h-10 w-px overflow-hidden bg-line">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-accent motion-safe:animate-[scrollhint_1.8s_ease-in-out_infinite]" />
            </span>
          </p>
        </m.div>
      </div>
      <style>{`@keyframes scrollhint{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}
