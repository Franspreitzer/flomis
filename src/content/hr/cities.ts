/**
 * Lokalne stranice po gradu: /izrada-web-stranica/[grad]
 * Svaki grad ima vlastiti uvod (da stranice nisu kopije) — Google kažnjava identičan tekst.
 */
export type CityPage = {
  slug: string;
  name: string;
  /** Lokativ za rečenice ("u Đakovu"). */
  in: string;
  /** Genitiv ("iz Đakova"). */
  from: string;
  county: string;
  distanceKm: number;
  intro: string;
  industries: string[];
};

export const cityPages: CityPage[] = [
  {
    slug: "djakovo",
    name: "Đakovo",
    in: "u Đakovu",
    from: "iz Đakova",
    county: "Osječko-baranjska županija",
    distanceKm: 35,
    intro:
      "Đakovo je grad obrta, poljoprivrede, vinara i turizma oko katedrale i Ergele — a većina tih firmi još nema stranicu koja im donosi upite. Do Đakova nam je pola sata vožnje: prvi sastanak može biti uživo, kod tebe u firmi.",
    industries: ["Vinarije i OPG-ovi", "Obrti i građevina", "Turizam i smještaj", "Trgovine i servisi", "Poljoprivredna oprema"],
  },
  {
    slug: "vinkovci",
    name: "Vinkovci",
    in: "u Vinkovcima",
    from: "iz Vinkovaca",
    county: "Vukovarsko-srijemska županija",
    distanceKm: 40,
    intro:
      "Vinkovci su najveći grad Vukovarsko-srijemske županije s jakom trgovinom, prijevozom i proizvodnjom. Radimo s firmama iz Vinkovaca kao i s onima iz Osijeka — online sastanci, a kad treba, dođemo.",
    industries: ["Prijevoz i logistika", "Proizvodnja i B2B", "Trgovine i web shopovi", "Ugostiteljstvo", "Zdravstvo i ljekarne"],
  },
  {
    slug: "vukovar",
    name: "Vukovar",
    in: "u Vukovaru",
    from: "iz Vukovara",
    county: "Vukovarsko-srijemska županija",
    distanceKm: 35,
    intro:
      "Vukovar raste kroz turizam, Dunav i nove male firme. Web stranica koja se pojavi kad turist ili kupac upiše 'Vukovar' u Google je najjeftiniji marketing koji postoji — i to je ono što radimo.",
    industries: ["Turizam, apartmani i restorani", "Obrti i usluge", "Poljoprivreda i vinarstvo", "Trgovine", "Udruge i ustanove"],
  },
  {
    slug: "nasice",
    name: "Našice",
    in: "u Našicama",
    from: "iz Našica",
    county: "Osječko-baranjska županija",
    distanceKm: 50,
    intro:
      "Našice i okolica (Đurđenovac, Feričanci, Podgorač) imaju puno malih proizvođača, obrta i OPG-ova koje kupci traže online, ali ih ne nalaze. Stranica s pravim tekstom i lokalnim SEO-om to mijenja u par tjedana.",
    industries: ["Proizvodnja i drvna industrija", "OPG-ovi i prehrana", "Obrti", "Trgovine i servisi", "Turizam"],
  },
  {
    slug: "slavonski-brod",
    name: "Slavonski Brod",
    in: "u Slavonskom Brodu",
    from: "iz Slavonskog Broda",
    county: "Brodsko-posavska županija",
    distanceKm: 90,
    intro:
      "Slavonski Brod je industrijski i trgovački centar Posavine. Firme odavde najčešće trebaju ozbiljnu poslovnu stranicu ili B2B web shop — i agenciju koja razumije Slavoniju, a ne agenciju iz Zagreba koja te vidi kao 'ostatak Hrvatske'.",
    industries: ["Metalna i strojarska industrija", "B2B dobavljači", "Građevina", "Trgovine i web shopovi", "Autoservisi i prijevoz"],
  },
  {
    slug: "beli-manastir",
    name: "Beli Manastir",
    in: "u Belom Manastiru",
    from: "iz Belog Manastira",
    county: "Osječko-baranjska županija",
    distanceKm: 30,
    intro:
      "Baranja živi od turizma, vina, gastronomije i poljoprivrede — a gosti je traže na Googleu prije nego sjednu u auto. Za firme iz Belog Manastira, Bilja, Kneževih Vinograda i cijele Baranje radimo stranice koje pune rezervacije.",
    industries: ["Vinarije i vinski turizam", "Restorani, čarde i smještaj", "OPG-ovi i proizvodi", "Obrti", "Lovni i eko turizam"],
  },
];

