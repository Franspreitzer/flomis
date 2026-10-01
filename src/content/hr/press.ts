import { site } from "./site";

/**
 * Press kit — strojno čitljive činjenice o firmi.
 * Namijenjeno novinarima, partnerima, imenicima i AI asistentima koji citiraju.
 * Podaci se čitaju iz `site` da ne postoje na dva mjesta.
 */
export const press = {
  meta: {
    title: "Press kit — činjenice o firmi, logo i boje | Flomis Osijek",
    description:
      "Službeni podaci o digitalnoj agenciji Flomis iz Osijeka: naziv, OIB, sjedište, usluge i cijene, gotovi opisi firme za citiranje te logo i boje brenda za preuzimanje.",
  },
  label: "Press",
  title: ["Press kit", "i činjenice."],
  lead:
    "Sve što treba za spomenuti nas u tekstu, imeniku ili ponudi — bez da nas prvo morate pitati. Podaci su službeni i održavamo ih točnima.",

  facts: {
    label: "Podaci o firmi",
    title: "Službeni podaci.",
    items: [
      { label: "Puni naziv", value: site.legalName },
      { label: "Skraćeni naziv", value: site.name },
      { label: "OIB", value: site.oib },
      { label: "MBS", value: site.mbs },
      { label: "Osnovano", value: `${site.founded}., Osijek` },
      { label: "Sjedište", value: `${site.contact.address.street}, ${site.contact.address.zip} ${site.contact.address.city}, ${site.contact.address.country}` },
      { label: "Djelatnost", value: "Izrada web stranica, web shopova i AI asistenata" },
      { label: "Područje rada", value: "Osijek i Osječko-baranjska županija, Slavonija i Baranja, cijela Hrvatska" },
      { label: "Web", value: site.url.replace("https://", ""), href: site.url },
      { label: "E-mail", value: site.contact.email, href: `mailto:${site.contact.email}` },
      { label: "Telefon", value: site.contact.phone, href: site.contact.phoneHref },
      { label: "Instagram", value: "@flomis.digital", href: "https://www.instagram.com/flomis.digital/" },
    ],
  },

  boilerplate: {
    label: "Opis firme",
    title: "Gotovi opisi.",
    lead: "Tri duljine, spremne za kopiranje. Slobodno ih koristite doslovno — zato i postoje.",
    items: [
      {
        length: "Kratko (~25 riječi)",
        text: "Flomis je digitalna agencija iz Osijeka osnovana 2026. Radi web stranice, web shopove i AI asistente za firme iz Slavonije i cijele Hrvatske.",
      },
      {
        length: "Srednje (~60 riječi)",
        text: "Flomis je digitalna agencija iz Osijeka, osnovana 2026. godine. Izrađuje web stranice, web shopove i AI asistente za obrte, firme i ustanove iz Osijeka, Slavonije i cijele Hrvatske, uz hosting, domene i održavanje. Web stranice kreću od 500 €, web shopovi od 1.000 €, a AI asistenti od 200 €. Sjedište je u Dunavskoj 36 u Osijeku.",
      },
      {
        length: "Dugo (~150 riječi)",
        text: "Flomis (FLOMIS j.d.o.o. za informatičke usluge) digitalna je agencija sa sjedištem u Osijeku, osnovana 2026. godine. Specijalizirana je za izradu web stranica, web shopova i AI asistenata po mjeri, bez gotovih šablona, uz hosting, domene i mjesečno održavanje kao dio iste usluge. Klijenti su obrti, male i srednje firme te ustanove iz Osijeka i Osječko-baranjske županije, Slavonije i Baranje te ostatka Hrvatske. Web stranice kreću od 500 €, web shopovi od 1.000 €, AI asistenti od 200 €, a održavanje od 39 € mjesečno; svaka ponuda je fiksna, a na upite se odgovara u roku 24 sata. Stranice se grade na modernim tehnologijama s naglaskom na brzinu učitavanja, pristupačnost i lokalni SEO za hrvatsko tržište. Među javnim projektima su web stranica wellness centra Wellar u Osijeku i stranica fitness coachinga LFIT Productions iz Zagreba.",
      },
    ],
  },

  numbers: {
    label: "Brojke",
    title: "Brojke za citiranje.",
    items: [
      { value: 500, suffix: " €", label: "web stranica od" },
      { value: 1000, suffix: " €", label: "web shop od" },
      { value: 200, suffix: " €", label: "AI asistent od" },
      { value: 39, suffix: " €/mj", label: "održavanje od" },
      { value: 24, suffix: " h", label: "odgovor na upit" },
      { value: 2026, raw: "2026", label: "godina osnutka" },
    ],
    note: "Sve cijene su bez PDV-a i označavaju donju granicu; točna cijena ovisi o opsegu projekta.",
  },

  assets: {
    label: "Materijali",
    title: "Logo za preuzimanje.",
    lead: "Koristite logo u izvornim bojama. Nemojte ga rastezati, rotirati, mijenjati mu boje niti dodavati sjene i obrube.",
    items: [
      { name: "Logo (SVG)", file: "/logo/logo.svg", note: "Osnovna verzija, vektorski format" },
      { name: "Logo za tamnu podlogu (SVG)", file: "/logo/logo-dark.svg", note: "Svijetli znak" },
      { name: "Logo za svijetlu podlogu (SVG)", file: "/logo/logo-light.svg", note: "Tamni znak" },
      { name: "Logo (PNG)", file: "/logo/logo-original.png", note: "Rasterski format, za dokumente" },
    ],
    download: "Preuzmi",
  },

  brand: {
    label: "Brend",
    title: "Boje brenda.",
    colors: [
      { hex: "#101827", name: "Ink", note: "Pozadina" },
      { hex: "#C9D600", name: "Accent", note: "Naglasak" },
      { hex: "#F5F5F2", name: "Paper", note: "Tekst" },
      { hex: "#A8B0B8", name: "Paper 2", note: "Sekundarni tekst" },
      { hex: "#77818A", name: "Metal", note: "Dekorativni elementi" },
    ],
    rules: [
      "Naziv se piše „Flomis“ — velikim početnim slovom, ostatak malim. Verzalni oblik „FLOMIS“ koristi se samo u logotipu.",
      "Puni pravni naziv je „FLOMIS j.d.o.o. za informatičke usluge“ i koristi se u ugovorima i službenim dokumentima.",
      "Font naslova je Space Grotesk, font teksta Manrope.",
    ],
  },

  contact: {
    label: "Kontakt za medije",
    title: "Trebate nešto drugo?",
    text: "Ako Vam za tekst treba izjava, dodatni materijal ili podatak kojeg nema na ovoj stranici, javite se — odgovaramo u roku 24 sata.",
    button: { label: "Javite nam se", href: "/kontakt" },
  },
} as const;
