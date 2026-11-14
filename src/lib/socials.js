import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { Mail } from "lucide-react";

const ICONS = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
};

// Turns profile.socials + profile.email into renderable links.
// Links with an empty url are skipped, so placeholders never show up as dead links.
export function getSocialLinks(profile) {
  const links = profile.socials
    .filter((s) => s.url)
    .map((s) => ({ id: s.id, label: s.label, href: s.url, external: true, Icon: ICONS[s.id] }));

  if (profile.email) {
    links.push({
      id: "email",
      label: "Email",
      href: `mailto:${profile.email}`,
      external: false,
      Icon: Mail,
    });
  }

  return links;
}
