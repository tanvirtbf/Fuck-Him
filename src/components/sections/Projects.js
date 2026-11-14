import { projects, projectCategories } from "@/data/projects";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ShapeField } from "@/components/ui/shapes";
import ProjectGallery from "./projects/ProjectGallery";

// Edge-only shapes (the grid fills the middle).
const shapes = [
  { type: "dash", x: "3%", y: "5%", size: 30, rotate: -35, color: "text-pink" },
  { type: "ring", right: "4%", y: "8%", size: 40, color: "text-cyan", delay: 0.8, hideOnMobile: true },
  { type: "squiggle", right: "2%", bottom: "4%", size: 48, rotate: 12, color: "text-mint", delay: 1.6, hideOnMobile: true },
  { type: "dot", x: "2%", bottom: "10%", size: 12, color: "text-purple", delay: 2.2, hideOnMobile: true },
];

/** Projects — demo panels 3 (heading + filter tabs), 4 (mosaic), 5 (carousel). */
export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative isolate overflow-hidden bg-surface py-16 sm:py-20 lg:py-24"
    >
      <ShapeField shapes={shapes} />
      <Container className="relative z-10">
        <SectionHeading id="projects-title" kicker="(selected work)" title="Projects" />
        <ProjectGallery projects={projects} categories={projectCategories} />
      </Container>
    </section>
  );
}
