import type { MetadataRoute } from "next";
import { site } from "@/content";

/** Botovi AI pretraživanja i citiranja (ChatGPT search, Claude, Perplexity, Apple, Mistral…). */
const AI_SEARCH = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Amazonbot",
  "Applebot",
  "MistralAI-User",
  "DuckAssistBot",
];

/** Botovi koji skupljaju sadržaj za treniranje modela — svjesno dopušteni. */
const AI_TRAINING = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "CCBot",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "Bytespider",
];

const SEARCH = ["Googlebot", "Bingbot"];

/**
 * robots.txt grupe NISU kumulativne: bot koji nađe svoju imenovanu grupu
 * ignorira grupu `*`. Zato svaka grupa mora sama ponoviti `disallow`.
 */
const DISALLOW = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: SEARCH, allow: "/", disallow: DISALLOW },
      { userAgent: AI_SEARCH, allow: "/", disallow: DISALLOW },
      { userAgent: AI_TRAINING, allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
