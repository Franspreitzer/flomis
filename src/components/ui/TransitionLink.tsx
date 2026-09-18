"use client";

import Link, { type LinkProps } from "next/link";
import { usePageTransition } from "@/components/layout/PageTransition";
import type { AnchorHTMLAttributes, MouseEvent } from "react";

type Props = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode };

/** next/link s animiranim prijelazom. Vanjski linkovi, hash i modifikatori idu normalno. */
export function TransitionLink({ href, onClick, children, ...rest }: Props) {
  const { navigate } = usePageTransition();
  const hrefStr = typeof href === "string" ? href : String((href as { pathname?: string }).pathname ?? "/");
  const internal = hrefStr.startsWith("/") && !hrefStr.startsWith("//") && !hrefStr.includes("#");

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (!internal || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigate(hrefStr);
  };

  return (
    <Link href={href} onClick={handle} data-cursor="link" {...rest}>
      {children}
    </Link>
  );
}
