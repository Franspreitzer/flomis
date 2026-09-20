import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { blogUi } from "@/content";
import { getPosts } from "@/lib/blog";
import { PostCard } from "./PostCard";

/** Zadnja 3 članka s bloga (server komponenta — čita markdown s diska). */
export function LatestPosts() {
  const posts = getPosts().slice(0, 3);
  if (!posts.length) return null;
  return (
    <section className="container-x section-y">
      <div className="mb-8 flex items-end justify-between gap-6">
        <SectionLabel num="07">{blogUi.latest}</SectionLabel>
        <Button href="/blog" variant="ghost" size="sm">
          {blogUi.allPosts}
        </Button>
      </div>
      <Reveal stagger="[data-reveal-item]" className="grid gap-4 md:grid-cols-3">
        {posts.map((p) => (
          <div key={p.slug} data-reveal-item>
            <PostCard post={p} />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
