import Image from "next/image";
import { profile } from "@/data/profile";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SlantedEdge from "@/components/ui/SlantedEdge";
import ReadMore from "@/components/ui/ReadMore";
import { ShapeField, DashedCircle } from "@/components/ui/shapes";

// Paragraphs shown after the lead before "See more" (keeps the text beside the photo)
const VISIBLE_PARAGRAPHS = 1;

// Positions checked against text at 320–1440 px (see Phase 4 tests).
const shapes = [
  { type: "triangle", x: "3%", y: "7%", size: 84, rotate: -14, color: "text-olive", slow: true, hideOnMobile: true },
  { type: "ring", x: "6%", y: "11%", size: 44, color: "text-cyan", delay: 0.6, hideOnMobile: true },
  { type: "dash", right: "8%", y: "9%", size: 30, rotate: 20, color: "text-mint", delay: 1.2 },
  { type: "ring", right: "4%", y: "30%", size: 26, color: "text-cyan", delay: 2, hideOnMobile: true },
  { type: "dash", x: "5%", y: "4%", size: 24, rotate: -30, color: "text-pink", delay: 1.8, display: "block md:hidden" },
];

/**
 * About — demo panel 1 (lower half) + panel 2's slanted edge.
 * Purple block continues from the Hero. On large screens the photo card hangs
 * below the purple block into the next (page-coloured) section.
 */
export default function About() {
  const { bio, photos, yearsOfExperience, location, currentRole, openToWork, socials, resume } = profile;
  const [lead, ...rest] = bio;
  const shown = rest.slice(0, VISIBLE_PARAGRAPHS);
  const more = rest.slice(VISIBLE_PARAGRAPHS);
  const photo = photos.about;

  // "My profile" → LinkedIn when set, otherwise the résumé PDF
  const linkedin = socials.find((s) => s.id === "linkedin")?.url;
  const profileLink = linkedin
    ? { href: linkedin, label: "My LinkedIn profile", external: true }
    : { href: resume, label: "My résumé", external: true };

  const facts = [
    { label: "Experience", value: `${yearsOfExperience} years` },
    { label: "Location", value: location },
    { label: "Current role", value: currentRole },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="relative isolate">
      {/* ---------------- purple block ---------------- */}
      <div className="surface-dark relative bg-purple pt-16 pb-28 text-white sm:pt-20 lg:pt-24 lg:pb-40">
        <ShapeField shapes={shapes} />

        <Container className="relative z-10">
          <SectionHeading id="about-title" kicker="(who am I)" title="Hello" tone="purple" />

          <div className="mt-12 grid items-start gap-12 lg:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            {/* Photo card — top-aligned with the text so a long bio never leaves an empty gap above it */}
            <Reveal
              direction="left"
              className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:mx-0 lg:max-w-none lg:self-start lg:pt-4"
            >
              <DashedCircle
                size={420}
                className="pointer-events-none absolute -bottom-16 -left-24 hidden h-auto w-[115%] text-lilac/70 lg:block"
              />
              <div className="relative aspect-4/5 overflow-hidden bg-paper">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1024px) 440px, 384px"
                  className={
                    photo.cutout
                      ? "absolute inset-x-0 bottom-0 h-[92%] w-full object-contain object-bottom"
                      : "absolute inset-0 size-full object-cover"
                  }
                />
              </div>
            </Reveal>

            {/* Story + quick facts */}
            <Reveal direction="up" delay={120} className="flex flex-col gap-6 lg:pt-4">
              {lead && <p className="text-lg leading-snug font-semibold sm:text-xl">{lead}</p>}
              {shown.map((paragraph, i) => (
                <p key={i} className="max-w-prose leading-relaxed text-lilac">
                  {paragraph}
                </p>
              ))}
              {more.length > 0 && (
                <ReadMore className="flex flex-col gap-6">
                  {more.map((paragraph, i) => (
                    <p key={i} className="max-w-prose leading-relaxed text-lilac">
                      {paragraph}
                    </p>
                  ))}
                </ReadMore>
              )}

              <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/25 pt-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-label font-semibold tracking-label text-lilac uppercase">{fact.label}</dt>
                    <dd className="mt-1.5 font-semibold">{fact.value}</dd>
                  </div>
                ))}
                <div>
                  <dt className="text-label font-semibold tracking-label text-lilac uppercase">Status</dt>
                  <dd className="mt-1.5 flex items-center gap-2 font-semibold">
                    {openToWork ? (
                      <>
                        <span aria-hidden="true" className="relative flex size-2.5">
                          <span className="absolute inline-flex size-full rounded-full bg-mint opacity-75 motion-safe:animate-ping" />
                          <span className="relative inline-flex size-2.5 rounded-full bg-mint" />
                        </span>
                        Open to work
                      </>
                    ) : (
                      "Not looking right now"
                    )}
                  </dd>
                </div>
              </dl>

              <div>
                <Button
                  variant="link-white"
                  href={profileLink.href}
                  external={profileLink.external}
                  aria-label={`${profileLink.label} (opens in a new tab)`}
                >
                  {profileLink.label}
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>

        <SlantedEdge position="bottom" direction="up" colorClass="bg-bg" />
      </div>

      {/* room for the hanging photo card (large screens) */}
      <div aria-hidden="true" className="hidden h-24 bg-bg lg:block" />
    </section>
  );
}
