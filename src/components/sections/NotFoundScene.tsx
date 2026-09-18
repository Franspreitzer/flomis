"use client";

import { useEffect, useRef, useState } from "react";
import { PAREN_CLOSE_PATH, PAREN_OPEN_PATH, PARENS_VIEWBOX } from "@/components/brand/logo-paths";
import { Button } from "@/components/ui/Button";
import { notFound as c } from "@/content";
import { gsap } from "@/lib/gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/utils";

/**
 * Zabavna 404: zagrade koje "bježe" od kursora, 404 unutar njih koje se
 * lijeno vrti, i lažni terminal koji tipka poruke.
 */
export function NotFoundScene() {
  const stage = useRef<HTMLDivElement>(null);
  const openRef = useRef<SVGPathElement>(null);
  const closeRef = useRef<SVGPathElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [cur, setCur] = useState("");

  // Terminal koji tipka
  useEffect(() => {
    if (prefersReducedMotion()) {
      const t = window.setTimeout(() => setLines(c.terminal), 0);
      return () => window.clearTimeout(t);
    }
    let li = 0;
    let ci = 0;
    let t = 0;
    const timers: number[] = [];
    const tick = () => {
      const line = c.terminal[li];
      if (!line) return;
      ci += 1;
      setCur(line.slice(0, ci));
      if (ci >= line.length) {
        setLines((l) => [...l, line]);
        setCur("");
        li += 1;
        ci = 0;
        t = 420;
      } else t = line.startsWith(">") ? 40 : 18;
      timers.push(window.setTimeout(tick, t));
    };
    timers.push(window.setTimeout(tick, 500));
    return () => timers.forEach(clearTimeout);
  }, []);

  // Zagrade bježe od miša, broj se ljulja
  useEffect(() => {
    const el = stage.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    const ox = gsap.quickTo(openRef.current, "x", { duration: 0.8, ease: "expo.out" });
    const cx = gsap.quickTo(closeRef.current, "x", { duration: 0.8, ease: "expo.out" });
    const ny = gsap.quickTo(numRef.current, "rotate", { duration: 1, ease: "expo.out" });
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ox(-Math.abs(px) * 40 - 10);
      cx(Math.abs(px) * 40 + 10);
      ny(px * 14 + py * 6);
    };
    const onLeave = () => {
      ox(0);
      cx(0);
      ny(0);
    };
    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section ref={stage} className="container-x relative flex min-h-[100svh] flex-col justify-center pb-16 pt-[calc(var(--header-h)+3rem)]">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="relative flex items-center justify-center lg:col-span-6">
          <svg viewBox={PARENS_VIEWBOX} className="w-[min(70vw,420px)] fill-accent" aria-hidden="true">
            <path ref={openRef} d={PAREN_OPEN_PATH} />
            <path ref={closeRef} d={PAREN_CLOSE_PATH} />
          </svg>
          <span ref={numRef} className="absolute font-display text-[clamp(4rem,14vw,9rem)] font-bold tracking-tighter will-change-transform" aria-label={c.code}>
            {c.code}
          </span>
        </div>
        <div className="lg:col-span-6">
          <h1 className="text-display-md">{c.title}</h1>
          <p className="text-lead mt-5 max-w-lg">{c.text}</p>
          <div className="mt-8 rounded-lg border border-line bg-ink-2/70 p-5 font-mono text-[0.8rem] leading-relaxed text-paper-2" aria-live="polite">
            {lines.map((l, i) => (
              <p key={i} className={l.startsWith(">") ? "text-accent" : ""}>
                {l}
              </p>
            ))}
            {cur && (
              <p className={cur.startsWith(">") ? "text-accent" : ""}>
                {cur}
                <span className="ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[2px] bg-accent motion-safe:animate-blink" />
              </p>
            )}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={c.cta.href} size="md">
              {c.cta.label}
            </Button>
            <Button href={c.alt.href} variant="ghost">
              {c.alt.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
