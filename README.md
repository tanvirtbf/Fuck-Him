# Portfolio

Personal portfolio website — a **fully static** Next.js site (no backend, no database, no API routes), designed after `demo.png` and hosted for free on Vercel.

- **Sections:** Home · About · Skills · Projects · Experience & Journey · Vision · Contact
- **Design:** Memphis-style colour blocks, floating shapes, bold uppercase type; light & dark mode
- **Stack:** Next.js 16 (App Router, `output: 'export'`) · React 19 · JavaScript · Tailwind CSS v4 · lucide-react / react-icons · Formspree (contact form)

---

## 1. Run locally

Requirements: **Node.js 22 or newer**, npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Edits to files in `src/` show up instantly.

## 2. Build and check the static output

```bash
npm run build
```

- Runs `prebuild` first, which regenerates the link-preview image `public/og-image.png` from your profile data.
- Writes the finished static site to **`out/`** (plain HTML/CSS/JS — no server needed).

To preview the exact files that will be deployed:

```bash
npx serve out
```

Then open the URL it prints. Check the page, the theme toggle, the menu on a narrow window, and that `/resume.pdf` downloads.

## 3. Edit your content

**All text, links and lists live in `src/data/`** — no component code needs to change.

| File | What it holds |
|---|---|
| `profile.js` | name, initials, headline, intro, SEO description, bio, quick facts, photos, email, social links, résumé path, contact line |
| `navigation.js` | header menu links (order = page order) |
| `skills.js` | skill groups and icons (icon keys are listed in `src/lib/skillIcons.js`) |
| `projects.js` | project cards, filter categories, desktop tile sizes |
| `experience.js` | jobs (newest first), education, certifications, achievements |
| `vision.js` | mission (wrap key words in `**double stars**` to highlight them), goals, current focus |

Anything marked `TODO` is a placeholder. Find them all:

```bash
grep -rn "TODO" src/data
```

**Files in `public/`:**

| File | Replace with |
|---|---|
| `public/resume.pdf` | your real résumé (keep the same name) |
| `public/images/hero.webp`, `about.webp` | your photos (4:5 portrait, WebP). A transparent cut-out photo + `cutout: true` in `profile.js` gives the exact demo look |
| `public/projects/*` | project screenshots (4:3, WebP); point `image` in `projects.js` at them |
| `public/og-image.png` | generated automatically — don't edit by hand (`npm run og` regenerates it) |

Empty links (`""`) are hidden automatically, so unfinished items never show as dead links.

## 4. Contact form (Formspree, free)

1. Create a free account at [formspree.io](https://formspree.io) and click **New Form**.
2. Copy the form ID — the part after `https://formspree.io/f/` (e.g. `xyzabcd`).
3. Create a file named `.env.local` in the project root:

   ```bash
   NEXT_PUBLIC_FORMSPREE_ID=xyzabcd
   ```

4. Restart `npm run dev`. The form appears in the Contact section (without an ID a friendly "coming soon" box is shown instead).

> `NEXT_PUBLIC_*` values are baked in **at build time**. After changing one on Vercel, redeploy.
> The free Formspree plan has a monthly submission limit — check their pricing page.

## 5. Deploy to Vercel (free)

1. Push the project to a GitHub repository.
2. On [vercel.com](https://vercel.com): **Add New… → Project** → import the repository. Vercel detects Next.js automatically; keep the default settings.
3. **Settings → Environment Variables:** add `NEXT_PUBLIC_FORMSPREE_ID` (and optionally `NEXT_PUBLIC_SITE_URL`, see below).
4. Deploy. The site goes live at `your-project.vercel.app`.

Every push to the `main` branch redeploys automatically.

**Site URL:** sitemap, robots.txt and link previews need the public URL. On Vercel it is detected automatically (`VERCEL_PROJECT_PRODUCTION_URL`). If you connect a custom domain, set `NEXT_PUBLIC_SITE_URL=https://your-domain.com` and redeploy.

**Custom domain:** Vercel → your project → **Settings → Domains** → add the domain and follow the DNS instructions.

## 6. Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_FORMSPREE_ID` | for the contact form | Formspree form ID |
| `NEXT_PUBLIC_SITE_URL` | optional | public URL, e.g. a custom domain (no trailing slash) |

See `.env.example`. Never commit `.env.local`.

## 7. Project structure

```
public/            static files: images, project screenshots, resume.pdf, og-image.png
scripts/           generate-og-image.mjs (runs before every build)
src/app/           layout (fonts, theme, SEO), page, 404, icons, sitemap, robots, global CSS
src/components/
  layout/          Navbar, MobileMenu, ThemeToggle, Logo, Footer, scroll-spy hook
  sections/        Hero, About, Skills, Projects (+ cards/gallery), Experience, Vision, Contact (+ form)
  ui/              Button, Badge, Card, Container, SectionHeading, Reveal, SlantedEdge, SocialLinks, shapes
src/data/          ← all editable content
src/lib/           helpers: theme, site URL, social links, skill icons, cn()
```

## 8. Quality notes

- Static export only: no API routes, server actions or database.
- Light/dark mode follows the system and remembers the visitor's choice (no flash on load).
- Keyboard accessible (skip link, focus rings, accessible mobile menu), WCAG AA contrast in both themes, `prefers-reduced-motion` respected.
- Lighthouse (production-like build, mobile and desktop): Performance 99, Accessibility 100, Best Practices 100, SEO 100.
