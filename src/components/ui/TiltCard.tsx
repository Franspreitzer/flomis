"use client";

import { useRef } from "react";
import { cn, hasFinePointer, prefersReducedMotion } from "@/lib/utils";

type Props = { children: React.ReactNode; className?: string; max?: number };

/**
 * Kartica s 3D tiltom i spotlightom koji prati kursor.
 * Pozicija ide preko CSS varijabli (--mx/--my), rotacija preko transforma. Desktop only.
 */
export function TiltCard({ children, className, max = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
      el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg)`;
    });
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "group/tilt relative transition-transform duration-500 ease-out-expo will-change-transform [transform-style:preserve-3d]",
        className,
      )}
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" }}
    >
      {/* Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
        style={{
          background: "radial-gradient(420px circle at var(--mx) var(--my), rgba(245,245,242,0.07), transparent 45%)",
        }}
      />
      {/* Svjetleći rub */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
        style={{
          padding: 1,
          background: "radial-gradient(260px circle at var(--mx) var(--my), rgba(245,245,242,0.45), transparent 55%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