export const cityTemplate = {
  meta: (c: CityPage) => ({
    title: `Izrada web stranica ${c.name} — web agencija iz Osijeka, od 500 € | Flomis`,
    description: `Izrada web stranica, web shopova i AI asistenata za firme ${c.from} i okolice (${c.county}). Agencija iz Osijeka, ${c.distanceKm} km od vas. Dizajn po mjeri, lokalni SEO, fiksna ponuda u 24 h.`,
    keywords: [
      `izrada web stranica ${c.name.toLowerCase()}`,
      `web stranice ${c.name.toLowerCase()}`,
      `web dizajn ${c.name.toLowerCase()}`,
      `web shop ${c.name.toLowerCase()}`,
      `seo ${c.name.toLowerCase()}`,
      c.county.toLowerCase(),
    ],
  }),
  label: (c: CityPage) => `${c.name} · ${c.county}`,
  title: (c: CityPage) => ["Izrada web", `stranica ${c.name}.`],
  lead: (c: CityPage) =>
    `Web stranice, web shopovi i AI asistenti za firme, obrte i OPG-ove ${c.from}. Flomis je agencija iz Osijeka — ${c.distanceKm} km od vas — koja radi stranice koje se učitavaju u sekundi i pojavljuju na Googleu kad netko upiše vašu djelatnost i "${c.name}".`,
  whyLabel: "Zašto Flomis",
  whyTitle: (c: CityPage) => `Agencija iz Osijeka za firme ${c.from}.`,
  industriesLabel: "Za koga radimo",
  industriesTitle: (c: CityPage) => `Djelatnosti ${c.in} kojima najčešće radimo stranice`,
  servicesLabel: "Usluge",
  servicesTitle: "Sve na jednom mjestu",
  faqLabel: "Česta pitanja",
  faqTitle: (c: CityPage) => `Pitanja koja dobivamo ${c.from}`,
  faq: (c: CityPage) => [
    {
      q: `Radite li s firmama ${c.from}?`,
      a: `Da. ${c.name} je ${c.distanceKm} km od našeg ureda u Osijeku — prvi sastanak može biti uživo kod vas ili online. Većina komunikacije tijekom projekta ide e-mailom i video pozivom, pa udaljenost ne usporava ništa.`,
    },
    {
      q: `Koliko košta web stranica za firmu ${c.from}?`,
      a: "Isto kao i u Osijeku: prezentacijska stranica od 500 €, web shop od 1.000 €, AI asistent od 200 €. Nakon kratkog razgovora dobivate fiksnu ponudu bez skrivenih troškova (cijene bez PDV-a).",
    },
    {
      q: `Hoće li me Google prikazati kad netko upiše moju djelatnost i "${c.name}"?`,
      a: `To je cilj. Svaka stranica dobiva lokalni SEO: naziv grada u naslovima i tekstu, Google Business Profil, strukturirane podatke i brzinu. Na Google kartama rezultati se vide za par tjedana, organski ranking za konkurentne pojmove gradi se 3–6 mjeseci.`,
    },
    {
      q: "Što ako već imam stranicu?",
      a: "Napravimo besplatan pregled (brzina, mobilni prikaz, SEO, sadržaj) i iskreno kažemo isplati li se popravak ili redizajn.",
    },
  ],
  ctaTitle: (c: CityPage) => `Trebate web stranicu ${c.in}?`,
  ctaText: "Pošaljite nam par rečenica o firmi ili nazovite. Vraćamo se s idejom i fiksnom ponudom u roku 24 sata.",
  otherCities: "Radimo i u",
  crumbs: { home: "Početna", parent: "Izrada web stranica Osijek" },
};
