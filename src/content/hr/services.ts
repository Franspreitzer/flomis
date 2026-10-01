export type ServiceSlug =
  | "web-stranice"
  | "web-shopovi"
  | "ai-asistenti"
  | "hosting-i-domene"
  | "odrzavanje";

export type Service = {
  slug: ServiceSlug;
  num: string;
  title: string;
  short: string;
  /** Kratki opis za kartice na početnoj */
  card: string;
  tags: string[];
  meta: { title: string; description: string };
  hero: { title: string[]; lead: string };
  benefits: { title: string; text: string }[];
  included: string[];
  process: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  priceFrom: string;
  cta: { title: string; text: string };
  /** Slugovi blog članaka koji dublje objašnjavaju ovu uslugu (interno povezivanje). */
  reads?: string[];
};

export const servicesIntro = {
  meta: {
    title: "Usluge — Web stranice, web shopovi, AI asistenti, hosting | Flomis",
    description:
      "Sve što tvojoj firmi treba online: izrada web stranica i web shopova, AI asistenti, hosting, domene i održavanje. Flomis, Osijek.",
  },
  label: "Usluge",
  title: ["Sve što firmi", "treba online."],
  lead:
    "Ne moraš tražiti pet različitih firmi. Dizajn, razvoj, AI, hosting i održavanje — sve na jednom mjestu, s jednim kontaktom koji odgovara.",
  cta: { label: "Zatraži ponudu", href: "/kontakt" },
};

export const serviceLabels = {
  benefits: "Zašto Flomis",
  included: "Što je uključeno",
  process: "Kako radimo",
  faq: "Česta pitanja",
  priceFrom: "Cijena od",
  other: "Ostale usluge",
  quote: "Zatraži ponudu",
  crumbs: { home: "Početna", services: "Usluge" },
};

