import { ArrowUpRight, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { getSocialLinks } from "@/lib/socials";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ShapeField } from "@/components/ui/shapes";
import ContactForm from "./contact/ContactForm";

const shapes = [
  { type: "dash", x: "8%", y: "6%", size: 30, rotate: 40, color: "text-mint", delay: 0.4 },
  { type: "ring", right: "7%", y: "4%", size: 36, color: "text-pink", delay: 1.2, hideOnMobile: true },
  { type: "triangle", right: "2%", y: "40%", size: 64, rotate: -10, color: "text-olive", slow: true, display: "hidden xl:block" },
  { type: "squiggle", x: "1.5%", y: "55%", size: 44, rotate: 8, color: "text-cyan", delay: 2, display: "hidden xl:block" },
];

/** Contact — demo panel 5's "Do you have a PROJECT IN MIND?" + Formspree form. */
export default function Contact() {
  const links = getSocialLinks(profile);

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden bg-surface pt-16 pb-24 sm:pt-20 lg:pt-24 lg:pb-32"
    >
      <ShapeField shapes={shapes} />

      <Container className="relative z-10">
        <SectionHeading id="contact-title" kicker="Do you have a" title="Project in mind?" />
        <p className="mx-auto mt-5 max-w-xl text-center text-lg text-muted">{profile.contactIntro}</p>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* Direct links */}
          <Reveal direction="left">
            <aside aria-labelledby="contact-direct" className="flex flex-col gap-6">
              <h3 id="contact-direct" className="text-lg font-extrabold uppercase sm:text-xl">
                Reach me directly
              </h3>

              {links.length > 0 && (
                <ul className="flex flex-col border-t border-line">
                  {links.map(({ id, label, href, display, external, Icon }) => (
                    <li key={id} className="border-b border-line">
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        aria-label={external ? `${label} (opens in a new tab)` : undefined}
                        className="group flex min-h-16 items-center gap-4 py-3"
                      >
                        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-tile transition-colors group-hover:bg-mint group-hover:text-ink">
                          {Icon && <Icon size={18} aria-hidden="true" />}
                        </span>
                        <span className="flex min-w-0 flex-col">
                          <span className="text-label font-semibold tracking-label text-muted uppercase">{label}</span>
                          <span className="truncate font-semibold">
                            {id === "email" ? profile.email : display || href.replace(/^https?:\/\/(www\.)?/, "")}
                          </span>
                        </span>
                        <ArrowUpRight
                          size={18}
                          aria-hidden="true"
                          className="ml-auto shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              <div>
                <Button href={profile.resume} download>
                  <Download size={16} aria-hidden="true" /> Download resume
                </Button>
              </div>
            </aside>
          </Reveal>

          {/* Form */}
          <Reveal direction="up" delay={120}>
            <ContactForm email={profile.email} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
