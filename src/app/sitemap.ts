import type { MetadataRoute } from "next";
import { cityPages, projects, services, site } from "@/content";
import { getPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["", "/usluge", "/radovi", "/paketi", "/o-nama", "/kontakt", "/blog", "/izrada-web-stranica-osijek", "/politika-privatnosti", "/politika-kolacica"];
  return [
    ...staticPages.map((p) => ({
      url: `${site.url}${p}`,
      lastModified: now,
      changeFrequency: (p === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: p === "" ? 1 : p.startsWith("/politika") ? 0.3 : p === "/izrada-web-stranica-osijek" ? 0.9 : 0.8,
    })),
    ...cityPages.map((c) => ({ url: `${site.url}/izrada-web-stranica/${c.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...services.map((s) => ({ url: `${site.url}/usluge/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...projects.map((p) => ({ url: `${site.url}/radovi/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...getPosts().map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.updated ?? p.date), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
