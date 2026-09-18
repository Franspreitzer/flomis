"use client";

import { LazyMotion, domMax } from "framer-motion";

/**
 * Framer Motion u "lazy" načinu: komponente koriste `m.*` umjesto `motion.*`,
 * a značajke (domMax: layout, drag, gestures) učitavaju se kao jedan manji paket.
 * `strict` baca grešku ako netko slučajno uveze puni `motion` (veći bundle).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
}
