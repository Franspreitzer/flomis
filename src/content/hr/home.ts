export const home = {
  meta: {
    title: "Izrada web stranica Osijek — web shopovi i AI asistenti | Flomis",
    description:
      "Flomis je digitalna agencija iz Osijeka. Izrada web stranica od 500 €, web shopova od 1.000 € i AI asistenata od 200 € za firme iz Osijeka, Osječko-baranjske županije i cijele Slavonije. Ponuda u 24 h.",
  },
  hero: {
    eyebrow: "Digitalna agencija · Osijek, Slavonija i Baranja",
    // Svaka stavka je jedan redak naslova (animirano riječ po riječ)
    title: ["Web koji", "radi za", "Vas."],
    accentWord: "radi",
    lead: ["Web stranice. Web shopovi. AI rješenja.", "Dobro osmišljeno, dobro izvedeno."].join("\n"),
    ctaPrimary: { label: "Zatraži ponudu", href: "/kontakt" },
    ctaSecondary: { label: "Pogledaj radove", href: "/radovi" },
    scrollHint: "Skrolaj",
    stats: [
      { value: "24h", label: "odgovor na upit" },
      { value: "90+", label: "Lighthouse rezultat" },
      { value: "0", label: "šablona" },
    ],
  },
  marquee: [
    "Web stranice",
    "Web shopovi",
    "AI asistenti",
    "Hosting",
    "Domene",
    "Održavanje",
    "SEO",
    "Brzina",
    "Dizajn",
  ],
  services: {
    label: "Usluge",
    title: "Sve što firmi treba online. Na jednom mjestu.",
    lead:
      "Ne prodajemo tehnologiju nego rezultat: više upita, više prodaje i manje posla za tebe.",
    cta: "Sve usluge",
    promo: {
      text: "Ne znaš što ti treba? Reci nam cilj — mi ćemo predložiti put.",
      cta: { label: "Zatraži ponudu", href: "/kontakt" },
    },
  },
  process: {
    label: "Proces",
    title: "Od prvog razgovora do lansiranja — i dalje.",
    lead: "Jasan proces, bez iznenađenja. Znaš što se događa u svakom trenutku.",
    steps: [
      {
        num: "01",
        title: "Upoznavanje",
        text: "Razgovaramo o tvojoj firmi, kupcima i ciljevima. Pitamo puno, jer dobra stranica počinje od dobrih pitanja. Dobivaš jasnu ponudu s rokom i cijenom.",
        duration: "1–2 dana",
      },
      {
        num: "02",
        title: "Dizajn",
        text: "Struktura, tekst i vizual koji prodaje. Prvo wireframe, pa dizajn koji odobravaš prije nego napišemo i jedan redak koda.",
        duration: "1–2 tjedna",
      },
      {
        num: "03",
        title: "Razvoj",
        text: "Brz, siguran i pristupačan kod. Optimiziran za mobitel, Google i stvarne ljude. Testiramo na svim uređajima.",
        duration: "2–4 tjedna",
      },
      {
        num: "04",
        title: "Lansiranje",
        text: "Domena, hosting, SSL, analitika, Google Business — sve postavljamo mi. Ti samo objaviš vijest.",
        duration: "1 dan",
      },
      {
        num: "05",
        title: "Održavanje",
        text: "Sigurnosne nadogradnje, backupi, izmjene sadržaja i savjet kad ti zatreba. Stranica ostaje brza i sigurna.",
        duration: "kontinuirano",
      },
    ],
  },
  work: {
    label: "Radovi",
    title: "Prvi projekti su u izradi.",
    lead: "Flomis je osnovan u rujnu 2026. Prve stranice i AI asistenti trenutno se rade — čim budu online, bit će ovdje sa stvarnim brojkama, ne obećanjima.",
    cta: "Budi među prvima",
    ctaHref: "/kontakt",
    perks: [
      { title: "Cijena pokretanja", text: "Prvih deset klijenata dobiva fiksnu cijenu koja se kasnije neće ponoviti." },
      { title: "Maksimalna pažnja", text: "Malo projekata istovremeno znači da tvoj dobiva puno vremena." },
      { title: "Studija slučaja", text: "Tvoj projekt postaje prva priča na ovoj stranici — s linkom na tvoju firmu." },
    ],
  },
  ai: {
    label: "AI asistenti",
    title: "Asistent koji odgovara kupcima. 24/7. Bez pauze za kavu.",
    lead:
      "Treniran na tvojim podacima: usluge, cijene, radno vrijeme, česta pitanja. Odgovara na web stranici, WhatsAppu ili Messengeru — i šalje ti samo ozbiljne upite.",
    bullets: [
      "Odgovara u sekundi, na hrvatskom",
      "Zakazuje termine i prikuplja upite",
      "Zna tvoje cijene, usluge i pravila",
      "Predaje razgovor čovjeku kad treba",
    ],
    cta: { label: "Želim AI asistenta", href: "/usluge/ai-asistenti" },
    demo: {
      botName: "Flomis Asistent",
      status: "online",
      placeholder: "Odaberi pitanje ispod…",
      restart: "Počni ispočetka",
      typingLabel: "Asistent tipka",
      demoTag: "AI",
      intro: "Bok! Ja sam AI asistent. Pitaj me bilo što o uslugama, cijenama ili rokovima.",
      conversation: [
        {
          q: "Koliko košta web stranica?",
          k: ["košta", "kosta", "cijen", "cjen", "€", "eur", "skupo", "budžet", "budzet"],
          a: "Ovisi o opsegu, ali okvirno: jednostavna prezentacijska stranica kreće od 500 €, web shop od 1.000 €, a AI asistent od 200 €. Želiš da ti pošaljem konkretnu ponudu? Trebam samo naziv firme i e-mail.",
        },
        {
          q: "Koliko traje izrada?",
          k: ["traje", "rok", "brzo", "kada", "kad ", "tjed", "dana", "vrijeme"],
          a: "Prezentacijska stranica obično 2–3 tjedna, web shop 4–6 tjedana. Najviše ovisi o tome koliko brzo dobijemo tekstove i slike od tebe.",
        },
        {
          q: "Radite li i održavanje?",
          k: ["održ", "odrz", "backup", "sigurn", "nadogr", "podrš", "podrs"],
          a: "Da! Paketi održavanja uključuju sigurnosne nadogradnje, backupe, izmjene sadržaja i podršku. Cijene kreću od 39 €/mj. Želiš da te spojim s kolegom?",
        },
        {
          q: "Možete li pomoći s domenom?",
          k: ["domen", "hosting", "server", "dns", "ssl", ".hr", "email", "e-mail"],
          a: "Naravno. Registriramo .hr, .com i sve ostale domene, postavimo DNS i SSL. Ti ne moraš ništa tehničko — samo nam reci ime.",
        },
      ],
    },
  },
  assistant: {
    openLabel: "Otvori AI asistenta",
    closeLabel: "Zatvori asistenta",
    bubble: "Pitaj me bilo što",
    title: "Flomis Asistent",
    subtitle: "AI · razgovaraj s nama odmah",
    intro: "Bok! 👋 Ja sam Flomis Asistent. Pitaj me o cijenama, rokovima ili uslugama — a ako želiš ponudu, spojim te s timom.",
    inputPlaceholder: "Napiši pitanje…",
    send: "Pošalji",
    fallback:
      "Dobro pitanje! Za to ti najbolje može odgovoriti netko iz tima. Javi se preko kontakt forme ili na e-mail — odgovaramo u roku 24 sata.",
    fallbackCta: { label: "Otvori kontakt", href: "/kontakt" },
    exhausted: "Puno pitanja — super! 🙂 Za sve ostalo najbrže je preko kontakta:",
    extra: [
      {
        q: "Što radite?",
        k: ["što radite", "sto radite", "usluge", "nudite", "čime se", "cime se", "bavite"],
        a: "Radimo web stranice, web shopove i AI asistente (poput mene 🙂), plus hosting, domene i održavanje. Sve na jednom mjestu, iz Osijeka.",
      },
      {
        q: "Gdje ste?",
        k: ["gdje", "adres", "osijek", "lokacij", "ured"],
        a: "Sjedište nam je u Osijeku, Dunavska 36. Radimo s klijentima iz cijele Hrvatske — većina komunikacije ide online.",
      },
      {
        q: "Kako do ponude?",
        k: ["ponud", "kontakt", "javi", "razgovor", "sastanak", "upit"],
        a: "Najbrže preko kontakt forme: par rečenica o firmi i cilju. Vraćamo se s idejom i okvirnom cijenom u roku 24 sata.",
      },
      {
        q: "Bok!",
        k: ["bok", "pozdrav", "hej", "dobar dan", "hello", "hi"],
        a: "Bok! 👋 Što te zanima — web stranica, shop, AI asistent ili nešto treće?",
      },
      {
        q: "Hvala",
        k: ["hvala", "super", "odlično", "odlicno", "ok"],
        a: "Nema na čemu! Ako želiš, pošalji upit preko kontakt forme pa nastavljamo uživo.",
      },
    ],
  },
  faq: {
    label: "FAQ",
    title: "Česta pitanja.",
    items: [
      {
        q: "Koliko košta izrada web stranice?",
        a: "Ovisi o opsegu i funkcionalnostima. Okvirne cijene su na stranici Paketi, a nakon kratkog razgovora šaljemo fiksnu ponudu — bez skrivenih troškova. Cijena koju dobiješ je cijena koju platiš.",
      },
      {
        q: "Koliko traje izrada?",
        a: "Prezentacijska stranica obično 2–3 tjedna, web shop 4–6 tjedana, AI asistent 1–2 tjedna. Najveći utjecaj na rok ima koliko brzo dobijemo tekstove, slike i povratne informacije.",
      },
      {
        q: "Mogu li sam uređivati sadržaj nakon lansiranja?",
        a: "Da. Svaku stranicu radimo tako da sam možeš mijenjati tekstove, slike i proizvode. Dobiješ i kratke upute (video), a ako ne želiš dirati — to radimo mi kroz paket održavanja.",
      },
      {
        q: "Što je uključeno u hosting i održavanje?",
        a: "Brzi hosting u EU, SSL certifikat, dnevni backupi, sigurnosne nadogradnje, nadzor dostupnosti i mjesečna kvota izmjena sadržaja. Sve na jednom računu, bez iznenađenja.",
      },
      {
        q: "Kako AI asistent zna odgovore o mojoj firmi?",
        a: "Treniramo ga na tvojim materijalima: web stranici, cjeniku, FAQ-u, dokumentima. Definiramo ton i pravila (što smije, a što ne smije reći). Prije lansiranja prolazimo test razgovore zajedno.",
      },
      {
        q: "Radite li s firmama izvan Osijeka?",
        a: "Da, radimo s klijentima iz cijele Hrvatske i inozemstva. Većina komunikacije ide online, a kad treba — sjednemo uživo.",
      },
    ],
  },
  local: {
    label: "Područje rada",
    title: "Web agencija iz Osijeka.",
    text: "Sjedište nam je u Osijeku, ali granica nema: radimo s obrtima, firmama i ustanovama iz cijele Hrvatske.",
    citiesLabel: "Gradovi u kojima radimo",
    cta: { label: "Izrada web stranica Osijek", href: "/izrada-web-stranica-osijek" },
  },
  cta: {
    label: "Sljedeći korak",
    title: ["Napravimo nešto", "što radi."],
    text: "Pošalji nam par rečenica o firmi i cilju. Vraćamo se s idejom i okvirnom ponudom u roku 24 sata.",
    button: { label: "Zatraži ponudu", href: "/kontakt" },
    alt: "ili nas nazovi",
  },
} as const;
