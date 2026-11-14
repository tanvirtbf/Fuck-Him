import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import SectionHeading from "@/components/ui/SectionHeading";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/cn";

// TEMPORARY placeholder sections so the navbar, scroll-spy and footer can be
// tested. Each one is replaced by the real section in Phases 4–9.
const placeholders = {
  about: { bg: "surface-dark bg-purple", tone: "purple", phase: 4 },
  skills: { bg: "bg-bg", tone: "default", phase: 5 },
  projects: { bg: "bg-surface", tone: "default", phase: 6 },
  experience: { bg: "surface-dark bg-indigo", tone: "indigo", phase: 7 },
  vision: { bg: "bg-bg", tone: "default", phase: 8 },
  contact: { bg: "bg-surface", tone: "default", phase: 9 },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        {navLinks
          .filter((link) => placeholders[link.id])
          .map((link) => {
          const p = placeholders[link.id];
          return (
            <section
              key={link.id}
              id={link.id}
              aria-labelledby={`${link.id}-title`}
              className={cn("flex min-h-[80vh] items-center justify-center px-4", p.bg)}
            >
              <SectionHeading
                id={`${link.id}-title`}
                kicker={`(placeholder · Phase ${p.phase})`}
                title={link.label}
                tone={p.tone}
              />
            </section>
          );
        })}
      </main>
      <Footer />
    </>
  );
}
