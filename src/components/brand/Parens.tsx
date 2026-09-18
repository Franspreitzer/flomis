import { PAREN_CLOSE_PATH, PAREN_OPEN_PATH, PARENS_VIEWBOX } from "./logo-paths";
import { cn } from "@/lib/utils";

type Props = { className?: string; gap?: number };

/** Brand motiv "( )" iz loga. Omjer ~108:93. `gap` širi zagrade (u jedinicama viewBoxa). */
export function Parens({ className, gap = 0 }: Props) {
  return (
    <svg viewBox={PARENS_VIEWBOX} className={cn("block fill-current", className)} aria-hidden="true">
      <path d={PAREN_OPEN_PATH} style={{ transform: `translateX(${-gap}px)` }} />
      <path d={PAREN_CLOSE_PATH} style={{ transform: `translateX(${gap}px)` }} />
    </svg>
  );
}
