import { cn } from "@/lib/cn";

const variants = {
  tile: "bg-tile text-fg",
  mint: "bg-mint text-ink", // AI / highlight
  outline: "border border-line text-fg",
  onColor: "bg-black/25 text-white", // on purple / indigo / navy blocks
  onMint: "bg-white/70 text-ink", // on the mint highlight tile
};

/**
 * Square chip used for skills, tech tags and labels.
 * caps (default true): small uppercase label style; false: normal-case text
 * (skill names like "Next.js" read better as written).
 */
export default function Badge({ variant = "tile", caps = true, icon, className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5",
        caps ? "text-label font-semibold tracking-[0.12em] uppercase" : "text-sm font-medium",
        variants[variant],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
