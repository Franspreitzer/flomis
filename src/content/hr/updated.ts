/**
 * Datum zadnje stvarne izmjene sadržaja po putanji (ISO, YYYY-MM-DD).
 *
 * Koristi se za `lastModified` u sitemapu i za `dateModified` u schema.org čvorovima.
 * Namjerno se NE koristi vrijeme builda: kad svaki deploy tvrdi da se promijenilo
 * svih 30 URL-ova, Google prestane vjerovati tom polju.
 *
 * Kad stvarno promijeniš sadržaj neke stranice — upiši novi datum ovdje.
 * Blog ima vlastiti `updated` u frontmatteru i ne pojavljuje se u ovoj tablici.
 */
const UPDATED: Record<string, string> = {
  "": "2026-10-01",
  "/usluge": "2026-10-01",
  "/usluge/web-stranice": "2026-10-01",
  "/usluge/web-shopovi": "2026-10-01",
  "/usluge/ai-asistenti": "2026-10-01",
  "/usluge/hosting-i-domene": "2026-10-01",
  "/usluge/odrzavanje": "2026-10-01",
  "/radovi": "2026-09-30",
  "/paketi": "2026-10-01",
  "/o-nama": "2026-10-01",
  "/kontakt": "2026-10-01",
  "/blog": "2026-10-01",
  "/press": "2026-10-01",
  "/izrada-web-stranica-osijek": "2026-09-24",
  "/radovi/wellar-wellness-osijek": "2026-09-30",
  "/radovi/lfit-productions": "2026-09-30",
  "/izrada-web-stranica/djakovo": "2026-09-24",
  "/izrada-web-stranica/vinkovci": "2026-09-24",
  "/izrada-web-stranica/vukovar": "2026-09-24",
  "/izrada-web-stranica/nasice": "2026-09-24",
  "/izrada-web-stranica/slavonski-brod": "2026-09-24",
  "/izrada-web-stranica/beli-manastir": "2026-09-24",
  "/politika-privatnosti": "2026-09-14",
  "/politika-kolacica": "2026-09-14",
};

/** Zadnja izmjena za zadanu putanju; ako je nema u tablici, pada na datum zadnjeg pregleda sadržaja. */
const FALLBACK = "2026-09-24";

export function lastUpdated(path: string): string {
  return UPDATED[path] ?? FALLBACK;
}

export function lastUpdatedDate(path: string): Date {
  return new Date(lastUpdated(path));
}
