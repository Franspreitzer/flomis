import { cn } from "@/lib/utils";

type Props = { children: React.ReactNode; num?: string; className?: string; light?: boolean };

/** Oznaka sekcije u brand stilu: ( 01 ) Naslov */
export function SectionLabel({ children, num, className }: Props) {
  return (
    <p className={cn("text-label flex items-center gap-3 text-paper-2", className)}>
      {num && (
        <span className="text-metal-2">
          <span className="opacity-60">(</span> {num} <span className="opacity-60">)</span>
        </span>
      )}
      <span>{children}</span>
    </p>
  );
}
