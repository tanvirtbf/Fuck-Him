// Generates public/og-image.png (1200x630) — the link-preview image shown when
// the site is shared (Facebook, LinkedIn, X, WhatsApp…).
// Runs automatically before every `npm run build` (see "prebuild" in
// package.json), so it always matches the name/headline in src/data/profile.js.
// Run it by hand with `npm run og`.
//
// Uses next/og (works the same locally and on Vercel). Montserrat is fetched
// from Google Fonts; without network it falls back to the built-in font.
// It NEVER breaks the build: any failure (old Node, no network, …) only logs a
// warning and the committed public/og-image.png is kept.

const CYAN = "#9CC8FF";
const PURPLE = "#1F4FD6";
const NAVY = "#0A1430";
const MINT = "#4CC3FF";
const PINK = "#2F6BFF";
const OLIVE = "#7C8799";

// Google serves TTF (which next/og can read) to this old user agent. `text=`
// asks for one small font file with exactly the glyphs we draw.
async function loadMontserrat(weight, glyphs) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=Montserrat:wght@${weight}&text=${encodeURIComponent(glyphs)}`;
  const css = await fetch(cssUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.30 (KHTML, like Gecko) Safari/534.30" },
    signal: AbortSignal.timeout(8000),
  }).then((r) => r.text());
  const url = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
  if (!url) throw new Error("font url not found");
  const data = await fetch(url, { signal: AbortSignal.timeout(8000) }).then((r) => r.arrayBuffer());
  return { name: "Montserrat", data, weight, style: "normal" };
}

async function main() {
  // Imports are inside try/catch on purpose (see the header comment).
  const { writeFile } = await import("node:fs/promises");
  const { createElement: h } = await import("react");
  const { ImageResponse } = await import("next/og.js"); // ESM needs the explicit .js
  const { profile } = await import("../src/data/profile.js");

  const abs = (style) => ({ position: "absolute", ...style });
  const image = h(
    "div",
    { style: { width: "100%", height: "100%", display: "flex", flexDirection: "column", position: "relative", fontFamily: "Montserrat" } },
    // cyan band with the stacked name (like the Hero)
    h(
      "div",
      { style: { height: 400, background: CYAN, color: NAVY, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" } },
      h("div", { style: { fontSize: 40, letterSpacing: 18, fontWeight: 300, textTransform: "uppercase" } }, profile.name.first),
      h("div", { style: { fontSize: 120, fontWeight: 800, lineHeight: 1, marginTop: 8, textTransform: "uppercase" } }, profile.name.last),
    ),
    // purple band with the headline
    h(
      "div",
      {
        style: {
          flex: 1, background: PURPLE, color: "white", display: "flex", alignItems: "center",
          justifyContent: "center", padding: "0 80px", fontSize: 32, fontWeight: 800, textAlign: "center",
        },
      },
      profile.headline,
    ),
    // Memphis shapes
    h("div", { style: abs({ left: 70, top: 300, width: 80, height: 80, borderRadius: 80, border: `14px solid ${MINT}` }) }),
    h("div", { style: abs({ right: 90, top: 70, width: 56, height: 56, borderRadius: 56, border: `11px solid ${PINK}` }) }),
    h("div", { style: abs({ left: 110, top: 80, width: 70, height: 10, background: PURPLE, transform: "rotate(-30deg)" }) }),
    h("div", { style: abs({ right: 120, top: 330, width: 60, height: 10, background: OLIVE, transform: "rotate(40deg)" }) }),
    h("div", { style: abs({ right: 70, bottom: 60, width: 22, height: 22, borderRadius: 22, background: MINT }) }),
  );

  const glyphs = [
    ...new Set(
      [profile.name.first, profile.name.last, profile.headline].join("") +
        [profile.name.first, profile.name.last].join("").toUpperCase(),
    ),
  ].join("");

  let fonts = [];
  try {
    fonts = await Promise.all([loadMontserrat(300, glyphs), loadMontserrat(800, glyphs)]);
  } catch (e) {
    console.warn(`og-image: Montserrat unavailable (${e.message}); using the built-in font`);
  }

  const res = new ImageResponse(image, { width: 1200, height: 630, ...(fonts.length ? { fonts } : {}) });
  const png = Buffer.from(await res.arrayBuffer());
  await writeFile(new URL("../public/og-image.png", import.meta.url), png);
  console.log(`og-image.png written (${(png.length / 1024).toFixed(1)} KB${fonts.length ? ", Montserrat" : ""})`);
}

main().catch((e) => {
  console.warn(`og-image: generation skipped (${e.message}); keeping the existing public/og-image.png`);
});
