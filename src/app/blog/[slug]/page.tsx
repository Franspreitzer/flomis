import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PostCard } from "@/components/sections/PostCard";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { blogUi, site } from "@/content";
import { extractToc, formatDate, getPost, getPosts, slugifyHeading } from "@/lib/blog";
import { ShareLinks } from "@/components/ui/ShareLinks";
import { blogPostingJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return buildMetadata({
    title: `${p.title} | Flomis`,
    description: p.description,
    path: `/blog/${p.slug}`,
    type: "article",
    publishedTime: p.date,
    modifiedTime: p.updated,
    keywords: p.keywords,
    image: `${site.url}/blog/${p.slug}/opengraph-image`,
  });
}

/** H2 s ID-em za sadržaj (TOC). */
function H2({ children }: { children?: React.ReactNode }) {
  const text = typeof children === "string" ? children : Array.isArray(children) ? children.map(String).join("") : "";
  return <h2 id={slugifyHeading(text)}>{children}</h2>;
}

/** Interni linkovi idu kroz TransitionLink, vanjski se otvaraju u novom tabu. */
function MdLink({ href, children }: { href?: string; children?: React.ReactNode }) {
  if (href?.startsWith("/")) return <TransitionLink href={href}>{children}</TransitionLink>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const toc = extractToc(p.content);
  const url = `${site.url}/blog/${p.slug}`;
  const related = getPosts()
    .filter((x) => x.slug !== p.slug)
    .sort((a, b) => (a.category === p.category ? -1 : 0) - (b.category === p.category ? -1 : 0))
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          blogPostingJsonLd({ slug: p.slug, title: p.title, description: p.description, date: p.date, updated: p.updated, keywords: p.keywords, wordCount: p.wordCount }),
          breadcrumbJsonLd([
            { name: blogUi.crumbs.home, path: "" },
            { name: blogUi.crumbs.blog, path: "/blog" },
            { name: p.title, path: `/blog/${p.slug}` },
          ]),
        ]}
      />

      <article>
        <header className="container-x pb-10 pt-[calc(var(--header-h)+4rem)] md:pb-14 md:pt-[calc(var(--header-h)+6rem)]">
          <nav aria-label="Navigacijska staza" className="text-label mb-6 flex flex-wrap items-center gap-2 text-paper-3">
            <TransitionLink href="/" className="hover:text-paper">
              {blogUi.crumbs.home}
            </TransitionLink>
            <span aria-hidden="true">/</span>
            <TransitionLink href="/blog" className="hover:text-paper">
              {blogUi.crumbs.blog}
            </TransitionLink>
            <span aria-hidden="true">/</span>
            <span className="text-paper-2">{p.category}</span>
          </nav>
          <SplitText as="h1" text={p.title} className="text-display-md max-w-4xl" trigger="scroll" delay={0.1} />
          <Reveal className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-paper-2" delay={0.3}>
            <span>
              {blogUi.published} <time dateTime={p.date}>{formatDate(p.date)}</time>
            </span>
            {p.updated && (
              <span>
                {blogUi.updated} <time dateTime={p.updated}>{formatDate(p.updated)}</time>
              </span>
            )}
            <span>
              {p.readingMinutes} {blogUi.readingTime}
            </span>
            <span className="text-label text-paper-3">( {p.category} )</span>
          </Reveal>
        </header>

        <div className="container-x grid gap-12 pb-[var(--section-y)] lg:grid-cols-12">
          <Reveal className="prose lg:col-span-8" y={24}>
            <p className="text-lead not-prose mb-10 border-l-2 border-line-strong pl-6">{p.description}</p>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: MdLink, h2: H2 }}>
              {p.content}
            </ReactMarkdown>
            <div className="not-prose mt-12 border-t border-line pt-6">
              <ShareLinks url={url} title={p.title} label={blogUi.share} />
            </div>
          </Reveal>
          <aside className="lg:col-span-3 lg:col-start-10">
            <div className="lg:sticky lg:top-32">
              {toc.length > 2 && (
                <nav aria-label="Sadržaj" className="mb-6 hidden lg:block">
                  <p className="text-label mb-3 text-paper-3">{blogUi.toc}</p>
                  <ol className="space-y-1.5 border-l border-line pl-4 text-sm">
                    {toc.map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="text-paper-2 transition-colors hover:text-paper">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              <Reveal className="rounded-lg border border-line bg-ink-2/70 p-6">
                <SectionLabel className="mb-3">Flomis · Osijek</SectionLabel>
                <p className="font-display text-xl font-bold tracking-tight">{blogUi.cta.title}</p>
                <p className="mt-2 text-sm text-paper-2">{blogUi.cta.text}</p>
                <div className="mt-5">
                  <Button href={blogUi.cta.button.href} size="sm">
                    {blogUi.cta.button.label}
                  </Button>
                </div>
              </Reveal>
              {p.keywords.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Teme">
                  {p.keywords.slice(0, 6).map((k) => (
                    <li key={k} className="rounded-full border border-line px-3 py-1 font-mono text-[0.66rem] text-paper-3">
                      {k}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="container-x border-t border-line py-16 md:py-24">
          <SectionLabel className="mb-8">{blogUi.related}</SectionLabel>
          <Reveal stagger="[data-reveal-item]" className="grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <div key={r.slug} data-reveal-item>
                <PostCard post={r} />
              </div>
            ))}
          </Reveal>
          <div className="mt-10">
            <Button href="/blog" variant="ghost" arrow={false}>
              ← {blogUi.allPosts}
            </Button>
          </div>
        </section>
      )}
    </>
  );
}
