<<<<<<< HEAD
# Flomis — web stranica

Premium višestranična web stranica digitalne agencije **FLOMIS j.d.o.o.** (Osijek).
Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Framer Motion · Lenis · React Three Fiber · Resend.

## Pokretanje

```bash
npm install
cp .env.example .env.local   # pa upiši svoje vrijednosti
npm run dev                  # http://localhost:3000
```

Ostale naredbe:

```bash
npm run build   # produkcijski build (provjera tipova + generiranje statičnih stranica)
npm run start   # pokretanje builda lokalno
npm run lint    # ESLint
```

> Tip: `http://localhost:3000/?nopreload` preskače preloader (korisno za testiranje i Lighthouse).

## .env varijable

| Varijabla              | Obavezno | Opis                                                                 |
| ---------------------- | -------- | -------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | da       | Javni URL stranice bez završne kose crte (npr. `https://www.flomis.hr`). Koristi se za canonical, OG, sitemap i schema.org. |
| `RESEND_API_KEY`       | za formu | API ključ s [resend.com](https://resend.com). Bez njega se poruke iz kontakt forme samo logiraju u konzolu (dev mod). |
| `CONTACT_TO_EMAIL`     | za formu | Adresa na koju stižu upiti (npr. `info@flomis.hr`).                  |
| `CONTACT_FROM_EMAIL`   | za formu | Pošiljatelj, npr. `Flomis <no-reply@flomis.hr>`. Domena mora biti verificirana u Resendu. |

## Deploy na Vercel

1. Gurni projekt na GitHub/GitLab.
2. Na [vercel.com](https://vercel.com) → **Add New Project** → odaberi repozitorij. Framework se prepoznaje automatski (Next.js), nije potrebna dodatna konfiguracija.
3. U **Settings → Environment Variables** dodaj varijable iz tablice gore (za Production i Preview).
4. **Deploy**. Nakon toga u **Settings → Domains** dodaj `flomis.hr` i `www.flomis.hr` te postavi DNS zapise koje Vercel prikaže (A / CNAME).
5. U Resendu verificiraj domenu `flomis.hr` (DKIM/SPF zapisi) da e-mailovi iz forme ne završe u spamu.

Svaki push na glavnu granu radi novi deploy; pull requestovi dobivaju preview URL.

## Gdje se što mijenja

Sav tekst je odvojen od komponenti — **ne treba dirati komponente da bi se promijenio sadržaj**.

```
src/content/hr/
├─ site.ts       podaci o firmi (naziv, OIB, adresa, e-mail, telefon, društvene mreže), navigacija, UI tekstovi
├─ home.ts       početna: hero, usluge, proces, brojke, AI demo (pitanja/odgovori), plutajući asistent, recenzije, FAQ, CTA
├─ services.ts   pregled usluga + sadržaj svake podstranice usluge
├─ work.ts       portfolio projekti (grid + studije slučaja)
├─ pricing.ts    paketi i cijene
├─ about.ts      O nama + Kontakt (tekstovi forme)
├─ legal.ts      Politika privatnosti, Politika kolačića, 404
└─ local.ts      lokalna SEO stranica /izrada-web-stranica-osijek
src/content/blog/  blog članci (Markdown)
```

Sve što je označeno s `[PRIMJER]`, `[Ime Prezime]`, `[+385 xx xxx xxxx]` i sl. je **placeholder** — zamijeni stvarnim podacima.

- **Slike projekata**: `public/work/projekt-*.jpg` (trenutno generirani placeholderi) — putanje su u `work.ts`.
- **Logo**: `public/logo/logo.svg` (currentColor), `logo-light.svg`, `logo-dark.svg`; vektorski pathovi u `src/components/brand/logo-paths.ts`.
- **Design tokeni** (boje, fontovi, radijusi, easing): `src/app/globals.css` u bloku `@theme`.
- **Fontovi**: `src/app/layout.tsx` (next/font: Space Grotesk, Manrope, JetBrains Mono).
- **Kontakt forma**: `src/components/forms/ContactForm.tsx` → `src/app/api/kontakt/route.ts` (zod validacija, honeypot, rate-limit, Resend).
- **Cookie banner**: `src/components/layout/CookieBanner.tsx`. Privola se sprema u `localStorage` (`flomis-consent`). Analitiku učitaj tek nakon `window` eventa `flomis:consent` s vrijednošću `"all"`.
- **AI asistent (dolje desno)**: `src/components/layout/AssistantWidget.tsx` — demo bez API-ja, odgovore i ključne riječi uređuješ u `home.ts` (`ai.demo.conversation` i `assistant.extra`). Za pravi asistent zamijeni `reply()` pozivom vlastitog API-ja.

## Blog

Članci su Markdown datoteke u `src/content/blog/*.md`. Novi članak = nova datoteka s frontmatterom:

```md
---
title: "Naslov članka (s ključnom riječi)"
description: "Opis za Google, 140–160 znakova."
date: 2026-10-01
category: "SEO"
keywords: ["ključna riječ 1", "ključna riječ 2"]
---

Tekst u Markdownu (## podnaslovi, liste, tablice, [linkovi](/kontakt))…
```

Naziv datoteke = URL (`moj-clanak.md` → `/blog/moj-clanak`). `draft: true` skriva članak. Blog, početna, sitemap, RSS (`/feed.xml`) i OG slika se ažuriraju sami.

## SEO

Sve što treba raditi izvan koda (Google Business Profil, Search Console, imenici, plan sadržaja) je u [SEO-VODIC.md](SEO-VODIC.md).

## Dodavanje engleskog jezika

Sadržaj je već organiziran po jeziku (`src/content/hr`). Za engleski:

1. Kopiraj `src/content/hr` u `src/content/en` i prevedi.
2. U `src/content/index.ts` proširi `locales` i dodaj odabir prema jeziku.
3. Preseli stranice u `src/app/[locale]/…` ili dodaj `/en` rute — komponente primaju sadržaj kao propse/importe, pa ih nije potrebno mijenjati.

## Struktura

```
src/
├─ app/                 rute (App Router), sitemap, robots, OG slike, API
├─ components/
│  ├─ brand/            logo i "( )" motiv
│  ├─ layout/           header, mobilni meni, footer, preloader, prijelazi, kursor, cookie banner, AI asistent
│  ├─ sections/         sekcije stranica (hero, usluge, proces, radovi, AI demo, recenzije, FAQ, CTA…)
│  ├─ ui/               višekratne komponente (Button, Reveal, SplitText, Marquee, Counter, Accordion, TiltCard…)
│  ├─ three/            3D hero scena (React Three Fiber, dinamički import, fallback na mobitelu)
│  └─ forms/            kontakt forma
├─ content/hr/          sav tekst na hrvatskom
├─ hooks/               useMedia (reduced motion, desktop)
└─ lib/                 gsap, seo (metadata + schema.org), og, utils
```

## Performanse i pristupačnost

- Sve animacije koriste samo `transform`/`opacity`; sve poštuju `prefers-reduced-motion`.
- 3D scena i custom kursor su isključeni na mobitelu / uređajima bez miša; 3D se učitava dinamički i pauzira izvan viewporta.
- Slike preko `next/image` (AVIF/WebP, lazy), metadata + Open Graph za svaku stranicu, `sitemap.xml`, `robots.txt`, schema.org (`LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`).
- Semantički HTML, skip-link, fokus stilovi, ARIA na meniju, harmonici, slideru i chat widgetu.
=======
# flomis

Flomis sluzbena webs tranica
>>>>>>> 7c03129dfde710b53997c07fb4b2339325d703b0
