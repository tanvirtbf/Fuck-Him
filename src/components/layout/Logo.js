import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

const tones = {
  purple: "bg-purple text-white", // navy disc
  mint: "bg-mint text-ink", // gold disc (used in the floating navbar)
};

// Small round logo with initials. Links back to the top of the page.
export default function Logo({ tone = "mint", className, onClick }) {
  const name = `${profile.name.first} ${profile.name.last}`;
  return (
    // Accessible name starts with the visible initials (WCAG 2.5.3 "label in
    // name"), so voice-control users can say "click TD".
    <a
      href="#home"
      onClick={onClick}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-full text-xs font-extrabold tracking-wider transition-colors duration-300",
        tones[tone],
        className,
      )}
    >
      {profile.initials}
      <span className="sr-only"> — {name}, back to top</span>
    </a>
  );
}
