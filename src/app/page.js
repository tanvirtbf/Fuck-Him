import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Vision from "@/components/sections/Vision";
import SectionHeading from "@/components/ui/SectionHeading";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/cn";

// TEMPORARY placeholder sections so the navbar, scroll-spy and footer can be
// tested. Each one is replaced by the real section in Phase 9.
const placeholders = {
  contact: { bg: "bg-surface", tone: "default", phase: 9 },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Vision />
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
