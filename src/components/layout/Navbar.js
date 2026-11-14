"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { profile } from "@/data/profile";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import useScrollSpy from "./useScrollSpy";
import { cn } from "@/lib/cn";

const MENU_ID = "mobile-menu";
const sectionIds = navLinks.map((l) => l.id);

/**
 * Sticky header. Three looks:
 *   "bright" — at the very top, over the cyan hero (navy text, purple logo)
 *   "solid"  — after scrolling (page background, mint logo, pink pill)
 *   "menu"   — mobile menu open (white text over the purple overlay)
 */
export default function Navbar() {
  const { scrolled, active } = useScrollSpy(sectionIds);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  const tone = open ? "menu" : scrolled ? "solid" : "bright";

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
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          tone === "solid" && "border-line bg-bg/90 text-fg backdrop-blur-md",
          tone === "bright" && "surface-bright border-transparent bg-transparent text-navy",
          tone === "menu" && "surface-dark border-transparent bg-transparent text-white",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <Logo
            tone={tone === "bright" ? "purple" : "mint"}
            onClick={open ? () => closeMenu(false) : undefined}
          />

          {/* Desktop links */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-5 xl:gap-7">
              {navLinks.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className="group relative inline-flex min-h-11 items-center text-label font-semibold tracking-[0.18em] uppercase"
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-0 bottom-2 h-0.5 origin-left transition-transform duration-300",
                          tone === "bright" ? "bg-navy" : "bg-mint",
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            {/* Wrapper controls visibility; Button's own `inline-flex` would beat `hidden` */}
            <div className="ml-2 hidden lg:block">
              <Button
                variant={tone === "bright" ? "outline-navy" : "outline"}
                href={profile.resume}
                download
              >
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
              className="inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-black/10 lg:hidden dark:hover:bg-white/10"
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
                    "absolute top-1.5 left-0 h-0.5 w-5 bg-current transition-opacity duration-200",
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
        </Container>
      </header>

      {open && (
        <MobileMenu id={MENU_ID} panelRef={panelRef} active={active} onNavigate={navigateFromMenu} />
      )}
    </>
  );
}
