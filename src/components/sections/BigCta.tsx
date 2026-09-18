import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { home, site } from "@/content";

type Props = {
  title?: readonly string[] | string;
  text?: string;
  button?: { label: string; href: string };
  label?: string;
};

/** Veliki završni CTA prije footera: rotirajući prsten teksta + magnetni gumb. */
export function BigCta({ title = home.cta.title, text = home.cta.text, button = home.cta.button, label = home.cta.label }: Props) {
  const ring = `${label.toUpperCase()} · ${site.name.toUpperCase()} · `;
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[80vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12] blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(201,214,0,0.35), transparent 70%)" }} />
      <div className="container-x relative z-10 flex min-h-[80vh] flex-col items-center justify-center py-24 text-center md:py-32">
        <p className="text-label mb-8 text-paper-3">( {label} )</p>
        <SplitText as="h2" text={title} className="text-display-lg" mode="words" />
        <Reveal className="mt-8 max-w-xl">
          <p className="text-lead">{text}</p>
        </Reveal>
        <Reveal className="relative mt-10 flex flex-col items-center gap-2">
          <div className="relative py-20 md:py-24">
            <svg
              viewBox="0 0 200 200"
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 text-paper-3 motion-safe:animate-spin-slow md:h-[260px] md:w-[260px]"
            >
              <defs>
                <path id="ctaRing" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
              </defs>
              <text className="fill-current font-mono text-[11px] tracking-[0.3em]">
                <textPath href="#ctaRing">{ring.repeat(2)}</textPath>
              </text>
            </svg>
            <Button href={button.href} size="lg">
              {button.label}
            </Button>
          </div>
          <p className="text-sm text-paper-2">
            {home.cta.alt}{" "}
            <a href={site.contact.phoneHref} className="text-paper underline underline-offset-4 hover:text-paper">
              {site.contact.phone}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
