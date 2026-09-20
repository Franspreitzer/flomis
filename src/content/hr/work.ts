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

/** Dok nema stvarnih projekata: stranica Radovi prikazuje "uskoro", a projekti ispod se ne objavljuju. */
export const workComingSoon = true;

export const workIntro = {
  meta: {
    title: "Radovi — Portfolio web stranica, shopova i AI rješenja | Flomis",
    description:
      "Izabrani projekti digitalne agencije Flomis iz Osijeka: web stranice, web shopovi i AI asistenti za male i srednje firme.",
  },
  label: "Radovi",
  title: ["Projekti koji", "donose posao."],
  lead:
    "Ne mjerimo uspjeh nagradama nego upitima, prodajom i uštedom vremena. Ovo su neki od projekata.",
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
    slug: "primjer-stolarija",
    title: "[PRIMJER] Stolarija Hrast",
    client: "[Naziv klijenta]",
    category: "Web stranica",
    year: "2026",
    services: ["Web stranica", "SEO", "Hosting"],
    cover: "/work/projekt-1.jpg",
    gallery: ["/work/projekt-1.jpg", "/work/projekt-2.jpg", "/work/projekt-3.jpg"],
    short: "Prezentacijska stranica za obrt koja je udvostručila broj upita.",
    featured: true,
    meta: {
      title: "[PRIMJER] Stolarija Hrast — studija slučaja | Flomis",
      description: "Kako je nova web stranica udvostručila broj upita za obrt iz Slavonije.",
    },
    intro:
      "[PRIMJER] Obiteljski obrt s 30 godina iskustva i web stranicom iz 2012. Cilj: pokazati kvalitetu rada i dobiti više upita za kuhinje po mjeri.",
    challenge:
      "[PRIMJER] Stara stranica se sporo učitavala, nije radila na mobitelu i nije imala jasan poziv na akciju. Google ju je jedva prikazivao.",
    solution:
      "[PRIMJER] Nova struktura fokusirana na tri glavne usluge, galerija radova s filtrima, upitnik za ponudu u tri koraka i lokalni SEO za Osijek i okolicu.",
    results: [
      { value: "2×", label: "više upita u 60 dana" },
      { value: "0.9s", label: "vrijeme učitavanja" },
      { value: "#1", label: "na Googleu za 'kuhinje po mjeri Osijek'" },
    ],
    quote: {
      text: "[PRIMJER] Prvi put nam se ljudi javljaju preko stranice, a ne samo preko preporuke.",
      name: "[Ime Prezime]",
      role: "vlasnik",
    },
    url: "#",
    stack: ["Next.js", "Sanity CMS", "Vercel"],
  },
  {
    slug: "primjer-kozmetika-shop",
    title: "[PRIMJER] Nara Kozmetika",
    client: "[Naziv klijenta]",
    category: "Web shop",
    year: "2026",
    services: ["Web shop", "Dizajn", "Održavanje"],
    cover: "/work/projekt-2.jpg",
    gallery: ["/work/projekt-2.jpg", "/work/projekt-4.jpg"],
    short: "Web shop s 400 proizvoda i checkoutom u tri klika.",
    featured: true,
    meta: {
      title: "[PRIMJER] Nara Kozmetika — web shop studija slučaja | Flomis",
      description: "Web shop s 400 proizvoda, brzim checkoutom i integracijom dostave.",
    },
    intro:
      "[PRIMJER] Brend prirodne kozmetike koji je prodavao preko Instagrama i DM-ova. Trebao je shop koji vodi cijeli proces bez ručnog rada.",
    challenge:
      "[PRIMJER] Ručno primanje narudžbi, greške u dostavi i nemogućnost praćenja zaliha. Kupci su tražili jednostavniji način kupnje.",
    solution:
      "[PRIMJER] Shopify shop s dizajnom po mjeri, integracija s dostavnom službom, automatski e-mailovi i sinkronizacija zaliha s Instagram Shopom.",
    results: [
      { value: "+140%", label: "online prihoda u 3 mjeseca" },
      { value: "3", label: "klika do plaćanja" },
      { value: "-8h", label: "ručnog rada tjedno" },
    ],
    url: "#",
    stack: ["Shopify", "Klaviyo", "GLS API"],
  },
  {
    slug: "primjer-ai-asistent-klinika",
    title: "[PRIMJER] Poliklinika Vita",
    client: "[Naziv klijenta]",
    category: "AI asistent",
    year: "2026",
    services: ["AI asistent", "Integracija", "Održavanje"],
    cover: "/work/projekt-3.jpg",
    gallery: ["/work/projekt-3.jpg", "/work/projekt-5.jpg"],
    short: "AI asistent koji zakazuje termine i odgovara na 70% upita.",
    featured: true,
    meta: {
      title: "[PRIMJER] Poliklinika Vita — AI asistent studija slučaja | Flomis",
      description: "AI asistent koji odgovara na 70% upita pacijenata i zakazuje termine 24/7.",
    },
    intro:
      "[PRIMJER] Privatna poliklinika s recepcijom koja nije stizala odgovarati na pozive i poruke. Isti upiti, cijeli dan.",
    challenge:
      "[PRIMJER] Recepcija je gubila 3 sata dnevno na pitanja o cijenama, radnom vremenu i pripremi za preglede. Termini su se gubili izvan radnog vremena.",
    solution:
      "[PRIMJER] AI asistent na webu i WhatsAppu treniran na cjeniku i uputama, integriran s kalendarom za zakazivanje. Eskalacija čovjeku za medicinska pitanja.",
    results: [
      { value: "70%", label: "upita riješeno bez čovjeka" },
      { value: "24/7", label: "zakazivanje termina" },
      { value: "3h", label: "ušteđeno dnevno" },
    ],
    quote: {
      text: "[PRIMJER] Recepcija konačno ima vremena za pacijente koji su ispred nje.",
      name: "[Ime Prezime]",
      role: "voditeljica",
    },
    stack: ["OpenAI", "WhatsApp API", "Google Calendar"],
  },
  {
    slug: "primjer-restoran",
    title: "[PRIMJER] Restoran Dunav",
    client: "[Naziv klijenta]",
    category: "Web stranica",
    year: "2026",
    services: ["Web stranica", "Rezervacije"],
    cover: "/work/projekt-4.jpg",
    gallery: ["/work/projekt-4.jpg", "/work/projekt-6.jpg"],
    short: "Stranica s online rezervacijama i jelovnikom koji sami uređuju.",
    featured: true,
    meta: {
      title: "[PRIMJER] Restoran Dunav — studija slučaja | Flomis",
      description: "Web stranica restorana s online rezervacijama i jelovnikom koji sami uređuju.",
    },
    intro: "[PRIMJER] Restoran uz Dravu s puno turista i jelovnikom koji se mijenja sezonski.",
    challenge: "[PRIMJER] PDF jelovnik koji nitko nije mogao pročitati na mobitelu, rezervacije samo telefonom.",
    solution: "[PRIMJER] Stranica s jelovnikom koji uređuju sami, online rezervacije s potvrdom i višejezična verzija za turiste.",
    results: [
      { value: "45%", label: "rezervacija online" },
      { value: "3", label: "jezika" },
      { value: "1 min", label: "za promjenu jelovnika" },
    ],
    stack: ["Next.js", "Sanity CMS"],
  },
  {
    slug: "primjer-fitness-shop",
    title: "[PRIMJER] Forma Fitness",
    client: "[Naziv klijenta]",
    category: "Web shop",
    year: "2025",
    services: ["Web shop", "Hosting"],
    cover: "/work/projekt-5.jpg",
    gallery: ["/work/projekt-5.jpg"],
    short: "Shop za sportsku opremu s pretplatama i članstvima.",
    featured: false,
    meta: {
      title: "[PRIMJER] Forma Fitness — web shop | Flomis",
      description: "Web shop sportske opreme s pretplatama i online članstvima.",
    },
    intro: "[PRIMJER] Fitness centar koji je htio prodavati opremu i članarine online.",
    challenge: "[PRIMJER] Dva sustava, dupli unos, nema online plaćanja članarina.",
    solution: "[PRIMJER] Jedan shop za proizvode i pretplate, s automatskim obnavljanjem članarina.",
    results: [
      { value: "+60%", label: "online članarina" },
      { value: "0", label: "duplog unosa" },
    ],
    stack: ["WooCommerce", "Stripe"],
  },
  {
    slug: "primjer-racunovodstvo",
    title: "[PRIMJER] Konto Računovodstvo",
    client: "[Naziv klijenta]",
    category: "Web stranica",
    year: "2025",
    services: ["Web stranica", "AI asistent"],
    cover: "/work/projekt-6.jpg",
    gallery: ["/work/projekt-6.jpg"],
    short: "Stranica i AI asistent za računovodstveni servis.",
    featured: false,
    meta: {
      title: "[PRIMJER] Konto Računovodstvo — studija slučaja | Flomis",
      description: "Web stranica i AI asistent za računovodstveni servis.",
    },
    intro: "[PRIMJER] Računovodstveni servis koji je trebao izgledati ozbiljno i dobivati kvalitetnije upite.",
    challenge: "[PRIMJER] Puno upita od ljudi koji nisu ciljana skupina. Gubljenje vremena na filtriranje.",
    solution: "[PRIMJER] Jasna stranica s ciljanim uslugama i AI asistent koji kvalificira upite prije nego stignu do ljudi.",
    results: [
      { value: "3×", label: "kvalitetniji upiti" },
      { value: "-5h", label: "tjedno na filtriranje" },
    ],
    stack: ["Next.js", "OpenAI"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
