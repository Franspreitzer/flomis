"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Parens } from "@/components/brand/Parens";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { home, site } from "@/content";
import { useAppState } from "./AppState";
import { cn, prefersReducedMotion } from "@/lib/utils";

type Msg = { id: number; role: "bot" | "user"; text: string; done?: boolean; cta?: boolean };
type Item = { q: string; k: readonly string[]; a: string };

const EASE = [0.16, 1, 0.3, 1] as const;

/** Nađi najbolji odgovor po ključnim riječima (simulacija, bez API-ja). */
function findAnswer(text: string, items: readonly Item[]): Item | null {
  const t = text.toLowerCase();
  let best: { item: Item; score: number } | null = null;
  for (const item of items) {
    const score = item.k.reduce((n, k) => (t.includes(k.toLowerCase()) ? n + k.length : n), 0);
    if (score > 0 && (!best || score > best.score)) best = { item, score };
  }
  return best?.item ?? null;
}

/**
 * Plutajući AI asistent (dolje desno). Demo bez API-ja: prepoznaje ključne riječi,
 * "tipka" odgovor, nudi brza pitanja i vodi na kontakt kad ne zna.
 */
export function AssistantWidget() {
  const c = home.assistant;
  const items = useMemo<readonly Item[]>(() => [...home.ai.demo.conversation, ...c.extra], [c.extra]);
  const quick = home.ai.demo.conversation.slice(0, 3);
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const { menuOpen } = useAppState();

  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(false);
  const [unread, setUnread] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ id: 0, role: "bot", text: c.intro, done: true }]);
  const idRef = useRef(1);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);

  // Mali "hint" balončić nakon 6s, samo jednom po sesiji.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("flomis-assistant-hint") === "1";
    } catch {}
    if (seen) return;
    const t = window.setTimeout(() => {
      setHint(true);
      setUnread(true);
      try {
        sessionStorage.setItem("flomis-assistant-hint", "1");
      } catch {}
    }, 6000);
    const t2 = window.setTimeout(() => setHint(false), 14000);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const toggle = (next: boolean) => {
    setOpen(next);
    if (next) {
      setUnread(false);
      setHint(false);
      window.setTimeout(() => inputRef.current?.focus(), 350);
    }
  };
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [messages, typing, reduced]);
  // Escape zatvara.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  // Na promjeni rute zatvori panel (React pattern: prilagodba stanja tijekom rendera).
  const [seenPath, setSeenPath] = useState(pathname);
  if (pathname !== seenPath) {
    setSeenPath(pathname);
    setOpen(false);
  }

  const reply = useCallback(
    (question: string) => {
      const q = question.trim();
      if (!q || typing) return;
      setMessages((m) => [...m, { id: idRef.current++, role: "user", text: q, done: true }]);
      setTyping(true);
      const hit = findAnswer(q, items);
      const answer = hit?.a ?? c.fallback;
      const botId = idRef.current++;
      const instant = prefersReducedMotion();
      timers.current.push(
        window.setTimeout(() => {
          setTyping(false);
          setMessages((m) => [...m, { id: botId, role: "bot", text: instant ? answer : "", done: instant, cta: !hit }]);
          if (instant) return;
          let i = 0;
          const step = () => {
            i += 2;
            setMessages((m) => m.map((x) => (x.id === botId ? { ...x, text: answer.slice(0, i), done: i >= answer.length } : x)));
            if (i < answer.length) timers.current.push(window.setTimeout(step, 14 + Math.random() * 18));
          };
          step();
        }, instant ? 150 : 700 + Math.random() * 500),
      );
    },
    [typing, items, c.fallback],
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    reply(input);
    setInput("");
  };

  return (
    <div className={cn("fixed bottom-4 right-4 z-[185] flex flex-col items-end gap-3 transition-opacity duration-300 md:bottom-6 md:right-6", menuOpen && "pointer-events-none opacity-0")}>
      {/* Panel */}
      <AnimatePresence>
        {open && (
          <m.section
            key="panel"
            role="dialog"
            aria-label={c.title}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{ transformOrigin: "bottom right" }}
            className="flex w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-xl border border-line bg-ink-2/95 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.7),0_0_0_1px_rgba(245,245,242,0.06)] backdrop-blur-md"
            data-lenis-prevent
          >
            <header className="flex items-center gap-3 border-b border-line px-4 py-3">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent text-ink">
                <Parens className="h-4 w-auto" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink-2 bg-accent" />
              </span>
              <div className="flex-1 leading-tight">
                <p className="text-sm font-semibold">{c.title}</p>
                <p className="text-xs text-paper-3">{c.subtitle}</p>
              </div>
              <button
                onClick={() => toggle(false)}
                aria-label={c.closeLabel}
                data-cursor="link"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong text-paper-2 transition-colors hover:border-paper hover:text-paper"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
                </svg>
              </button>
            </header>

            <div ref={listRef} className="flex h-[min(52vh,380px)] flex-col gap-2.5 overflow-y-auto px-4 py-4" aria-live="polite">
              {messages.map((msg) => (
                <m.div
                  key={msg.id}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className={cn(
                    "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[0.85rem] leading-relaxed",
                    msg.role === "user" ? "self-end rounded-br-sm bg-paper text-ink" : "self-start rounded-bl-sm bg-ink-4 text-paper",
                  )}
                >
                  {msg.text}
                  {msg.role === "bot" && !msg.done && (
                    <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-accent motion-safe:animate-blink" />
                  )}
                  {msg.cta && msg.done && (
                    <span className="mt-2 flex flex-wrap gap-2">
                      <TransitionLink
                        href={c.fallbackCta.href}
                        className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-ink"
                      >
                        {c.fallbackCta.label} →
                      </TransitionLink>
                      <a
                        href={site.contact.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1 text-xs font-semibold text-paper"
                      >
                        WhatsApp
                      </a>
                    </span>
                  )}
                </m.div>
              ))}
              {typing && (
                <div className="flex gap-1 self-start rounded-2xl rounded-bl-sm bg-ink-4 px-3.5 py-3" aria-label={home.ai.demo.typingLabel}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-1.5 w-1.5 rounded-full bg-paper-2 motion-safe:animate-bounce" style={{ animationDelay: `${i * 120}ms` }} />
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 px-4 pb-2">
              {quick.map((q) => (
                <button
                  key={q.q}
                  onClick={() => reply(q.q)}
                  disabled={typing}
                  data-cursor="link"
                  className="rounded-full border border-line-strong px-3 py-1 text-[0.72rem] text-paper-2 transition-colors hover:border-paper hover:text-paper disabled:opacity-40"
                >
                  {q.q}
                </button>
              ))}
            </div>

            <form onSubmit={submit} className="flex items-center gap-2 border-t border-line p-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={c.inputPlaceholder}
                aria-label={c.inputPlaceholder}
                maxLength={200}
                className="h-10 flex-1 rounded-full border border-line bg-ink px-4 text-sm text-paper placeholder:text-paper-3 focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                aria-label={c.send}
                disabled={!input.trim() || typing}
                data-cursor="link"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-ink transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 13 13 3M5 3h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </m.section>
        )}
      </AnimatePresence>

      {/* Hint balončić */}
      <AnimatePresence>
        {hint && !open && (
          <m.button
            key="hint"
            onClick={() => toggle(true)}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.4, ease: EASE }}
            data-cursor="link"
            className="hidden rounded-2xl rounded-br-sm border border-line bg-ink-2/95 px-4 py-2.5 text-sm text-paper shadow-lg backdrop-blur-md md:block"
          >
            {c.bubble}
          </m.button>
        )}
      </AnimatePresence>

      {/* Gumb */}
      <button
        onClick={() => toggle(!open)}
        aria-expanded={open}
        aria-label={open ? c.closeLabel : c.openLabel}
        data-cursor="link"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-out-expo hover:scale-105"
      >
                <span className={cn("absolute transition-[opacity,transform] duration-400", open ? "scale-50 opacity-0" : "scale-100 opacity-100")}>
          <Parens className="h-6 w-auto" gap={2} />
        </span>
        <svg
          viewBox="0 0 16 16"
          className={cn("absolute h-5 w-5 transition-[opacity,transform] duration-400", open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0")}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
        </svg>
        {unread && !open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-paper text-[0.6rem] font-bold text-ink">1</span>
        )}
      </button>
    </div>
  );
}
