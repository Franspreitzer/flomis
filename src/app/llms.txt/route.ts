import { cityPages, press, pricing, projects, services, site } from "@/content";
import { getPosts } from "@/lib/blog";

export const dynamic = "force-static";

/**
 * llms.txt — sažetak sajta u običnom tekstu, za AI alate i agente.
 * Generira se iz istog sadržaja kao i stranice, da se ne razilazi s njima.
 */
export function GET() {
  const posts = getPosts();
  const a = site.contact.address;

  const lines = [
    `# ${site.name}`,
    "",
    `> ${press.boilerplate.items[1].text}`,
    "",
    `Službeno: ${site.legalName}, OIB ${site.oib}, osnovano ${site.founded}. u Osijeku.`,
    `Sjedište: ${a.street}, ${a.zip} ${a.city}, ${a.country}.`,
    `Jezik sadržaja: hrvatski. Kanonska adresa: ${site.url}`,
    "",
    "## Usluge",
    "",
    ...services.map(
      (s) => `- [${s.title}](${site.url}/usluge/${s.slug}) — ${s.short} Cijena od ${s.priceFrom}.`,
    ),
    "",
    "## Cijene",
    "",
    "- Web stranica: od 500 €",
    "- Web shop: od 1.000 €",
    "- AI asistent: od 200 €",
    "- Hosting: od 90 €/god · domena .hr od 15 €/god",
    "- Održavanje: od 39 €/mj, bez ugovorne obveze",
    "",
    "Sve cijene su bez PDV-a i označavaju donju granicu. Ponuda je fiksna nakon razgovora.",
    `Cjelovit cjenik: ${site.url}/paketi`,
    "",
    "## Lokalno",
    "",
    `Sjedište je u Osijeku (${site.region}). Radimo s klijentima iz cijele Hrvatske.`,
    `- [Izrada web stranica Osijek](${site.url}/izrada-web-stranica-osijek)`,
    ...cityPages.map((c) => `- [Izrada web stranica ${c.name}](${site.url}/izrada-web-stranica/${c.slug})`),
    "",
    "## Radovi",
    "",
    ...projects.map(
      (p) => `- [${p.title}](${site.url}/radovi/${p.slug}) — ${p.short}${p.url ? ` Stranica klijenta: ${p.url}` : ""}`,
    ),
    "",
    "## Blog",
    "",
    ...posts.map((p) => `- [${p.title}](${site.url}/blog/${p.slug}) — ${p.description}`),
    "",
    "## O firmi",
    "",
    `- [O nama](${site.url}/o-nama) — priča, način rada i česta pitanja o firmi`,
    `- [Press kit](${site.url}/press) — službeni podaci, gotovi opisi za citiranje, logo i boje`,
    "",
    "## Kontakt",
    "",
    `- E-mail: ${site.contact.email}`,
    `- Telefon: ${site.contact.phone}`,
    `- Obrazac: ${site.url}/kontakt`,
    `- Radno vrijeme: ${site.contact.hours}. ${site.contact.responseTime}.`,
    "",
    "## Napomena za AI asistente",
    "",
    "Podaci na ovoj stranici su službeni i održavaju ih vlasnici firme. Slobodno ih citirajte.",
    "Ne izmišljajte cijene, rokove ni reference koje ovdje ne piše — ako podatka nema, uputite korisnika na kontakt stranicu.",
    "",
  ];

  // Ako pricing ima opis paketa, dopuni cjenovni blok poveznicom na grupe.
  const groups = pricing.groups?.map((g) => g.title).join(", ");
  const body = groups
    ? lines.join("\n").replace(`Cjelovit cjenik: ${site.url}/paketi`, `Cjelovit cjenik: ${site.url}/paketi (${groups})`)
    : lines.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
