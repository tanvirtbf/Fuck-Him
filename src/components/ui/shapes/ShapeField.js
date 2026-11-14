import { cn } from "@/lib/cn";
import { Ring, Triangle, Dash, Squiggle, Dot, DashedCircle, Wireframe } from "./Shapes";

const REGISTRY = {
  ring: Ring,
  triangle: Triangle,
  dash: Dash,
  squiggle: Squiggle,
  dot: Dot,
  dashedCircle: DashedCircle,
  wireframe: Wireframe,
};

/**
 * Scatters decorative shapes over a `relative` parent. Example:
 *
 * <ShapeField shapes={[
 *   { type: "ring", x: "8%", y: "20%", size: 44, color: "text-cyan" },
 *   { type: "dash", right: "10%", y: "30%", rotate: 20, color: "text-pink", hideOnMobile: true },
 * ]} />
 *
 * Position: x/right + y/bottom (any CSS length). rotate in degrees.
 * float: false = static. slow: true = slower float. delay in seconds.
 * Visibility: hideOnMobile: true (= from md up), or display: "hidden xl:block"
 * (any literal display classes) for finer control.
 * clip={false} lets shapes sit outside the parent box (e.g. beside a photo).
 */
export default function ShapeField({ shapes, className, clip = true }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", clip && "overflow-hidden", className)}
    >
      {shapes.map((s, i) => {
        const Shape = REGISTRY[s.type];
        if (!Shape) return null;
        const floats = s.float !== false;
        const rotate = s.rotate ?? 0;

        return (
          <span
            key={i}
            className={cn(
              "absolute",
              s.display ?? (s.hideOnMobile ? "hidden md:block" : "block"),
              floats && (s.slow ? "animate-float-slow" : "animate-float"),
              s.color,
            )}
            style={{
              left: s.x,
              right: s.right,
              top: s.y,
              bottom: s.bottom,
              "--r": `${rotate}deg`,
              transform: floats ? undefined : `rotate(${rotate}deg)`,
              animationDelay: s.delay ? `${s.delay}s` : undefined,
            }}
          >
            <Shape size={s.size} />
          </span>
        );
      })}
    </div>
  );
}
