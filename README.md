# Portfolio

Personal portfolio website: a **fully static** Next.js site (no backend, no database), hosted on the Vercel free plan.

> This README is a stub from Phase 0. The full guide (Formspree setup, Vercel deploy, content editing) is written in Phase 11. See `PLAN.md` for the build plan.

## Tech

- Next.js 16 (App Router) with static export (`output: 'export'`)
- React 19, JavaScript (JSX)
- Tailwind CSS v4

## Requirements

- Node.js **20.9 or newer**
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build (static export)

```bash
npm run build
```

The static site is written to `out/`. To preview it locally:

```bash
npx serve out
```

## Edit content

All text, links and lists live in `src/data/`:

| File | What it holds |
|---|---|
| `profile.js` | name, headline, intro, bio, photos, socials, resume path |
| `navigation.js` | header menu links |
| `skills.js` | skill groups |
| `projects.js` | project cards |
| `experience.js` | jobs, education, certifications, achievements |
| `vision.js` | mission, goals, current focus |

Anything marked `TODO` is a placeholder. Find them all with:

```bash
grep -rn "TODO" src/data
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values.
