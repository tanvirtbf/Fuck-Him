import { Target, Telescope } from "lucide-react";
import { vision } from "@/data/vision";
import { skillIcons } from "@/lib/skillIcons";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ShapeField, Ring, Triangle } from "@/components/ui/shapes";

const shapes = [
  { type: "dash", right: "6%", y: "5%", size: 30, rotate: 30, color: "text-purple", delay: 0.6 },
  { type: "squiggle", x: "2%", y: "40%", size: 46, rotate: -12, color: "text-olive", delay: 1.4, display: "hidden xl:block" },
  { type: "dot", right: "3%", y: "46%", size: 12, color: "text-pink", delay: 2, hideOnMobile: true },
];

// "make **AI tools** people use" → highlighted <strong> for the starred words
function Mission({ text }) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong
        key={i}
        className="font-extrabold uppercase underline decoration-mint decoration-[0.12em] underline-offset-[0.12em]"
      >
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

function GoalList({ id, title, icon: Icon, goals, delay }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article aria-labelledby={id} className="h-full border-t-4 border-purple bg-surface p-6 sm:p-8">
        <h3 id={id} className="flex items-center gap-3 text-lg font-extrabold uppercase sm:text-xl">
          <Icon size={20} aria-hidden="true" className="text-accent-text" />
          {title}
        </h3>
        <ol className="mt-6 flex flex-col gap-5">
          {goals.map((goal, i) => (
            <li key={goal} className="flex items-baseline gap-4">
              <span
                aria-hidden="true"
                className="w-12 shrink-0 text-4xl leading-none font-extrabold text-transparent [-webkit-text-stroke:1.5px_var(--color-purple)] dark:[-webkit-text-stroke-color:var(--accent-text)]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="leading-relaxed">{goal}</span>
            </li>
          ))}
        </ol>
      </article>
    </Reveal>
  );
}

/**
 * Vision — big typographic mission statement (in the spirit of the demo's
 * "PROJECT IN MIND?"), short/long-term goals, and a navy "NOW" panel with what
 * I'm learning or building right now.
 */
export default function Vision() {
  const { mission, goals, currentFocus } = vision;

  return (
    <section id="vision" aria-labelledby="vision-title" className="relative isolate overflow-hidden bg-bg py-16 sm:py-20 lg:py-24">
      <ShapeField shapes={shapes} />

      <Container className="relative z-10">
        <SectionHeading id="vision-title" align="left" kicker="(where I'm heading)" title="Vision" />

        {/* Mission */}
        <Reveal className="relative mt-10 lg:mt-14">
          <Ring
            size={150}
            strokeWidth={7}
            className="pointer-events-none absolute -top-10 right-[2%] hidden text-cyan/70 lg:block"
          />
          <Triangle
            size={90}
            strokeWidth={5}
            className="pointer-events-none absolute top-16 right-[13%] hidden rotate-12 text-pink/70 lg:block"
          />
          <figure className="relative max-w-4xl border-l-4 border-mint pl-6 sm:pl-10 lg:pr-40">
            <figcaption className="font-serif text-lg text-muted italic">My mission</figcaption>
            <blockquote className="mt-3 text-2xl leading-snug font-semibold sm:text-3xl lg:text-4xl lg:leading-tight">
              <p>
                <Mission text={mission} />
              </p>
            </blockquote>
          </figure>
        </Reveal>

        {/* Goals */}
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-20 lg:gap-5">
          <GoalList id="goals-short" title="Short-term goals" icon={Target} goals={goals.shortTerm} delay={0} />
          <GoalList id="goals-long" title="Long-term goals" icon={Telescope} goals={goals.longTerm} delay={120} />
        </div>

        {/* Current focus */}
        <Reveal className="mt-4 lg:mt-5">
          <section
            aria-labelledby="focus-title"
            className="surface-dark relative overflow-hidden bg-navy p-6 text-white sm:p-8 lg:p-10"
          >
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="inline-flex items-center gap-2 bg-mint px-3 py-1.5 text-label font-extrabold tracking-label text-ink uppercase">
                <span aria-hidden="true" className="relative flex size-2">
                  <span className="absolute inline-flex size-full rounded-full bg-ink opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex size-2 rounded-full bg-ink" />
                </span>
                Now
              </span>
              <h3 id="focus-title" className="text-lg font-extrabold uppercase sm:text-xl">
                Current focus
              </h3>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {currentFocus.map((item) => {
                const Icon = skillIcons[item.icon];
                return (
                  <li key={item.name} className="flex gap-4 border-l-2 border-mint/70 bg-white/5 p-5">
                    {Icon && <Icon size={22} aria-hidden="true" className="mt-0.5 shrink-0 text-mint" />}
                    <div>
                      <p className="font-extrabold uppercase">{item.name}</p>
                      {item.note && <p className="mt-1 text-sm leading-relaxed text-lavender">{item.note}</p>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </Reveal>
      </Container>
    </section>
  );
}
