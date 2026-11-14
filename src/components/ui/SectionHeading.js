import { cn } from "@/lib/cn";

// Colour sets per background. Every pair passes WCAG AA.
const tones = {
  default: { kicker: "text-muted", title: "text-fg", line: "bg-fg/40" },
  purple: { kicker: "text-lilac", title: "text-white", line: "bg-white/60" },
  indigo: { kicker: "text-lavender", title: "text-white", line: "bg-white/60" },
  navy: { kicker: "text-lavender", title: "text-white", line: "bg-white/60" },
  cyan: { kicker: "text-navy", title: "text-navy", line: "bg-navy/60" },
};

/**
 * Demo heading pattern:
 *   center → small vertical tick, italic serif kicker, giant uppercase title
 *   left   → short horizontal dash + kicker ("— Hello! I'm"), giant title
 */
export default function SectionHeading({
  kicker,
  title,
  as: Tag = "h2",
  align = "center",
  tone = "default",
  id,
  className,
}) {
  const t = tones[tone];
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {kicker && (
        <p
          className={cn(
            "flex items-center font-serif text-lg italic",
            centered ? "flex-col gap-2" : "gap-3",
            t.kicker,
          )}
        >
          <span aria-hidden="true" className={cn(centered ? "h-8 w-px" : "h-px w-10", t.line)} />
          {kicker}
        </p>
      )}
      <Tag id={id} className={cn("text-title font-extrabold uppercase", t.title)}>
        {title}
      </Tag>
    </div>
  );
}
