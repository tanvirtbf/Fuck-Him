import "./globals.css";
import { montserrat, playfair } from "./fonts";
import { themeInitScript } from "@/lib/theme";
import { profile } from "@/data/profile";
import { siteUrl, siteTitle, fullName } from "@/lib/site";

// SEO + link previews. public/og-image.png is regenerated from profile.js on
// every build (scripts/generate-og-image.mjs); favicons are app/icon.svg and
// app/apple-icon.png.
const ogImage = { url: "/og-image.png", width: 1200, height: 630, alt: `${fullName} — portfolio` };

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s | ${fullName}` },
  description: profile.seoDescription,
  applicationName: fullName,
  authors: [{ name: fullName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: fullName,
    title: siteTitle,
    description: profile.seoDescription,
    locale: "en_US",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: profile.seoDescription,
    images: [ogImage],
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f8f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0d24" },
  ],
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
