import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
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
        <Projects />
        <Experience />
        <Vision />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
