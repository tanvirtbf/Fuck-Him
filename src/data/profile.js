// =============================================================================
// PROFILE — personal info used across Hero, About, Contact, Footer and SEO.
// Edit the values below; no component code needs to change.
// Empty strings ("") for links mean "not set yet" — the UI will hide them.
// Source: Fahim Mostakin's LinkedIn profile and CV (Nov 2026).
// =============================================================================

export const profile = {
  name: {
    first: "Fahim",
    last: "Mostakin",
  },
  initials: "FM", // shown in the round logo

  // Short job title used in the browser tab / link previews
  jobTitle: "Asset Recovery Specialist",

  // One-line headline under the name in the Hero
  headline: "Asset Recovery Specialist · Investigative Research",

  // Google / link-preview description (about 150 characters)
  seoDescription:
    "Fahim Mostakin — Asset Recovery Specialist with 4+ years in sales, lead generation and business financing (MCA, LOC, SBA). Based in Dhaka, Bangladesh.",

  // 1–2 sentence intro in the Hero
  intro:
    "I help clients understand and navigate the asset recovery process with integrity and transparency, backed by 4+ years in sales, lead generation and business financing.",

  // Quick facts (About section)
  yearsOfExperience: "4+",
  location: "Mirpur, Dhaka, Bangladesh",
  currentRole: "Private Investigator, Full Circle Asset Recovery LLC",
  openToWork: true, // true = shows "Open to work", false = "Not looking right now"

  // About section — 2 to 4 short paragraphs (from the LinkedIn "About")
  bio: [
    "With over four years of experience in sales, telemarketing, appointment setting, and client relationship management, I have worked across a variety of industries, including home improvement, air-duct services, real estate, and business financing.",
    "My professional experience has given me exposure to financial solutions such as Merchant Cash Advances (MCA), Lines of Credit (LOC), SBA Loans, Term Loans, and Fix & Flip financing, allowing me to understand different funding options and communicate them effectively to clients.",
    "I have also led high-performing sales teams, developed expertise in lead generation, cold calling, negotiation, and customer engagement, and consistently focused on delivering value through professionalism and strong communication.",
    "I have recently begun my journey as an Asset Recovery Specialist, where I am expanding my knowledge of surplus funds and asset recovery while helping clients understand and navigate the recovery process with integrity and transparency.",
  ],

  // Photos live in /public/images (WebP, 4:5 portrait crops).
  // cutout: true  → transparent-background photo (floats like in the demo)
  // cutout: false → normal photo with its background (shown as a framed photo)
  photos: {
    // Hero: sits across the cyan/purple split
    hero: {
      src: "/images/hero.webp",
      alt: "Portrait of Fahim Mostakin in a white shirt, black tie and glasses",
      width: 480,
      height: 600,
      cutout: false,
    },
    // About: shown inside the light-grey card
    about: {
      src: "/images/about.webp",
      alt: "Portrait of Fahim Mostakin smiling outdoors in a white shirt and black tie",
      width: 480,
      height: 600,
      cutout: false,
    },
  },

  // Social / contact links (Hero, Contact, Footer)
  // `display` (optional) = the text shown in the Contact list instead of the URL
  email: "islamasiful796@gmail.com",
  socials: [
    { id: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/fahimmostakin969/" },
    { id: "whatsapp", label: "WhatsApp", url: "https://wa.me/8801641269068", display: "+8801641269068" },
    { id: "github", label: "GitHub", url: "" },
  ],

  // Résumé PDF in /public
  resume: "/resume.pdf",

  // Contact section invitation line
  contactIntro: "Have a case, a project or an opportunity? Let's talk.",
};