export const services: Service[] = [
  {
    slug: "web-stranice",
    num: "01",
    title: "Web stranice",
    short: "Prezentacijske stranice koje donose upite.",
    card: "Brze, moderne stranice koje se učitavaju u sekundi i pretvaraju posjetitelje u upite. Dizajnirane za tvoju firmu, ne iz šablone.",
    tags: ["Next.js", "Dizajn", "SEO", "Brzina"],
    meta: {
      title: "Izrada web stranica Osijek — brze stranice koje donose upite | Flomis",
      description:
        "Izrada modernih web stranica za male i srednje firme. Brze, optimizirane za Google i mobitel, dizajnirane po mjeri. Fiksna cijena, jasan rok.",
    },
    hero: {
      title: ["Web stranica", "koja donosi", "upite."],
      lead:
        "Nije bitno koliko je stranica lijepa ako ne zvoni telefon. Radimo stranice koje se učitavaju u sekundi, dobro rangiraju na Googleu i vode posjetitelja do jednog cilja — da ti se javi.",
    },
    benefits: [
      {
        title: "Dizajn po mjeri, ne šablona",
        text: "Svaka stranica počinje od tvoje firme, kupaca i ponude. Nema kupljenih tema koje izgledaju kao tisuću drugih.",
      },
      {
        title: "Brzina koju Google nagrađuje",
        text: "Ciljamo Lighthouse 90+ u svim kategorijama. Brza stranica znači bolji ranking i manje ljudi koji odustanu.",
      },
      {
        title: "Tekst koji prodaje",
        text: "Pomažemo napisati sadržaj koji govori jezikom tvojih kupaca — jasno, direktno i s pozivom na akciju.",
      },
      {
        title: "Ti upravljaš sadržajem",
        text: "Jednostavan sustav za uređivanje tekstova, slika i novosti. Bez programera za svaku sitnicu.",
      },
    ],
    included: [
      "Strategija i struktura stranice",
      "Dizajn po mjeri (desktop i mobitel)",
      "Razvoj u Next.js-u ili WordPressu, ovisno o potrebama",
      "Osnovni SEO i Google Search Console",
      "Kontakt forme, mape, Google Business",
      "Analitika i cookie banner usklađen s GDPR-om",
      "Upute za uređivanje sadržaja",
      "30 dana podrške nakon lansiranja",
    ],
    process: [
      { title: "Razgovor i ponuda", text: "Kratki sastanak, jasna ponuda s cijenom i rokom u 24h." },
      { title: "Struktura i tekst", text: "Definiramo stranice, poruke i pozive na akciju." },
      { title: "Dizajn", text: "Odobravaš dizajn prije razvoja. Bez iznenađenja." },
      { title: "Razvoj i testiranje", text: "Kodiramo, testiramo na svim uređajima, optimiziramo." },
      { title: "Lansiranje", text: "Domena, hosting, SSL, analitika — sve mi." },
    ],
    faq: [
      {
        q: "Koliko košta web stranica?",
        a: "Prezentacijska stranica kreće od 500 €. Točnu cijenu dobiješ nakon kratkog razgovora — fiksno, bez skrivenih troškova.",
      },
      {
        q: "Koliko traje izrada?",
        a: "Obično 2–3 tjedna od trenutka kad imamo tekstove i slike. Ako ih nemaš, pomažemo ih napraviti.",
      },
      {
        q: "Radite li redizajn postojećih stranica?",
        a: "Da. Analiziramo što radi, što ne, i predlažemo redizajn koji zadržava dobre stvari, a popravlja loše.",
      },
      {
        q: "Treba li mojoj maloj firmi web stranica ako već imam Facebook i Instagram?",
        a: "Treba, jer društvene mreže ne izlaze u Google pretrazi, a stranica izlazi. Kad netko u Osijeku upiše „vodoinstalater“ ili „knjigovodstvo“, Google nudi web stranice, a ne Instagram profile. Profil je k tome tuđi teren — algoritam i pravila se mijenjaju preko noći, a stranica je tvoja imovina koju nitko ne može ugasiti.",
      },
      {
        q: "Što moram pripremiti prije nego krenemo?",
        a: "Dovoljan je popis usluga, logo ako ga imaš i par rečenica o tome tko su ti kupci. Tekstove i strukturu pišemo mi na temelju razgovora od sat vremena, a ako nemaš fotografije, predlažemo fotografa u Osijeku ili kvalitetne stock fotke. Nije ti potrebno ništa tehničko — domenu, hosting i mail sređujemo mi.",
      },
      {
        q: "Kad će se stranica pojaviti na Googleu?",
        a: "U Google indeks ulazi obično za 3 do 14 dana nakon lansiranja, jer je sami prijavimo kroz Search Console. Za ime tvoje firme bit ćeš prvi rezultat brzo; za konkurentne pojmove poput „izrada web stranica Osijek“ treba 3 do 6 mjeseci rada na sadržaju i Google Business Profilu. Postavljanje Search Consolea i Google Business Profila uključeno je u izradu.",
      },
      {
        q: "Može li stranica biti na hrvatskom i engleskom?",
        a: "Može, i to radimo redovito — za Wellar wellness centar u Osijeku napravili smo kompletnu hrvatsku i englesku verziju. Druga verzija obično poskupi projekt 20 do 30 posto, jer svaki tekst, naslov i SEO opis postoji dvaput. Prijevod možeš dati ti ili ga organiziramo mi.",
      },
      {
        q: "Mogu li platiti u ratama?",
        a: "Da — standardno je 40 posto avansa i 60 posto po lansiranju, a za projekte iznad 1.500 € dijelimo plaćanje u tri ili četiri faze vezane uz isporuke. Hosting i održavanje plaćaju se posebno, mjesečno ili godišnje. Cijena iz ponude je fiksna i ne mijenja se usput.",
      },
      {
        q: "WordPress ili Next.js — što je bolje za mene?",
        a: "Za većinu firmi iz Hrvatske koje žele brzu stranicu i mir biramo Next.js, jer nema dodataka koji se kvare ni sigurnosnih zakrpa svaki mjesec. WordPress ima smisla kad objavljuješ puno sadržaja i želiš potpunu slobodu u uređivanju. Preporuku dajemo nakon razgovora, a ne po navici.",
      },
      {
        q: "Mogu li sam mijenjati tekstove i slike nakon lansiranja?",
        a: "Možeš — svaku stranicu predajemo s uređivačkim sučeljem i kratkim video uputama na hrvatskom. Ako ti se ne da, izmjene su uključene u paket održavanja od 39 €/mj i obično ih napravimo isti ili sljedeći radni dan.",
      },
    ],
    priceFrom: "500 €",
    reads: ["kako-odabrati-web-agenciju-osijek", "sablona-po-mjeri-ili-agencija", "koliko-kosta-izrada-web-stranice-osijek"],
    cta: {
      title: "Trebaš stranicu koja radi?",
      text: "Pošalji nam link na trenutnu stranicu (ako je imaš) i par rečenica o firmi. Vraćamo se s prijedlogom u 24h.",
    },
  },
  {
    slug: "web-shopovi",
    num: "02",
    title: "Web shopovi",
    short: "Online trgovine koje prodaju dok spavaš.",
    card: "Web shop s brzim checkoutom, hrvatskim načinima plaćanja i dostave, te sustavom koji možeš sam voditi.",
    tags: ["Shopify", "Po mjeri", "Plaćanje", "Dostava"],
    meta: {
      title: "Izrada web shopa — online trgovina koja prodaje | Flomis Osijek",
      description:
        "Izrada web shopova za hrvatske firme: brz checkout, kartično plaćanje, integracija s dostavom i fiskalizacijom. Flomis, Osijek.",
    },
    hero: {
      title: ["Web shop", "koji prodaje", "dok spavaš."],
      lead:
        "Kupci ne vole čekati, tražiti i nagađati. Radimo web shopove s brzim checkoutom, jasnim proizvodima i svime što hrvatska trgovina treba: kartice, pouzeće, dostava, fiskalizacija.",
    },
    benefits: [
      {
        title: "Checkout u tri klika",
        text: "Svaki dodatni korak gubi kupce. Optimiziramo put od proizvoda do plaćanja da bude što kraći.",
      },
      {
        title: "Hrvatski način plaćanja i dostave",
        text: "Kartice, PayPal, pouzeće, virman. Integracije s dostavnim službama i R1 računima.",
      },
      {
        title: "Ti vodiš shop, bez programera",
        text: "Dodavanje proizvoda, akcije, kuponi, narudžbe — sve iz jednostavnog sučelja. Obučimo te u sat vremena.",
      },
      {
        title: "Spremno za rast",
        text: "Od 10 do 10.000 proizvoda. Sustav koji ne moraš mijenjati kad narasteš.",
      },
    ],
    included: [
      "Analiza asortimana i strukture kategorija",
      "Dizajn shopa po mjeri (proizvod, košarica, checkout)",
      "Shopify, WooCommerce ili custom rješenje",
      "Kartično plaćanje (Stripe, CorvusPay, WSPay…)",
      "Integracija dostave i praćenje pošiljki",
      "Automatski e-mailovi (narudžba, dostava, napušteni košarica)",
      "SEO struktura proizvoda i kategorija",
      "GDPR, uvjeti kupnje, cookie banner",
    ],
    process: [
      { title: "Analiza", text: "Asortiman, konkurencija, kupci, način plaćanja i dostave." },
      { title: "Dizajn", text: "Proizvod, kategorija, košarica i checkout — dizajn koji vodi ka kupnji." },
      { title: "Razvoj", text: "Platforma, integracije plaćanja i dostave, uvoz proizvoda." },
      { title: "Testiranje", text: "Testne narudžbe od početka do kraja, na svim uređajima." },
      { title: "Lansiranje i obuka", text: "Idemo live, pokažemo ti kako sve radi." },
    ],
    faq: [
      {
        q: "Shopify ili WooCommerce?",
        a: "Ovisi o tebi. Shopify je jednostavniji i stabilniji, WooCommerce fleksibilniji i bez mjesečne naknade platformi. Preporučimo nakon razgovora.",
      },
      {
        q: "Možete li uvesti moje proizvode?",
        a: "Da, iz Excela, starog shopa ili ERP-a. Uvozimo proizvode, slike, kategorije i varijante.",
      },
      {
        q: "Što s fiskalizacijom i R1 računima?",
        a: "Povezujemo shop s računovodstvenim ili fiskalnim sustavom koji koristiš, ili preporučimo rješenje.",
      },
      {
        q: "Koliko proizvoda može imati moj shop?",
        a: "Tehnički nema gornje granice — radili smo i shopove s nekoliko tisuća artikala. Na cijenu utječe broj varijanti i način unosa: do stotinjak proizvoda unosimo ručno i to je uključeno, a veće kataloge uvozimo iz Excela ili ERP-a. Shop od 1.000 € pokriva postav, dizajn i prvih 20-ak proizvoda.",
      },
      {
        q: "Mogu li kupci plaćati karticom i pouzećem?",
        a: "Mogu oboje, plus virmanom i uplatnicom. Za kartice povezujemo Stripe, Monri ili WSPay, ovisno o tome što ti banka nudi i koliko transakcija očekuješ. Pouzeće i preuzimanje u trgovini postavljamo besplatno jer su samo opcija dostave.",
      },
      {
        q: "Povezuje li se shop s programom u kojem vodim fakture i zalihe?",
        a: "Povezuje se sa svime što ima API ili izvoz podataka — Minimax, Pantheon, Luceed i slični sustavi su rutina. Narudžbe tada same ulaze u tvoj program, a stanje zaliha se vraća u shop, pa ne prodaješ ono čega nema. Ako tvoj program nema vezu, dogovorimo redovni izvoz u datoteku.",
      },
      {
        q: "Mogu li prodavati i u inozemstvo?",
        a: "Možeš — postavljamo više valuta, dostavne zone i porezne stope po zemljama. Najčešće krenemo s Hrvatskom i susjednim zemljama, pa po potrebi dodamo EU. Englesku verziju shopa radimo istom logikom kao i dvojezične stranice.",
      },
      {
        q: "Možete li preseliti moj postojeći shop na novu platformu?",
        a: "Možemo, i to je čest posao: prenosimo proizvode, kategorije, slike, kupce i narudžbe, a stare adrese preusmjeravamo na nove da ne izgubiš Google pozicije. Migracija traje obično tjedan dana više od same izrade. Prije svega napravimo pregled i kažemo ti što se može prenijeti, a što ne.",
      },
      {
        q: "Tko slika proizvode i piše opise?",
        a: "Opise pišemo mi, a fotografije su na tebi — ili ih organiziramo s fotografom u Osijeku. Dobre fotografije su najveća razlika između shopa koji prodaje i shopa koji samo stoji, pa ne preporučujemo štednju na tom dijelu. Za prvih nekoliko proizvoda napišemo opise kao predložak po kojem dalje ideš sam.",
      },
      {
        q: "Povezujete li dostavne službe?",
        a: "Povezujemo Hrvatsku poštu, Overseas, GLS i DPD, ovisno o tome s kim imaš ugovor. Kupac vidi cijenu dostave u košarici, a ti dobiješ narudžbu spremnu za paket. Paketomate i preuzimanje u trgovini postavljamo kao dodatne opcije.",
      },
    ],
    priceFrom: "1.000 €",
    reads: ["web-shop-hrvatska-vodic", "sablona-po-mjeri-ili-agencija", "koliko-kosta-izrada-web-stranice-osijek"],
    cta: {
      title: "Spreman za online prodaju?",
      text: "Reci nam što prodaješ i kome. Predložimo platformu, cijenu i rok u 24h.",
    },
  },
  {
    slug: "ai-asistenti",
    num: "03",
    title: "AI asistenti",
    short: "Chatbot koji zna tvoju firmu i radi 24/7.",
    card: "AI asistent treniran na tvojim podacima. Odgovara kupcima na webu, WhatsAppu i Messengeru, prikuplja upite i zakazuje termine.",
    tags: ["AI", "Chatbot", "WhatsApp", "Automatizacija"],
    meta: {
      title: "AI asistenti i chatbotovi za firme — odgovori kupcima 24/7 | Flomis",
      description:
        "AI asistent treniran na podacima tvoje firme. Odgovara kupcima na web stranici, WhatsAppu i Messengeru, prikuplja upite i zakazuje termine. Flomis, Osijek.",
    },
    hero: {
      title: ["Asistent koji", "nikad ne", "spava."],
      lead:
        "Polovina upita koje dobivaš su ista pitanja: cijena, radno vrijeme, rok, dostava. AI asistent ih odgovara u sekundi, na hrvatskom, i tebi šalje samo one koji su spremni kupiti.",
    },
    benefits: [
      {
        title: "Zna tvoju firmu",
        text: "Treniran na tvojoj web stranici, cjeniku, FAQ-u i dokumentima. Odgovara točno, tvojim tonom.",
      },
      {
        title: "Radi gdje su tvoji kupci",
        text: "Web stranica, WhatsApp, Messenger, Instagram. Jedan asistent, svi kanali.",
      },
      {
        title: "Prikuplja upite i zakazuje",
        text: "Traži ime, kontakt i potrebu. Zakazuje termine u tvoj kalendar. Šalje ti sažetak.",
      },
      {
        title: "Zna kad predati čovjeku",
        text: "Kad pitanje prijeđe njegove ovlasti, prosljeđuje razgovor tebi — s cijelim kontekstom.",
      },
    ],
    included: [
      "Radionica: što asistent smije, a što ne smije",
      "Priprema i strukturiranje baze znanja",
      "Definiranje tona i osobnosti asistenta",
      "Integracija na web, WhatsApp, Messenger",
      "Prikupljanje upita i slanje na e-mail / CRM",
      "Zakazivanje termina (Google Calendar, Calendly…)",
      "Testiranje i podešavanje prije lansiranja",
      "Mjesečno praćenje razgovora i poboljšanja",
    ],
    process: [
      { title: "Radionica", text: "Definiramo što asistent radi, koja pitanja dobivaš, gdje griješi konkurencija." },
      { title: "Baza znanja", text: "Skupljamo i strukturiramo tvoje podatke: usluge, cijene, pravila." },
      { title: "Trening i ton", text: "Podešavamo osobnost, granice i eskalaciju prema čovjeku." },
      { title: "Integracija", text: "Ugrađujemo na web i kanale koje koristiš." },
      { title: "Test i lansiranje", text: "Prolazimo stotine test pitanja, pa idemo live." },
    ],
    faq: [
      {
        q: "Hoće li asistent izmišljati odgovore?",
        a: "Ne. Odgovara isključivo iz tvoje baze znanja, a kad ne zna — kaže da ne zna i nudi kontakt s čovjekom. Prije lansiranja to testiramo.",
      },
      {
        q: "Što s GDPR-om i podacima kupaca?",
        a: "Podaci se obrađuju u EU, uz ugovor o obradi podataka. Asistent traži samo ono što je potrebno, i to jasno komunicira.",
      },
      {
        q: "Koliko košta mjesečno?",
        a: "Ovisi o broju razgovora i kanalima. Postavljanje od 200 €, a mjesečno od 39 €, uključujući AI troškove, održavanje i poboljšanja.",
      },
      {
        q: "Govori li asistent hrvatski?",
        a: "Govori hrvatski prirodno, uključujući padeže i uobičajene skraćenice koje ljudi tipkaju. Ton podešavamo tvom brendu — može biti službeni ili opušten na „ti“. Ako ti se javi stranac, prebaci se na engleski sam.",
      },
      {
        q: "Odakle asistent zna podatke o mojoj firmi?",
        a: "Hranimo ga tvojim materijalima: web stranicom, cjenikom, često postavljanim pitanjima, radnim vremenom i dokumentima koje nam pošalješ. Sve to postaje baza znanja iz koje smije odgovarati, i ničega izvan nje. Kad promijeniš cijene, javiš nam ili sam ažuriraš bazu — promjena je vidljiva odmah.",
      },
      {
        q: "Može li asistent zakazivati termine?",
        a: "Može se povezati s kalendarom ili sustavom rezervacija pa predlaže slobodne termine i potvrđuje ih mailom. Za Wellar wellness centar rezervacije idu kroz Zoyyu, a asistent gosta vodi do pravog termina. Jednostavnija varijanta je da prikupi podatke i pošalje ti ih na mail.",
      },
      {
        q: "Radi li asistent na Messengeru i WhatsAppu?",
        a: "Radi — isti asistent može biti na web stranici, Messengeru, Instagram porukama i WhatsAppu, s istom bazom znanja. Svaki dodatni kanal je sitna doplata na postav, jer treba vlastitu integraciju i testiranje. Najviše upita obično ipak dolazi s web stranice.",
      },
      {
        q: "Koliko traje postavljanje asistenta?",
        a: "Od prvog razgovora do asistenta uživo prođe obično 1 do 2 tjedna. Prvi tjedan ide na skupljanje materijala i izgradnju baze znanja, drugi na testne razgovore u kojima ti sam pokušavaš pronaći rupe. Ako već imaš uredan cjenik i FAQ, ide i brže.",
      },
      {
        q: "Zamjenjuje li asistent zaposlenika?",
        a: "Ne zamjenjuje, nego skida s njega ponavljajuća pitanja — radno vrijeme, cijene, dostupnost, kako doći. Ozbiljne upite prosljeđuje čovjeku s cijelim kontekstom razgovora, pa se nazove ili odgovori već upućen. Najveća korist su večeri i vikendi, kad nitko ne bi ionako odgovorio.",
      },
      {
        q: "Mogu li vidjeti što ljudi pitaju asistenta?",
        a: "Dobivaš pregled svih razgovora i popis pitanja na koja asistent nije znao odgovoriti. To je usput i najbolje istraživanje tržišta koje ćeš dobiti besplatno — vidiš što kupce stvarno muči. Na temelju toga svaki mjesec dopunjavamo bazu znanja, što je uključeno u mjesečnu cijenu.",
      },
    ],
    priceFrom: "200 €",
    reads: ["ai-asistent-za-male-firme", "kako-odabrati-web-agenciju-osijek"],
    cta: {
      title: "Želiš vidjeti asistenta na svojim podacima?",
      text: "Pošalji nam link na stranicu i 5 najčešćih pitanja koja dobivaš. Napravimo demo za tebe.",
    },
  },
  {
    slug: "hosting-i-domene",
    num: "04",
    title: "Hosting i domene",
    short: "Brz hosting u EU i domene bez muke.",
    card: "Registracija .hr i međunarodnih domena, brz hosting u EU, SSL, backupi i nadzor. Sve na jednom računu.",
    tags: [".hr domene", "EU hosting", "SSL", "Backup"],
    meta: {
      title: "Hosting i registracija domena — brz hosting u EU | Flomis Osijek",
      description:
        "Registracija .hr, .com i drugih domena, brz i siguran hosting u EU, SSL certifikati, dnevni backupi i nadzor dostupnosti. Flomis, Osijek.",
    },
    hero: {
      title: ["Hosting koji", "ne moraš", "razumjeti."],
      lead:
        "Domena, DNS, SSL, backup, server — sve to treba postojati i raditi, a ti se ne bi trebao time baviti. Mi to postavimo, nadziremo i držimo brzim. Ti dobiješ jedan račun i jedan broj za pozvati.",
    },
    benefits: [
      {
        title: "Domena na tvoje ime",
        text: "Registriramo .hr, .com, .eu i ostale domene na tvoju firmu — ti si vlasnik, uvijek.",
      },
      {
        title: "Brz hosting u EU",
        text: "Serveri u EU, CDN za brzinu diljem svijeta, optimizirano za Next.js, WordPress i shopove.",
      },
      {
        title: "Sigurnost bez razmišljanja",
        text: "SSL, firewall, zaštita od napada, dnevni backupi koje možemo vratiti u par minuta.",
      },
      {
        title: "Nadzor 24/7",
        text: "Ako stranica padne, znamo prije tebe. I popravljamo prije nego kupci primijete.",
      },
    ],
    included: [
      "Registracija i produženje domena (.hr, .com, .eu…)",
      "Postavljanje DNS-a i poslovnog e-maila",
      "Hosting na EU infrastrukturi + CDN",
      "SSL certifikat (HTTPS) i automatska obnova",
      "Dnevni backupi s 30 dana povijesti",
      "Nadzor dostupnosti i obavijesti",
      "Migracija s postojećeg hostinga bez prekida",
      "Jedan račun godišnje, bez skrivenih stavki",
    ],
    process: [
      { title: "Provjera", text: "Provjeravamo domenu i trenutni hosting, ako postoji." },
      { title: "Registracija", text: "Domena na tvoje ime, DNS i e-mail postavljeni." },
      { title: "Migracija", text: "Selimo stranicu bez prekida rada." },
      { title: "Nadzor", text: "Backupi, nadzor i sigurnost rade u pozadini." },
    ],
    faq: [
      {
        q: "Tko je vlasnik domene?",
        a: "Ti. Uvijek. Registriramo domenu na tvoju firmu, a ti u svakom trenutku možeš preuzeti upravljanje.",
      },
      {
        q: "Mogu li zadržati postojeći hosting?",
        a: "Možeš, ali provjerimo je li dovoljno brz i siguran. Ako nije, migracija je uključena u naš paket.",
      },
      {
        q: "Koliko košta hosting?",
        a: "Od 90 €/god, ovisno o vrsti stranice i prometu. Domena .hr od 15 €/god.",
      },
      {
        q: "Kako prenijeti domenu koju već imam kod drugog registrara?",
        a: "Prijenos radimo mi: zatražiš autorizacijski kod kod trenutnog registrara, pošalješ nam ga i ostalo je naš posao. Stranica i mail rade bez prekida jer prvo prebacimo postavke, a tek onda domenu. Cijeli postupak traje do 5 radnih dana, najviše zbog čekanja registra.",
      },
      {
        q: "Gdje se nalaze serveri?",
        a: "Serveri su u Europskoj uniji, najčešće u Frankfurtu, što znači da su podaci pod GDPR-om i da je stranica brza za posjetitelje iz Hrvatske. Za projekte koji ciljaju samo domaće tržište koristimo i hrvatske podatkovne centre. Ni u jednom slučaju podaci ne izlaze iz EU.",
      },
      {
        q: "Što ako stranica padne u nedjelju navečer?",
        a: "Nadzor provjerava stranicu svakih nekoliko minuta i javi nam prije nego ti primijetiš. Za sve u našem hostingu reagiramo i izvan radnog vremena, jer je ispad stranice jedina stvar koju ne ostavljamo za ponedjeljak. U praksi se najčešće radi o sitnici koja se riješi u desetak minuta.",
      },
      {
        q: "Dobivam li e-mail adresu na svojoj domeni?",
        a: "Dobivaš — postavljamo adrese tipa info@tvojafirma.hr, s poštanskim sandučićima ili preusmjeravanjem na Gmail koji već koristiš. Postavljamo i SPF, DKIM i DMARC zapise, bez kojih mailovi s vlastite domene završavaju u spamu. To je uključeno u hosting.",
      },
      {
        q: "Što ako jednog dana želim otići drugom hosteru?",
        a: "Odeš, bez pregovaranja i bez naknade. Domena je registrirana na tvoju firmu, a mi ti predajemo kompletan izvoz stranice, baze i mailova. Isto tako preuzimamo stranice od drugih hostera, pa znamo koliko je neugodno kad se netko oko toga pravi važan.",
      },
      {
        q: "Je li SSL certifikat uključen?",
        a: "Uključen je i obnavlja se automatski, pa stranica nikad ne pokazuje upozorenje „Nije sigurno“. Bez njega Google rangira stranicu lošije, a kupci odustaju od plaćanja. Za web shopove postavljamo i dodatna sigurnosna zaglavlja.",
      },
      {
        q: "Radite li backup i koliko dugo ga čuvate?",
        a: "Backup se radi svaki dan i čuvamo ga 30 dana unatrag, na zasebnoj lokaciji od samog servera. Vraćanje na raniju verziju traje obično manje od sat vremena. Prije svake veće izmjene napravimo i dodatnu kopiju.",
      },
    ],
    priceFrom: "90 €/god",
    reads: ["kako-odabrati-web-agenciju-osijek", "lokalni-seo-osijek-vodic"],
    cta: {
      title: "Trebaš domenu ili hosting?",
      text: "Reci nam koje ime želiš ili gdje ti je stranica sad. Sredimo sve u jedan dan.",
    },
  },
  {
    slug: "odrzavanje",
    num: "05",
    title: "Održavanje",
    short: "Stranica ostaje brza, sigurna i ažurna.",
    card: "Mjesečno održavanje: sigurnosne nadogradnje, backupi, izmjene sadržaja, praćenje brzine i podrška kad ti zatreba.",
    tags: ["Nadogradnje", "Backup", "Izmjene", "Podrška"],
    meta: {
      title: "Održavanje web stranica — sigurnost, brzina, izmjene | Flomis",
      description:
        "Mjesečno održavanje web stranica i shopova: sigurnosne nadogradnje, backupi, izmjene sadržaja, praćenje performansi i podrška. Flomis, Osijek.",
    },
    hero: {
      title: ["Stranica koja", "ostaje", "u formi."],
      lead:
        "Web stranica nije projekt koji završi lansiranjem. Nadogradnje, sigurnost, brzina, novi sadržaj — netko to mora raditi. Mi to radimo, svaki mjesec, a ti dobiješ izvještaj i miran san.",
    },
    benefits: [
      {
        title: "Sigurnost svaki tjedan",
        text: "Nadogradnje sustava, dodataka i zakrpa prije nego što postanu problem. Bez hakiranih stranica.",
      },
      {
        title: "Izmjene sadržaja",
        text: "Novi tekst, slika, cijena, akcija? Pošalji e-mail, gotovo je isti dan.",
      },
      {
        title: "Brzina pod nadzorom",
        text: "Mjesečno mjerenje performansi i optimizacija. Stranica ne smije usporiti s vremenom.",
      },
      {
        title: "Podrška koja odgovara",
        text: "Jedan kontakt koji zna tvoju stranicu. Odgovor u roku 24h, hitno — odmah.",
      },
    ],
    included: [
      "Tjedne sigurnosne nadogradnje",
      "Dnevni backupi i testirano vraćanje",
      "Mjesečna kvota sati za izmjene sadržaja",
      "Praćenje brzine i Core Web Vitals",
      "Nadzor dostupnosti 24/7",
      "Popravak grešaka i kompatibilnosti",
      "Mjesečni izvještaj (posjete, brzina, promjene)",
      "Prioritetna podrška e-mailom i telefonom",
    ],
    process: [
      { title: "Pregled stranice", text: "Provjeravamo stanje, sigurnost i brzinu." },
      { title: "Odabir paketa", text: "Biraš koliko izmjena i podrške ti treba mjesečno." },
      { title: "Rad u pozadini", text: "Nadogradnje, backupi i nadzor rade bez tebe." },
      { title: "Izvještaj", text: "Svaki mjesec znaš što je napravljeno i kako stranica stoji." },
    ],
    faq: [
      {
        q: "Održavate li stranice koje niste Vi napravili?",
        a: "Da. Prvo napravimo pregled stanja, pa preporučimo paket. Ponekad se isplati prvo popraviti temelje.",
      },
      {
        q: "Što ako ne iskoristim sate za izmjene?",
        a: "Neiskorišteni sati se ne prenose, ali paket možeš mijenjati svaki mjesec prema potrebi.",
      },
      {
        q: "Postoji li ugovorna obveza?",
        a: "Ne. Mjesečno, otkaz bilo kad. Ostaješ jer ti se isplati, ne jer moraš.",
      },
      {
        q: "Što točno dobivam za 39 € mjesečno?",
        a: "Dobivaš hosting, SSL, dnevne backupe, sigurnosne nadogradnje, nadzor dostupnosti i jedan sat izmjena sadržaja mjesečno. To pokriva prezentacijsku stranicu; web shopovi i stranice s puno prometa idu u viši paket. Sve je na jednom računu, bez naknadnih stavki.",
      },
      {
        q: "Koliko izmjena mjesečno je uključeno?",
        a: "U osnovnom paketu je jedan sat mjesečno, što je obično 3 do 5 manjih izmjena — nova cijena, nova fotografija, novi tekst na stranici. Veći paketi imaju 3 ili 8 sati. Ako jednom zatreba više, dodatni sat naplaćujemo po dogovorenoj cijeni, bez skakanja u viši paket.",
      },
      {
        q: "Što ako mi netko hakira stranicu?",
        a: "Stranicu vraćamo iz backupa, zatvaramo rupu kroz koju se ušlo i čistimo zloćudni kod — za klijente na održavanju bez dodatne naplate. Zato i inzistiramo na redovitim nadogradnjama: gotovo svaki upad u Hrvatskoj ide preko zastarjelog dodatka, a ne preko nekog genija. Sanacija hakirane stranice koja nije na održavanju naplaćuje se po satu.",
      },
      {
        q: "Je li održavanje obavezno uz izradu stranice?",
        a: "Nije obavezno i stranicu ti predajemo u cijelosti bez obzira odlučiš li se za njega. Preporučujemo ga jer stranica bez nadogradnji nakon godinu dana postaje sigurnosni rizik, a bez backupa je jedan loš dan dovoljan da sve nestane. Možeš ga uključiti i kasnije, nakon pregleda stanja.",
      },
      {
        q: "Koliko brzo reagirate kad nešto hitno zapne?",
        a: "Na hitne stvari — stranica ne radi, shop ne prima narudžbe — reagiramo isti dan, uključujući vikend. Obične izmjene rješavamo u roku od 1 do 2 radna dana. Javljaš se mailom ili na 097 642 5423, bez tiketa i čekanja u redu.",
      },
      {
        q: "Što se događa s backupima ako prekinem suradnju?",
        a: "Pri raskidu dobivaš kompletan izvoz stranice, baze i zadnjeg backupa, u formatu koji novi hoster može preuzeti. Kopije kod nas brišemo 30 dana nakon prekida. Nema otkaznog roka ni zadržavanja podataka kao poluge.",
      },
      {
        q: "Pratite li kako stranica stoji na Googleu?",
        a: "U većim paketima dobivaš kratki mjesečni pregled: koliko je ljudi došlo, s kojih upita i što se promijenilo. Nije riječ o izvještaju od trideset stranica nego o nekoliko brojki i jednoj preporuci što napraviti sljedeće. Search Console i analitiku postavljamo svima, pa podacima možeš pristupiti i sam.",
      },
    ],
    priceFrom: "39 €/mj",
    reads: ["kako-odabrati-web-agenciju-osijek", "sablona-po-mjeri-ili-agencija"],
    cta: {
      title: "Želiš da se netko brine o stranici?",
      text: "Pošalji nam link. Napravimo besplatan pregled stanja i predložimo paket.",
    },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
