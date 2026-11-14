// TEMPORARY design-system preview (Phase 1). Deleted in Phase 11.
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import SlantedEdge from "@/components/ui/SlantedEdge";
import {
  Ring,
  Triangle,
  Dash,
  Squiggle,
  Dot,
  DashedCircle,
  DotGrid,
  Wireframe,
  ShapeField,
} from "@/components/ui/shapes";

export const metadata = {
  title: "Styleguide (temporary)",
  robots: { index: false, follow: false },
};

const brand = [
  { name: "cyan", hex: "#4FD5EE", cls: "bg-cyan", note: "sampled" },
  { name: "purple", hex: "#6F43D6", cls: "bg-purple", note: "sampled · primary" },
  { name: "indigo", hex: "#433A8B", cls: "bg-indigo", note: "sampled" },
  { name: "mint", hex: "#1BE6B7", cls: "bg-mint", note: "sampled · AI / active" },
  { name: "navy", hex: "#032972", cls: "bg-navy", note: "sampled" },
  { name: "pink", hex: "#FF5C8D", cls: "bg-pink", note: "estimated · shapes only" },
  { name: "olive", hex: "#C9C86A", cls: "bg-olive", note: "estimated · squiggles" },
  { name: "paper", hex: "#F8F8F6", cls: "bg-paper", note: "sampled" },
  { name: "ink", hex: "#111111", cls: "bg-ink", note: "text" },
];

const surfaces = [
  ["bg", "bg-bg"],
  ["surface", "bg-surface"],
  ["tile", "bg-tile"],
  ["line", "bg-line"],
  ["accent", "bg-accent"],
];

const textTokens = [
  ["text-fg", "Primary text"],
  ["text-muted", "Muted text"],
  ["text-accent-text", "Accent text / links"],
  ["text-pink-text", "Pink text (AA-safe)"],
  ["text-mint-text", "Mint text (AA-safe)"],
];

const heroShapes = [
  { type: "ring", x: "6%", y: "58%", size: 54, color: "text-cyan", delay: 0.5 },
  { type: "triangle", x: "3%", y: "50%", size: 92, rotate: -12, color: "text-olive", slow: true },
  { type: "dash", x: "18%", y: "22%", size: 30, rotate: 10, color: "text-purple", delay: 1, hideOnMobile: true },
  { type: "dash", right: "16%", y: "30%", size: 26, rotate: 60, color: "text-olive", delay: 2, hideOnMobile: true },
  { type: "squiggle", right: "12%", y: "10%", size: 54, rotate: 20, color: "text-mint", hideOnMobile: true },
  { type: "ring", right: "6%", y: "72%", size: 30, color: "text-cyan", delay: 1.5 },
  { type: "dash", right: "22%", y: "82%", size: 28, rotate: 30, color: "text-mint", hideOnMobile: true },
];

function Label({ children }) {
  return <p className="mb-4 text-label font-semibold uppercase tracking-label text-muted">{children}</p>;
}

function Block({ title, children }) {
  return (
    <section className="border-t border-line py-12">
      <Container>
        <h2 className="mb-8 text-label font-bold uppercase tracking-label text-accent-text">{title}</h2>
        {children}
      </Container>
    </section>
  );
}

