import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { contact, site } from "@/content";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ ...contact.meta, path: "/kontakt" });

export default function ContactPage() {
  const a = site.contact.address;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${a.street}, ${a.zip} ${a.city}`)}`;

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Početna", path: "" }, { name: "Kontakt", path: "/kontakt" }]), faqJsonLd(contact.faq)]} />
      <PageHero label={contact.label} title={contact.title} lead={contact.lead} size="xl" />

      <section className="container-x grid gap-14 pb-[var(--section-y)] lg:grid-cols-12">
        {/* Info */}
        <Reveal className="lg:col-span-4">
          <dl className="space-y-8">
            <div>
              <dt className="text-label mb-2 text-paper-3">{contact.info.emailLabel}</dt>
              <dd>
                <a href={`mailto:${site.contact.email}`} className="font-display text-2xl font-bold tracking-tight transition-colors hover:text-paper md:text-3xl">
                  {site.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-label mb-2 text-paper-3">{contact.info.phoneLabel}</dt>
              <dd>
                <a href={site.contact.phoneHref} className="font-display text-2xl font-bold tracking-tight transition-colors hover:text-paper md:text-3xl">
                  {site.contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <Button href={site.contact.whatsapp} external variant="secondary" size="sm">
                {site.contact.whatsappLabel}
              </Button>
            </div>
            <div>
              <dt className="text-label mb-2 text-paper-3">{contact.info.addressLabel}</dt>
              <dd>
                <a href={maps} target="_blank" rel="noopener noreferrer" className="text-lg text-paper transition-colors hover:text-paper">
                  <address className="not-italic">
                    {site.legalName}
                    <br />
                    {a.street}, {a.zip} {a.city}
                  </address>
                </a>
                <p className="text-label mt-2 text-paper-3">OIB {site.oib}</p>
              </dd>
            </div>
            <div>
              <dt className="text-label mb-2 text-paper-3">{contact.info.hoursLabel}</dt>
              <dd className="text-lg">
                {site.contact.hours}
                <span className="block text-sm text-paper-2">{site.contact.responseTime}</span>
              </dd>
            </div>
            <div>
              <dt className="text-label mb-2 text-paper-3">{contact.info.socialLabel}</dt>
              <dd className="flex flex-wrap gap-x-5 gap-y-2">
                {site.social.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-lg transition-colors hover:text-paper">
                    {s.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>

        {/* Forma */}
        <Reveal className="lg:col-span-7 lg:col-start-6" y={40}>
          <SectionLabel className="mb-6">{contact.form.title}</SectionLabel>
          <ContactForm />
        </Reveal>
      </section>

      <section className="theme-light section-y">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel className="mb-4">FAQ</SectionLabel>
            <h2 className="text-display-md">{contact.faqTitle}</h2>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={contact.faq} defaultOpen={null} />
          </div>
        </div>
      </section>
    </>
  );
}
