import Link from "next/link";
import { profile } from "@/data/profile";
import { navLinks } from "@/data/navigation";
import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";
import { jobs, education } from "@/data/experience";
import { vision } from "@/data/vision";

// Temporary page: proves the setup works and every data file loads.
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
        <p className="text-label font-semibold uppercase tracking-label text-accent-text">
          Phase 0 – 1
        </p>
        <h1 className="mt-2 text-4xl font-extrabold uppercase">Setup OK</h1>
        <p className="mt-3 text-muted">
          Next.js static export + Tailwind CSS are running. Data files loaded:
        </p>
      </div>

      <ul className="divide-y divide-line border-y border-line text-sm">
        {checks.map(([file, value]) => (
          <li key={file} className="flex justify-between gap-4 py-3">
            <code className="font-semibold">src/data/{file}</code>
            <span className="text-right text-muted">{value}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/styleguide"
        className="self-start text-label font-semibold uppercase tracking-label text-accent-text underline decoration-2 underline-offset-8"
      >
        Open the styleguide →
      </Link>
    </main>
  );
}
