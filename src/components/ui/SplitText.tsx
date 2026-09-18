"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";

type Props = {
  /** Jedan string ili niz redaka. */
  text: string | readonly string[];
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  lineClassName?: string;
  /** Riječ koja se boji akcentom (samo prva pojava). */
  accentWord?: string;
  mode?: "words" | "chars";
  /** "scroll" — kad uđe u viewport; boolean — kontrolirano izvana (true = kreni); "none" — bez animacije. */
  trigger?: "scroll" | "none" | boolean;
  delay?: number;
  stagger?: number;
  duration?: number;
};

/**
 * Animirano otkrivanje teksta riječ-po-riječ ili slovo-po-slovo.
 * SSR renderira čisti tekst (SEO); GSAP sakriva prije prvog painta i animira.
 */
export function SplitText({
  text,
  as: Tag = "h2",
  className,
  lineClassName,
  accentWord,
  mode = "words",
  trigger = "scroll",
  delay = 0,
  stagger,
  duration = 1.2,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const lines = useMemo(() => (typeof text === "string" ? [text] : [...text]), [text]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const units = el.querySelectorAll<HTMLElement>("[data-unit]");
    if (prefersReducedMotion() || !units.length || trigger === "none") return;

    // Kontrolirano izvana, još nije vrijeme: samo sakrij.
    if (trigger === false) {
      gsap.set(units, { yPercent: 110, rotate: 2 });
      return () => {
        gsap.set(units, { clearProps: "transform" });
      };
    }
    const ctx = gsap.context(() => {
      gsap.set(units, { yPercent: 110, rotate: 2 });
      gsap.to(units, {
        yPercent: 0,
        rotate: 0,
        duration,
        delay,
        stagger: stagger ?? (mode === "chars" ? 0.022 : 0.05),
        ease: "expo.out",
        ...(trigger === "scroll" ? { scrollTrigger: { trigger: el, start: "top 88%", once: true } } : {}),
      });
    }, el);
    return () => {
      ctx.revert();
      // StrictMode/re-run: očisti inline transform i GSAP cache da se yPercent ne "zapeče" u px.
      gsap.set(units, { clearProps: "transform" });
    };
  }, [trigger, delay, stagger, duration, mode]);

  let accentUsed = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const T = Tag as any;
  return (
    <T ref={ref} className={cn(className)}>
      {lines.map((line, li) => {
        const words = line.split(" ");
        return (
          <span key={li} className={cn("-mb-[0.1em] block overflow-hidden pb-[0.1em]", lineClassName)}>
            {words.map((word, wi) => {
              const isAccent = !!accentWord && !accentUsed && word.replace(/[.,!?]/g, "") === accentWord;
              if (isAccent) accentUsed = true;
              const unitClass = "inline-block origin-bottom-left will-change-transform";
              return (
                <span key={wi} className={cn(isAccent && "text-accent")}>
                  {mode === "chars" ? (
                    <span className="inline-block whitespace-nowrap">
                      {Array.from(word).map((ch, ci) => (
                        <span key={ci} data-unit className={unitClass}>
                          {ch}
                        </span>
                      ))}
                    </span>
                  ) : (
                    <span data-unit className={unitClass}>
                      {word}
                    </span>
                  )}
                  {wi < words.length - 1 ? " " : ""}
                </span>
              );
            })}
          </span>
        );
      })}
    </T>
  );
}
