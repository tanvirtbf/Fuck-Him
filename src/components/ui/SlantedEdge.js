import { cn } from "@/lib/cn";

const polygons = {
  // edge at the bottom of a section, filled with the NEXT section's colour
  "bottom-up": "polygon(0 100%, 100% 0, 100% 100%)", // rises to the right
  "bottom-down": "polygon(0 0, 100% 100%, 0 100%)", // falls to the right
  // edge at the top of a section, filled with the PREVIOUS section's colour
  "top-down": "polygon(0 0, 100% 0, 100% 100%)",
  "top-up": "polygon(0 0, 100% 0, 0 100%)",
};

/**
 * Diagonal cut between two colour blocks (demo panel 2).
 * Put it inside a `relative` section. `colorClass` = colour of the
 * neighbouring section, e.g. "bg-bg" or "bg-purple".
 */
export default function SlantedEdge({ position = "bottom", direction = "up", colorClass, className }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 h-[clamp(2.5rem,7vw,7rem)]",
        // 1px overlap hides the sub-pixel seam that fractional heights (vw) can leave
        position === "bottom" ? "-bottom-px" : "-top-px",
        colorClass,
        className,
      )}
      style={{ clipPath: polygons[`${position}-${direction}`] }}
    />
  );
}
