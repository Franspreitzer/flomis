# SEO vodič za flomis.hr — kako stalno ispadati ljudima u Osijeku i Slavoniji

Ovo je popis koraka koje treba napraviti **nakon deploya**. Tehnički dio (na stranici) je gotov; ovaj dokument pokriva ono što se radi izvan koda i što treba ponavljati.

---

## 1. Google Business Profil (najvažnije — napravi prvo)

Kartica s kartom, radnim vremenom i recenzijama koja se pojavi kad netko upiše "web agencija Osijek". Za lokalne pretrage vrijedi više od web stranice.

### Postavljanje (30 min)

1. Otvori **https://business.google.com** i prijavi se **Google računom firme** (napravi npr. `flomis.osijek@gmail.com` ili koristi Google Workspace na domeni — ne osobni račun).
2. **Dodaj tvrtku** → naziv: `Flomis` (točno kako želiš da se prikazuje; bez "j.d.o.o." i bez ključnih riječi u nazivu — Google to kažnjava).
3. **Kategorija** (primarna): `Agencija za web dizajn` (Website designer). Dodatne: `Tvrtka za razvoj softvera`, `Marketinška agencija`, `Konzultant za internet marketing`.
4. **Adresa**: Dunavska 36, 31000 Osijek. Označi da **poslužuješ i klijente na njihovoj lokaciji** i dodaj područje: Osijek, Osječko-baranjska županija, Đakovo, Vinkovci, Vukovar, Našice, Beli Manastir, Slavonski Brod.
5. **Telefon**: 097 642 5423 · **Web**: https://flomis.hr
6. **Verifikacija**: Google nudi razglednicu na adresu (5–14 dana), telefon, e-mail ili video. Odaberi što ponudi; razglednica je najsigurnija. Bez verifikacije profil se ne prikazuje.

### Popuni sve (Google rangira popunjene profile više)

- **Radno vrijeme**: Pon–Pet 9–17.
- **Opis** (do 750 znakova) — prijedlog:
  > Flomis je digitalna agencija iz Osijeka. Radimo web stranice, web shopove i AI asistente za firme iz Osijeka, Osječko-baranjske županije i cijele Slavonije. Dizajn po mjeri, brzina, lokalni SEO i fiksna cijena: web stranice od 500 €, web shopovi od 1.000 €, AI asistenti od 200 €. Hosting, domene i održavanje na jednom mjestu. Ponuda u roku 24 sata.
- **Usluge** (dodaj svaku s cijenom "od"): Izrada web stranica (od 500 €), Izrada web shopa (od 1.000 €), AI asistent / chatbot (od 200 €), Hosting i domene (od 90 €/god), Održavanje web stranica (od 39 €/mj).
- **Fotografije**: logo (kvadrat 720×720), naslovna (1024×576), 5–10 fotki ureda, tima, ekrana s projektima. Profili s fotkama dobivaju ~40 % više klikova.
- **Atributi**: "Online sastanci", "Ženska/muška vlasnička struktura" ako želiš, jezici.
- Uključi **Poruke** (chat) i **Pitanja i odgovori** — i sam postavi 3–4 pitanja s odgovorima (koliko košta, koliko traje, radite li izvan Osijeka).

### Održavanje (10 min tjedno)

- **Objave** (Posts): 1× tjedno — novi projekt, savjet s bloga, akcija. Svaka objava s linkom na stranicu.
- **Recenzije**: nakon svakog završenog posla pošalji klijentu **direktan link** (Profil → *Zatraži recenzije* → kopiraj link). Cilj: 10 recenzija u prvih 3 mjeseca. Na svaku odgovori u roku 48 h.
- Provjeri **Statistiku** (Insights): koje pretrage te prikazuju, pozivi, klikovi.

---

## 2. Google Search Console + Analytics (dan 1 nakon deploya)

1. **https://search.google.com/search-console** → Dodaj svojstvo → *Domena* `flomis.hr` → verificiraj DNS TXT zapisom (Vercel → Domains → DNS, ili kod registrara domene).
2. **Sitemaps** → pošalji `https://flomis.hr/sitemap.xml`.
3. Nakon 2–3 dana provjeri **Pokrivenost / Indeksiranje** — sve stranice moraju biti "Indeksirano".
4. Za svaku novu ključnu stranicu (npr. novi blog članak) klikni **Provjera URL-a → Zatraži indeksiranje**.
5. **Google Analytics 4** (analytics.google.com) → napravi svojstvo → kopiraj Measurement ID (G-XXXX). Skripta se smije učitati **samo nakon privole** — stranica šalje `window` event `flomis:consent` s vrijednošću `"all"`; ubaci GA na taj event (reci mi i ubacim ga u kod).

---

## 3. Bing Places + Apple Maps (15 min, jednokratno)

- **https://www.bingplaces.com** → *Import from Google* (povuče Google Business profil).
- **https://register.apple.com/placesonmaps** → dodaj firmu (Siri, Apple Maps, iPhone korisnici).

---

## 4. Poslovni imenici i lokalni linkovi (NAP mora biti identičan svugdje)

