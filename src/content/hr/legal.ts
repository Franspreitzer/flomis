export type LegalSection = { title: string; paragraphs: string[]; list?: string[] };

export const privacy = {
  meta: {
    title: "Politika privatnosti | Flomis",
    description: "Kako Flomis j.d.o.o. prikuplja, koristi i štiti Vaše osobne podatke u skladu s GDPR-om.",
  },
  label: "Pravno",
  title: "Politika privatnosti",
  updated: "Zadnja izmjena: 17. rujna 2026.",
  sections: [
    {
      title: "1. Tko je voditelj obrade",
      paragraphs: [
        "Voditelj obrade osobnih podataka je FLOMIS j.d.o.o. za informatičke usluge, Dunavska 36, 31000 Osijek, OIB: 39781208205 (dalje: \"Flomis\", \"mi\"). Za sva pitanja o zaštiti podataka možete nam se obratiti na info@flomis.hr.",
      ],
    },
    {
      title: "2. Koje podatke prikupljamo",
      paragraphs: ["Prikupljamo samo podatke koji su nam potrebni za odgovor na Vaš upit i pružanje usluga:"],
      list: [
        "Podaci koje nam sami pošaljete putem kontakt forme: ime i prezime, e-mail adresa, telefon, naziv firme i sadržaj poruke.",
        "Tehnički podaci prilikom posjeta stranici: IP adresa, vrsta preglednika, uređaj, vrijeme posjeta (u anonimiziranom obliku, ako pristanete na analitičke kolačiće).",
        "Podaci potrebni za ugovorni odnos: podaci o firmi, adresa, OIB, podaci za izdavanje računa.",
      ],
    },
    {
      title: "3. Svrha i pravna osnova obrade",
      paragraphs: ["Vaše podatke obrađujemo u sljedeće svrhe:"],
      list: [
        "Odgovor na upit i izrada ponude — pravna osnova: poduzimanje radnji prije sklapanja ugovora (čl. 6. st. 1. t. b GDPR-a).",
        "Pružanje ugovorenih usluga i izdavanje računa — pravna osnova: izvršenje ugovora i zakonska obveza (čl. 6. st. 1. t. b i c).",
        "Analitika posjećenosti stranice — pravna osnova: Vaša privola putem cookie bannera (čl. 6. st. 1. t. a).",
        "Zaštita stranice od zlouporabe (npr. spam) — pravna osnova: legitimni interes (čl. 6. st. 1. t. f).",
      ],
    },
    {
      title: "4. Koliko dugo čuvamo podatke",
      paragraphs: [
        "Podatke iz upita čuvamo najviše 12 mjeseci nakon zadnje komunikacije, osim ako dođe do sklapanja ugovora. Podatke iz ugovornog odnosa i računa čuvamo u rokovima propisanim zakonom (11 godina za računovodstvenu dokumentaciju). Analitičke podatke čuvamo u anonimiziranom obliku do 26 mjeseci.",
      ],
    },
    {
      title: "5. Tko ima pristup podacima",
      paragraphs: [
        "Vaše podatke ne prodajemo i ne dijelimo s trećim stranama u marketinške svrhe. Pristup mogu imati naši pouzdani izvršitelji obrade koji nam pružaju tehničke usluge, isključivo u mjeri potrebnoj za rad stranice:",
      ],
      list: [
        "Vercel Inc. — hosting web stranice (serveri u EU, standardne ugovorne klauzule).",
        "Resend — slanje e-mail poruka iz kontakt forme.",
        "Pružatelj analitike (samo uz Vašu privolu) — anonimizirana statistika posjeta.",
      ],
    },
    {
      title: "6. Vaša prava",
      paragraphs: ["U skladu s GDPR-om imate pravo:"],
      list: [
        "na pristup svojim podacima i informaciju o obradi,",
        "na ispravak netočnih podataka,",
        "na brisanje podataka (\"pravo na zaborav\"),",
        "na ograničenje obrade,",
        "na prenosivost podataka,",
        "na prigovor na obradu temeljenu na legitimnom interesu,",
        "na povlačenje privole u bilo kojem trenutku, bez utjecaja na zakonitost prethodne obrade,",
        "na podnošenje pritužbe Agenciji za zaštitu osobnih podataka (AZOP), Selska cesta 136, Zagreb, azop.hr.",
      ],
    },
    {
      title: "7. Sigurnost podataka",
      paragraphs: [
        "Koristimo tehničke i organizacijske mjere zaštite: HTTPS enkripciju, ograničen pristup podacima, redovite sigurnosne nadogradnje i sigurnosne kopije. Pristup podacima imaju samo osobe kojima je to nužno za rad.",
      ],
    },
    {
      title: "8. Izmjene politike",
      paragraphs: [
        "Ovu politiku možemo povremeno ažurirati. Aktualna verzija je uvijek dostupna na ovoj stranici, s datumom zadnje izmjene.",
      ],
    },
  ] as LegalSection[],
};

