import { Montserrat, Playfair_Display } from "next/font/google";

// Headings + body: geometric sans, closest Google match to the demo's
// bold uppercase type. Variable font, so every weight 100–900 is available.
export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

// Small italic serif "kickers" ("Hello! I'm", "Do you have a").
// Only the italic style is used, so only that is downloaded.
export const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-playfair",
  display: "swap",
});
