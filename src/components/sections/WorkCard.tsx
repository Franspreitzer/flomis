import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { ui, type Project } from "@/content";
import { cn } from "@/lib/utils";

type Props = { project: Project; className?: string; aspect?: string; priority?: boolean };

/** Kartica projekta: parallax slika, hover zoom, overlay s uslugama, kursor "Pogledaj". */
export function WorkCard({ project, className, aspect = "aspect-[4/3]", priority }: Props) {
  return (
    <article className={cn("group", className)}>
      <TransitionLink
        href={`/radovi/${project.slug}`}
        data-cursor="view"
        data-cursor-label={ui.cursor.view}
        className="block"
        aria-label={`${project.title} — ${project.category}`}
      >
        <div className={cn("relative rounded-lg", aspect)}>
          <ParallaxImage src={project.cover} alt={project.title} className={cn("h-full w-full rounded-lg", aspect)} priority={priority} />
          {/* Overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          <ul className="pointer-events-none absolute bottom-5 left-5 flex flex-wrap gap-2">
            {project.services.map((s, i) => (
              <li
                key={s}
                className="translate-y-3 rounded-full border border-paper/30 bg-ink/60 px-3 py-1 font-mono text-[0.66rem] uppercase tracking-wider text-paper opacity-0 backdrop-blur-sm transition-[transform,opacity] duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 flex items-start justify-between gap-6 border-t border-line pt-3">
          <div>
            <h3 className="font-display text-lg font-bold tracking-tight md:text-xl">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-paper-2">{project.short}</p>
          </div>
          <div className="text-label shrink-0 text-right text-paper-3">
            <p>{project.category}</p>
            <p className="mt-1">{project.year}</p>
          </div>
        </div>
      </TransitionLink>
    </article>
  );
}
