"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * ReadMore — shows `children` only after the visitor clicks "See more".
 * The hidden text is still in the page HTML (good for SEO), just not displayed.
 * Used by the About section so a long bio never pushes the photo down.
 */
export default function ReadMore({ children, moreLabel = "See more", lessLabel = "See less", className = "" }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <>
      <div id={id} hidden={!open} className={className}>
        {children}
      </div>
      <div>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex min-h-11 items-center gap-2 text-label font-semibold tracking-label text-white uppercase underline decoration-mint decoration-2 underline-offset-8 transition-colors hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {open ? lessLabel : moreLabel}
          <ChevronDown
            size={16}
            aria-hidden="true"
            className={`transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </>
  );
}
