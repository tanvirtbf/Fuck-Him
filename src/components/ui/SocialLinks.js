import { profile } from "@/data/profile";
import { getSocialLinks } from "@/lib/socials";
import { cn } from "@/lib/cn";

// Row of icon links (GitHub, LinkedIn, Email) from src/data/profile.js.
// Renders nothing while every link is still empty.
export default function SocialLinks({ className, linkClassName, iconSize = 18 }) {
  const links = getSocialLinks(profile);
  if (links.length === 0) return null;

  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {links.map(({ id, label, href, external, Icon }) => (
        <li key={id}>
          <a
            href={href}
            aria-label={external ? `${label} (opens in a new tab)` : label}
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full transition-colors",
              linkClassName,
            )}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {Icon && <Icon size={iconSize} aria-hidden="true" />}
          </a>
        </li>
      ))}
    </ul>
  );
}
