import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Vision from "@/components/sections/Vision";
import Contact from "@/components/sections/Contact";

// Single-page portfolio. Section order matches src/data/navigation.js.
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Skills />
        {/* Projects section hidden: no project cards yet. To bring it back,
            fill src/data/projects.js, re-import Projects here and add
            { id: "projects" } to src/data/navigation.js. */}
        <Experience />
        <Vision />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