export const cookies = {
  meta: {
    title: "Politika kolačića | Flomis",
    description: "Koje kolačiće koristi flomis.hr, zašto, i kako možete upravljati svojim postavkama.",
  },
  label: "Pravno",
  title: "Politika kolačića",
  updated: "Zadnja izmjena: 17. rujna 2026.",
  sections: [
    {
      title: "1. Što su kolačići",
      paragraphs: [
        "Kolačići (cookies) su male tekstualne datoteke koje web stranica sprema na Vaš uređaj. Koriste se da bi stranica radila ispravno, pamtila Vaše postavke i, uz Vašu privolu, mjerila posjećenost.",
      ],
    },
    {
      title: "2. Koje kolačiće koristimo",
      paragraphs: ["Na flomis.hr koristimo dvije kategorije kolačića:"],
      list: [
        "Nužni kolačići — potrebni za osnovni rad stranice (npr. pamćenje Vaše odluke o kolačićima: \"flomis-consent\", trajanje 12 mjeseci). Ne zahtijevaju privolu.",
        "Analitički kolačići — koriste se isključivo uz Vašu privolu, za anonimiziranu statistiku posjeta (koje stranice se gledaju, koliko dugo, s kojeg uređaja). Pomažu nam poboljšati stranicu.",
      ],
    },
    {
      title: "3. Kolačići trećih strana",
      paragraphs: [
        "Ne koristimo marketinške kolačiće niti kolačiće za praćenje na drugim stranicama. Ako u budućnosti dodamo alate trećih strana (npr. ugrađene videe ili mape), oni će se učitati tek nakon Vaše privole.",
      ],
    },
    {
      title: "4. Kako upravljati kolačićima",
      paragraphs: [
        "Prilikom prvog posjeta možete prihvatiti sve kolačiće ili samo nužne. Svoju odluku možete promijeniti u bilo kojem trenutku brisanjem kolačića u pregledniku, nakon čega će se banner ponovno prikazati. Kolačiće možete i potpuno blokirati u postavkama preglednika, no dio funkcionalnosti stranice tada možda neće raditi.",
      ],
    },
    {
      title: "5. Kontakt",
      paragraphs: [
        "Za pitanja o kolačićima i privatnosti obratite nam se na info@flomis.hr. Više o obradi osobnih podataka pročitajte u našoj Politici privatnosti.",
      ],
    },
  ] as LegalSection[],
};

export const notFound = {
  meta: { title: "404 — Stranica nije pronađena | Flomis" },
  code: "404",
  title: "Ova stranica je otišla na kavu.",
  text: "Ili je nikad nije ni bilo. U svakom slučaju, ovdje nema ničega osim zagrada.",
  terminal: [
    "> flomis --find stranicu",
    "Tražim…",
    "Provjeravam /usluge… nije tu.",
    "Provjeravam /radovi… ni tu.",
    "Pitam AI asistenta… kaže da ni on ne zna.",
    "Rezultat: 404. Ali ti si ovdje, pa nije sve izgubljeno.",
  ],
  cta: { label: "Natrag na početnu", href: "/" },
  alt: { label: "ili nam se javi", href: "/kontakt" },
};
