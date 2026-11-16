import { profile } from "@/data/profile";

/**
 * Absolute site URL (used by metadata, sitemap, robots and the OG image).
 * 1. NEXT_PUBLIC_SITE_URL if you set it (e.g. your custom domain)
 * 2. otherwise Vercel's production URL, which Vercel provides at build time
 * 3. otherwise localhost (local builds)
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export const fullName = `${profile.name.first} ${profile.name.last}`;
export const siteTitle = `${fullName} — ${profile.jobTitle}`;
