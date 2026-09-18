"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { contact } from "@/content";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "ok" | "error";
type Errors = Partial<Record<"name" | "email" | "message" | "consent", string>>;

const f = contact.form;

const field =
  "peer w-full rounded-md border border-line bg-ink-2/60 px-4 pb-3 pt-6 text-base text-paper transition-colors placeholder:text-transparent focus:border-accent focus:outline-none";
const label =
  "pointer-events-none absolute left-4 top-4 text-sm text-paper-3 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs";

/** Kontakt forma → POST /api/kontakt (Resend). Validacija na klijentu i serveru. Honeypot za spam. */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const errs: Errors = {};
    if (!data.name?.trim()) errs.name = f.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) errs.email = f.errors.email;
    if ((data.message ?? "").trim().length < 10) errs.message = f.errors.message;
    if (data.consent !== "on") errs.consent = f.errors.consent;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, consent: true, page: window.location.pathname }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "ok" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-accent/40 bg-ink-2 p-8 md:p-10"
            role="status"
          >
            <p className="text-label mb-4 text-paper-3">( ✓ )</p>
            <h3 className="text-display-sm">{f.success.title}</h3>
            <p className="mt-3 text-paper-2">{f.success.text}</p>
            <div className="mt-6">
              <Button variant="secondary" size="sm" onClick={() => setStatus("idle")} arrow={false}>
                ↻
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={onSubmit}
            noValidate
            className="space-y-4"
            aria-describedby={status === "error" ? "form-error" : undefined}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative">
                <input id="name" name="name" type="text" placeholder={f.name.placeholder} autoComplete="name" required className={cn(field, errors.name && "border-red-400")} aria-invalid={!!errors.name} />
                <label htmlFor="name" className={label}>
                  {f.name.label}
                </label>
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div className="relative">
                <input id="email" name="email" type="email" placeholder={f.email.placeholder} autoComplete="email" required className={cn(field, errors.email && "border-red-400")} aria-invalid={!!errors.email} />
                <label htmlFor="email" className={label}>
                  {f.email.label}
                </label>
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>
              <div className="relative">
                <input id="phone" name="phone" type="tel" placeholder={f.phone.placeholder} autoComplete="tel" className={field} />
                <label htmlFor="phone" className={label}>
                  {f.phone.label}
                </label>
              </div>
              <div className="relative">
                <input id="company" name="company" type="text" placeholder={f.company.placeholder} autoComplete="organization" className={field} />
                <label htmlFor="company" className={label}>
                  {f.company.label}
                </label>
              </div>
            </div>

            <fieldset>
              <legend className="text-label mb-3 text-paper-3">{f.service.label}</legend>
              <div className="flex flex-wrap gap-2">
                {f.service.options.map((o, i) => (
                  <label key={o} className="cursor-pointer" data-cursor="link">
                    <input type="radio" name="service" value={o} defaultChecked={i === 0} className="peer sr-only" />
                    <span className="block rounded-full border border-line-strong px-4 py-2 text-sm text-paper-2 transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-accent hover:border-paper">
                      {o}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-label mb-3 text-paper-3">{f.budget.label}</legend>
              <div className="flex flex-wrap gap-2">
                {f.budget.options.map((o, i) => (
                  <label key={o} className="cursor-pointer" data-cursor="link">
                    <input type="radio" name="budget" value={o} defaultChecked={i === f.budget.options.length - 1} className="peer sr-only" />
                    <span className="block rounded-full border border-line-strong px-4 py-2 text-sm text-paper-2 transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-accent hover:border-paper">
                      {o}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="relative">
              <textarea id="message" name="message" rows={5} placeholder={f.message.placeholder} required className={cn(field, "resize-y", errors.message && "border-red-400")} aria-invalid={!!errors.message} />
              <label htmlFor="message" className={label}>
                {f.message.label}
              </label>
              {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
            </div>

            {/* Honeypot — botovi ga popune, ljudi ne vide */}
            <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <label className="flex cursor-pointer items-start gap-3 text-sm text-paper-2" data-cursor="link">
              <input type="checkbox" name="consent" className="mt-1 h-4 w-4 shrink-0 accent-accent" aria-invalid={!!errors.consent} />
              <span>
                {f.consent}
                <TransitionLink href="/politika-privatnosti" className="underline underline-offset-4 hover:text-paper">
                  {f.consentLink}
                </TransitionLink>
                .{errors.consent && <span className="block text-xs text-red-400">{errors.consent}</span>}
              </span>
            </label>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button type="submit" size="lg" disabled={status === "sending"}>
                {status === "sending" ? f.sending : f.submit}
              </Button>
              {status === "error" && (
                <p id="form-error" role="alert" className="text-sm text-red-400">
                  <strong>{f.error.title}</strong> {f.error.text}
                </p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
