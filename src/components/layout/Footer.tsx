import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { cityPages, nav, site, ui } from "@/content";

export function Footer() {
  const year = new Date().getFullYear();
  const a = site.contact.address;

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <div className="container-x">
        {/* Gornji dio: CTA + kolone */}
        <div className="grid gap-12 py-16 md:grid-cols-12 md:py-24">
          <Reveal className="md:col-span-5">
            <p className="text-label mb-4 text-paper-3">( {ui.footer.madeIn} )</p>
            <h2 className="text-display-sm mb-8 max-w-sm">{ui.footer.heading}</h2>
            <Button href={nav.cta.href} size="md">
              {ui.footer.ctaLabel}
            </Button>
          </Reveal>

          <Reveal className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3" stagger="[data-reveal-item]">
            <div data-reveal-item>
              <p className="text-label mb-5 text-paper-3">{ui.footer.columns.services}</p>
              <ul className="space-y-2.5">
                {nav.services.map((s) => (
                  <li key={s.href}>
                    <TransitionLink href={s.href} className="text-[0.95rem] text-paper-2 transition-colors hover:text-paper">
                      {s.label}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal-item>
              <p className="text-label mb-5 text-paper-3">{ui.footer.columns.company}</p>
              <ul className="space-y-2.5">
                {nav.main.map((s) => (
                  <li key={s.href}>
                    <TransitionLink href={s.href} className="text-[0.95rem] text-paper-2 transition-colors hover:text-paper">
                      {s.label}
                    </TransitionLink>
                  </li>
                ))}
                {nav.legal.map((s) => (
                  <li key={s.href}>
                    <TransitionLink href={s.href} className="text-[0.95rem] text-paper-2 transition-colors hover:text-paper">
                      {s.label}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal-item className="col-span-2 md:col-span-1">
              <p className="text-label mb-5 text-paper-3">{ui.footer.columns.contact}</p>
              <ul className="space-y-2.5 text-[0.95rem] text-paper-2">
                <li>
                  <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-paper">
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  <a href={site.contact.phoneHref} className="transition-colors hover:text-paper">
                    {site.contact.phone}
                  </a>
                </li>
                <li>
                  <a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-paper">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <address className="not-italic">
                    {a.street}
                    <br />
                    {a.zip} {a.city}, {a.country}
                  </address>
                </li>
                <li className="flex flex-wrap gap-x-4 pt-2">
                  {site.social.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-paper transition-colors hover:text-paper"
                    >
                      {s.label}
                    </a>
                  ))}
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Veliki logo */}
        <Reveal y={60} className="pb-6 text-paper" start="top 95%">
          <Logo className="w-full" />
        </Reveal>

        {/* Lokalni SEO: područje rada */}
        <p className="border-t border-line py-5 text-xs leading-relaxed text-paper-3">
          <TransitionLink href="/izrada-web-stranica-osijek" className="text-paper-2 hover:text-paper">
            Izrada web stranica Osijek
          </TransitionLink>{" "}
          {" · "}
          {cityPages.map((c, i) => (
            <span key={c.slug}>
              {i > 0 && " · "}
              <TransitionLink href={`/izrada-web-stranica/${c.slug}`} className="hover:text-paper">
                {c.name}
              </TransitionLink>
            </span>
          ))}
          {" · "}
          {site.region}
        </p>

        {/* Pravni redak */}
        <div className="flex flex-col gap-2 border-t border-line py-6 text-xs text-paper-3 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName} · OIB {site.oib} · {ui.footer.rights}
          </p>
          <p className="font-mono">
            ( {a.city}, {a.countryCode} ) · {site.url.replace(/^https?:\/\//, "")}
          </p>
        </div>
      </div>
    </footer>
  );
}
