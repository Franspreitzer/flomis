// Šalje sve URL-ove iz sitemapa na IndexNow (Bing, Yandex, Seznam, Naver — trenutno indeksiranje).
// Google ne podržava IndexNow: za Google koristi Search Console → "Zatraži indeksiranje" ili pošalji sitemap.
// Pokreni NAKON deploya:  npm run seo:ping
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://flomis.hr";
const KEY = "f6aceda3af7ec9ae835370dd046edfc9";
const res = await fetch(`${SITE}/sitemap.xml`);
if (!res.ok) throw new Error("Sitemap nije dostupan: " + res.status);
const urls = [...(await res.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const host = new URL(SITE).host;
const r = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${r.status} ${r.statusText} — poslano ${urls.length} URL-ova`);
console.log("Google: otvori https://search.google.com/search-console → Sitemaps → dodaj " + SITE + "/sitemap.xml");
