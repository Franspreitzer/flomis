import { cn } from "@/lib/utils";

/**
 * Brand motiv "( )" — geometrijski lukovi (stroke), oštri u svakoj veličini.
 * Isti omjer kao zagrade u logu (~108:93). `gap` razmiče zagrade (u jedinicama viewBoxa).
 */
export const PARENS_VIEWBOX = "0 0 108 93";
export const PAREN_OPEN_D = "M32 6 C 8 28, 8 65, 32 87";
export const PAREN_CLOSE_D = "M76 6 C 100 28, 100 65, 76 87";
export const PAREN_STROKE = 7;

type Props = { className?: string; gap?: number; strokeWidth?: number };

export function Parens({ className, gap = 0, strokeWidth = PAREN_STROKE }: Props) {
  return (
    <svg
      viewBox={PARENS_VIEWBOX}
      className={cn("block overflow-visible", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d={PAREN_OPEN_D} style={{ transform: `translateX(${-gap}px)` }} />
      <path d={PAREN_CLOSE_D} style={{ transform: `translateX(${gap}px)` }} />
    </svg>
  );
}
