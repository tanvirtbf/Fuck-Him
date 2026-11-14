import { cn } from "@/lib/cn";

const variants = {
  tile: "bg-tile text-fg",
  mint: "bg-mint text-ink", // AI / highlight
  outline: "border border-line text-fg",
  onColor: "bg-black/25 text-white", // on purple / indigo / navy blocks
  onMint: "bg-white/70 text-ink", // on the mint highlight tile
  current: "border border-current/35 text-current", // inherits colour — any background
};

/**
 * Square chip used for skills, tech tags and labels.
 * caps (default true): small uppercase label style; false: normal-case text
 * (skill names like "Next.js" read better as written).
 * size: "md" (default) | "sm" (compact tags, e.g. project tech stacks)
 */
export default function Badge({ variant = "tile", caps = true, size = "md", icon, className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5",
        size === "sm" ? "px-2 py-0.5" : "px-3 py-1.5",
        caps
          ? "text-label font-semibold tracking-[0.12em] uppercase"
          : cn("font-medium", size === "sm" ? "text-xs leading-5" : "text-sm"),
        variants[variant],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
