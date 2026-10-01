export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  services: string[];
  cover: string;
  /** Slike unutar studije slučaja */
  gallery: string[];
  short: string;
  featured: boolean;
  meta: { title: string; description: string };
  intro: string;
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
  quote?: { text: string; name: string; role: string };
  url?: string;
  stack: string[];
};

/** Postavi na true dok nema objavljenih projekata (stranica Radovi tada prikazuje "uskoro"). */
export const workComingSoon = false;

export const workIntro = {
  meta: {
    title: "Radovi — web stranice koje smo napravili | Flomis Osijek",
    description:
      "Projekti digitalne agencije Flomis iz Osijeka: web stranice, web shopovi i AI asistenti za firme iz Hrvatske. Pogledajte što radimo i kako.",
  },
  label: "Radovi",
  title: ["Projekti koji", "donose posao."],
  lead:
    "Ne mjerimo uspjeh nagradama nego upitima, rezervacijama i uštedom vremena. Ovo su stranice koje smo napravili — možete ih otvoriti i isprobati.",
  filters: ["Sve", "Web stranica", "Web shop", "AI asistent"],
  soon: {
    label: "Uskoro",
    title: ["Prvi radovi", "stižu."],
    lead: "Osnovani smo u rujnu 2026. i prvi projekti su u izradi. Ne objavljujemo lažne primjere ni tuđe stranice — ovdje će biti samo pravi projekti, sa stvarnim rezultatima i linkovima na klijente.",
    steps: [
      { when: "Sad", text: "Radimo prve web stranice i AI asistente za firme iz Osijeka i okolice." },
      { when: "Uskoro", text: "Prve studije slučaja: što je klijent trebao, što smo napravili, što se promijenilo." },
      { when: "Ti?", text: "Ako kreneš s nama sad, tvoj projekt je prva priča na ovoj stranici." },
    ],
    cta: { label: "Želim biti prvi projekt", href: "/kontakt" },
  },
  caseLabels: {
    client: "Klijent",
    year: "Godina",
    services: "Usluge",
    stack: "Tehnologija",
    challenge: "Izazov",
    solution: "Rješenje",
    results: "Rezultati",
    visit: "Posjeti stranicu",
    next: "Sljedeći projekt",
    back: "Svi radovi",
  },
};

export const projects: Project[] = [
  {
    slug: "wellar-wellness-osijek",
    title: "Wellar Wellness",
    client: "Wellar — wellness centar, Osijek",
    category: "Web stranica",
    year: "2026",
    services: ["Web stranica", "Online rezervacije", "Višejezičnost", "SEO"],
    cover: "/work/wellar-cover.jpg",
    gallery: ["/work/wellar-cover.jpg", "/work/wellar-3.jpg", "/work/wellar-2.jpg"],
    short: "Wellness centar iz Osijeka s online rezervacijama, poklon bonovima i klubom vjernosti.",
    featured: true,
    meta: {
      title: "Wellar Wellness Osijek — izrada web stranice | Flomis",
      description:
        "Web stranica za wellness centar Wellar iz Osijeka: online rezervacije termina, poklon bonovi, klub vjernosti i hrvatska i engleska verzija.",
    },
    intro:
      "Wellar je wellness centar u Županijskoj ulici u Osijeku — masaže, tretmani lica, rituali opuštanja i red light terapija. Stranica je trebala prenijeti osjećaj mira iz samog centra i istovremeno obavljati konkretan posao: puniti termine bez da netko cijeli dan odgovara na poruke.",
    challenge:
      "Termini su se dogovarali telefonom i porukama, pa su se upiti gubili izvan radnog vremena. Poklon bone trebalo je ručno izdavati, a gosti izvan Hrvatske nisu imali gdje pročitati ponudu na engleskom.",
    solution:
      "Napravili smo stranicu koja vodi posjetitelja do jedne akcije — rezervacije. Usluge su podijeljene po kategorijama s jasnim trajanjem i cijenom, rezervacija se obavlja online (Zoyya), poklon bonovi se kupuju u par klikova, a cijeli sadržaj postoji na hrvatskom i engleskom. Dodali smo i klub vjernosti u tri razine te lokalni SEO za Osijek.",
    results: [
      { value: "24/7", label: "rezervacija termina online" },
      { value: "2", label: "jezika (HR / EN)" },
      { value: "10–300 €", label: "poklon bonovi bez ručnog izdavanja" },
    ],
    url: "https://www.wellar.hr/hr",
    stack: ["Web", "Zoyya rezervacije", "Poklon bonovi", "HR/EN"],
  },
  {
    slug: "lfit-productions",
    title: "LFIT Productions",
    client: "LFIT Productions — Lucian Fitness, Zagreb",
    category: "Web stranica",
    year: "2026",
    services: ["Web stranica", "Prijave klijenata", "Blog", "SEO"],
    cover: "/work/lfit-cover.jpg",
    gallery: ["/work/lfit-cover.jpg", "/work/lfit-3.jpg", "/work/lfit-2.jpg"],
    short: "Stranica za online fitness coaching: programi, transformacije klijenata i prijava u par klikova.",
    featured: true,
    meta: {
      title: "LFIT Productions — izrada web stranice za fitness coaching | Flomis",
      description:
        "Web stranica za LFIT Productions (Lucian Fitness, Zagreb): online treninzi kroz aplikaciju, planovi prehrane, rezultati klijenata i prijava online.",
    },
    intro:
      "LFIT Productions je fitness coaching iz Zagreba — online suradnja kroz aplikaciju (plan treninga, prehrana, tjedna podrška) i individualni treninzi uživo. Posao je dolazio preko Instagrama, ali nije postojalo mjesto gdje se ponuda može pročitati do kraja i odmah prijaviti.",
    challenge:
      "Cijene i sadržaj programa objašnjavali su se u DM-ovima, uvijek iznova. Rezultati klijenata bili su razbacani po objavama, pa novi zainteresirani nisu imali jedan dokaz da sustav radi.",
    solution:
      "Stranica s jasnom ponudom: online suradnja i trening uživo, svaki s cijenom i onime što točno dobivaš. Rezultati klijenata su složeni u galeriju transformacija, prijava ide kroz obrazac umjesto kroz poruke, a blog hvata pretrage ljudi koji tek razmišljaju o treningu. Dizajn prati energiju brenda — tamno, kontrastno, s velikom tipografijom.",
    results: [
      { value: "1 klik", label: "od ponude do prijave" },
      { value: "0", label: "objašnjavanja cijena u DM-ovima" },
      { value: "∞", label: "transformacija na jednom mjestu" },
    ],
    url: "https://lfit-productions.hr/",
    stack: ["Web", "Obrazac za prijave", "Blog", "SEO"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
