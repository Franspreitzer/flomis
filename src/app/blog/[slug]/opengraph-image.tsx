import { ogImage, OG_SIZE } from "@/lib/og";
import { getPost, getPosts } from "@/lib/blog";

export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  return ogImage(p?.title ?? "Blog", p?.category ? `${p.category} · Flomis blog` : "Flomis blog");
}
