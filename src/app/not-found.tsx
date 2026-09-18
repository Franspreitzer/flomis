import type { Metadata } from "next";
import { NotFoundScene } from "@/components/sections/NotFoundScene";
import { notFound as content } from "@/content";

export const metadata: Metadata = { title: content.meta.title, robots: { index: false, follow: false } };

export default function NotFound() {
  return <NotFoundScene />;
}
