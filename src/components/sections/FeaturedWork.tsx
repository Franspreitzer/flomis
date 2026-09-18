import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { home, projects } from "@/content";
import { WorkCard } from "./WorkCard";

/** Istaknuti radovi: editorial grid s pomaknutim stupcem. */
export function FeaturedWork() {
  const w = home.work;
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="container-x section-y">
      <div className="mb-12 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <SectionLabel num="04" className="mb-5">
            {w.label}
          </SectionLabel>
          <SplitText as="h2" text={w.title} className="text-display-lg" />
        </div>
        <Reveal className="md:col-span-4 md:justify-self-end">
          <p className="text-lead max-w-sm">{w.lead}</p>
        </Reveal>
      </div>

      <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((p) => (
          <Reveal key={p.slug} y={40}>
            <WorkCard project={p} aspect="aspect-[4/3]" />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14 flex justify-center md:mt-20">
        <Button href="/radovi" variant="secondary" size="lg">
          {w.cta}
        </Button>
      </Reveal>
    </section>
  );
}
