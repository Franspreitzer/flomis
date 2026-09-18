import { cn } from "@/lib/utils";

type Props = {
  items: readonly string[];
  className?: string;
  reverse?: boolean;
  /** Trajanje jednog ciklusa u sekundama. */
  duration?: number;
  separator?: React.ReactNode;
};

/** Beskonačna traka — čisti CSS transform, pauza na hover. */
export function Marquee({ items, className, reverse, duration = 40, separator }: Props) {
  const sep = separator ?? (
    <span className="mx-6 font-mono text-[0.5em] text-metal md:mx-10" aria-hidden="true">
      ( )
    </span>
  );
  const row = items.map((it, i) => (
    <span key={i} className="flex items-center">
      <span>{it}</span>
      {sep}
    </span>
  ));

  return (
    <div
      className={cn("group relative flex w-full overflow-hidden select-none", className)}
      role="marquee"
      aria-label={items.join(", ")}
    >
      <div
        className={cn(
          "flex w-max shrink-0 items-center will-change-transform group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
        style={{ animationDuration: `${duration}s` }}
        aria-hidden="true"
      >
        <div className="flex items-center">{row}</div>
        <div className="flex items-center">{row}</div>
      </div>
    </div>
  );
}
