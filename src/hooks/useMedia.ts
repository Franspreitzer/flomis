"use client";

import { useEffect, useState } from "react";

/** Reaktivni matchMedia; na serveru i prije hidratacije vraća `initial`. */
export function useMedia(query: string, initial = false) {
  const [matches, setMatches] = useState(initial);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export const useIsDesktop = () => useMedia("(pointer: fine) and (min-width: 1024px)");
export const usePrefersReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");
