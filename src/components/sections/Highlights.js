"use client";

import { useEffect, useRef, useState } from "react";
import { highlights } from "@/data/highlights";
import Container from "@/components/ui/Container";

const DURATION = 1400; // ms

/**
 * "At a glance" strip: big numbers that count up the first time the strip
 * scrolls into view. Without JS, or with reduced motion, the final numbers
 * show immediately (they are rendered in the HTML from the start).
 */
export default function Highlights() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(1); // 1 = final values (server HTML)

  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduce || !("IntersectionObserver" in window)) return;

    // Already on screen when the page loads? Keep the final numbers.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    setProgress(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / DURATION);
          setProgress(1 - Math.pow(1 - t, 3)); // ease-out
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section aria-label="Highlights" className="relative bg-bg pt-16 sm:pt-20 lg:pt-24">
      <Container>
        <ul ref={ref} className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {highlights.map((item) => (
            <li
              key={item.label}
              className="group relative flex flex-col gap-3 bg-surface p-6 transition-colors duration-300 sm:p-8 can-hover:hover:bg-tile"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-mint transition-transform duration-500 ease-out can-hover:group-hover:scale-x-100"
              />
              <p className="text-[clamp(2.5rem,5vw,3.75rem)] leading-none font-extrabold text-accent-text tabular-nums">
                {Math.round(item.value * progress)}
                {item.suffix && <span className="text-mint-text">{item.suffix}</span>}
              </p>
              <p className="max-w-[22ch] text-sm leading-snug text-muted">{item.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
