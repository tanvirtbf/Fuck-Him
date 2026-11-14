"use client";

import { useEffect, useState } from "react";

/**
 * Tracks page scroll for the navbar:
 *   scrolled → true once the page has moved past the very top
 *   active   → id of the section currently under the "reading line"
 *              (35% down the viewport); the last section wins at page bottom
 */
export default function useScrollSpy(ids) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(ids[0]);
  const key = ids.join(",");

  useEffect(() => {
    const sectionIds = key.split(",");
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 8);

      const line = window.innerHeight * 0.35;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      const atBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = sectionIds[sectionIds.length - 1];
      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule(); // initial state (e.g. page opened at #projects)
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [key]);

  return { scrolled, active };
}
