import { LOGO_PATH, LOGO_VIEWBOX } from "./logo-paths";
import { cn } from "@/lib/utils";

type Props = { className?: string; title?: string };

/** Vektorski logo, boja preko `currentColor`. Omjer 734:89. */
export function Logo({ className, title = "Flomis" }: Props) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={cn("block h-auto w-full fill-current", className)}
      role="img"
      aria-label={title}
    >
      <path fillRule="evenodd" d={LOGO_PATH} />
    </svg>
  );
}
