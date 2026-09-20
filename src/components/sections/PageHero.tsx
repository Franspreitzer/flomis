import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href: string };

type Props = {
  label: string;
  title: string | readonly string[];
  lead?: string;
  crumbs?: Crumb[];
  aside?: React.ReactNode;
  size?: "xl" | "lg";
  className?: string;
  accentWord?: string;
};

/** Zaglavlje podstranice: oznaka, veliki naslov (riječ po riječ), lead i opcionalni aside. */
export function PageHero({ label, title, lead, crumbs, aside, size = "xl", className, accentWord }: Props) {
  return (
    <section className={cn("container-x relative pb-16 pt-[calc(var(--header-h)+4rem)] md:pb-24 md:pt-[calc(var(--header-h)+6rem)]", className)}>
      {crumbs && (
        <nav aria-label="Navigacijska staza" className="text-label mb-6 flex flex-wrap items-center gap-2 text-paper-3">
          {crumbs.map((c, i) => (
            <span key={c.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              <TransitionLink href={c.href} className="transition-colors hover:text-paper">
                {c.label}
              </TransitionLink>
            </span>
          ))}
        </nav>
      )}
      <p className="text-label mb-6 flex items-center gap-3 text-paper-2">
        <span className="text-metal-2">( )</span> {label}
      </p>
      <SplitText
        as="h1"
        text={title}
        accentWord={accentWord}
        className={size === "xl" ? "text-display-xl" : "text-display-lg"}
        trigger="scroll"
        delay={0.1}
      />
      {(lead || aside) && (
        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          {lead && (
            <Reveal className="space-y-5 md:col-span-7" delay={0.3}>
              {lead.split("\n\n").map((para, i) => (
                <p key={i} className={i === 0 ? "text-lead max-w-2xl" : "max-w-2xl text-base leading-relaxed text-paper-2 md:text-lg"}>
                  {para}
                </p>
              ))}
            </Reveal>
          )}
          {aside && (
            <Reveal className="md:col-span-5 md:justify-self-end" delay={0.45}>
              {aside}
            </Reveal>
          )}
        </div>
      )}
    </section>
  );
}
