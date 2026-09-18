export const about = {
  meta: {
    title: "O nama — digitalna agencija Flomis, Osijek",
    description:
      "Flomis je digitalna agencija iz Osijeka. Mali tim, veliki standardi: web stranice, web shopovi i AI asistenti koji donose rezultate malim i srednjim firmama.",
  },
  label: "O nama",
  title: ["Mali tim.", "Veliki standardi."],
  lead:
    "Flomis je digitalna agencija iz Osijeka. Radimo s firmama koje žele web koji donosi posao, a ne samo lijepu sliku. Bez korporativnog praznog govora, bez šablona, bez izgovora.",
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
  team: {
    label: "Tim",
    title: "Ljudi iza zagrada.",
    text: "Mali tim znači da radiš s ljudima koji stvarno rade na tvom projektu — ne s prodajnim predstavnikom.",
    members: [
      {
        name: "[Ime Prezime]",
        role: "[Osnivač · Razvoj]",
        bio: "[PRIMJER] Kratki opis: iskustvo, čime se bavi u projektima, što voli raditi.",
      },
      {
        name: "[Ime Prezime]",
        role: "[Dizajn · UX]",
        bio: "[PRIMJER] Kratki opis: iskustvo, čime se bavi u projektima, što voli raditi.",
      },
      {
        name: "[Ime Prezime]",
        role: "[AI · Automatizacija]",
        bio: "[PRIMJER] Kratki opis: iskustvo, čime se bavi u projektima, što voli raditi.",
      },
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
    title: "Želiš raditi s nama?",
    text: "Bilo da si klijent ili developer koji traži ekipu — javi se.",
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
  title: ["Recimo", "što trebaš."],
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
      placeholder: "Ukratko: čime se bavite, što vam treba i do kada.",
    },
    consent: "Slažem se da Flomis obrađuje moje podatke radi odgovora na upit, u skladu s ",
    consentLink: "politikom privatnosti",
    submit: "Pošalji upit",
    sending: "Šaljem…",
    success: {
      title: "Poruka je poslana.",
      text: "Hvala! Javljamo se u roku 24 sata. Ako je hitno, nazovi nas.",
    },
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
