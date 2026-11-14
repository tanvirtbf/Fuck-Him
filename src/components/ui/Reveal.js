"use client";

import { useEffect, useRef } from "react";

/**
 * Fades/slides its children in the first time they scroll into view.
 * direction: "up" | "left" | "right"; delay in ms (for staggering).
 * Styles live in globals.css ([data-reveal]); reduced-motion and no-JS
 * users always see the content immediately.
 *
 * Don't wrap above-the-fold Hero content in this (it would delay LCP).
 */
export default function Reveal({
  as: Tag = "div",
  direction = "up",
  delay = 0,
  className,
  style,
  children,
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.setAttribute("data-visible", "true");
    if (!("IntersectionObserver" in window)) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={direction}
      className={className}
      style={{ "--reveal-delay": `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}
