"use client";

import { createContext, useContext, useMemo, useState } from "react";

type AppState = {
  /** Preloader je gotov — hero smije krenuti s intro animacijom. */
  ready: boolean;
  setReady: (v: boolean) => void;
  /** Preloader se odigrao u ovoj sesiji → hero smije odigrati intro animaciju. */
  intro: boolean;
  setIntro: (v: boolean) => void;
  /** Fullscreen meni na mobitelu je otvoren. */
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
};

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [intro, setIntro] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const value = useMemo(() => ({ ready, setReady, intro, setIntro, menuOpen, setMenuOpen }), [ready, intro, menuOpen]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppState mora biti unutar AppStateProvider");
  return ctx;
}
