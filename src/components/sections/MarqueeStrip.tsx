import { Marquee } from "@/components/ui/Marquee";
import { home } from "@/content";

/** Dvije trake u suprotnim smjerovima: puna i outline tipografija. */
export function MarqueeStrip() {
  return (
    <section aria-label="Usluge" className="relative border-y border-line py-6 md:py-8">
      <Marquee
        items={home.marquee}
        duration={45}
        className="font-display text-[clamp(2rem,6vw,5.5rem)] font-bold uppercase leading-none tracking-tight"
      />
      <Marquee
        items={[...home.marquee].reverse()}
        reverse
        duration={55}
        className="mt-3 font-display text-[clamp(2rem,6vw,5.5rem)] font-bold uppercase leading-none tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(245,245,242,0.35)]"
      />
    </section>
  );
}
