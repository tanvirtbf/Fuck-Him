import { Award, BadgeCheck, ExternalLink, GraduationCap } from "lucide-react";
import { jobs, education, certifications, achievements } from "@/data/experience";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SlantedEdge from "@/components/ui/SlantedEdge";
import { ShapeField } from "@/components/ui/shapes";
import { cn } from "@/lib/cn";

const shapes = [
  { type: "ring", x: "4%", y: "9%", size: 40, color: "text-mint", delay: 0.4, hideOnMobile: true },
  { type: "triangle", right: "3%", y: "13%", size: 70, rotate: 16, color: "text-olive", slow: true, hideOnMobile: true },
  { type: "dash", right: "6%", y: "52%", size: 30, rotate: -30, color: "text-cyan", delay: 1.4, display: "hidden xl:block" },
  { type: "squiggle", x: "2%", y: "60%", size: 46, rotate: 10, color: "text-pink", delay: 2, display: "hidden xl:block" },
  { type: "dot", x: "6%", bottom: "14%", size: 12, color: "text-mint", delay: 1, hideOnMobile: true },
];

const period = (start, end) => `${start} — ${end || "Present"}`;

// Small mint label: dates, years
function Meta({ children, className }) {
  return (
    <p className={cn("text-label font-semibold tracking-label text-mint uppercase", className)}>{children}</p>
  );
}

// Sub-block title inside the indigo band
function SubHeading({ id, icon: Icon, children }) {
  return (
    <h3 id={id} className="flex items-center gap-3 text-xl font-extrabold text-white uppercase sm:text-2xl">
      <Icon size={22} aria-hidden="true" className="text-mint" />
      {children}
    </h3>
  );
}

const card = "h-full bg-black/20 p-6 sm:p-7";

/**
 * Experience & Journey — indigo band with slanted edges (demo panel 2).
 * Timeline newest first: centre line on desktop with jobs alternating left /
 * right and their dates on the opposite side; a left-hand line on phones.
 */
export default function Experience() {
  const hasCerts = certifications.length > 0;

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="surface-dark relative isolate overflow-hidden bg-indigo pt-28 pb-32 text-white sm:pt-36 sm:pb-40 lg:pt-44 lg:pb-48"
    >
      <SlantedEdge position="top" direction="down" colorClass="bg-surface" />
      <ShapeField shapes={shapes} />

      <Container className="relative z-10">
        <SectionHeading id="experience-title" kicker="(my journey)" title="Experience" tone="indigo" />

        {/* ---------------- Timeline ---------------- */}
        <ol aria-label="Work experience, newest first" className="relative mt-14 lg:mt-20">
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[9px] w-0.5 bg-white/25 lg:left-1/2 lg:-translate-x-1/2"
          />
          {jobs.map((job, i) => {
            const cardLeft = i % 2 === 0; // desktop: alternate sides
            return (
              <li key={job.id} className="relative grid gap-3 pb-12 pl-10 last:pb-0 lg:grid-cols-2 lg:gap-x-20 lg:pl-0">
                {/* node on the line */}
                <span
                  aria-hidden="true"
                  className="absolute top-1 left-0 size-5 rounded-full border-4 border-mint bg-indigo lg:left-1/2 lg:-translate-x-1/2"
                />

                {/* date — beside the node, opposite the card on desktop */}
                <Meta
                  className={cn(
                    "pt-1 lg:row-start-1 lg:text-base lg:tracking-[0.18em]",
                    cardLeft ? "lg:col-start-2" : "lg:col-start-1 lg:text-right",
                  )}
                >
                  {period(job.start, job.end)}
                </Meta>

                <Reveal
                  direction={cardLeft ? "left" : "right"}
                  className={cn("lg:row-start-1", cardLeft ? "lg:col-start-1" : "lg:col-start-2")}
                >
                  <article aria-labelledby={`job-${job.id}`} className={card}>
                    <h3 id={`job-${job.id}`} className="text-lg leading-tight font-extrabold uppercase sm:text-xl">
                      {job.role}
                    </h3>
                    <p className="mt-1 font-serif text-lg text-lavender italic">{job.company}</p>
                    {job.achievements.length > 0 && (
                      <ul className="mt-4 flex flex-col gap-2.5">
                        {job.achievements.map((item) => (
                          <li key={item} className="flex gap-3 leading-relaxed text-lavender">
                            <span aria-hidden="true" className="mt-[0.7em] h-0.5 w-3 shrink-0 bg-mint" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>

        {/* ---------------- Education & Certifications ---------------- */}
        {(education.length > 0 || hasCerts) && (
          <section aria-labelledby="education-title" className="mt-20 lg:mt-28">
            <SubHeading id="education-title" icon={GraduationCap}>
              Education{hasCerts && " & Certifications"}
            </SubHeading>
            <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:gap-5">
              {education.map((item, i) => (
                <Reveal as="li" key={item.id} delay={i * 80}>
                  <article className={card}>
                    <Meta>{period(item.start, item.end)}</Meta>
                    <h4 className="mt-3 text-lg leading-tight font-extrabold uppercase">{item.degree}</h4>
                    <p className="mt-1 font-serif text-lg text-lavender italic">{item.institution}</p>
                  </article>
                </Reveal>
              ))}
              {certifications.map((item, i) => (
                <Reveal as="li" key={item.id} delay={(education.length + i) * 80}>
                  <article className={cn(card, "flex flex-col")}>
                    <Meta className="flex items-center gap-2">
                      <BadgeCheck size={15} aria-hidden="true" /> Certification · {item.year}
                    </Meta>
                    <h4 className="mt-3 text-lg leading-tight font-extrabold uppercase">{item.name}</h4>
                    <p className="mt-1 font-serif text-lg text-lavender italic">{item.issuer}</p>
                    {item.url && (
                      <div className="mt-3">
                        <Button
                          variant="link-white"
                          href={item.url}
                          external
                          aria-label={`View the ${item.name} credential (opens in a new tab)`}
                        >
                          View credential <ExternalLink size={14} aria-hidden="true" />
                        </Button>
                      </div>
                    )}
                  </article>
                </Reveal>
              ))}
            </ul>
          </section>
        )}

        {/* ---------------- Achievements (optional) ---------------- */}
        {achievements.length > 0 && (
          <section aria-labelledby="achievements-title" className="mt-16 lg:mt-20">
            <SubHeading id="achievements-title" icon={Award}>
              Achievements & Awards
            </SubHeading>
            <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {achievements.map((item, i) => (
                <Reveal as="li" key={item.id} delay={i * 80}>
                  <article className={card}>
                    {item.year && <Meta>{item.year}</Meta>}
                    <h4 className="mt-3 text-lg leading-tight font-extrabold uppercase">{item.title}</h4>
                    {item.description && <p className="mt-2 leading-relaxed text-lavender">{item.description}</p>}
                  </article>
                </Reveal>
              ))}
            </ul>
          </section>
        )}
      </Container>

      <SlantedEdge position="bottom" direction="up" colorClass="bg-bg" />
    </section>
  );
}
