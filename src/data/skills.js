// =============================================================================
// SKILLS — grouped by category. No percentages or ratings, just names.
// `icon` is a key from src/lib/skillIcons.js ("" = no icon).
//
// Order = order on the page. The layout is chosen by group id
// (see LAYOUT in src/components/sections/Skills.js):
//   ai        → tall mint tile (first)
//   frontend  → wide tile
//   backend, database → normal tiles
//   tools     → full-width tile (last)
// The ids are only layout slots; the titles below are what visitors see.
// Source: Fahim Mostakin's LinkedIn profile and CV (Nov 2026).
// =============================================================================

export const skillGroups = [
  {
    id: "ai",
    title: "Top Skills",
    skills: [
      { name: "Customer Service", icon: "" },
      { name: "Teamwork", icon: "" },
      { name: "New Business Development", icon: "" },
      { name: "Financial Analysis", icon: "" },
      { name: "Leadership", icon: "" },
    ],
  },
  {
    id: "frontend",
    title: "Sales & Outreach",
    skills: [
      { name: "Sales", icon: "" },
      { name: "Negotiation", icon: "" },
      { name: "Objection Handling", icon: "" },
      { name: "Lead Generation", icon: "" },
      { name: "Cold Calling", icon: "" },
      { name: "Appointment Setting", icon: "" },
    ],
  },
  {
    id: "backend",
    title: "Leadership & Research",
    skills: [
      { name: "Team Leader", icon: "" },
      { name: "Call Center Development", icon: "" },
      { name: "Data Analysis", icon: "" },
      { name: "Search Engine Optimization (SEO)", icon: "" },
    ],
  },
  {
    id: "database",
    title: "Funding Products",
    skills: [
      { name: "Merchant Cash Advances (MCA)", icon: "" },
      { name: "Lines of Credit (LOC)", icon: "" },
      { name: "SBA Loans", icon: "" },
      { name: "Term Loans", icon: "" },
      { name: "Fix & Flip Financing", icon: "" },
    ],
  },
  {
    id: "tools",
    title: "Services",
    skills: [
      { name: "Asset Recovery", icon: "" },
      { name: "Researcher", icon: "" },
      { name: "Virtual Assistant", icon: "" },
      { name: "Closer", icon: "" },
      { name: "Financial Advisory", icon: "" },
      { name: "Appointment Scheduling", icon: "" },
      { name: "Online Research", icon: "" },
      { name: "Public Relations", icon: "" },
      { name: "Executive Services", icon: "" },
      { name: "Virtual Administrative Support", icon: "" },
      { name: "Pharmacy Management", icon: "" },
    ],
  },
];
