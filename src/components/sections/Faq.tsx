import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { ui } from "@/content";

type Props = {
  label: string;
  title: string | readonly string[];
  items: readonly { q: string; a: string }[];
  num?: string;
  cta?: boolean;
  light?: boolean;
};

/** FAQ: sticky naslov lijevo, harmonika desno. */
export function Faq({ label, title, items, num = "05", cta = true, light }: Props) {
  return (
    <section className={light ? "theme-light section-y" : "section-y"}>
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionLabel num={num} className="mb-5">
              {label}
            </SectionLabel>
            <SplitText as="h2" text={title} className="text-display-md" />
            {cta && (
              <Reveal className="mt-8">
                <Button href="/kontakt" variant="ghost">
                  {ui.common.contactUs}
                </Button>
              </Reveal>
            )}
          </div>
        </div>
        <Reveal className="lg:col-span-8">
          <Accordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}
