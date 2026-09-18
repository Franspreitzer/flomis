"use client";

import { m, useScroll, useSpring } from "framer-motion";

/** Scroll progress linija na vrhu ekrana. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[150] h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}

/** Pozadina: grain + spori gradijenti. Sve fiksno, sve transform/opacity. */
export function Background() {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -left-[20%] -top-[30%] h-[70vmax] w-[70vmax] rounded-full opacity-[0.07] blur-3xl motion-safe:animate-drift"
          style={{ background: "radial-gradient(closest-side, rgba(201,214,0,0.55), transparent 70%)" }}
        />
        <div
          className="absolute -bottom-[30%] -right-[15%] h-[60vmax] w-[60vmax] rounded-full opacity-[0.06] blur-3xl motion-safe:animate-drift"
          style={{
            background: "radial-gradient(closest-side, rgba(245,245,242,0.5), transparent 70%)",
            animationDirection: "alternate-reverse",
            animationDuration: "30s",
          }}
        />
      </div>
      <div aria-hidden="true" className="grain" />
    </>
  );
}
