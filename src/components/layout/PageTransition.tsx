"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { Parens } from "@/components/brand/Parens";

type Phase = "idle" | "covering" | "covered" | "uncovering";

type TransitionCtx = { navigate: (href: string) => void; phase: Phase };
const Ctx = createContext<TransitionCtx>({ navigate: () => {}, phase: "idle" });

const EASE = [0.87, 0, 0.13, 1] as const;

/**
 * Zavjesa preko ekrana pri promjeni rute.
 * Tok: klik na TransitionLink → zavjesa se podiže → router.push → nova ruta → zavjesa odlazi gore.
 */
export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const target = useRef<string | null>(null);
  const [seenPath, setSeenPath] = useState(pathname);

  // Nova ruta je montirana → makni zavjesu (prilagodba stanja tijekom rendera).
  if (pathname !== seenPath) {
    setSeenPath(pathname);
    if (phase === "covered" || phase === "covering") setPhase("uncovering");
  }

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname || phase !== "idle") return;
      target.current = href;
      if (reduced) {
        router.push(href);
        return;
      }
      setPhase("covering");
    },
    [pathname, phase, reduced, router],
  );

  // Zavjesa treba 0.7s da pokrije ekran.
  useEffect(() => {
    if (phase !== "covering") return;
    const t = window.setTimeout(() => setPhase("covered"), 720);
    return () => window.clearTimeout(t);
  }, [phase]);

  // Kad je ekran pokriven, pokreni navigaciju.
  useEffect(() => {
    if (phase !== "covered" || !target.current) return;
    router.push(target.current);
    // Sigurnosni izlaz ako se ruta ne promijeni (npr. isti path s hashom).
    const t = window.setTimeout(() => setPhase((p) => (p === "covered" ? "uncovering" : p)), 2500);
    return () => window.clearTimeout(t);
  }, [phase, router]);

  // Nakon promjene rute: skok na vrh i refresh ScrollTriggera (novi DOM).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  const value = useMemo(() => ({ navigate, phase }), [navigate, phase]);
  const visible = phase === "covering" || phase === "covered";

  return (
    <Ctx.Provider value={value}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="curtain"
            className="fixed inset-0 z-[200] flex items-center justify-center bg-ink text-paper"
            initial={{ y: "100%" }}
            animate={{ y: 0, transition: { duration: 0.7, ease: EASE } }}
            exit={{ y: "-100%", transition: { duration: 0.7, ease: EASE } }}
            aria-hidden="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.25, duration: 0.4 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <Parens className="h-16 w-auto text-accent" gap={6} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <UncoverGate phase={phase} onDone={() => setPhase("idle")} />
    </Ctx.Provider>
  );
}

/** AnimatePresence exit traje 0.7s; nakon toga vraćamo phase u idle. */
function UncoverGate({ phase, onDone }: { phase: Phase; onDone: () => void }) {
  useEffect(() => {
    if (phase !== "uncovering") return;
    const t = window.setTimeout(onDone, 750);
    return () => window.clearTimeout(t);
  }, [phase, onDone]);
  return null;
}

export function usePageTransition() {
  return useContext(Ctx);
}
