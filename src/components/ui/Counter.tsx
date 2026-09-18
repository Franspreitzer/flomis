"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

type Props = { value: number; decimals?: number; suffix?: string; prefix?: string; className?: string };

const fmt = (n: number, decimals: number) =>
  n.toLocaleString("hr-HR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Broj koji se odbrojava kad uđe u viewport. */
export function Counter({ value, decimals = 0, suffix = "", prefix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const obj = { n: 0 };
    el.textContent = fmt(0, decimals);
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: value,
        duration: 2.2,
        ease: "expo.out",
        onUpdate: () => {
          el.textContent = fmt(obj.n, decimals);
        },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });
    return () => ctx.revert();
  }, [value, decimals]);

  return (
    <span className={className}>
      {prefix}
      <span ref={ref} className="tabular-nums">
        {fmt(value, decimals)}
      </span>
      {suffix}
    </span>
  );
}
