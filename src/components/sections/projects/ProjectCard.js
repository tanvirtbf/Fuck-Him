import Image from "next/image";
import { ExternalLink, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

// How many tech tags fit in the desktop overlay; the rest become "+N".
const OVERLAY_TAGS = 4;

/**
 * One project tile. Two looks, decided by CSS only:
 *
 *  • Card (phones, tablets, touch screens): image on top, everything below it.
 *  • Mosaic (desktop with a mouse — `lg:can-hover:`): the image fills the tile,
 *    the title sits bottom-left (demo panels 3–4). On hover or keyboard focus
 *    an overlay covers the whole tile with the details.
 *
 * Text, tags and links use `currentColor`, so the same markup works on the grey
 * tile, the mint AI tile and the dark overlay. Overlay sizes were stress-tested
 * with long descriptions, 6 tags and both links at 1024–1920 px.
 */
export default function ProjectCard({ project }) {
  const { id, title, description, role, category, tech, image, imageAlt, liveUrl, githubUrl } = project;
  const isAi = category === "AI";
  const titleId = `project-${id}`;
  const hasLinks = Boolean(liveUrl || githubUrl);
  const hiddenTags = Math.max(0, tech.length - OVERLAY_TAGS);

  const hideOnReveal =
    "lg:can-hover:transition-opacity lg:can-hover:duration-300 lg:can-hover:group-hover:opacity-0 lg:can-hover:group-focus-within:opacity-0";

  return (
    <article
      aria-labelledby={titleId}
      // Focusable so keyboard users can reveal the overlay even when a
      // project has no links inside it.
      tabIndex={0}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden lg:can-hover:block",
        isAi ? "bg-mint text-ink" : "bg-tile text-fg",
      )}
    >
      {/* Image — AI projects get a mint frame around it (demo's mint tile) */}
      <div
        className={cn(
          "relative aspect-4/3 shrink-0 overflow-hidden lg:can-hover:absolute lg:can-hover:aspect-auto",
          isAi ? "m-3 mb-0 lg:can-hover:m-0 lg:can-hover:inset-3" : "lg:can-hover:inset-0",
        )}
      >
        <Image
          src={image}
          alt={imageAlt ?? `Screenshot of ${title}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
          className="object-cover transition-transform duration-500 ease-out can-hover:group-hover:scale-105"
        />
        {isAi && (
          <span className="absolute top-3 left-3">
            <Badge variant="mint" icon={<Sparkles size={13} aria-hidden="true" />}>
              AI
            </Badge>
          </span>
        )}
      </div>

      {/* Category + title (bottom-left label in mosaic mode; fades out on reveal) */}
      <div
        className={cn(
          "relative z-10 px-5 pt-5 lg:can-hover:absolute lg:can-hover:bottom-0 lg:can-hover:left-0 lg:can-hover:max-w-[85%] lg:can-hover:py-4",
          isAi ? "lg:can-hover:bg-mint" : "lg:can-hover:bg-surface",
          hideOnReveal,
        )}
      >
        <p className="text-label font-semibold tracking-label uppercase">{category}</p>
        <h3 id={titleId} className="mt-1 text-lg leading-tight font-extrabold uppercase">
          {title}
        </h3>
      </div>

      {/* Details — below the title on cards; a full-tile overlay in mosaic mode */}
      <div
        className={cn(
          "relative z-20 flex flex-1 flex-col gap-3.5 px-5 pt-3 pb-5",
          "lg:can-hover:absolute lg:can-hover:inset-0 lg:can-hover:overflow-hidden lg:can-hover:p-6",
          "lg:can-hover:opacity-0 lg:can-hover:transition-opacity lg:can-hover:duration-300",
          "lg:can-hover:group-focus-within:opacity-100 lg:can-hover:group-hover:opacity-100",
          isAi ? "lg:can-hover:bg-mint/95 lg:can-hover:text-ink" : "lg:can-hover:bg-ink/95 lg:can-hover:text-white",
        )}
      >
        {/* Title repeated for sighted mouse users only (the <h3> above is the real one) */}
        <div aria-hidden="true" className="hidden lg:can-hover:block">
          <p className="text-label font-semibold tracking-label uppercase">{category}</p>
          <p className="mt-1 line-clamp-2 text-lg leading-tight font-extrabold uppercase">{title}</p>
        </div>

        <p className="text-sm leading-relaxed lg:can-hover:line-clamp-3">{description}</p>
        <p className="text-sm lg:can-hover:truncate">
          <span className="font-bold">Role:</span> {role}
        </p>
        <ul aria-label="Tech stack" className="flex flex-wrap gap-1.5">
          {tech.map((t, i) => (
            <li key={t} className={i >= OVERLAY_TAGS ? "lg:can-hover:hidden" : undefined}>
              <Badge variant="current" caps={false} size="sm">
                {t}
              </Badge>
            </li>
          ))}
          {hiddenTags > 0 && (
            <li aria-hidden="true" className="hidden lg:can-hover:block">
              <Badge variant="current" caps={false} size="sm">
                +{hiddenTags}
              </Badge>
            </li>
          )}
        </ul>
        {hasLinks && (
          <div className="mt-auto flex flex-wrap gap-x-6">
            {liveUrl && (
              <Button variant="link-current" href={liveUrl} external aria-label={`Live demo of ${title} (opens in a new tab)`}>
                <ExternalLink size={15} aria-hidden="true" /> Live demo
              </Button>
            )}
            {githubUrl && (
              <Button variant="link-current" href={githubUrl} external aria-label={`Source code of ${title} on GitHub (opens in a new tab)`}>
                <FaGithub size={15} aria-hidden="true" /> GitHub
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
