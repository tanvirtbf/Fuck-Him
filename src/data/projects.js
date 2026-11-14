// =============================================================================
// PROJECTS — 3 to 6 featured project cards, strongest work first.
//
// Fields:
//   id          unique, lowercase-with-dashes (also the future case-study URL)
//   title       project name
//   description 1–2 lines
//   role        your role, e.g. "Solo developer"
//   category    one of `projectCategories` below (minus "All")
//   tech        list of technologies (shown as tags)
//   image       thumbnail in /public/projects (WebP, ~1200x900)
//   liveUrl     live demo link ("" = hide the button)
//   githubUrl   source code link ("" = hide the button)
//   featured    true = show on the home page
//   span        grid size hint on desktop: "normal" | "wide" | "tall"
//
// Tip: desktop grid has 3 columns. A pattern that fills it without gaps:
//   tall + wide + normal + normal   (the current order)
// AI projects get the mint highlight automatically (category: "AI").
// =============================================================================

export const projectCategories = ["All", "AI", "Full-Stack", "Frontend"];

export const projects = [
  {
    id: "todo-ai-project",
    title: "TODO: AI Project",
    description: "TODO: add real description (1–2 lines).",
    role: "TODO: your role",
    category: "AI",
    tech: ["TODO"],
    image: "/projects/placeholder.svg",
    liveUrl: "",
    githubUrl: "",
    featured: true,
    span: "tall",
  },
  {
    id: "todo-full-stack-project",
    title: "TODO: Full-Stack Project",
    description: "TODO: add real description (1–2 lines).",
    role: "TODO: your role",
    category: "Full-Stack",
    tech: ["TODO"],
    image: "/projects/placeholder.svg",
    liveUrl: "",
    githubUrl: "",
    featured: true,
    span: "wide",
  },
  {
    id: "todo-frontend-project",
    title: "TODO: Frontend Project",
    description: "TODO: add real description (1–2 lines).",
    role: "TODO: your role",
    category: "Frontend",
    tech: ["TODO"],
    image: "/projects/placeholder.svg",
    liveUrl: "",
    githubUrl: "",
    featured: true,
    span: "normal",
  },
  {
    id: "todo-full-stack-project-2",
    title: "TODO: Another Project",
    description: "TODO: add real description (1–2 lines).",
    role: "TODO: your role",
    category: "Full-Stack",
    tech: ["TODO"],
    image: "/projects/placeholder.svg",
    liveUrl: "",
    githubUrl: "",
    featured: true,
    span: "normal",
  },
];
