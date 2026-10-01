import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { home, projects } from "@/content";
import { WorkCard } from "./WorkCard";

/** Istaknuti radovi na početnoj. */
export function FeaturedWork() {
  const w = home.work;
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  if (!featured.length) return null;
  const cols = featured.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";

  return (
    <section className="container-x section-y">
      <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <SectionLabel num="03" className="mb-5">
            {w.label}
          </SectionLabel>
          <SplitText as="h2" text={w.featuredTitle} className="text-display-md" />
        </div>
        <Reveal className="md:col-span-4 md:justify-self-end">
          <p className="text-lead max-w-sm">{w.featuredLead}</p>
        </Reveal>
      </div>

      <div className={`grid gap-x-6 gap-y-12 md:grid-cols-2 ${cols}`}>
        {featured.map((p, i) => (
          <Reveal key={p.slug} y={40} delay={i * 0.05}>
            <WorkCard project={p} aspect="aspect-[4/3]" priority={i === 0} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 flex justify-center">
        <Button href="/radovi" variant="secondary" size="md">
          {w.featuredCta}
        </Button>
      </Reveal>
    </section>
  );
}
