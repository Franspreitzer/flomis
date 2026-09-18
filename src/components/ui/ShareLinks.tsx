"use client";

import { useState } from "react";

type Props = { url: string; title: string; label: string };

/** Dijeljenje članka: WhatsApp, LinkedIn, Facebook, kopiraj link. Bez vanjskih skripti. */
export function ShareLinks({ url, title, label }: Props) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const links = [
    { name: "WhatsApp", href: `https://wa.me/?text=${enc(`${title} ${url}`)}` },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
  ];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {}
  };
  const cls = "rounded-full border border-line px-3 py-1.5 text-xs font-medium text-paper-2 transition-colors hover:border-line-strong hover:text-paper";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-label mr-1 text-paper-3">{label}</span>
      {links.map((l) => (
        <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>
          {l.name}
        </a>
      ))}
      <button type="button" onClick={copy} className={cls}>
        {copied ? "Kopirano ✓" : "Kopiraj link"}
      </button>
    </div>
  );
}
