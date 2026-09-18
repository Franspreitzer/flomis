import type { Metadata } from "next";
import { BigCta } from "@/components/sections/BigCta";
import { PageHero } from "@/components/sections/PageHero";
import { PostCard } from "@/components/sections/PostCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { blogUi, site } from "@/content";
import { getPosts } from "@/lib/blog";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ ...blogUi.meta, path: "/blog" });

export default function BlogPage() {
  const posts = getPosts();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: blogUi.crumbs.home, path: "" }, { name: blogUi.crumbs.blog, path: "/blog" }]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${site.url}/blog#blog`,
            url: `${site.url}/blog`,
            name: `${site.name} blog`,
            inLanguage: "hr",
            publisher: { "@id": `${site.url}/#organization` },
            blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${site.url}/blog/${p.slug}`, datePublished: p.date })),
          },
        ]}
      />
      <PageHero label={blogUi.label} title={blogUi.title} lead={blogUi.lead} />
      <section className="container-x pb-[var(--section-y)]">
        <Reveal stagger="[data-reveal-item]" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <div key={p.slug} data-reveal-item className={i === 0 ? "md:col-span-2" : ""}>
              <PostCard post={p} featured={i === 0} />
            </div>
          ))}
        </Reveal>
      </section>
      <BigCta title={[blogUi.cta.title]} text={blogUi.cta.text} button={blogUi.cta.button} />
    </>
  );
}
