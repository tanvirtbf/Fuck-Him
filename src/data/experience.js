// =============================================================================
// EXPERIENCE & JOURNEY — shown as a vertical timeline, NEWEST FIRST.
// Keep `jobs` ordered newest → oldest.
// `end: ""` means "Present".
// Empty arrays are hidden automatically (e.g. no achievements → no block).
// =============================================================================

export const jobs = [
  {
    id: "todo-job-1",
    role: "TODO: Role",
    company: "TODO: Company",
    start: "TODO: Mon YYYY",
    end: "", // "" = Present
    achievements: [
      "TODO: achievement 1",
      "TODO: achievement 2",
    ],
  },
  {
    id: "todo-job-2",
    role: "TODO: Previous role",
    company: "TODO: Company",
    start: "TODO: Mon YYYY",
    end: "TODO: Mon YYYY",
    achievements: [
      "TODO: achievement 1",
      "TODO: achievement 2",
    ],
  },
];

export const education = [
  {
    id: "todo-education-1",
    degree: "TODO: Degree / Program",
    institution: "TODO: Institution",
    start: "TODO: YYYY",
    end: "TODO: YYYY",
  },
];

// url: link to the credential ("" = no link)
export const certifications = [
  {
    id: "todo-cert-1",
    name: "TODO: Certificate name (delete this entry if you have none)",
    issuer: "TODO: Issuer",
    year: "TODO: YYYY",
    url: "",
  },
];

// Optional — the block is hidden while this list is empty
export const achievements = [
  // { id: "award-1", title: "Award / achievement", year: "YYYY", description: "" },
];
