import { Sparkles } from "lucide-react";
import { skillGroups } from "@/data/skills";
import { skillIcons } from "@/lib/skillIcons";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/ui/Reveal";
import { ShapeField, DotGrid, Wireframe } from "@/components/ui/shapes";
import { cn } from "@/lib/cn";

// Bento layout + accent per known group id. Unknown ids get a normal tile.
//   lg:  [ AI (tall) ][ Frontend (wide)   ]
//        [ AI        ][ Backend ][Database]
//        [ Tools & DevOps (full width)    ]
const LAYOUT = {
  frontend: { span: "md:col-span-2 lg:col-span-2", accent: "border-cyan" },
  backend: { span: "", accent: "border-purple" },
  database: { span: "", accent: "border-navy" },
  ai: { span: "md:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-span-2 lg:row-start-1", accent: "" },
  tools: { span: "md:col-span-2 lg:col-span-3", accent: "border-pink" },
};

const shapes = [
  { type: "ring", right: "4%", y: "6%", size: 34, color: "text-pink", delay: 0.4 },
  { type: "dash", right: "16%", y: "4%", size: 26, rotate: 25, color: "text-navy", delay: 1.4, hideOnMobile: true },
  { type: "squiggle", x: "2%", bottom: "3%", size: 46, rotate: -8, color: "text-olive", delay: 2, hideOnMobile: true },
  { type: "dot", right: "2%", bottom: "8%", size: 12, color: "text-purple", delay: 1, hideOnMobile: true },
];

function SkillChip({ skill, onMint }) {
  const Icon = skillIcons[skill.icon];
  return (
    <li>
      <Badge
        variant={onMint ? "onMint" : "tile"}
        caps={false}
        icon={Icon ? <Icon size={14} aria-hidden="true" /> : null}
        className="transition-transform duration-200 hover:-translate-y-0.5"
      >
        {skill.name}
      </Badge>
    </li>
  );
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative isolate overflow-hidden bg-bg py-16 sm:py-20 lg:py-24">
      <ShapeField shapes={shapes} />
      <DotGrid
        width={260}
        height={180}
        className="pointer-events-none absolute top-10 right-[10%] hidden text-fg/15 md:block"
      />

      <Container className="relative z-10">
        <SectionHeading id="skills-title" align="left" kicker="(what I do)" title="Skills" />

        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-14 lg:grid-flow-row-dense lg:grid-cols-3 lg:gap-5">
          {skillGroups.map((group, i) => {
            const layout = LAYOUT[group.id] ?? { span: "", accent: "border-line" };
            const isAi = group.id === "ai";
            return (
              <Reveal as="li" key={group.id} delay={i * 80} className={cn("flex", layout.span)}>
                <article
                  aria-labelledby={`skills-${group.id}`}
                  className={cn(
                    "relative flex w-full flex-col overflow-hidden p-6 sm:p-8",
                    isAi ? "bg-mint text-ink" : cn("border-t-4 bg-surface", layout.accent),
                  )}
                >
                  {isAi && (
                    <Wireframe
                      size={170}
                      strokeWidth={4}
                      className="pointer-events-none absolute -right-8 -bottom-10 hidden text-ink/15 lg:block"
                    />
                  )}
                  <div className="relative flex items-baseline justify-between gap-4">
                    <h3 id={`skills-${group.id}`} className="flex items-center gap-2 text-lg font-extrabold uppercase sm:text-xl">
                      {isAi && <Sparkles size={18} aria-hidden="true" />}
                      {group.title}
                    </h3>
                    <span aria-hidden="true" className={cn("font-serif text-lg italic", isAi ? "text-ink/70" : "text-muted")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <ul className="relative mt-6 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <SkillChip key={skill.name} skill={skill} onMint={isAi} />
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