Koristi **točno isti** oblik: `Flomis` · `Dunavska 36, 31000 Osijek` · `097 642 5423` · `https://flomis.hr` · `info@flomis.hr`.

Besplatni hrvatski imenici (svaki = spominjanje + link):
- poslovna.hr, fininfo.hr, companywall.hr, bizit.hr, zutestranice.com, tvrtke.com, imenik.hr, poslovniforum.hr
- **HGK Županijska komora Osijek** — registar članova
- **Grad Osijek / Osječko-baranjska županija** — poduzetnički portali, popisi IT firmi
- **Poduzetnički inkubator BIOS Osijek**, **Osijek Software City** — zamoli za uvrštenje u popis IT firmi (jak lokalni link)
- LinkedIn Company Page, Facebook Page, Instagram — s linkom na stranicu i istim NAP-om
- Clutch.co / DesignRush / Sortlist — agencijski imenici (besplatni osnovni profil)

Partneri i klijenti: zamoli svakog klijenta da u footeru svoje stranice napiše "Izrada: Flomis" s linkom. To je najvrjedniji lokalni link koji postoji.

---

## 5. Sadržaj — što objavljivati i koliko često

Stranica već ima blog s 5 članaka ciljanih na pretrage. Plan dalje: **2 članka mjesečno**, svaki ciljano na jedno pitanje koje ljudi guglaju.

Ideje s potražnjom (naslov = ključna riječ):
- "Izrada web stranica Đakovo / Vinkovci / Vukovar / Našice" — kratke lokalne stranice ili članci
- "Koliko košta održavanje web stranice"
- "Kako registrirati .hr domenu (vodič 2026)"
- "WordPress ili Next.js — što je bolje za malu firmu"
- "Kako odabrati web agenciju u Osijeku: 7 pitanja"
- "Google Business Profil: 10 grešaka koje firme rade"
- "Web stranica za obrt: što mora imati"
- Studije slučaja stvarnih projekata (kad ih bude) — najbolji sadržaj za konverziju

**Kako dodati članak**: napravi `src/content/blog/moj-naslov.md` s frontmatterom (vidi postojeće članke), gurni na GitHub → Vercel sam deploya. Članak se sam pojavi na blogu, početnoj, u sitemapu i RSS-u.

Pravila: naslov s ključnom riječi, 600–1200 riječi, podnaslovi (H2) kao pitanja, tablica ili lista, link na stranicu usluge i na kontakt.

---

## 6. Recenzije i društveni dokaz

- Google recenzije (vidi gore) — najveći utjecaj na lokalni ranking.
- Kad skupiš 3+ prave recenzije, zamijeni `[PRIMJER]` recenzije u `src/content/hr/home.ts` stvarnima (s imenom i firmom, uz dopuštenje).
- Zamijeni placeholder projekte u `src/content/hr/work.ts` pravima — Google rangira stranice s pravim sadržajem, a ljudi vjeruju pravim primjerima.
- Zamijeni `[FLOMIS]` linkove društvenih mreža u `src/content/hr/site.ts` — tada ulaze u `sameAs` schema.org podatke.

---

## 7. Mjesečna rutina (30 min)

| Što | Gdje |
| --- | --- |
| Pogledaj za koje pretrage se prikazuješ, koje imaju klikove | Search Console → Rezultati |
| Stranice s puno prikaza, malo klikova → poboljšaj naslov/opis | Search Console → Stranice |
| Objavi 2 članka | `src/content/blog/` |
| 4 objave na Google Business profilu | business.google.com |
| Zatraži recenzije od klijenata iz tog mjeseca | Business profil → link |
| Provjeri brzinu (cilj 90+ mobitel) | pagespeed.web.dev |
| Provjeri da nema "404" i grešaka indeksiranja | Search Console → Indeksiranje |

---

## Što je već napravljeno u kodu (za tvoju informaciju)

- **Naslovi i opisi** svih stranica s "Osijek", "Osječko-baranjska županija", "Slavonija"; ključne riječi po stranici.
- **Lokalna landing stranica** `/izrada-web-stranica-osijek` (glavni ciljani pojam) s FAQ-om, područjem rada i djelatnostima.
- **Schema.org**: LocalBusiness + ProfessionalService + Organization (adresa, geo, radno vrijeme, telefon, područje rada — 12 gradova + 4 regije, katalog usluga s cijenama), WebSite, Service s cijenom na svakoj usluzi, FAQPage, BreadcrumbList, BlogPosting, Blog.
- **Blog** s 5 članaka ciljanih na lokalne pretrage, RSS feed (`/feed.xml`), OG slike po članku.
- **Sitemap** (26 URL-ova) i `robots.txt`; canonical i hreflang na svakoj stranici; Open Graph i Twitter kartice.
- Sekcija **"Područje rada"** na početnoj i u footeru (gradovi i županija u tekstu stranice).
- Brzina: statički generirane stranice, AVIF/WebP slike, lazy 3D; Lighthouse SEO 100, pristupačnost 100.
