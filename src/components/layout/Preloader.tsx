"use client";

import { AnimatePresence, m } from "framer-motion";
import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import { PAREN_CLOSE_D, PAREN_OPEN_D, PAREN_STROKE, PARENS_VIEWBOX } from "@/components/brand/Parens";
import { ui } from "@/content";
import { useAppState } from "./AppState";

const KEY = "flomis-seen";

/**
 * Kratki preloader pri prvom učitavanju u sesiji: ( 0 → 100 ) i zavjesa gore.
 * Ne renderira se na serveru (nema hydration mismatcha), a hero čeka `ready`.
 */
export function Preloader() {
  const { setReady, setIntro } = useAppState();
  const lenis = useLenis();
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const numRef = useRef<HTMLSpanElement>(null);
  const openRef = useRef<SVGPathElement>(null);
  const closeRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      // ?nopreload preskače preloader (korisno za testiranje i Lighthouse).
      seen = sessionStorage.getItem(KEY) === "1" || new URLSearchParams(location.search).has("nopreload");
    } catch {}
    if (seen || prefersReducedMotion()) {
      setReady(true);
      return;
    }
    const raf = requestAnimationFrame(() => {
      setIntro(true);
      setShow(true);
    });
    return () => cancelAnimationFrame(raf);
  }, [setReady, setIntro]);

  useEffect(() => {
    if (!show) return;
    lenis?.stop();
    const obj = { n: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {}
        setDone(true);
      },
    });
    tl.to(obj, {
      n: 100,
      duration: 1.1,
      ease: "power3.inOut",
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = String(Math.round(obj.n)).padStart(3, "0");
      },
    })
      .to(openRef.current, { x: -34, duration: 0.6, ease: "expo.inOut" }, "-=0.15")
      .to(closeRef.current, { x: 34, duration: 0.6, ease: "expo.inOut" }, "<")
      .to(numRef.current, { opacity: 0, duration: 0.25 }, "<");
    return () => {
      tl.kill();
    };
  }, [show, lenis]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        lenis?.start();
        setReady(true);
      }}
    >
      {show && !done && (
        <m.div
          key="preloader"
          className="fixed inset-0 z-[300] flex items-center justify-center bg-ink text-paper"
          exit={{ y: "-100%", transition: { duration: 0.85, ease: [0.87, 0, 0.13, 1] } }}
          aria-live="polite"
          aria-label={ui.preloader.loading}
        >
          <div className="relative flex items-center justify-center">
            <svg
              viewBox={PARENS_VIEWBOX}
              className="h-20 w-auto overflow-visible text-accent md:h-28"
              fill="none"
              stroke="currentColor"
              strokeWidth={PAREN_STROKE}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path ref={openRef} d={PAREN_OPEN_D} />
              <path ref={closeRef} d={PAREN_CLOSE_D} />
            </svg>
            <span
              ref={numRef}
              className="absolute font-mono text-sm tabular-nums tracking-[0.2em] text-paper md:text-base"
            >
              000
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-line">
            <m.div
              className="h-full origin-left bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1, transition: { duration: 1.1, ease: [0.65, 0, 0.35, 1] } }}
            />
          </div>
          <p className="text-label absolute bottom-6 left-[var(--gutter)] text-paper-3">Flomis</p>
          <p className="text-label absolute bottom-6 right-[var(--gutter)] text-paper-3">Osijek, HR</p>
        </m.div>
      )}
    </AnimatePresence>
  );
}
