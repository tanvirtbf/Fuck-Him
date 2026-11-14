import "./globals.css";

// Fonts, theme, full metadata/OG tags arrive in Phase 1 and Phase 11.
export const metadata = {
  title: "Portfolio",
  description: "TODO: site description (set in Phase 11).",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
