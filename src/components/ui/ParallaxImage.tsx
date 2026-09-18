"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Jačina parallaxa u % visine. */
  amount?: number;
};

/** Slika s parallaxom na scroll (scrub, samo transform) i hover zoomom preko roditelja `.group`. */
export function ParallaxImage({ src, alt, className, sizes = "(max-width: 768px) 100vw, 50vw", priority, amount = 10 }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const w = wrap.current;
    const i = inner.current;
    if (!w || !i || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        i,
        { yPercent: -amount },
        { yPercent: amount, ease: "none", scrollTrigger: { trigger: w, start: "top bottom", end: "bottom top", scrub: true } },
      );
    }, w);
    return () => {
      ctx.revert();
      gsap.set(i, { clearProps: "transform" });
    };
  }, [amount]);

  return (
    <div ref={wrap} className={cn("relative overflow-hidden", className)}>
      <div ref={inner} className="absolute -inset-y-[12%] inset-x-0 will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
        />
      </div>
    </div>
  );
}