// Everything that changes between light and dark mode
function ThemeSpecimens() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Label>Surfaces</Label>
        <div className="grid grid-cols-5 gap-2">
          {surfaces.map(([name, cls]) => (
            <div key={name}>
              <div className={`h-12 border border-line ${cls}`} />
              <p className="mt-1 text-xs text-muted">{name}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Text colours</Label>
        <ul className="flex flex-col gap-1 text-sm font-medium">
          {textTokens.map(([cls, text]) => (
            <li key={cls} className={cls}>
              {text} <span className="font-normal opacity-70">· {cls}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Label>Typography</Label>
        <p className="font-serif text-xl italic text-muted">Hello! I&apos;m</p>
        <p className="text-5xl font-extrabold uppercase leading-none sm:text-6xl">Your Name</p>
        <p className="mt-4 text-2xl font-bold uppercase">Section title</p>
        <p className="mt-3 max-w-prose text-base leading-relaxed text-muted">
          Body text — Montserrat 400 at 16px with relaxed line height. Kickers use Playfair
          Display italic; headings use Montserrat ExtraBold in uppercase.
        </p>
        <p className="mt-3 text-label font-semibold uppercase tracking-label">Label · nav · filter tab</p>
      </div>

      <div>
        <Label>Buttons</Label>
        <div className="flex flex-wrap items-center gap-4">
          <Button href="#">
            View my work <ArrowRight size={16} aria-hidden="true" />
          </Button>
          <Button variant="outline" href="#">
            <Download size={16} aria-hidden="true" /> Download resume
          </Button>
          <Button variant="link" href="#">
            My profile
          </Button>
        </div>
      </div>

      <div>
        <Label>Badges</Label>
        <div className="flex flex-wrap gap-2">
          <Badge>Next.js</Badge>
          <Badge variant="outline">Node.js</Badge>
          <Badge variant="mint" icon={<Sparkles size={14} aria-hidden="true" />}>
            AI
          </Badge>
        </div>
      </div>

      <div>
        <Label>Cards</Label>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card accent="cyan">
            <p className="font-bold uppercase">Surface</p>
            <p className="mt-2 text-sm text-muted">With accent bar</p>
          </Card>
          <Card variant="tile">
            <p className="font-bold uppercase">Tile</p>
            <p className="mt-2 text-sm text-muted">Project tile grey</p>
          </Card>
          <div className="bg-mint p-6 text-ink sm:p-8">
            <p className="font-bold uppercase">AI tile</p>
            <p className="mt-2 text-sm">Mint highlight</p>
          </div>
        </div>
      </div>

      <div>
        <Label>Section heading</Label>
        <SectionHeading kicker="(selected work)" title="Projects" />
      </div>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <main>
      <header className="py-12">
        <Container>
          <p className="text-label font-semibold uppercase tracking-label text-accent-text">
            Phase 1 · temporary page
          </p>
          <h1 className="mt-2 text-title font-extrabold uppercase">Styleguide</h1>
          <p className="mt-3 max-w-prose text-muted">
            Design tokens, type, components and shapes taken from demo.png. Compare this page
            side by side with the demo. It will be deleted in Phase 11.{" "}
            <Link href="/" className="font-semibold text-accent-text underline underline-offset-4">
              Back home
            </Link>
          </p>
        </Container>
      </header>

      {/* ---------------------------------------------------------------- */}
      <Block title="1 · Brand palette (same in both themes)">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {brand.map((c) => (
            <div key={c.name}>
              <div className={`h-20 border border-line ${c.cls}`} />
              <p className="mt-2 text-sm font-bold uppercase">{c.name}</p>
              <p className="text-xs text-muted">
                {c.hex} · {c.note}
              </p>
            </div>
          ))}
        </div>
      </Block>

      {/* ---------------------------------------------------------------- */}
      <Block title="2 · Light vs dark">
        <div className="grid gap-6 lg:grid-cols-2">
          {["light", "dark"].map((theme) => (
            <div key={theme} data-theme={theme} className="border border-line bg-bg p-6 text-fg sm:p-8">
              <p className="mb-8 text-label font-bold uppercase tracking-label text-accent-text">
                {theme} theme
              </p>
              <ThemeSpecimens />
            </div>
          ))}
        </div>
      </Block>

      {/* ---------------------------------------------------------------- */}
      <Block title="3 · Hero study (demo panel 1)">
        <div className="relative isolate overflow-hidden">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[58%] bg-cyan" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[42%] bg-purple" />
          <ShapeField shapes={heroShapes} />

          <div className="relative flex flex-col items-center px-4 pt-12 text-center sm:pt-16">
            <p className="text-xl font-light uppercase tracking-[0.35em] text-navy sm:text-3xl">Your</p>
            <p className="text-display font-extrabold uppercase text-navy">Name</p>
            <p className="mt-3 text-sm font-medium text-navy">
              Full-Stack Developer · Building AI-powered apps with JavaScript
            </p>
            <div className="relative mt-8 w-52 sm:w-64">
              <Image
                src="/images/profile-placeholder.svg"
                alt="Placeholder portrait"
                width={800}
                height={1000}
                className="h-auto w-full"
              />
              <Wireframe
                className="absolute left-1/2 top-[55%] h-auto w-[120%] -translate-x-1/2 -translate-y-1/2 text-ink"
                strokeWidth={6}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="bg-cyan p-6">
            <p className="text-3xl font-extrabold uppercase text-white">Name</p>
            <p className="mt-2 text-sm font-semibold text-white">
              Demo: white on cyan → contrast 1.74 ✗ (fails WCAG)
            </p>
          </div>
          <div className="bg-cyan p-6">
            <p className="text-3xl font-extrabold uppercase text-navy">Name</p>
            <p className="mt-2 text-sm font-semibold text-navy">Ours: navy on cyan → contrast 7.73 ✓</p>
          </div>
        </div>
      </Block>

      {/* ---------------------------------------------------------------- */}
      <Block title="4 · Headings & buttons on colour blocks">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="surface-dark flex flex-col items-center gap-6 bg-purple px-4 py-10">
            <SectionHeading kicker="(who am I)" title="Hello" tone="purple" />
            <Button variant="inverse" href="#">
              My profile
            </Button>
            <Badge variant="onColor">Open to work</Badge>
          </div>
          <div className="surface-dark flex flex-col items-center gap-6 bg-indigo px-4 py-10">
            <SectionHeading kicker="(my journey)" title="Journey" tone="indigo" />
            <Button variant="inverse" href="#">
              Read more
            </Button>
          </div>
          <div className="surface-bright flex flex-col items-center gap-6 bg-cyan px-4 py-10">
            <SectionHeading kicker="(hello)" title="Vision" tone="cyan" />
            <Button href="#">Contact me</Button>
          </div>
        </div>
      </Block>

      {/* ---------------------------------------------------------------- */}
      <Block title="5 · Shapes">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            ["Ring", <Ring key="r" className="text-cyan" />],
            ["Triangle", <Triangle key="t" className="text-pink" />],
            ["Dash", <Dash key="d" className="text-purple" />],
            ["Squiggle", <Squiggle key="s" className="text-olive" />],
            ["Dot", <Dot key="o" className="text-mint" />],
            ["Dashed circle", <DashedCircle key="c" size={90} className="text-muted" />],
            ["Dot grid", <DotGrid key="g" width={90} height={90} className="text-fg/30" />],
            ["Wireframe", <Wireframe key="w" size={80} className="text-pink" />],
          ].map(([name, shape]) => (
            <div key={name} className="flex flex-col items-center gap-3 bg-tile p-6">
              <div className="flex h-24 items-center justify-center">{shape}</div>
              <p className="text-label font-semibold uppercase tracking-label text-muted">{name}</p>
            </div>
          ))}
        </div>
      </Block>

      {/* ---------------------------------------------------------------- */}
      <Block title="6 · Name block with dot grid (demo panels 3–6)">
        <div className="relative overflow-hidden bg-surface px-6 py-16 sm:px-12">
          <DotGrid width={260} height={200} className="absolute right-[12%] top-6 text-fg/15" />
          <DashedCircle size={260} className="absolute -bottom-24 -left-16 text-muted/60" />
          <ShapeField
            shapes={[
              { type: "dash", x: "42%", y: "12%", size: 24, rotate: -40, color: "text-pink" },
              { type: "dash", right: "8%", y: "55%", size: 34, rotate: 30, color: "text-navy", hideOnMobile: true },
              { type: "squiggle", x: "48%", bottom: "14%", size: 40, rotate: 15, color: "text-olive" },
            ]}
          />
          <div className="relative">
            <SectionHeading align="left" kicker="Hello! I'm" title="Your Name" as="p" />
          </div>
        </div>
      </Block>

      {/* ---------------------------------------------------------------- */}
      <Block title="7 · Slanted edge (demo panel 2)">
        <div className="surface-dark relative flex h-64 items-start justify-center bg-indigo pt-12">
          <p className="text-3xl font-extrabold uppercase text-white">Indigo block</p>
          <SlantedEdge position="bottom" direction="up" colorClass="bg-bg" />
        </div>
      </Block>

      {/* ---------------------------------------------------------------- */}
      <Block title="8 · Scroll reveal (scroll slowly)">
        <div className="grid gap-4 sm:grid-cols-3">
          <Reveal direction="left">
            <Card accent="purple">
              <p className="font-bold uppercase">From left</p>
            </Card>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <Card accent="mint">
              <p className="font-bold uppercase">From below</p>
            </Card>
          </Reveal>
          <Reveal direction="right" delay={300}>
            <Card accent="pink">
              <p className="font-bold uppercase">From right</p>
            </Card>
          </Reveal>
        </div>
      </Block>
    </main>
  );
}
