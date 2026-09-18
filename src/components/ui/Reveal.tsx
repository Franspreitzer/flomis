"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Selektor za djecu koja se animiraju sa staggerom (npr. "[data-reveal-item]"). */
  stagger?: string;
  as?: "div" | "section" | "li" | "span" | "article" | "ul" | "ol";
  once?: boolean;
  start?: string;
};

/** Scroll-triggered reveal (translate + opacity). Bez layout animacija. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  stagger,
  as: Tag = "div",
  once = true,
  start = "top 88%",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const targets = stagger ? Array.from(el.querySelectorAll<HTMLElement>(stagger)) : [el];
    if (!targets.length) return;
    const ctx = gsap.context(() => {
      gsap.set(targets, { y, opacity: 0 });
      gsap.to(targets, {
        y: 0,
        opacity: 1,
        duration: 1.1,
        delay,
        stagger: stagger ? 0.08 : 0,
        ease: "expo.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: el,
          start,
          once,
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      });
    }, el);
    return () => {
      ctx.revert();
      gsap.set(targets, { clearProps: "transform,opacity" });
    };
  }, [delay, y, stagger, once, start]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const T = Tag as any;
  return (
    <T ref={ref} className={cn(className)}>
      {children}
    </T>
  );
}

/** Ručno osvježavanje ScrollTriggera (npr. nakon učitavanja slika). */
export const refreshScroll = () => ScrollTrigger.refresh();
