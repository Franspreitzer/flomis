import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO (YYYY-MM-DD)
  updated?: string;
  category: string;
  keywords: string[];
  cover?: string;
  readingMinutes: number;
  wordCount: number;
  content: string;
};

const DIR = path.join(process.cwd(), "src", "content", "blog");

/** Svi članci iz src/content/blog/*.md, sortirani od najnovijeg. Draftovi (draft: true) se preskaču. */
export function getPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readPost(f.replace(/\.md$/, "")))
    .filter((p): p is Post => !!p)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  return readPost(slug);
}

function readPost(slug: string): Post | null {
  const file = path.join(DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  if (data.draft) return null;
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: toIso(data.date),
    updated: data.updated ? toIso(data.updated) : undefined,
    category: String(data.category ?? "Savjeti"),
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    cover: data.cover ? String(data.cover) : undefined,
    readingMinutes: Math.max(1, Math.round(wordCount / 200)),
    wordCount,
    content,
  };
}

function toIso(d: unknown) {
  const date = d instanceof Date ? d : new Date(String(d));
  return Number.isNaN(date.getTime()) ? new Date().toISOString().slice(0, 10) : date.toISOString().slice(0, 10);
}

/** ID za sidro iz naslova (## Naslov → "naslov"). */
export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[čć]/g, "c").replace(/[š]/g, "s").replace(/[ž]/g, "z").replace(/[đ]/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

/** Sadržaj (TOC) iz H2 naslova markdowna. */
export function extractToc(md: string) {
  return [...md.matchAll(/^## (.+)$/gm)].map((m) => ({ text: m[1].trim(), id: slugifyHeading(m[1]) }));
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("hr-HR", { day: "numeric", month: "long", year: "numeric" });
}
