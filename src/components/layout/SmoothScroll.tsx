"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis smooth scroll sinkroniziran s GSAP tickerom (jedan RAF za sve).
 * Poštuje prefers-reduced-motion (Lenis sam gasi smoothing).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (time: number) => ref.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    const lenis = ref.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);
    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", ScrollTrigger.update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={ref}
      autoRaf={false}
      options={{ lerp: 0.09, wheelMultiplier: 0.95, smoothWheel: true, respectReducedMotion: true }}
    >
      {children}
    </ReactLenis>
  );
}
