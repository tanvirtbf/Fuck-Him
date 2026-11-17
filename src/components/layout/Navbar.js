"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { profile } from "@/data/profile";
import Button from "@/components/ui/Button";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import ScrollProgress from "./ScrollProgress";
import useScrollSpy from "./useScrollSpy";
import { cn } from "@/lib/cn";

const MENU_ID = "mobile-menu";
const sectionIds = navLinks.map((l) => l.id);

/**
 * Floating "pill" header.
 *   - Glass pill that gains a shadow once the page scrolls
 *   - A navy highlight slides between links: it follows the section you are
 *     reading, and previews the link under the mouse
 *   - Gold reading-progress bar along the top edge
 *   - Below lg: hamburger → full-screen navy menu (focus-trapped)
 */
export default function Navbar() {
  const { scrolled, active } = useScrollSpy(sectionIds);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [indicator, setIndicator] = useState(null); // { left, width }
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const listRef = useRef(null);
  const linkRefs = useRef({});

  const highlighted = hovered ?? active;

  // Move the sliding highlight under the highlighted link.
  const measure = useCallback(() => {
    const el = linkRefs.current[highlighted];
    const list = listRef.current;
    if (!el || !list) return setIndicator(null);
    const a = el.getBoundingClientRect();
    const b = list.getBoundingClientRect();
    setIndicator({ left: a.left - b.left, width: a.width });
  }, [highlighted]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const closeMenu = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // While open: lock page scroll, focus the first link, trap Tab, close on Escape.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    panelRef.current?.querySelector("a[href]")?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key !== "Tab") return;
      const items = [
        toggleRef.current,
        ...(panelRef.current?.querySelectorAll("a[href], button:not([disabled])") ?? []),
      ].filter(Boolean);
      const first = items[0];
      const last = items[items.length - 1];
      if (!items.includes(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      root.style.overflow = previousOverflow;
    };
  }, [open, closeMenu]);

  // Close the mobile menu if the window grows to desktop width.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onChange = (e) => e.matches && setOpen(false);
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  // Menu link: unlock scrolling first, then jump to the section.
  const navigateFromMenu = useCallback(
    (e, id) => {
      e.preventDefault();
      document.documentElement.style.overflow = "";
      closeMenu(false);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView();
        history.replaceState(null, "", `#${id}`);
      });
    },
    [closeMenu],
  );

  return (
    <>
      <ScrollProgress />

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 lg:pt-4">
        <div
          className={cn(
            "mx-auto flex h-14 max-w-site items-center justify-between gap-3 rounded-full border pr-2 pl-1.5 transition-[background-color,box-shadow,border-color,height] duration-500 ease-out lg:h-16 lg:pl-2",
            open
              ? "border-transparent bg-transparent text-white shadow-none"
              : scrolled
                ? "border-line bg-bg/85 text-fg shadow-[0_14px_40px_-18px_rgba(10,26,51,0.45)] backdrop-blur-md lg:h-14"
                : "border-navy/10 bg-bg/70 text-fg backdrop-blur-sm dark:border-white/10",
          )}
        >
          <div className="flex items-center gap-3">
            <Logo tone="mint" onClick={open ? () => closeMenu(false) : undefined} />
            <span
              aria-hidden="true"
              className="hidden text-sm font-extrabold tracking-wide uppercase sm:inline lg:hidden xl:inline"
            >
              {profile.name.first}
              <span className="text-mint-text"> {profile.name.last}</span>
            </span>
          </div>

          {/* Desktop links with a sliding highlight */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul ref={listRef} className="relative flex items-center gap-1" onMouseLeave={() => setHovered(null)}>
              <li
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute top-1/2 h-10 -translate-y-1/2 rounded-full bg-purple shadow-[0_6px_18px_-8px_rgba(18,48,90,0.8)] transition-[left,width,opacity] duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] dark:bg-mint",
                  indicator ? "opacity-100" : "opacity-0",
                )}
                style={indicator ? { left: indicator.left, width: indicator.width } : undefined}
              />
              {navLinks.map((link) => {
                const isActive = active === link.id;
                const isLit = highlighted === link.id && indicator;
                return (
                  <li key={link.id} className="relative">
                    <a
                      ref={(el) => (linkRefs.current[link.id] = el)}
                      href={`#${link.id}`}
                      aria-current={isActive ? "true" : undefined}
                      onMouseEnter={() => setHovered(link.id)}
                      onFocus={() => setHovered(link.id)}
                      onBlur={() => setHovered(null)}
                      className={cn(
                        "relative inline-flex h-10 items-center rounded-full px-4 text-label font-semibold tracking-[0.16em] uppercase transition-colors duration-300",
                        isLit ? "text-white dark:text-ink" : "text-fg/80 hover:text-fg",
                      )}
                    >
                      {link.label}
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-mint dark:bg-ink"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            {/* Wrapper controls visibility; Button's own `inline-flex` would beat `hidden` */}
            <div className="hidden lg:block">
              <Button variant="outline" href={profile.resume} download className="min-h-10 px-5">
                <Download size={15} aria-hidden="true" />
                <span>
                  <span className="hidden xl:inline">Download </span>Resume
                </span>
              </Button>
            </div>

            {/* Hamburger (below lg) */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={MENU_ID}
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full transition-colors lg:hidden",
                open ? "bg-white/10 hover:bg-white/20" : "bg-purple text-white hover:bg-indigo dark:bg-mint dark:text-ink",
              )}
            >
              <span aria-hidden="true" className="relative block h-3.5 w-5">
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-5 bg-current transition-transform duration-300",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute top-1.5 left-0 h-0.5 w-3.5 bg-current transition-opacity duration-200",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-5 bg-current transition-transform duration-300",
                    open ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <MobileMenu id={MENU_ID} panelRef={panelRef} active={active} onNavigate={navigateFromMenu} />
      )}
    </>
  );
}
