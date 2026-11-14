import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

const tones = {
  purple: "bg-purple text-white", // over the cyan hero (demo panel 1)
  mint: "bg-mint text-ink", // on light / dark surfaces (demo panels 3–6)
};

// Small round logo with initials. Links back to the top of the page.
export default function Logo({ tone = "mint", className, onClick }) {
  const name = `${profile.name.first} ${profile.name.last}`;
  return (
    <a
      href="#home"
      onClick={onClick}
      aria-label={`${name}, back to top`}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-full text-xs font-extrabold tracking-wider transition-colors duration-300",
        tones[tone],
        className,
      )}
    >
      {profile.initials}
    </a>
  );
}
