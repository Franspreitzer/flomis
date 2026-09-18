/**
 * Središnja točka za sadržaj. Trenutno samo hrvatski (hr).
 * Za engleski: napravi src/content/en/ s istom strukturom i proširi `locales`.
 */
export * from "./hr/site";
export * from "./hr/home";
export * from "./hr/services";
export * from "./hr/work";
export * from "./hr/pricing";
export * from "./hr/about";
export * from "./hr/legal";
export * from "./hr/local";
export * from "./hr/cities";

export const locales = ["hr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "hr";
