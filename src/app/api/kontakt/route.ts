import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/content";
import { allowEmail, allowGlobal, allowIp, looksLikeSpam, makeToken, sameOrigin, turnstileEnabled, verifyToken, verifyTurnstile } from "@/lib/form-guard";

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
  token: z.string().max(80).optional(), // potpisani token vremena (GET /api/kontakt)
  turnstile: z.string().max(4000).optional(),
});

const ALLOWED_HOSTS = [new URL(site.url).host, "localhost:3000", "vercel.app"];

/** Klijent dohvaća token pri otvaranju forme; bez njega (ili prebrzo) slanje ne prolazi. */
export function GET() {
  return NextResponse.json({ token: makeToken(), turnstile: turnstileEnabled }, { headers: { "Cache-Control": "no-store" } });
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!sameOrigin(req, ALLOWED_HOSTS)) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  if (!allowIp(ip) || !allowGlobal()) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  const d = parsed.data;

  // Botovi: honeypot popunjen, nevažeći/prebrz token ili spam sadržaj → tiho "uspjeh" (bot ne smije znati).
  const tok = verifyToken(d.token);
  const spam = looksLikeSpam({ name: d.name, message: d.message, company: d.company });
  if (d.website || !tok.ok || spam) {
    console.info("[kontakt] odbijeno:", d.website ? "honeypot" : !tok.ok ? tok.reason : spam, ip);
    return NextResponse.json({ ok: true });
  }
  if (!(await verifyTurnstile(d.turnstile, ip))) return NextResponse.json({ ok: false, error: "captcha" }, { status: 400 });
  if (!allowEmail(d.email)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

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

    // Automatska potvrda klijentu (ne ruši zahtjev ako ne uspije).
    const firstName = d.name.split(" ")[0];
    resend.emails
      .send({
        from,
        to: d.email,
        replyTo: to,
        subject: "Primili smo tvoj upit — Flomis",
        text: `Bok ${firstName},

hvala na upitu! Pročitali smo ga i javljamo se u roku 24 sata radnim danom s pitanjima, idejom i okvirnom ponudom.

Ako je hitno, nazovi ${site.contact.phone} ili piši na WhatsApp: ${site.contact.whatsapp}

Tvoja poruka:
${d.message}

— Flomis, ${site.contact.address.street}, ${site.contact.address.zip} ${site.contact.address.city}
${site.url}`,
        html: `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#101827;line-height:1.55">
          <p>Bok ${esc(firstName)},</p>
          <p>hvala na upitu! Pročitali smo ga i javljamo se <strong>u roku 24 sata</strong> radnim danom s pitanjima, idejom i okvirnom ponudom.</p>
          <p>Ako je hitno: <a href="${site.contact.phoneHref}">${site.contact.phone}</a> ili <a href="${site.contact.whatsapp}">WhatsApp</a>.</p>
          <p style="margin-top:20px;padding:14px;background:#f4f4f2;border-radius:8px;white-space:pre-wrap;font-size:14px">${esc(d.message)}</p>
          <p style="color:#77818A;font-size:13px;margin-top:24px">— Flomis · ${site.contact.address.street}, ${site.contact.address.zip} ${site.contact.address.city} · <a href="${site.url}" style="color:#77818A">${site.url.replace(/^https?:\/\//, "")}</a></p>
        </div>`,
      })
      .catch((e) => console.warn("[kontakt] auto-reply nije poslan", e));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[kontakt] slanje nije uspjelo", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
