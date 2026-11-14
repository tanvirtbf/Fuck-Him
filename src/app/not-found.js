import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ShapeField } from "@/components/ui/shapes";

export const metadata = {
  title: "Page not found",
};

const shapes = [
  { type: "ring", x: "8%", y: "16%", size: 46, color: "text-purple" },
  { type: "dash", right: "10%", y: "20%", size: 30, rotate: 30, color: "text-purple", delay: 1 },
  { type: "triangle", x: "6%", bottom: "14%", size: 80, rotate: -12, color: "text-olive", slow: true, hideOnMobile: true },
  { type: "squiggle", right: "8%", bottom: "18%", size: 46, rotate: 10, color: "text-mint", delay: 2 },
];

// 404 — same cyan / purple split as the Hero (demo panel 1).
export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="relative isolate flex min-h-svh flex-col overflow-hidden outline-none">
      <ShapeField shapes={shapes} />

      <div className="surface-bright flex flex-1 flex-col items-center justify-end bg-cyan px-4 pt-24 pb-8 text-center text-navy">
        <p className="relative z-10 font-serif text-xl italic">Oops! Error</p>
        <p
          aria-hidden="true"
          className="relative z-10 text-[clamp(6rem,24vw,14rem)] leading-[0.85] font-extrabold tracking-tight"
        >
          404
        </p>
      </div>

      <div className="surface-dark flex flex-1 flex-col items-center bg-purple px-4 pt-8 pb-16 text-center text-white">
        <h1 className="relative z-10 text-title font-extrabold uppercase">Page not found</h1>
        <p className="relative z-10 mt-4 max-w-md text-lg text-lilac">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="relative z-10 mt-8 inline-flex min-h-12 items-center gap-2 bg-white px-7 text-label font-semibold tracking-label text-ink uppercase transition-colors hover:bg-mint"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Back to home
        </Link>
      </div>
    </main>
  );
}
