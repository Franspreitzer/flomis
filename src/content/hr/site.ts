export const site = {
  name: "Flomis",
  legalName: "FLOMIS j.d.o.o. za informatičke usluge",
  tagline: "Digitalna agencija iz Osijeka",
  description:
    "Flomis je digitalna agencija iz Osijeka (Osječko-baranjska županija). Izrada web stranica, web shopova i AI asistenata za firme iz Osijeka, Slavonije i Baranje — brzo, po mjeri i s rezultatom.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://flomis.hr",
  locale: "hr_HR",
  lang: "hr",
  founded: "2026",
  oib: "39781208205",
  mbs: "030323572",
  contact: {
    email: "info@flomis.hr",
    phone: "097 642 5423",
    phoneHref: "tel:+385976425423",
    address: {
      street: "Dunavska 36",
      zip: "31000",
      city: "Osijek",
      country: "Hrvatska",
      countryCode: "HR",
    },
    whatsapp: "https://wa.me/385976425423?text=Bok%2C%20zanima%20me%20ponuda%20za%20web%20stranicu.",
    whatsappLabel: "Piši nam na WhatsApp",
    /** Link "Ostavi recenziju" iz Google Business Profila (Profil → Zatraži recenzije). Prazno = gumb se ne prikazuje. */
    googleReviewUrl: "",
    googleReviewLabel: "Ostavi recenziju na Googleu",
    hours: "Pon – Pet, 9:00 – 17:00",
    responseTime: "Odgovaramo u roku 24 sata",
  },
  geo: { lat: 45.5511, lng: 18.6939 },
  /** Lokalni SEO: područje rada (koristi se u tekstu, footeru i schema.org areaServed). */
  region: "Osječko-baranjska županija",
  serviceArea: [
    "Osijek",
    "Đakovo",
    "Našice",
    "Beli Manastir",
    "Valpovo",
    "Belišće",
    "Donji Miholjac",
    "Vinkovci",
    "Vukovar",
    "Slavonski Brod",
    "Požega",
    "Virovitica",
  ],
  regions: ["Osječko-baranjska županija", "Vukovarsko-srijemska županija", "Brodsko-posavska županija", "Slavonija i Baranja"],
  social: [
    { label: "Instagram", href: "https://instagram.com/[FLOMIS]", handle: "@[flomis]" },
    { label: "LinkedIn", href: "https://linkedin.com/company/[flomis]", handle: "/flomis" },
    { label: "Facebook", href: "https://facebook.com/[flomis]", handle: "/flomis" },
  ],
} as const;

export const nav = {
  main: [
    { label: "Usluge", href: "/usluge" },
    { label: "Radovi", href: "/radovi" },
    { label: "Paketi", href: "/paketi" },
    { label: "Blog", href: "/blog" },
    { label: "O nama", href: "/o-nama" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  cta: { label: "Zatraži ponudu", href: "/kontakt" },
  services: [
    { label: "Web stranice", href: "/usluge/web-stranice" },
    { label: "Web shopovi", href: "/usluge/web-shopovi" },
    { label: "AI asistenti", href: "/usluge/ai-asistenti" },
    { label: "Hosting i domene", href: "/usluge/hosting-i-domene" },
    { label: "Održavanje", href: "/usluge/odrzavanje" },
  ],
  legal: [
    { label: "Politika privatnosti", href: "/politika-privatnosti" },
    { label: "Politika kolačića", href: "/politika-kolacica" },
  ],
} as const;

export const ui = {
  skipToContent: "Preskoči na sadržaj",
  menuOpen: "Otvori izbornik",
  menuClose: "Zatvori izbornik",
  cursor: { view: "Pogledaj", open: "Otvori", drag: "Povuci" },
  preloader: { loading: "Učitavanje" },
  footer: {
    heading: "Spremni za web koji radi?",
    ctaLabel: "Javi nam se",
    rights: "Sva prava pridržana.",
    madeIn: "Napravljeno u Osijeku",
    columns: {
      services: "Usluge",
      company: "Firma",
      contact: "Kontakt",
    },
  },
  cookie: {
    title: "Kolačići",
    text: "Koristimo nužne kolačiće da stranica radi, a analitičke samo uz tvoj pristanak. Detalji su u ",
    linkLabel: "politici kolačića",
    acceptAll: "Prihvati sve",
    essentialOnly: "Samo nužni",
  },
  common: {
    readMore: "Saznaj više",
    allServices: "Sve usluge",
    allWork: "Svi radovi",
    getQuote: "Zatraži ponudu",
    contactUs: "Kontaktiraj nas",
    backHome: "Natrag na početnu",
    next: "Sljedeće",
    prev: "Prethodno",
    example: "[PRIMJER]",
  },
} as const;

export const blogUi = {
  meta: {
    title: "Blog — savjeti o web stranicama, SEO-u i AI-u za firme iz Osijeka | Flomis",
    description:
      "Praktični savjeti za male i srednje firme iz Osijeka i Slavonije: cijene web stranica, lokalni SEO, web shopovi, AI asistenti. Bez praznog govora.",
  },
  label: "Blog",
  title: ["Savjeti koji", "donose posao."],
  lead: "Pišemo o onome što nas klijenti stvarno pitaju: koliko košta, kako se pojaviti na Googleu, kada se isplati web shop ili AI asistent.",
  readingTime: "min čitanja",
  published: "Objavljeno",
  updated: "Ažurirano",
  category: "Kategorija",
  allPosts: "Svi članci",
  latest: "Najnovije s bloga",
  more: "Pročitaj",
  share: "Podijeli",
  toc: "Sadržaj",
  related: "Slični članci",
  crumbs: { home: "Početna", blog: "Blog" },
  cta: {
    title: "Imaš pitanje koje nismo pokrili?",
    text: "Pošalji nam ga — odgovorimo, a možda i napišemo članak.",
    button: { label: "Postavi pitanje", href: "/kontakt" },
  },
} as const;
