"use client";

import { useLayoutEffect, useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { home } from "@/content";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * Pinned horizontalni scroll (desktop ≥1024px): sekcija se "zalijepi", a kartice
 * se pomiču vodoravno dok korisnik skrola. Na mobitelu: vertikalna vremenska crta.
 */
export function Process() {
  const p = home.process;
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const w = wrap.current;
    const t = track.current;
    if (!w || !t || prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const getX = () => -(t.scrollWidth - w.clientWidth);
      const tween = gsap.to(t, {
        x: getX,
        ease: "none",
        scrollTrigger: {
          trigger: w,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${t.scrollWidth - w.clientWidth + 200}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
      // Kartice: blagi parallax naslova unutar horizontalnog skrola.
      const cards = t.querySelectorAll<HTMLElement>("[data-step]");
      cards.forEach((c) => {
        const num = c.querySelector<HTMLElement>("[data-num]");
        if (!num) return;
        gsap.fromTo(
          num,
          { xPercent: 20 },
          {
            xPercent: -10,
            ease: "none",
            scrollTrigger: { trigger: c, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          },
        );
      });
      return () => {
        gsap.set(t, { clearProps: "transform" });
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="relative">
      <div className="container-x pt-[var(--section-y)]">
        <SectionLabel num="02" className="mb-5">
          {p.label}
        </SectionLabel>
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <SplitText as="h2" text={p.title} className="text-display-md max-w-[22ch] md:col-span-8" />
          <Reveal className="md:col-span-4 md:justify-self-end">
            <p className="text-lead max-w-sm">{p.lead}</p>
          </Reveal>
        </div>
      </div>

      {/* Desktop: pinned horizontal */}
      <div ref={wrap} className="relative hidden h-screen flex-col justify-center overflow-hidden lg:flex">
        <div className="container-x absolute left-0 right-0 top-10 flex items-center gap-4">
          <span className="text-label text-paper-3">01</span>
          <div className="h-px flex-1 bg-line">
            <div ref={bar} className="h-full origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
          </div>
          <span className="text-label text-paper-3">0{p.steps.length}</span>
        </div>
        <div ref={track} className="flex w-max items-stretch gap-6 pl-[var(--gutter)] pr-[var(--gutter)] will-change-transform">
          {p.steps.map((s, i) => (
            <article
              key={s.num}
              data-step
              className="relative flex h-[62vh] w-[min(46vw,640px)] shrink-0 flex-col justify-between overflow-hidden rounded-lg border border-line bg-ink-2/70 p-10"
            >
              <span
                data-num
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -top-8 select-none font-display text-[15rem] font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgba(245,245,242,0.08)]"
              >
                {s.num}
              </span>
              <div className="relative flex items-center justify-between">
                <span className="text-label text-paper-3">( {s.num} )</span>
                <span className="text-label text-paper-3">{s.duration}</span>
              </div>
              <div className="relative">
                <h3 className="text-display-md mb-5">{s.title}</h3>
                <p className="max-w-md text-lg leading-relaxed text-paper-2">{s.text}</p>
              </div>
              {i < p.steps.length - 1 && (
                <span aria-hidden="true" className="absolute right-10 top-1/2 hidden -translate-y-1/2 text-paper-3 xl:block">
                  →
                </span>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Mobile / tablet: vertikalna crta */}
      <div className="container-x section-y lg:hidden">
        <ol className="relative border-l border-line pl-8">
          {p.steps.map((s) => (
            <Reveal as="li" key={s.num} className="relative pb-12 last:pb-0">
              <span aria-hidden="true" className="absolute -left-[2.05rem] top-1.5 h-2 w-2 rounded-full bg-accent" />
              <div className="mb-2 flex items-center justify-between">
                <span className="text-label text-paper-3">( {s.num} )</span>
                <span className="text-label text-paper-3">{s.duration}</span>
              </div>
              <h3 className="text-display-sm mb-3">{s.title}</h3>
              <p className="text-base leading-relaxed text-paper-2">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
