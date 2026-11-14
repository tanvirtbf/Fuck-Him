// =============================================================================
// SKILLS — grouped by category. No percentages or ratings, just names.
// `icon` is a key from src/lib/skillIcons.js (e.g. "react", "docker").
// Unknown or empty keys simply show the name without an icon.
//
// Order = order on the page. The "ai" group comes first: it is the tall,
// mint-highlighted tile (same colour as AI projects).
// =============================================================================

export const skillGroups = [
  {
    id: "ai",
    title: "AI / LLM",
    skills: [
      // TODO: confirm — taken from the "Current Focus" example in requirements
      { name: "LangChain", icon: "langchain" },
      { name: "LangGraph", icon: "langgraph" },
      { name: "LangSmith", icon: "langsmith" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "JavaScript", icon: "javascript" },
      // TODO: add more (e.g. HTML, CSS, Tailwind CSS, ...)
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "Node.js", icon: "nodejs" },
      // TODO: add more (e.g. Express, REST, ...)
    ],
  },
  {
    id: "database",
    title: "Database",
    skills: [
      { name: "MySQL", icon: "mysql" },
      // TODO: add more
    ],
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    skills: [
      // TODO: add tools (e.g. Git, GitHub, Docker, Vercel, ...)
      { name: "TODO: tool", icon: "" },
    ],
  },
];
