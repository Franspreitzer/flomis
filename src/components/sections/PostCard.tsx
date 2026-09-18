import { TransitionLink } from "@/components/ui/TransitionLink";
import { blogUi } from "@/content";
import { formatDate, type Post } from "@/lib/blog";
import { cn } from "@/lib/utils";

type Props = { post: Post; className?: string; featured?: boolean };

/** Kartica članka: kategorija, naslov, opis, datum i vrijeme čitanja. */
export function PostCard({ post, className, featured }: Props) {
  return (
    <article className={cn("group h-full", className)}>
      <TransitionLink
        href={`/blog/${post.slug}`}
        className="flex h-full flex-col justify-between rounded-lg border border-line bg-ink-2/60 p-6 transition-colors duration-500 hover:border-line-strong hover:bg-ink-2 md:p-8"
      >
        <div>
          <div className="text-label mb-6 flex items-center justify-between gap-4 text-paper-3">
            <span>( {post.category} )</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          <h2 className={cn("font-display font-bold tracking-tight", featured ? "text-display-sm" : "text-xl md:text-2xl")}>{post.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-paper-2 md:text-base">{post.description}</p>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <span className="text-label text-paper-3">
            {post.readingMinutes} {blogUi.readingTime}
          </span>
          <span className="text-sm font-semibold transition-transform duration-500 ease-out-expo group-hover:translate-x-1">{blogUi.more} →</span>
        </div>
      </TransitionLink>
    </article>
  );
}
