import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";
import Container from "@/components/ui/Container";
import SocialLinks from "@/components/ui/SocialLinks";
import { Ring, Dash } from "@/components/ui/shapes";
import Logo from "./Logo";

// Navy band (demo panel 3) with a pink ring breaking its top edge.
// The year is set at build time; every Vercel deploy refreshes it.
export default function Footer() {
  const year = new Date().getFullYear();
  const name = `${profile.name.first} ${profile.name.last}`;

  return (
    <footer className="surface-dark relative bg-navy text-white">
      <Ring
        size={72}
        strokeWidth={14}
        className="pointer-events-none absolute -top-9 left-[6%] text-pink"
      />
      <Dash
        size={28}
        className="pointer-events-none absolute top-5 left-[46%] hidden -rotate-12 text-mint md:block"
      />

      <Container className="flex flex-col items-center gap-6 py-12 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
          <Logo />
          <p className="text-sm text-lavender">
            © {year} {name}. All rights reserved.
          </p>
        </div>

        <SocialLinks linkClassName="text-white hover:bg-white/10 hover:text-mint" />

        <a
          href="#home"
          className="group inline-flex items-center gap-3 text-label font-semibold tracking-label uppercase"
        >
          Back to top
          <span className="inline-flex size-11 items-center justify-center rounded-full border-2 border-white transition-colors group-hover:border-mint group-hover:bg-mint group-hover:text-ink">
            <ArrowUp size={18} aria-hidden="true" />
          </span>
        </a>
      </Container>
    </footer>
  );
}
