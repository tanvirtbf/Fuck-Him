"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { cn } from "@/lib/cn";

// The source of truth is <html data-theme>, set before paint by the inline
// script in layout.js. This component only reads and flips it.
function subscribe(onChange) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getSnapshot = () => document.documentElement.getAttribute("data-theme") === "dark";
const getServerSnapshot = () => false;

function savedTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

export default function ThemeToggle({ className }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Follow live system changes until the visitor picks a theme themselves.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = (e) => {
      if (savedTheme()) return;
      document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  function toggle() {
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // storage blocked (private mode) — the theme still switches for this visit
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Dark mode"
      aria-pressed={isDark}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-black/10 dark:hover:bg-white/10",
        className,
      )}
    >
      {/* Icons switch with CSS, so the right one shows before hydration too */}
      <Moon size={19} aria-hidden="true" className="dark:hidden" />
      <Sun size={19} aria-hidden="true" className="hidden dark:block" />
    </button>
  );
}
