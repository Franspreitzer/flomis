import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";
import { TransitionLink } from "./TransitionLink";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

type Base = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  magnetic?: boolean;
  arrow?: boolean;
};
type AsLink = Base & { href: string; external?: boolean; type?: never; onClick?: never };
type AsButton = Base & { href?: undefined; external?: never } & ButtonHTMLAttributes<HTMLButtonElement>;
type Props = AsLink | AsButton;

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-sans font-semibold whitespace-nowrap transition-[color,background-color,border-color] duration-500 ease-out-expo focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-ink hover:text-paper",
  secondary: "border border-line-strong text-paper hover:border-accent hover:text-ink",
  ghost: "text-paper hover:text-paper px-0!",
  light: "bg-ink text-paper hover:text-ink",
};

const fills: Record<Variant, string> = {
  primary: "bg-ink",
  secondary: "bg-accent",
  ghost: "",
  light: "bg-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-[0.95rem]",
  lg: "h-14 px-9 text-base md:h-16 md:px-11 md:text-lg",
};

function Arrow() {
  return (
    <span className="relative h-[1em] w-[1em] overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 16 16"
        className="absolute inset-0 h-full w-full transition-transform duration-500 ease-out-expo group-hover:translate-x-[120%] group-hover:-translate-y-[120%]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M3 13 13 3M5 3h8v8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg
        viewBox="0 0 16 16"
        className="absolute inset-0 h-full w-full -translate-x-[120%] translate-y-[120%] transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M3 13 13 3M5 3h8v8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/**
 * Gumb s "fill" hover efektom (krug se širi iz dna) i magnetnim ponašanjem.
 * Sve animacije su transform/opacity.
 */
export function Button(props: Props) {
  const { variant = "primary", size = "md", className, children, magnetic = true, arrow = variant !== "ghost" } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  const inner = (
    <>
      {variant !== "ghost" && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 z-0 origin-bottom scale-y-0 rounded-full transition-transform duration-500 ease-out-expo group-hover:scale-y-100",
            fills[variant],
          )}
        />
      )}
      <span className="relative z-10 flex items-center gap-3">
        {children}
        {arrow && <Arrow />}
      </span>
    </>
  );

  let el: React.ReactNode;
  if ("href" in props && props.href !== undefined) {
    el = props.external ? (
      <a href={props.href} className={classes} target="_blank" rel="noopener noreferrer" data-cursor="link">
        {inner}
      </a>
    ) : (
      <TransitionLink href={props.href} className={classes}>
        {inner}
      </TransitionLink>
    );
  } else {
    const { variant: _v, size: _s, className: _c, magnetic: _m, arrow: _a, children: _ch, ...rest } = props as AsButton;
    void _v; void _s; void _c; void _m; void _a; void _ch;
    el = (
      <button className={classes} data-cursor="link" {...rest}>
        {inner}
      </button>
    );
  }

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
