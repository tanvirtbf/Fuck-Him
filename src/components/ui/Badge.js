import { cn } from "@/lib/cn";

const variants = {
  tile: "bg-tile text-fg",
  mint: "bg-mint text-ink", // AI / highlight
  outline: "border border-line text-fg",
  onColor: "bg-black/25 text-white", // on purple / indigo / navy blocks
};

// Square chip used for skills, tech tags and labels.
export default function Badge({ variant = "tile", icon, className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 text-label font-semibold uppercase tracking-[0.12em]",
        variants[variant],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
