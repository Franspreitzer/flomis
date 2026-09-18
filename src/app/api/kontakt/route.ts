import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/content";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(4000),
  consent: z.literal(true),
  website: z.string().max(0).optional().or(z.literal("")), // honeypot mora biti prazan
  page: z.string().max(200).optional(),
});

// Jednostavni rate-limit po IP-u (u memoriji; na Vercelu vrijedi po instanci — dovoljno protiv spama).
const hits = new Map<string, { n: number; t: number }>();
const LIMIT = 5;
const WINDOW = 10 * 60 * 1000;

function limited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > WINDOW) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n += 1;
  return h.n > LIMIT;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  const d = parsed.data;

  // Honeypot popunjen → tiho "uspjeh" (bot ne smije znati).
  if (d.website) return NextResponse.json({ ok: true });

  const to = process.env.CONTACT_TO_EMAIL ?? site.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? `Flomis <onboarding@resend.dev>`;
  const key = process.env.RESEND_API_KEY;

  const subject = `Novi upit: ${d.service || "Opće"} — ${d.name}${d.company ? ` (${d.company})` : ""}`;
  const rows: [string, string][] = [
    ["Ime", d.name],
    ["E-mail", d.email],
    ["Telefon", d.phone || "—"],
    ["Firma", d.company || "—"],
    ["Usluga", d.service || "—"],
    ["Budžet", d.budget || "—"],
    ["Stranica", d.page || "—"],
  ];
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:640px;margin:0 auto;color:#101827">
      <h2 style="font-size:20px;margin:0 0 16px">Novi upit s flomis.hr</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#77818A;white-space:nowrap">${k}</td><td style="padding:6px 0">${esc(v)}</td></tr>`).join("")}
      </table>
      <p style="white-space:pre-wrap;margin:20px 0 0;padding:16px;background:#f4f4f2;border-radius:8px;font-size:15px;line-height:1.5">${esc(d.message)}</p>
    </div>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${d.message}`;

  if (!key) {
    // Bez API ključa (lokalni razvoj): logiraj i vrati uspjeh da se forma može testirati.
    console.info("[kontakt] RESEND_API_KEY nije postavljen — poruka nije poslana:\n" + text);
    return NextResponse.json({ ok: true, dev: true });
  }

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({ from, to, replyTo: d.email, subject, html, text });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[kontakt] slanje nije uspjelo", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
