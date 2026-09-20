export const about = {
  meta: {
    title: "O nama — digitalna agencija Flomis, Osijek",
    description:
      "Flomis je digitalna agencija osnovana 2026. u Osijeku. Misija: web stranice, web shopovi i AI asistenti koji firmama iz Slavonije donose upite i prodaju — na razini najboljih, po lokalnim cijenama.",
  },
  label: "O nama",
  title: ["Web", "s razlogom."],
  /** Odlomci odvojeni s \n\n */
  lead: [
    "Flomis je digitalna agencija osnovana 2026. u Osijeku s jednostavnom idejom: napraviti web koji radi za Vas.",
    "Ne radimo web stranice da samo dobro izgledaju. Radimo ih da budu jasne, brze, funkcionalne i napravljene s razlogom — da predstave ono što radite, izgrade povjerenje i pretvore posjetitelja u klijenta.",
    "Svaki projekt krećemo od nule. Upoznamo Vaš posao, ljude kojima se obraćate i ono što želite postići, a zatim sve to pretvaramo u digitalno iskustvo koje ima smisla.",
    "Bez šablona. Bez nepotrebnog kompliciranja.",
    "Samo stranice, web shopovi i AI asistenti koji donose upite, prodaju i uštedu vremena.",
  ].join("\n\n"),
  manifesto: {
    label: "Kako radimo",
    items: [
      {
        title: "Direktno",
        text: "Reći ćemo ti što mislimo, i kad to nije ono što želiš čuti. Ako ti ne treba web shop nego dobra stranica, reći ćemo to.",
      },
      {
        title: "Brzo, ali ne na brzinu",
        text: "Držimo rokove jer planiramo realno. Dizajn odobravaš prije koda, pa nema vraćanja na početak.",
      },
      {
        title: "Rezultat, ne izvještaj",
        text: "Ne mjerimo posjete nego upite, prodaju i uštedu vremena. Ako stranica ne radi svoj posao, nismo gotovi.",
      },
      {
        title: "Jedan kontakt",
        text: "Ne prebacujemo te između odjela. Osoba s kojom počneš razgovor je osoba koja odgovara do kraja.",
      },
    ],
  },
  story: {
    label: "Priča",
    title: "Zašto Flomis?",
    paragraphs: [
      "Ime dolazi od \"flow\" — stanja kad sve teče bez zapinjanja. Tako bi trebao raditi web tvoje firme: kupac dođe, razumije, javi se. Bez čekanja, bez traženja, bez frustracije.",
      "Zagrade u logu su iz koda. Sve što radimo počinje od tehnologije koja radi — brzo, sigurno, pouzdano. Ali tehnologija je samo alat. Ono što prodajemo je rezultat.",
      "Radimo iz Osijeka za klijente iz cijele Hrvatske. Malim i srednjim firmama nudimo ono što obično dobiju samo veliki: dizajn po mjeri, ozbiljan razvoj i nekoga tko se brine o stranici i nakon lansiranja.",
    ],
  },
  values: {
    label: "Brojke",
    items: [
      { value: "2026", label: "godina osnivanja" },
      { value: "Osijek", label: "sjedište" },
      { value: "24h", label: "vrijeme odgovora" },
      { value: "100%", label: "projekata po mjeri" },
    ],
  },
  mission: {
    label: "Misija",
    title: ["Ideje pretvaramo u", "digitalne proizvode."],
    statement: [
      "Naša misija je jednostavna: stvarati digitalna rješenja koja ljudima olakšavaju posao, a korisnicima čine iskustvo boljim.",
      "Zato svaki projekt krećemo od pitanja što Vam zapravo treba, kome se obraćate i što želite postići. Iz toga nastaju web stranice, web shopovi i digitalna rješenja koja nisu napravljena samo da izgledaju dobro, već da budu koristan dio Vašeg poslovanja.",
      "Promišljeno od početka. Napravljeno da traje.",
    ].join("\n\n"),
    goals: [
      {
        num: "01",
        title: "Nula šablona",
        text: "Svaka stranica koju napravimo je nacrtana od nule za tu firmu. Ako izgleda kao nešto što si već vidio — nismo završili.",
      },
      {
        num: "02",
        title: "Rezultat se mjeri u upitima",
        text: "Ne u lajkovima, ne u posjetama. Stranica radi kad telefon zvoni. To je jedini KPI koji nas zanima.",
      },
      {
        num: "03",
        title: "AI za male firme, ne samo za velike",
        text: "Asistent koji odgovara kupcima 24/7 ne smije biti privilegija korporacija. Radimo ga dostupnim obrtu s troje zaposlenih.",
      },
      {
        num: "04",
        title: "Klijent je vlasnik svega",
        text: "Domena, stranica, podaci — na tvoje ime. Ostaješ jer ti se isplati, ne jer ne možeš otići.",
      },
    ],
  },
  timeline: {
    label: "Put",
    title: "Gdje smo i kamo idemo.",
    items: [
      { when: "Rujan 2026.", title: "Osnovan Flomis j.d.o.o.", text: "Sjedište u Osijeku, Dunavska 36. Prvi projekti: web stranice i AI asistenti za firme iz Slavonije.", done: true },
      { when: "2026.", title: "Prvih 10 firmi online", text: "Cilj za prvu godinu: deset firmi iz Osječko-baranjske županije koje preko stranice dobivaju stvarne upite.", done: false },
      { when: "2027.", title: "AI asistent kao standard", text: "Svaka naša stranica dolazi s asistentom koji zna firmu, odgovara kupcima i zakazuje termine — bez doplate.", done: false },
      { when: "2028.", title: "Najbolja web agencija u Slavoniji", text: "Ne najveća. Najbolja — po rezultatima klijenata i po tome koliko nas preporučuju.", done: false },
    ],
  },
  stack: {
    label: "Alati",
    title: "S čime radimo.",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "Shopify",
      "WooCommerce",
      "WordPress",
      "Sanity",
      "OpenAI",
      "Anthropic",
      "Vercel",
      "Stripe",
      "Figma",
      "GSAP",
    ],
  },
  cta: {
    title: "Budi jedna od prvih deset.",
    text: "Firme koje s nama krenu ove godine dobivaju najviše pažnje koju ćemo ikad moći dati. Javi se.",
    button: { label: "Javi nam se", href: "/kontakt" },
  },
} as const;

