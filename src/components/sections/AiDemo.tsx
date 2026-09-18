"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Parens } from "@/components/brand/Parens";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { home } from "@/content";
import { cn, prefersReducedMotion } from "@/lib/utils";

type Msg = { id: number; role: "bot" | "user"; text: string; done?: boolean };

const EASE = [0.16, 1, 0.3, 1] as const;

/** Simulirani AI chat: pitanja kao chipovi, odgovor se "tipka" znak po znak. Bez API-ja. */
export function AiDemo() {
  const a = home.ai;
  const d = a.demo;
  const [messages, setMessages] = useState<Msg[]>([{ id: 0, role: "bot", text: d.intro, done: true }]);
  const [typing, setTyping] = useState(false);
  const [asked, setAsked] = useState<number[]>([]);
  const idRef = useRef(1);
  const listRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const autoplayed = useRef(false);

  const scrollToEnd = () => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  const ask = useCallback(
    (index: number) => {
      if (typing) return;
      const item = d.conversation[index];
      if (!item) return;
      setAsked((s) => [...s, index]);
      setMessages((m) => [...m, { id: idRef.current++, role: "user", text: item.q, done: true }]);
      setTyping(true);
      const botId = idRef.current++;
      const reduced = prefersReducedMotion();

      const t1 = window.setTimeout(() => {
        setTyping(false);
        setMessages((m) => [...m, { id: botId, role: "bot", text: reduced ? item.a : "", done: reduced }]);
        if (reduced) return;
        let i = 0;
        const step = () => {
          i += 2;
          const partial = item.a.slice(0, i);
          setMessages((m) => m.map((x) => (x.id === botId ? { ...x, text: partial, done: i >= item.a.length } : x)));
          if (i < item.a.length) timers.current.push(window.setTimeout(step, 18 + Math.random() * 22));
        };
        step();
      }, reduced ? 200 : 900);
      timers.current.push(t1);
    },
    [typing, d.conversation],
  );

  useEffect(() => {
    scrollToEnd();
  }, [messages, typing]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Autoplay prvog pitanja kad widget uđe u viewport.
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !autoplayed.current) {
          autoplayed.current = true;
          timers.current.push(window.setTimeout(() => ask(0), 700));
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ask]);

  const remaining = d.conversation.map((c, i) => ({ ...c, i })).filter((c) => !asked.includes(c.i));

  return (
    <section className="container-x section-y relative overflow-hidden">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <SectionLabel num="05" className="mb-5">
            {a.label}
          </SectionLabel>
          <SplitText as="h2" text={a.title} className="text-display-md" />
          <Reveal>
            <p className="text-lead mt-6 max-w-lg">{a.lead}</p>
            <ul className="mt-8 space-y-3">
              {a.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-base text-paper">
                  <span className="font-mono text-xs text-paper-3">( ✓ )</span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href={a.cta.href} size="md">
                {a.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-5 lg:col-start-8" y={60}>
          <div className="relative mx-auto max-w-md rounded-xl border border-line bg-ink-2/80 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)] backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-line px-5 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-4 text-paper">
                <Parens className="h-4 w-auto" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold">{d.botName}</p>
                <p className="flex items-center gap-1.5 text-xs text-paper-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-pulse" /> {d.status}
                </p>
              </div>
              <span className="text-label text-paper-3">{d.demoTag}</span>
            </div>

            {/* Poruke */}
            <div ref={listRef} className="flex h-[360px] flex-col gap-3 overflow-y-auto px-5 py-5" data-lenis-prevent aria-live="polite">
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className={cn("max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed", m.role === "user" ? "self-end rounded-br-sm bg-paper text-ink" : "self-start rounded-bl-sm bg-ink-4 text-paper")}
                  >
                    {m.text}
                    {m.role === "bot" && !m.done && <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-accent motion-safe:animate-blink" />}
                  </motion.div>
                ))}
                {typing && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-1 self-start rounded-2xl rounded-bl-sm bg-ink-4 px-4 py-3"
                    aria-label={d.typingLabel}
                  >
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="h-1.5 w-1.5 rounded-full bg-paper-2 motion-safe:animate-bounce" style={{ animationDelay: `${i * 120}ms` }} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Chipovi */}
            <div className="border-t border-line p-4">
              <p className="text-label mb-3 text-paper-3">{d.placeholder}</p>
              <div className="flex flex-wrap gap-2">
                {remaining.length ? (
                  remaining.map((c) => (
                    <button
                      key={c.i}
                      onClick={() => ask(c.i)}
                      disabled={typing}
                      data-cursor="link"
                      className="rounded-full border border-line-strong px-3.5 py-1.5 text-xs font-medium text-paper transition-colors hover:border-paper hover:text-paper disabled:opacity-40"
                    >
                      {c.q}
                    </button>
                  ))
                ) : (
                  <button
                    onClick={() => {
                      setAsked([]);
                      setMessages([{ id: idRef.current++, role: "bot", text: d.intro, done: true }]);
                    }}
                    data-cursor="link"
                    className="rounded-full border border-line-strong px-3.5 py-1.5 text-xs font-medium text-paper hover:border-paper hover:text-paper"
                  >
                    ↻ {d.restart}
                  </button>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
