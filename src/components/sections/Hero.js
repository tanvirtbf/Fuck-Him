import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";
import Button from "@/components/ui/Button";
import SocialLinks from "@/components/ui/SocialLinks";
import { ShapeField, Wireframe } from "@/components/ui/shapes";
import { cn } from "@/lib/cn";

// Floating Memphis shapes (demo panel 1). The name can be long, so section
// shapes stay on the outer edges; every position was checked against text
// and buttons from 320 to 1920 px (incl. 1280x720 / 1366x768 laptops).
const sectionShapes = [
  // tablet and up: edges of the cyan band
  { type: "dash", x: "3%", y: "20%", size: 28, rotate: 8, color: "text-purple", hideOnMobile: true },
  { type: "squiggle", right: "2.5%", y: "15%", size: 46, rotate: 18, color: "text-mint", delay: 1, hideOnMobile: true },
  { type: "dash", right: "4%", y: "40%", size: 26, rotate: 58, color: "text-olive", delay: 2, hideOnMobile: true },
  { type: "dot", x: "5%", y: "46%", size: 12, color: "text-pink", delay: 1.5, hideOnMobile: true },
  // ≥1400px only: edges of the purple band. Below that the intro text reaches
  // almost to the screen edge (at 1280px it starts 64px in), so these would cover it.
  { type: "triangle", x: "0.5%", y: "68%", size: 90, rotate: -12, color: "text-olive", slow: true, display: "hidden min-[1400px]:block" },
  { type: "ring", x: "2.5%", y: "78%", size: 46, color: "text-cyan", delay: 0.5, display: "hidden min-[1400px]:block" },
  { type: "ring", right: "2.5%", y: "80%", size: 30, color: "text-cyan", delay: 1.5, display: "hidden min-[1400px]:block" },
  { type: "dash", right: "4%", y: "88%", size: 28, rotate: 30, color: "text-mint", delay: 2.5, display: "hidden min-[1400px]:block" },
];

// Phones / tablets: shapes placed relative to the portrait, in the free
// space beside it (the only area guaranteed to be empty on small screens).
const photoShapes = [
  { type: "dash", x: "-24%", y: "22%", size: 26, rotate: 8, color: "text-purple", display: "block lg:hidden" },
  { type: "ring", right: "-26%", y: "38%", size: 26, color: "text-purple", delay: 1, display: "block lg:hidden" },
  { type: "squiggle", x: "-30%", y: "74%", size: 40, rotate: -10, color: "text-mint", delay: 2, display: "block lg:hidden" },
  { type: "dash", right: "-22%", y: "82%", size: 24, rotate: 40, color: "text-olive", delay: 1.5, display: "block lg:hidden" },
];

/**
 * Hero — demo panel 1: cyan over purple, big stacked name, cut-out portrait
 * sitting across the colour split (its lower part tinted purple) with the
 * wireframe polyhedron on top.
 *
 * --photo-w drives the portrait size; the portrait (4:5) hangs 40% of its
 * height (= 0.5 × width) into the purple band.
 */
export default function Hero() {
  const { name, headline, intro, photos } = profile;
  const photo = photos.hero;
  const mask = {
    maskImage: `url(${photo.src})`,
    WebkitMaskImage: `url(${photo.src})`,
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center bottom",
    WebkitMaskPosition: "center bottom",
    clipPath: "inset(60% 0 0 0)",
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden [--photo-w:clamp(13rem,36vw,18rem)] lg:[--photo-w:clamp(13rem,26vw,21rem)]"
    >
      <ShapeField shapes={sectionShapes} />

      {/* ---------------- cyan band: name + portrait ---------------- */}
      <div className="surface-bright flex flex-1 flex-col items-center bg-cyan px-4 pt-24 text-center text-navy lg:pt-28">
        {/* bottom padding ≥ how far the framed photo's polyhedron rises above it */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center pb-[calc(var(--photo-w)*0.14+1rem)]">
          <h1 id="hero-title" className="flex flex-col items-center">
            <span className="pl-[0.4em] text-[clamp(1.125rem,2.6vw,2rem)] font-light tracking-[0.4em] uppercase">
              {name.first}
            </span>{" "}
            <span className="max-w-full text-[clamp(2.5rem,11vw,8.5rem)] leading-[0.95] font-extrabold uppercase wrap-anywhere">
              {name.last}
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-sm font-medium sm:text-base">{headline}</p>
        </div>

        <div className="relative z-10 mb-[calc(var(--photo-w)*-0.5)] aspect-4/5 w-(--photo-w) shrink-0">
          <ShapeField shapes={photoShapes} clip={false} />
          {/* Framed (non-cutout) photo: the polyhedron sits BEHIND it, a bit
              larger, so it frames the photo without crossing the face. */}
          {!photo.cutout && (
            <Wireframe
              strokeWidth={4}
              className="pointer-events-none absolute top-[-11%] left-1/2 h-auto w-[128%] -translate-x-1/2 text-ink"
            />
          )}
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 336px, 30vw"
            className={cn(
              "absolute inset-0 size-full",
              photo.cutout ? "object-contain object-bottom" : "object-cover",
            )}
          />
          {/* purple tint on the part of the photo below the colour split */}
          <div aria-hidden="true" className="absolute inset-0 bg-purple mix-blend-multiply" style={mask} />
          {/* Cut-out photo (demo look): the polyhedron goes on top */}
          {photo.cutout && (
            <Wireframe
              strokeWidth={5}
              className="pointer-events-none absolute top-[2%] left-1/2 h-auto w-[104%] -translate-x-1/2 text-ink"
            />
          )}
        </div>
      </div>

      {/* ---------------- purple band: intro + actions ---------------- */}
      <div className="surface-dark bg-purple px-4 pt-[calc(var(--photo-w)*0.5+3rem)] pb-16 text-white sm:px-6 lg:min-h-[calc(var(--photo-w)*0.5+4rem)] lg:pt-12 lg:pb-12">
        <div className="relative z-10 mx-auto grid max-w-site items-start gap-8 lg:grid-cols-[1fr_var(--photo-w)_1fr] lg:gap-16 lg:px-2">
          <p className="mx-auto max-w-md text-center text-base leading-relaxed lg:col-start-1 lg:mr-0 lg:text-right">
            {intro}
          </p>

          <div className="flex flex-col items-center gap-5 lg:col-start-3 lg:items-start">
            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button variant="inverse" href="#projects">
                View my work <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button variant="ghost-white" href="#contact">
                Contact me
              </Button>
            </div>
            <SocialLinks className="lg:-ml-3" linkClassName="text-white hover:bg-white/15" />
          </div>
        </div>
      </div>
    </section>
  );
}
