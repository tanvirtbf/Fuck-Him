"use client";

import { Download } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { profile } from "@/data/profile";
import Button from "@/components/ui/Button";
import SocialLinks from "@/components/ui/SocialLinks";
import { ShapeField } from "@/components/ui/shapes";
import { cn } from "@/lib/cn";

// Shapes never sit on top of the big link text: only one ring beside the
// (always short) first item, the rest live in a text-free band at the bottom.
const topShapes = [{ type: "ring", right: "8%", y: "112px", size: 44, color: "text-cyan" }];
const bandShapes = [
  { type: "triangle", x: "4%", y: "10%", size: 56, rotate: -10, color: "text-olive", slow: true },
  { type: "squiggle", x: "34%", y: "38%", size: 50, rotate: -8, color: "text-pink", delay: 2 },
  { type: "dash", x: "62%", y: "16%", size: 30, rotate: 20, color: "text-mint", delay: 1 },
  { type: "ring", right: "6%", y: "30%", size: 30, color: "text-cyan", delay: 1.5 },
];

// Full-screen purple overlay menu for phones/tablets (below lg).
// Opening/closing, focus trap and Escape are handled by <Navbar>.
export default function MobileMenu({ id, panelRef, active, onNavigate }) {
  return (
    <div
      id={id}
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="surface-dark fixed inset-0 z-40 overflow-y-auto bg-purple text-white motion-safe:animate-[menu-in_0.25s_ease-out] lg:hidden"
    >
      <ShapeField shapes={topShapes} />

      <nav aria-label="Main" className="relative mx-auto flex min-h-full max-w-site flex-col px-4 pt-24 pb-10 sm:px-6">
        <ol className="flex flex-col gap-1">
          {navLinks.map((link, i) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => onNavigate(e, link.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group flex items-baseline gap-4 py-2 text-[clamp(2rem,9vw,3rem)] leading-none font-extrabold uppercase transition-colors",
                    isActive ? "text-mint" : "text-white hover:text-mint",
                  )}
                >
                  <span className="w-7 font-serif text-base font-normal text-lilac italic">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </a>
              </li>
            );
          })}
        </ol>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-10">
          <Button variant="inverse" href={profile.resume} download>
            <Download size={16} aria-hidden="true" /> Download resume
          </Button>
          <SocialLinks linkClassName="text-white hover:bg-white/15" />
        </div>

        <div className="relative mt-6 h-20">
          <ShapeField shapes={bandShapes} />
        </div>
      </nav>
    </div>
  );
}
