import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Zaštita kontakt forme od spama i zlouporabe (server-side).
 * - potpisani token vremena (forma mora biti otvorena ≥ 4 s i ≤ 24 h)
 * - rate-limit po IP-u, po e-mailu i globalno (štiti Resend kvotu)
 * - filtri sadržaja (linkovi, ćirilica/spam uzorci, ponavljanje)
 * - opcionalno Cloudflare Turnstile
 */

const SECRET = process.env.FORM_SECRET ?? process.env.RESEND_API_KEY ?? "flomis-dev-secret";

export function makeToken(now = Date.now()) {
  const ts = String(now);
  const sig = createHmac("sha256", SECRET).update(ts).digest("hex").slice(0, 32);
  return `${ts}.${sig}`;
}

export function verifyToken(token: string | undefined, { min = 4_000, max = 24 * 60 * 60 * 1000 } = {}) {
  if (!token) return { ok: false, reason: "no_token" as const };
  const [ts, sig] = token.split(".");
  if (!ts || !sig || !/^\d+$/.test(ts)) return { ok: false, reason: "bad_token" as const };
  const expect = createHmac("sha256", SECRET).update(ts).digest("hex").slice(0, 32);
  const a = Buffer.from(sig);
  const b = Buffer.from(expect);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return { ok: false, reason: "bad_sig" as const };
  const age = Date.now() - Number(ts);
  if (age < min) return { ok: false, reason: "too_fast" as const };
  if (age > max) return { ok: false, reason: "expired" as const };
  return { ok: true as const };
}

// ---- Rate limit (u memoriji; na serverless instanci vrijedi po instanci — uz Turnstile dovoljno) ----
type Bucket = { n: number; t: number };
const buckets = new Map<string, Bucket>();

function hit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now - b.t > windowMs) {
    buckets.set(key, { n: 1, t: now });
    return true;
  }
  b.n += 1;
  if (buckets.size > 5000) buckets.clear(); // zaštita memorije
  return b.n <= limit;
}

export function allowIp(ip: string) {
  return hit(`ip:${ip}`, 5, 10 * 60 * 1000); // 5 upita / 10 min po IP-u
}
export function allowEmail(email: string) {
  return hit(`em:${email.toLowerCase()}`, 3, 24 * 60 * 60 * 1000); // 3 upita / dan po e-mailu
}
export function allowGlobal() {
  return hit("global", 60, 60 * 60 * 1000); // 60 upita / sat ukupno (štiti Resend kvotu)
}

// ---- Filtri sadržaja ----
const SPAM_PATTERNS = [
  /\b(viagra|cialis|casino|crypto\s*(signal|invest)|forex|porn|escort|loan\s*offer|seo\s*services?\s*(for|to)\s*your\s*(site|website))\b/i,
  /\[url=|\[link=|<a\s+href/i,
  /(.)\1{9,}/, // isti znak 10+ puta
];

export function looksLikeSpam(fields: { name: string; message: string; company?: string }) {
  const text = `${fields.name} ${fields.company ?? ""} ${fields.message}`;
  const urls = (text.match(/https?:\/\/|www\./gi) ?? []).length;
  if (urls > 2) return "too_many_links";
  if (/https?:\/\/|www\./i.test(fields.name)) return "url_in_name";
  if (/[Ѐ-ӿ]{6,}/.test(text)) return "cyrillic"; // ruska/ukrajinska spam-kampanja
  if (/[一-鿿]{4,}/.test(text)) return "cjk";
  for (const re of SPAM_PATTERNS) if (re.test(text)) return "pattern";
  const words = fields.message.trim().split(/\s+/);
  if (words.length >= 8 && new Set(words.map((w) => w.toLowerCase())).size < words.length * 0.3) return "repetitive";
  return null;
}

// ---- Cloudflare Turnstile (opcionalno) ----
export const turnstileEnabled = !!process.env.TURNSTILE_SECRET_KEY;

export async function verifyTurnstile(token: string | undefined, ip: string) {
  if (!turnstileEnabled) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return !!data.success;
  } catch {
    return false;
  }
}

/** Zahtjev smije doći samo s naše domene (Origin/Referer). */
export function sameOrigin(req: Request, allowedHosts: string[]) {
  const origin = req.headers.get("origin") ?? req.headers.get("referer") ?? "";
  if (!origin) return false;
  try {
    const host = new URL(origin).host;
    return allowedHosts.some((h) => host === h || host.endsWith(`.${h}`));
  } catch {
    return false;
  }
}
