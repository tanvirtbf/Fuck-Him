import { profile } from "@/data/profile";
import { navLinks } from "@/data/navigation";
import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";
import { jobs, education } from "@/data/experience";
import { vision } from "@/data/vision";

// Temporary Phase 0 page: proves Tailwind works and every data file loads.
// Replaced by the real sections from Phase 2 onwards.
export default function Home() {
  const checks = [
    ["profile.js", `${profile.name.first} ${profile.name.last}`],
    ["navigation.js", `${navLinks.length} links`],
    ["skills.js", `${skillGroups.length} groups`],
    ["projects.js", `${projects.length} projects`],
    ["experience.js", `${jobs.length} job · ${education.length} education`],
    ["vision.js", `${vision.currentFocus.length} focus items`],
  ];

  return (
    <main className="mx-auto flex min-h-svh max-w-xl flex-col justify-center gap-8 px-4 py-16">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6F43D6]">
          Phase 0
        </p>
        <h1 className="mt-2 text-4xl font-extrabold uppercase tracking-tight">
          Setup OK
        </h1>
        <p className="mt-3 text-neutral-600">
          Next.js static export + Tailwind CSS are running. Data files loaded:
        </p>
      </div>

      <ul className="divide-y divide-neutral-200 border-y border-neutral-200 text-sm">
        {checks.map(([file, value]) => (
          <li key={file} className="flex justify-between gap-4 py-3">
            <code className="font-semibold">src/data/{file}</code>
            <span className="text-right text-neutral-600">{value}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
