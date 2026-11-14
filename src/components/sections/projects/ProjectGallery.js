"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/cn";

const SPAN = {
  wide: "lg:can-hover:col-span-2",
  tall: "lg:can-hover:row-span-2",
  normal: "",
};

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Filter tabs + project grid.
 *   phones   → horizontal swipe carousel with arrows and dots (demo panel 5)
 *   tablets  → 2-column cards
 *   desktop  → 3-column mosaic (demo panels 3–4)
 */
export default function ProjectGallery({ projects, categories }) {
  const featured = projects.filter((p) => p.featured);
  // only offer filters that actually have projects
  const filters = categories.filter((c) => c === "All" || featured.some((p) => p.category === c));
  const [active, setActive] = useState("All");
  const [slide, setSlide] = useState(0);
  const listRef = useRef(null);

  const visible = active === "All" ? featured : featured.filter((p) => p.category === active);

  // Keep the dots in sync with the swipe position (phones only — elsewhere
  // the list does not scroll horizontally, so scrollLeft stays 0).
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const items = [...list.children];
        const left = list.getBoundingClientRect().left;
        let best = 0;
        let bestDist = Infinity;
        items.forEach((item, i) => {
          const d = Math.abs(item.getBoundingClientRect().left - left - 16);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setSlide(best);
      });
    };
    list.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      list.removeEventListener("scroll", onScroll);
    };
  }, []);

  function choose(category) {
    setActive(category);
    setSlide(0);
    listRef.current?.scrollTo({ left: 0 });
  }

  function goTo(index) {
    const list = listRef.current;
    const item = list?.children[index];
    if (!item) return;
    list.scrollTo({
      left: item.offsetLeft - 16,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }

  return (
    <div className="mt-8">
      {/* Filter tabs */}
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap justify-center gap-x-7 gap-y-1">
        {filters.map((category) => {
          const isActive = category === active;
          return (
            <button
              key={category}
              type="button"
              onClick={() => choose(category)}
              aria-pressed={isActive}
              className={cn(
                "relative inline-flex min-h-11 items-center gap-1.5 text-label font-semibold tracking-label uppercase transition-colors",
                isActive ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {category === "AI" && <Sparkles size={13} aria-hidden="true" className="text-mint-text" />}
              {category}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 bottom-1.5 h-0.5 origin-left bg-mint transition-transform duration-300",
                  isActive ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {`Showing ${visible.length} ${visible.length === 1 ? "project" : "projects"}${active === "All" ? "" : ` in ${active}`}`}
      </p>

      {/* Grid / carousel */}
      <ul
        ref={listRef}
        aria-label="Projects"
        className={cn(
          "relative mt-8 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0",
          "lg:mt-10 lg:grid-cols-3 lg:gap-5 lg:can-hover:auto-rows-[22rem] lg:can-hover:grid-flow-row-dense",
        )}
      >
        {visible.map((project, i) => (
          <li
            key={`${active}-${project.id}`}
            className={cn(
              "w-[84%] shrink-0 snap-start sm:w-auto",
              "motion-safe:animate-[fade-up_0.45s_ease-out_both]",
              SPAN[project.span] ?? "",
            )}
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      {/* Carousel controls (phones) */}
      {visible.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
          <button
            type="button"
            onClick={() => goTo(slide - 1)}
            disabled={slide === 0}
            aria-label="Previous project"
            className="inline-flex size-11 items-center justify-center rounded-full text-fg transition-opacity disabled:opacity-30"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <div className="flex items-center">
            {visible.map((project, i) => (
              <button
                key={project.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show project ${i + 1} of ${visible.length}: ${project.title}`}
                aria-current={i === slide ? "true" : undefined}
                className="inline-flex size-8 items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "block size-2 rounded-full transition-colors",
                    i === slide ? "bg-mint-text" : "bg-muted/40",
                  )}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(slide + 1)}
            disabled={slide === visible.length - 1}
            aria-label="Next project"
            className="inline-flex size-11 items-center justify-center rounded-full text-fg transition-opacity disabled:opacity-30"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
