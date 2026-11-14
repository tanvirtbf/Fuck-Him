import { cn } from "@/lib/cn";

const accents = {
  cyan: "border-cyan",
  purple: "border-purple",
  indigo: "border-indigo",
  mint: "border-mint",
  navy: "border-navy",
  pink: "border-pink",
  olive: "border-olive",
};

// Flat, square card (no shadow, no radius — matches the demo's tiles).
// variant: "surface" (white / dark surface) | "tile" (light grey / dark tile)
// accent: optional coloured top bar
export default function Card({
  as: Tag = "div",
  variant = "surface",
  accent,
  className,
  children,
  ...props
}) {
  return (
    <Tag
      className={cn(
        variant === "tile" ? "bg-tile" : "bg-surface",
        "p-6 sm:p-8",
        accent && cn("border-t-4", accents[accent]),
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
