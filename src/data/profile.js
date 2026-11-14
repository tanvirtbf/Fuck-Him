// =============================================================================
// PROFILE — personal info used across Hero, About, Contact, Footer and SEO.
// Edit the values below; no component code needs to change.
// Anything marked TODO is a placeholder and must be replaced with real content.
// Empty strings ("") for links mean "not set yet" — the UI will hide them.
// =============================================================================

export const profile = {
  name: {
    first: "TODO-First",
    last: "TODO-Last",
  },
  initials: "TD", // TODO: your initials (shown in the round logo)

  // One-line headline under the name in the Hero
  headline: "Full-Stack Developer · Building AI-powered apps with JavaScript",

  // 1–2 sentence intro in the Hero
  intro:
    "TODO: add a short 1–2 sentence intro about what you build and for whom.",

  // Quick facts (About section)
  yearsOfExperience: "3+",
  location: "TODO: City, Country",
  currentRole: "TODO: current role / company",
  openToWork: true, // TODO: confirm (true = open to work, false = not)

  // About section — 2 to 4 short paragraphs, human tone (not a résumé)
  bio: [
    "TODO: paragraph 1 — how you got into development.",
    "TODO: paragraph 2 — what you enjoy building today (full-stack + AI).",
    "TODO: paragraph 3 — how you like to work / what you care about.",
  ],

  // Photos live in /public/images (WebP, 4:5 portrait crops).
  // cutout: true  → transparent-background photo (floats like in the demo)
  // cutout: false → normal photo with its background (shown as a framed photo)
  // Source: image.png in the project root, cropped by Claude (Phase 5).
  // For the exact demo look, give a background-removed PNG and set cutout: true.
  photos: {
    // Hero: sits across the cyan/purple split
    hero: {
      src: "/images/hero.webp",
      alt: "Portrait in a black cap, sunglasses and a white T-shirt", // TODO: add your name, e.g. "Portrait of <name>, …"
      width: 340,
      height: 425,
      cutout: false,
    },
    // About: shown inside the light-grey card
    about: {
      src: "/images/about.webp",
      alt: "Portrait outdoors under a cloudy sky, wearing a black cap, sunglasses and a white T-shirt", // TODO: add your name
      width: 440,
      height: 550,
      cutout: false,
    },
  },

  // Social / contact links (Hero, Contact, Footer)
  email: "", // TODO: you@yourdomain.com
  socials: [
    { id: "github", label: "GitHub", url: "" }, // TODO: https://github.com/<username>
    { id: "linkedin", label: "LinkedIn", url: "" }, // TODO: https://www.linkedin.com/in/<username>
  ],

  // Résumé PDF in /public
  resume: "/resume.pdf",
};
