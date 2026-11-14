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

  // Photos live in /public/images. Use WebP for real photos.
  photos: {
    // Hero: waist-up portrait with a TRANSPARENT background (cut-out)
    hero: {
      src: "/images/profile-placeholder.svg", // TODO: /images/hero.webp
      alt: "TODO: describe the photo, e.g. Portrait of <your name>",
      width: 800,
      height: 1000,
    },
    // About: can be the same photo or a different one
    about: {
      src: "/images/profile-placeholder.svg", // TODO: /images/about.webp
      alt: "TODO: describe the photo",
      width: 800,
      height: 1000,
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
