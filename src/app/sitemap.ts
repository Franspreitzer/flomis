import type { MetadataRoute } from "next";
import { cityPages, lastUpdatedDate, projects, services, site, workComingSoon } from "@/content";
import { getPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/usluge", "/radovi", "/paketi", "/o-nama", "/kontakt", "/blog", "/izrada-web-stranica-osijek", "/press", "/politika-privatnosti", "/politika-kolacica"];
  return [
    ...staticPages.map((p) => ({
      url: `${site.url}${p}`,
      lastModified: lastUpdatedDate(p),
      changeFrequency: (p === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: p === "" ? 1 : p.startsWith("/politika") ? 0.3 : p === "/press" ? 0.5 : p === "/izrada-web-stranica-osijek" ? 0.9 : 0.8,
    })),
    ...cityPages.map((c) => ({ url: `${site.url}/izrada-web-stranica/${c.slug}`, lastModified: lastUpdatedDate(`/izrada-web-stranica/${c.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...services.map((s) => ({ url: `${site.url}/usluge/${s.slug}`, lastModified: lastUpdatedDate(`/usluge/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.9 })),
    ...(workComingSoon ? [] : projects).map((p) => ({ url: `${site.url}/radovi/${p.slug}`, lastModified: lastUpdatedDate(`/radovi/${p.slug}`), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...getPosts().map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.updated ?? p.date), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
