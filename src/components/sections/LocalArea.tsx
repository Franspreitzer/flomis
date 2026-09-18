import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { home, site } from "@/content";

/** Lokalni SEO blok na početnoj: Osijek + područje rada (gradovi i županije). */
export function LocalArea() {
  const l = home.local;
  return (
    <section className="container-x section-y border-t border-line">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionLabel num="08" className="mb-5">
            {l.label}
          </SectionLabel>
          <SplitText as="h2" text={l.title} className="text-display-md" />
          <Reveal>
            <p className="text-lead mt-6 max-w-xl">{l.text}</p>
            <div className="mt-8">
              <Button href={l.cta.href} variant="secondary">
                {l.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-5 lg:col-start-8">
          <p className="text-label mb-4 text-paper-3">{l.citiesLabel}</p>
          <ul className="flex flex-wrap gap-2">
            {site.serviceArea.map((c) => (
              <li key={c} className="rounded-full border border-line px-4 py-2 text-sm text-paper-2">
                {c}
              </li>
            ))}
          </ul>
          <address className="mt-8 border-t border-line pt-6 text-sm not-italic text-paper-2">
            <span className="block font-semibold text-paper">{site.legalName}</span>
            {site.contact.address.street}, {site.contact.address.zip} {site.contact.address.city} · {site.region}
            <br />
            <a href={site.contact.phoneHref} className="hover:text-paper">
              {site.contact.phone}
            </a>{" "}
            ·{" "}
            <a href={`mailto:${site.contact.email}`} className="hover:text-paper">
              {site.contact.email}
            </a>
          </address>
        </Reveal>
      </div>
    </section>
  );
}