export const contact = {
  meta: {
    title: "Kontakt — zatraži ponudu | Flomis, Osijek",
    description:
      "Javi nam se za ponudu za web stranicu, web shop, AI asistenta, hosting ili održavanje. Odgovaramo u roku 24 sata. Flomis, Dunavska 36, Osijek.",
  },
  label: "Kontakt",
  title: ["Reci nam", "što trebaš."],
  lead:
    "Par rečenica o firmi i cilju je dovoljno. Vraćamo se s pitanjima, idejom i okvirnom ponudom u roku 24 sata.",
  info: {
    emailLabel: "E-mail",
    phoneLabel: "Telefon",
    addressLabel: "Adresa",
    hoursLabel: "Radno vrijeme",
    socialLabel: "Društvene mreže",
  },
  form: {
    title: "Zatraži ponudu",
    name: { label: "Ime i prezime", placeholder: "Ana Horvat" },
    email: { label: "E-mail", placeholder: "ana@firma.hr" },
    phone: { label: "Telefon (opcionalno)", placeholder: "+385 91 000 0000" },
    company: { label: "Firma (opcionalno)", placeholder: "Firma d.o.o." },
    service: {
      label: "Što te zanima?",
      options: [
        "Web stranica",
        "Web shop",
        "AI asistent",
        "Hosting i domene",
        "Održavanje",
        "Nisam siguran/na",
      ],
    },
    budget: {
      label: "Okvirni budžet",
      options: ["do 1.000 €", "1.000 – 3.000 €", "3.000 – 8.000 €", "8.000 € +", "Ne znam još"],
    },
    message: {
      label: "Poruka",
      placeholder: "Ukratko: čime se bavite, što Vam treba i do kada.",
    },
    consent: "Slažem se da Flomis obrađuje moje podatke radi odgovora na upit, u skladu s ",
    consentLink: "politikom privatnosti",
    submit: "Pošalji upit",
    sending: "Šaljem…",
    success: {
      title: "Poruka je poslana.",
      text: "Hvala! Javljamo se u roku 24 sata. Ako je hitno, nazovi nas.",
    },
    limited: "Poslano je previše upita s ove adrese. Pokušaj kasnije ili nas nazovi.",
    error: {
      title: "Nešto je pošlo po zlu.",
      text: "Poruka nije poslana. Pokušaj ponovno ili nam piši direktno na e-mail.",
    },
    errors: {
      name: "Upiši ime.",
      email: "Upiši ispravan e-mail.",
      message: "Napiši nam barem par rečenica.",
      consent: "Potrebna je suglasnost.",
    },
  },
  faqTitle: "Prije nego pišeš",
  faq: [
    { q: "Koliko brzo odgovarate?", a: "U roku 24 sata radnim danom. Često i brže." },
    { q: "Naplaćujete li prvi razgovor?", a: "Ne. Prvi razgovor i okvirna ponuda su besplatni." },
    { q: "Radite li s klijentima izvan Osijeka?", a: "Da, iz cijele Hrvatske i inozemstva. Sastanci online ili uživo." },
  ],
} as const;
