import "./globals.css";
import { montserrat, playfair } from "./fonts";
import { themeInitScript } from "@/lib/theme";

// Full metadata / Open Graph tags are added in Phase 11.
export const metadata = {
  title: "Portfolio",
  description: "TODO: site description (set in Phase 11).",
};

export default function RootLayout({ children }) {
  return (
    // data-theme is corrected by the inline script before paint, so the
    // server-rendered "light" may differ from the DOM → suppressHydrationWarning.
    <html
      lang="en"
      data-theme="light"
      className={`${montserrat.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Without JavaScript, scroll-reveal content must still be visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {/* First focusable element: lets keyboard users jump past the header */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:px-5 focus:py-3 focus:text-label focus:font-semibold focus:tracking-label focus:text-white focus:uppercase"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
