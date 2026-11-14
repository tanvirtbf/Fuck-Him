# Portfolio Website — Phase-wise Build Plan

> Source: `requirements.txt` (কী বানাতে হবে) + `demo.png` (UI কেমন হবে)
> Plan তৈরির তারিখ: 2026-11-15
> কাজের নিয়ম: **একবারে একটা Phase।** প্রতি Phase শেষে আমি থামব, তুমি দেখে "OK / change" বলবে, তারপর পরের Phase।

---

## 0. Status Tracker

- [x] Phase 0 — Project Setup (Next.js scaffold, static export, folder structure) — ✅ 2026-11-15
- [x] Phase 1 — Design System (colors, fonts, shapes, UI primitives) — ✅ 2026-11-15
- [x] Phase 2 — Layout Shell (Navbar, Footer, Theme toggle, scroll-spy) — ✅ 2026-11-15
- [x] Phase 3 — Home / Hero — ✅ 2026-11-15
- [x] Phase 4 — About — ✅ 2026-11-15
- [x] Phase 5 — Skills — ✅ 2026-11-15
- [ ] Phase 6 — Projects
- [ ] Phase 7 — Experience & Journey
- [ ] Phase 8 — Vision
- [ ] Phase 9 — Contact (Formspree)
- [ ] Phase 10 — Integration & Polish (dark mode, responsive, animation)
- [ ] Phase 11 — SEO, Performance, Accessibility, README
- [ ] Phase 12 — Deploy (Vercel) & Final Acceptance

Optional (পরে, Phase 12 এর পর): Testimonials · Case study pages · Blog · Featured In

প্রতি Phase শুরু করতে শুধু লিখবে: **"Phase N শুরু করো"**

---

## 1. Tech Baseline (npm থেকে 2026-11-15 তারিখে verify করা)

| Item | Version / Choice | Note |
|---|---|---|
| **Next.js** | **16.4.6** (`latest` dist-tag) | App Router, `output: 'export'` |
| React / React DOM | 19.3.1 | Next 16 এর সাথে আসবে |
| Tailwind CSS | 4.3.5 (`@tailwindcss/postcss`) | v4 = CSS-first config (নিচে Decision #3) |
| Node.js | তোমার মেশিনে v22.14.0 ✔ | Next 16 এর জন্য লাগে `>=20.9.0` |
| npm | 10.9.2 ✔ | |
| Icons | `lucide-react` 1.73.0, brand logo এর জন্য `react-icons` 5.7.0 | |
| Language | JavaScript (JSX), TypeScript না | requirements অনুযায়ী |

Phase 0 তে `create-next-app@latest` চালানোর পর আসল installed version আবার confirm করব। Next 16 এ কিছু default বদলেছে (যেমন Turbopack এখন default, `next lint` command নেই, তাই lint হবে সরাসরি ESLint CLI দিয়ে)। সেগুলো scaffold এর output দেখে মিলিয়ে নেব।

---

## 2. UI Blueprint — `demo.png` থেকে (Design DNA)

demo.png তে ৬টা screen আছে: একই "John Smith" portfolio এর ভিন্ন ভিন্ন layout variation। আমরা ৬টা আলাদা site বানাব না। ৬টা থেকে সেরা অংশগুলো নিয়ে **একটা consistent site** বানাব।

### 2.1 ছবির ৬টা Panel → আমাদের কোন Section

| Panel | কী দেখা যাচ্ছে | আমরা কোথায় ব্যবহার করব |
|---|---|---|
| ১ (উপরে-বামে) | উপরে cyan, নিচে purple — দুই রঙের hard split। মাঝে বড় "JOHN / SMITH", ছবির উপর wireframe polyhedron। নিচে purple এর উপর "HELLO" + ছবি-কার্ড + লেখা + "MY PROFILE" | **Hero (Phase 3)** + **About (Phase 4)** |
| ২ (উপরে-মাঝে) | Indigo ব্লক, তির্যক (slanted) কাটা edge, নাম vertical করে ঘোরানো, pink wireframe | Section এর **slanted transition**; Hero র optional desktop flourish |
| ৩ (উপরে-ডানে) | অফ-হোয়াইট header, "Hello! I'm JOHN SMITH", ছোট filter tab (ALL / ...), mosaic grid, নিচে navy bar | **Projects (Phase 6)** এর heading + filter; navy bar = **Footer (Phase 2)** |
| ৪ (নিচে-বামে) | Mosaic grid, প্রতি tile এ নিচে-বামে bold title, একটা বড় **mint (সবুজ) tile** | **Projects grid**; mint tile = **AI project highlight** |
| ৫ (নিচে-মাঝে) | Carousel (দুই পাশে ছোট arrow, নিচে dots), "I'M JOHN SMITH" বিভাগ, বিশাল "Do you have a **PROJECT IN MIND?**" | Mobile **project carousel**; **Contact (Phase 9)** এর CTA heading |
| ৬ (নিচে-ডানে) | Desktop navbar: ছোট logo বৃত্ত, uppercase ছোট link, pink outlined pill button। navy রঙের বিশাল নাম | **Navbar (Phase 2)** |

### 2.2 Color Palette (ছবির pixel থেকে sample করা)

| Token | Hex | কীভাবে পাওয়া |
|---|---|---|
| `cyan` | `#4FD5EE` | sampled |
| `purple` (primary) | `#6F43D6` | sampled |
| `indigo` | `#433A8B` | sampled |
| `mint` | `#1BE6B7` | sampled |
| `navy` | `#032972` | sampled |
| `paper` (off-white bg) | `#F8F8F6` | sampled |
| `pink` | ≈ `#FF5C8D` | চোখে দেখে অনুমান, Phase 1 এ tune হবে |
| `olive` (squiggle) | ≈ `#C9C86A` | চোখে দেখে অনুমান |
| `ink` (text) | ≈ `#111111` | অনুমান |

**Dark mode palette** (demo তে নেই, আমরা বানাব): bg ≈ `#0F0D24`, surface ≈ `#1A1736`, text ≈ `#F4F3FA`, muted ≈ `#A9A6C4`। রঙিন sections (hero, about, experience) dark mode এও প্রায় একই থাকবে। শুধু off-white অংশগুলো dark হবে।

### 2.3 Typography

- **Heading:** Geometric bold sans, **UPPERCASE**, চওড়া letter-spacing, weight 700–800 → **Montserrat**
- **Kicker (ছোট serif italic):** "Hello! I'm", "Do you have a" → **Playfair Display Italic**
- **Body:** হালকা, ছোট, grey → **Montserrat** 400/500
- দুটোই `next/font/google` দিয়ে (build time এ self-host)। এগুলো demo এর সবচেয়ে কাছের Google font। Phase 1 এ পাশাপাশি রেখে মিলিয়ে দেখব।
- Demo এর body text খুব ছোট (mockup এ ~8px)। আমরা real site এ body সর্বনিম্ন 16px, label/nav সর্বনিম্ন 12px রাখব (readability + Lighthouse)।

### 2.4 Signature Elements (এগুলোই "ওই look" এনে দেয়)

1. **Memphis-style floating shapes:** ring (O), outline triangle, ছোট তির্যক dash, squiggle blob, ছোট filled dot, বড় dashed circle, dotted-grid square (heading এর পেছনে)। এগুলো `aria-hidden`, ধীরে ভেসে থাকে।
2. **Hard colour blocks:** কোনো gradient/shadow নেই। flat রঙ, ধারালো কাটা, মাঝে মাঝে তির্যক cut (`clip-path`)।
3. **Section heading pattern:** উপরে ছোট ঊর্ধ্বমুখী লাইন → ছোট serif italic kicker → বিশাল uppercase bold heading।
4. **Photo treatment:** Cut-out ছবি, duotone/colour tint, তার উপর SVG wireframe polyhedron overlay (demo র signature)।
5. **Square / mosaic tiles:** গোল কোণা প্রায় নেই। Light-grey tile, নিচে-বামে bold title, একটা tile solid mint।
6. **Tiny uppercase UI:** nav link, filter tab — ছোট, letter-spaced, active টা রঙিন underline সহ।
7. **Pink outlined pill** CTA (navbar এর "Let's discuss" এর মতো)।
8. **প্রচুর whitespace**, max-width ~1200px, মাঝখানে সাজানো।
9. **Motion:** শুধু subtle — shapes ধীরে ভাসবে, section scroll এ fade/slide, tile hover এ ছোট zoom। `prefers-reduced-motion` মানা হবে।

### 2.5 Demo তে নেই, আমরা একই style এ বানাব

Skills, Experience & Journey, Vision, Footer-এর বিস্তারিত — এগুলোর কোনো panel demo তে নেই। আমি একই palette, shapes, typography দিয়ে design করব। Design decision গুলো ওই Phase এর শুরুতে তোমাকে সংক্ষেপে দেখাব।

---

## 3. Decisions / Conflicts — তোমার জানা দরকার

| # | বিষয় | আমার সিদ্ধান্ত | কেন |
|---|---|---|---|
| 1 | requirements বলছে "single accent color", কিন্তু demo তে ৫–৬ রঙ | **Demo র palette রাখব।** তবে নিয়ম: purple = structure/primary; বাকি রঙ শুধু shapes + ছোট highlight এ; mint = "AI / active" এর জন্য | তুমি বলেছ UI হুবহু screenshot এর মতো হবে। রঙের ব্যবহার সংযত রাখলে professional দেখাবে |
| 2 | Light/dark mode requirements এ আছে, demo শুধু light | **Dark mode বানাব**, কিন্তু Phase 1 থেকেই CSS variable দিয়ে theme-aware করে, শেষে জোড়া লাগাব না | পরে retrofit করা কষ্টকর ও bug-prone |
| 3 | requirements এ `tailwind.config.js` আছে, Tailwind v4 এ ওটা default না | v4 এর CSS-first `@theme` (in `globals.css`) ব্যবহার করব | latest Tailwind এর standard উপায় |
| 4 | Animation: CSS নাকি `framer-motion` | **CSS + IntersectionObserver।** Library নয় | bundle ছোট থাকবে, Lighthouse 90+ সহজ হবে। শুধু যদি কোথাও দরকার পড়ে, তখন জিজ্ঞেস করে যোগ করব |
| 5 | Demo তে mint ও pink রঙের **ছোট text** আছে | Light bg তে mint/pink text WCAG AA fail করে। তাই text এ গাঢ় shade (`pink-text`), আসল shade শুধু shape/border/fill এ | requirements এ AA contrast বাধ্যতামূলক |
| 6 | Canonical URL/OG এর জন্য site URL লাগবে | `.env.example` এ দ্বিতীয় var `NEXT_PUBLIC_SITE_URL` যোগ করব | sitemap + OG image এর absolute URL এর জন্য। requirements এ শুধু Formspree var আছে, এটা ছোট addition |
| 7 | Folder name `Fuck-Him` (বড় হাতের অক্ষর) | npm package name হবে `portfolio` | npm package name lowercase লাগে। folder এর নাম আমি ছোঁব না |
| 8 | `demo.png`, `requirements.txt`, `PLAN.md` | project root এ যেমন আছে তেমনই থাকবে (build এ ঢুকবে না) | তুমি না বললে সরাব না |

---

## 4. Ground Rules (সব Phase এ প্রযোজ্য)

**Guardrails (static-only):**
- `app/api/`, `'use server'`, server actions, middleware/proxy, `cookies()`/`headers()`, DB, auth: কোনোটাই থাকবে না
- `sitemap.js` ও `robots.js` তে `export const dynamic = 'force-static'` (static export এ এটা দরকার)
- প্রতি Phase শেষে `npm run build` পাস করতে হবে

**Content:**
- Content সব `src/data/*.js` এ। Component এ hard-coded text নেই।
- আসল content না পেলে placeholder: `"TODO: ..."` দিয়ে স্পষ্ট চিহ্নিত। নাম/কোম্পানি/লিংক আমি বানিয়ে লিখব না।
- Phase শুরুর আগে আমি বলব ওই Phase এ তোমার কাছ থেকে কী লাগবে।

**প্রতি Phase এর "Done" এর সংজ্ঞা:**
1. `npm run build` সফল, কোনো warning/error নেই
2. 360px / 768px / 1440px এ দেখতে ঠিক, horizontal scroll নেই
3. Light ও dark দুই mode এ ঠিক
4. Keyboard দিয়ে ব্যবহারযোগ্য, focus ring দেখা যায়
5. `demo.png` এর সাথে মিলিয়ে look ঠিক আছে কি না: **চূড়ান্ত visual sign-off তোমার**

**Phase শেষে আমার report:** কী বানালাম · কীভাবে দেখবে (command) · কী review করবে · পরের Phase এ কী লাগবে।
(Build/lint আমি নিজে চালিয়ে যাচাই করব। Visual দেখার জন্য সম্ভব হলে screenshot নেব, না হলে তুমি browser এ দেখবে।)

---

## 5. Phase Details

---

### Phase 0 — Project Setup

**লক্ষ্য:** খালি কিন্তু সঠিকভাবে কনফিগার করা, static export চালু, Vercel-ready একটা project।

**কাজ**
- `create-next-app@latest` দিয়ে scaffold: JavaScript, App Router, `src/` dir, Tailwind, ESLint, alias `@/*`। Package name `portfolio`।
- `next.config.js`: `output: 'export'`, `images: { unoptimized: true }`
- Tailwind v4 setup (`@import "tailwindcss"` + `@theme` খালি জায়গা)
- requirements §11 এর folder structure তৈরি: `public/{images,projects}`, `src/app`, `src/components/{layout,sections,ui}`, `src/data`
- `src/data/` এর ৫টা file (`profile.js`, `skills.js`, `projects.js`, `experience.js`, `vision.js`) + `navigation.js`: সঠিক shape সহ, `TODO` placeholder দিয়ে ভরা
- `.env.example` (`NEXT_PUBLIC_FORMSPREE_ID=`, `NEXT_PUBLIC_SITE_URL=`), `.gitignore`, `git init`, ছোট `README.md` stub
- `public/resume.pdf`: স্পষ্ট "PLACEHOLDER" লেখা ছোট PDF; `public/images/` এ placeholder avatar

**Done when**
- `npm run dev` এ "Setup OK" পেজ খোলে
- `npm run build` চলে এবং `out/` folder তৈরি হয়; `out/` serve করে পেজ খোলে
- grep এ `api/`, `use server`, DB কিছু নেই

**তোমার কাছ থেকে লাগবে:** কিছু না। (শুধু একবার confirm করবে Decision #7 ঠিক আছে কি না।)

---

### Phase 1 — Design System

**লক্ষ্য:** demo র "চেহারা" তৈরি করা: রঙ, font, shapes, ছোট reusable building block। কোনো real section এখনও নয়।

**কাজ**
- `globals.css`: color tokens (light + dark CSS variables), `@theme`, container width (~1200px), base typography
- Theme: `<html>` এ `data-theme`; layout এর `<head>` এ ছোট inline script যা `localStorage` → না থাকলে system preference পড়ে। যেন page load এ flash না হয়
- `next/font`: Montserrat + Playfair Display (italic)
- **UI primitives** (`components/ui/`): `Container`, `Button` (solid purple / pink outline pill / small underline link), `Badge/Chip`, `Card`, `SectionHeading` (লাইন + serif kicker + giant uppercase), `Reveal` (scroll fade/slide), `SlantedEdge` (তির্যক cut)
- **Shapes library** (`components/ui/shapes/`): `Ring`, `Triangle`, `Dash`, `Squiggle`, `Dot`, `DashedCircle`, `DotGrid`, `Wireframe` (polyhedron SVG), আর একটা `ShapeField` helper যা position/রঙ/float-delay props নিয়ে shape সাজায়
- Float keyframes (ধীর, subtle) + `prefers-reduced-motion` এ বন্ধ
- **অস্থায়ী `/styleguide` পেজ:** সব primitive light/dark এ পাশাপাশি দেখার জন্য (`noindex`; Phase 11 এ মুছে ফেলা হবে)

**Done when**
- Styleguide এ সব দেখা যায়, দুই theme এ ঠিক
- Font ও রঙ demo.png এর পাশে রাখলে "একই পরিবার" মনে হয়
- Text/background জোড়া AA contrast পাস করে (Decision #5)

**তোমার কাছ থেকে লাগবে:** Styleguide দেখে বলবে font/রঙ demo র কাছাকাছি লাগছে কি না। এখানেই সবচেয়ে বেশি tune করা সহজ।

---

### Phase 2 — Layout Shell (Navbar + Footer)

**Demo ref:** Panel ৬ (desktop nav), Panel ১–৫ (mobile hamburger), Panel ৩ (navy bar)

**কাজ**
- **Navbar** (sticky):
  - বামে ছোট গোল logo (নামের আদ্যক্ষর, mint)
  - Desktop: uppercase ছোট link — Home · About · Projects · Experience · Vision · Contact (Skills সহ কি না, সেটা নিচে নোট দেখো)
  - ডানে **Download Resume** (pink outlined pill) + **ThemeToggle** (sun/moon)
  - Mobile: ছোট hamburger → full-screen purple overlay, বড় uppercase link; focus trap, `Esc` দিয়ে বন্ধ, `aria-expanded`
  - Scroll এ স্বচ্ছ → solid
- **Scroll-spy:** IntersectionObserver দিয়ে active section হাইলাইট (mint underline)
- **Smooth scroll:** CSS `scroll-behavior` + `scroll-margin-top`; reduced-motion এ বন্ধ
- **ThemeToggle:** `localStorage` এ সংরক্ষণ, flash ছাড়া
- **Footer:** navy band, current year সহ copyright, social icons, "Back to top" (ring-style button)
- **Skip-to-content** link
- `page.js` এ অস্থায়ীভাবে খালি section anchor (`#home`, `#about`...) রাখব যাতে scroll-spy test করা যায়

> **নোট:** requirements এর nav তালিকায় Skills নেই (Home → About → Projects → Experience → Vision → Contact), কিন্তু Skills একটা required section (§5.3)। আমি Skills কে About এর ঠিক পরের section হিসেবে রাখব এবং nav এ **Skills** link ও যোগ করব, না হলে ওই section এ nav থেকে যাওয়ার উপায় থাকে না। তুমি না চাইলে Phase 2 এর সময় বলে দিও।

**Data:** `navigation.js`, `profile.js` এর socials

**Done when:** সব link smooth scroll করে; active section ঠিক হাইলাইট হয়; mobile menu keyboard দিয়ে চালানো যায়; theme সংরক্ষিত থাকে।

**তোমার কাছ থেকে লাগবে:** নামের আদ্যক্ষর (logo র জন্য), social links (GitHub/LinkedIn/Email)।

---

### Phase 3 — Home / Hero

**Demo ref:** Panel ১ (মূল composition), Panel ২ (তির্যক edge)

**কাজ**
- Full-viewport hero (`min-h-svh`): **উপরে cyan, নিচে purple**, মাঝে hard split (gradient নয়)
- নামের stack: ছোট হালকা first name + **বিশাল ExtraBold last name** (`clamp()` দিয়ে fluid), নিচে ছোট headline ("Full-Stack Developer · Building AI-powered apps with JavaScript")
- **Portrait:** মাঝখানে, রঙ-ভাগের উপর দিয়ে বসানো; duotone tint + **wireframe polyhedron overlay**
- ১–২ বাক্যের intro, দুই CTA: **View My Work** → `#projects`, **Contact Me** → `#contact`
- Social icons: GitHub, LinkedIn, Email
- Shapes ছড়ানো (ring, triangle, dash, squiggle) + ধীর float। Mobile এ shape এর সংখ্যা কম
- পেজের একমাত্র `<h1>` = পুরো নাম

**Data:** `profile.js` (firstName, lastName, headline, intro, heroPhoto, socials)

**Responsive:** 360px এ নামের scale ও ছবির আকার আলাদা tune; text যেন কোনো shape এর নিচে না ঢাকে।

**Done when:** Panel ১ এর উপরের অংশের সাথে composition মিলে; CTA scroll করে; দুই theme এ ঠিক।

**তোমার কাছ থেকে লাগবে:**
- নাম, headline, ১–২ বাক্যের intro (না দিলে তোমার জন্য draft লিখে দেখাব)
- **Hero ছবি:** waist-up, **transparent background (cut-out PNG/WebP)**, কমপক্ষে ~1200px উঁচু। না থাকলে placeholder silhouette দিয়ে চালাব। পরে বদলানো সহজ।

---

### Phase 4 — About

**Demo ref:** Panel ১ (নিচের অংশ: "HELLO" + ছবি-কার্ড), Panel ৫ ("I'M JOHN SMITH" block)

**কাজ**
- Purple background hero থেকেই চলতে থাকে। kicker "(who am I)" + **বিশাল সাদা "HELLO"**
- **Photo card:** হালকা-grey আয়তক্ষেত্রে ছবি, purple ব্লকের নিচের edge ভেদ করে সামনের section এ নামছে। পেছনে dashed circle
- ২–৪ ছোট paragraph, মানবিক tone (résumé এর মতো নয়)
- **Quick facts:** অভিজ্ঞতার বছর, location, বর্তমান role, Open to work (হ্যাঁ/না): ছোট ring-bullet সহ list
- ছোট underline link "MY PROFILE" → resume বা LinkedIn
- নিচের edge তির্যক কেটে off-white section এ নামা (Panel ২)

**Data:** `profile.js` → `bio[]`, `facts`

**Done when:** ছবি-কার্ড section এর সীমা ভেদ করে ঠিকভাবে বসে; mobile এ ছবি উপরে, লেখা নিচে।

**তোমার কাছ থেকে লাগবে:** তোমার গল্প নিয়ে কয়েকটা প্রশ্নের উত্তর (আমি ৪–৫টা ছোট প্রশ্ন করব, তার থেকে paragraph লিখে দেব); location; open to work কি না; একটা About ছবি (hero ছবিই চলবে)।

---

### Phase 5 — Skills

**Demo ref:** সরাসরি নেই। Panel ৪ এর tile/mosaic ভাষা ধার নেওয়া হবে।

**কাজ**
- Off-white section, পেছনে dotted-grid square, kicker "(what I do)" + **SKILLS**
- ৫টা category tile: **Frontend · Backend · Database · AI / LLM · Tools & DevOps**
  - প্রতিটার আলাদা accent রঙ (cyan / purple / navy / mint / pink)
  - **AI / LLM tile = solid mint**, projects এর AI highlight এর সাথে একই ভাষা
  - Mosaic-ধাঁচে বিভিন্ন আকারের tile (সব সমান box নয়)
- প্রতিটা skill = চৌকো chip + icon (Simple Icons / lucide)। **কোনো percentage bar বা star নেই**
- Hover এ chip ছোট করে উঠবে

**Data:** `skills.js` (category → skills[] with `icon` name) + একটা `iconMap` যা icon name কে component এ বদলায়

**Done when:** সব icon ঠিকভাবে load হয় (ভাঙা icon নেই); mobile এ tile গুলো সুন্দর stack হয়।

**তোমার কাছ থেকে লাগবে:** প্রতি category র skill তালিকা (না দিলে requirements এর stack থেকে — Node.js, React, Next.js, MySQL, LangChain/LangGraph/LangSmith — একটা প্রাথমিক তালিকা বানিয়ে দেখাব)।

---

### Phase 6 — Projects

**Demo ref:** Panel ৩, ৪, ৫

**কাজ**
- Heading ব্লক: kicker + **PROJECTS**, নিচে ছোট uppercase **filter tab**: All / AI / Full-Stack / Frontend (active = ink text + mint underline)
- **Mosaic (bento) grid**, desktop এ ৩ column: কিছু tile wide, কিছু tall, data তে `span` hint দিয়ে নিয়ন্ত্রিত
  - Tile: light-grey bg, thumbnail, **নিচে-বামে bold title**
  - **Hover/focus:** ছোট zoom + overlay এ role, tech tags, **Live Demo / GitHub** icon button
  - Touch device এ hover নেই → tile এর নিচে ছোট info strip সবসময় দেখা যাবে
  - **AI project = solid mint tile + "AI" badge** (requirement: AI project সহজে চোখে পড়বে)
- Filter বদলালে নরম fade/scale transition (CSS)
- **Mobile (<640px):** horizontal scroll-snap **carousel**, দুই পাশে ছোট arrow, নিচে dots (Panel ৫)। Tablet এ ২ column।
- ৩–৬টা featured project, সবচেয়ে শক্তিশালী আগে
- Thumbnail: WebP, স্পষ্ট width/height, অর্থপূর্ণ `alt`
- `id` = future case-study slug, যাতে পরে `/projects/[slug]` যোগ করা সহজ হয়

**Data:** `projects.js`: requirements §6 এর shape + `span`

**Done when:** filter ঠিক কাজ করে; AI project সহজে চেনা যায়; link গুলো নতুন tab এ `rel="noopener noreferrer"` সহ খোলে; 360px এ carousel swipe হয়।

**তোমার কাছ থেকে লাগবে:** ৩–৬ প্রজেক্টের তথ্য (title, ১–২ লাইন description, তোমার role, category, tech list, live URL, GitHub URL) + screenshot। আমি WebP এ convert করার নিয়ম বলে দেব। না থাকলে `TODO` placeholder tile দিয়ে layout পাকা করব।

---

### Phase 7 — Experience & Journey

**Demo ref:** সরাসরি নেই। Panel ২ এর indigo + তির্যক edge, ring shape ধার নেওয়া হবে।

**কাজ**
- **Indigo (`#433A8B`) band**, উপরে-নিচে তির্যক cut, kicker "(my journey)" + **EXPERIENCE**
- **Vertical timeline**, **নতুনটা আগে**: মাঝের লাইনে Memphis ring দিয়ে node; desktop এ entry গুলো বাম-ডান বিকল্পে; mobile এ এক column
- প্রতি entry: role (uppercase bold), company (serif italic), তারিখ (mint), ২–৪ bullet achievement
- Sub-block **Education & Certifications:** আলাদা tile
- Sub-block **Achievements / Awards:** **optional**, array খালি হলে লুকিয়ে যাবে
- Reveal animation: entry গুলো scroll এ একে একে আসবে

**Data:** `experience.js` → `jobs[]`, `education[]`, `certifications[]`, `achievements[]`

**Done when:** সাজানো ঠিক নতুন→পুরোনো; achievements খালি হলে কোনো ফাঁকা জায়গা থাকে না; indigo এর উপর সব text AA পাস।

**তোমার কাছ থেকে লাগবে:** চাকরি/কাজের ইতিহাস (role, company, সময়কাল, achievement), শিক্ষা, certification, award (থাকলে)।

---

### Phase 8 — Vision

**Demo ref:** সরাসরি নেই। Panel ৫ এর "PROJECT IN MIND?" এর typographic ভাষা ধার নেওয়া হবে।

**কাজ**
- সাদা/off-white section, kicker "(where I'm heading)" + **VISION**
- **Vision/Mission** (২–৩ বাক্য): বড় serif-italic quote, মূল শব্দগুলো **বিশাল bold uppercase**; পাশে বড় ring/triangle shape
- **Goals:** দুই column: Short-term / Long-term; বড় outlined numeral `01 02 03` সহ ছোট list
- **Current Focus:** "NOW" ট্যাগ + ধীরে স্পন্দিত dot; LangChain, LangGraph, LangSmith ইত্যাদি tile/chip হিসেবে

**Data:** `vision.js` → `mission`, `goals: { short[], long[] }`, `focus[]`

**Done when:** সব অংশ data থেকে আসে; mobile এ বড় typography overflow করে না।

**তোমার কাছ থেকে লাগবে:** vision/mission এর খসড়া (বা ২–৩টা প্রশ্নের উত্তর), short/long term goals, এখন কী শিখছ/বানাচ্ছ।

---

### Phase 9 — Contact (Formspree)

**Demo ref:** Panel ৫ নিচের "Do you have a **PROJECT IN MIND?**"

**কাজ**
- ছোট serif "Do you have a" + **বিশাল "PROJECT IN MIND?"** + invitation line ("Have a project or opportunity? Let's talk.")
- **ফর্ম** (Name, Email, Message): চৌকো, flat style; label সহ
  - Client-side validation: required + email format; error লেখা inline এবং `aria-live`
  - Submit: Formspree এ `fetch` (`https://formspree.io/f/${NEXT_PUBLIC_FORMSPREE_ID}`), `Accept: application/json`
  - **State:** idle → loading (button disabled) → success / error (পরিষ্কার বার্তা, আবার চেষ্টা করার সুযোগ)
  - Spam: hidden honeypot field
  - Env var না থাকলে build ভাঙবে না; ফর্মের জায়গায় mailto fallback বার্তা দেখাবে
- Direct link: Email (mailto), LinkedIn, GitHub
- **Download Resume** button (`/resume.pdf`)
- নিচে navy Footer (Phase 2) এর সাথে মসৃণ সংযোগ

**Done when:** সফল submit এ Formspree dashboard এ message আসে; error state টেস্ট করা (নেটওয়ার্ক বন্ধ করে); resume ডাউনলোড হয়।

**তোমার কাছ থেকে লাগবে:**
- **Formspree account (free) খুলে একটা form বানাবে → form ID আমাকে দেবে বা `.env.local` এ বসাবে।** (Free plan এ মাসিক submission limit আছে, Formspree pricing page এ দেখে নিও।)
- Email, LinkedIn, GitHub URL, আসল `resume.pdf`

> **মনে রাখার বিষয়:** `NEXT_PUBLIC_*` variable build এর সময় কোডে ঢুকে যায়। Vercel এ value বদলালে **নতুন করে redeploy** করতে হবে।

---

### Phase 10 — Integration & Polish

**লক্ষ্য:** আলাদা আলাদা section গুলোকে একটা সুসংগত site এ পরিণত করা।

**কাজ**
- `page.js` এ সঠিক ক্রমে সব section: Hero → About → Skills → Projects → Experience → Vision → Contact → Footer
- **Section transition ও রঙের ছন্দ** পরীক্ষা (cyan/purple → purple → off-white → off-white → indigo → white → navy), তির্যক cut গুলো সুন্দরভাবে জোড়া লাগছে কি না
- Shape এর অবস্থান একবার পুরো পেজ জুড়ে দেখা, কোনো text ঢাকছে না, কোনো overflow নেই (`overflow-x: clip` যেখানে দরকার)
- **Dark mode** পুরো পেজে এক পাক
- **Responsive QA:** 320 / 360 / 768 / 1024 / 1440 / 1920
- Scroll reveal ও float animation একই ছন্দে আনা; `prefers-reduced-motion` পরীক্ষা
- Keyboard দিয়ে পুরো site ঘোরা; focus ring সব জায়গায়
- `demo.png` এর সাথে শেষবার পাশাপাশি তুলনা, ফাঁক থাকলে ঠিক করা
- (Optional flourish, তুমি চাইলে) Panel ২ এর vertical-rotated নাম desktop hero তে

**Done when:** কোনো section এ "আলাদা site" এর মতো অনুভূতি নেই; ৩টা বড় breakpoint এ + দুই theme এ সব ঠিক।

---

### Phase 11 — SEO, Performance, Accessibility, README

**কাজ**
- **Metadata** (Next.js `metadata` API): title, description, `metadataBase`, Open Graph, Twitter card
- **OG image** `public/og-image.png` (1200×630), একই design ভাষায়
- **Favicon** + Apple touch icon
- `app/sitemap.js`, `app/robots.js` (`force-static`)
- Semantic HTML audit: `header/nav/main/section/footer`, একটাই `h1`, heading ক্রম
- **Images:** সব WebP, width/height সেট, `alt` অর্থপূর্ণ
- অস্থায়ী `/styleguide` **মুছে ফেলা**
- **Lighthouse** (production build `out/` serve করে, mobile + desktop): **Performance, Accessibility, Best Practices, SEO সবকটা 90+**। যেটা কম, সেটা ঠিক করা
- **Accessibility:** WCAG AA contrast (দুই theme), axe/অনুরূপ check, accessible mobile menu
- External link এ `rel="noopener noreferrer"` যাচাই
- **README.md** (requirements §13): install/run, build ও static output যাচাই, `src/data/` এ content কোথায় বদলাবে, Formspree setup, Vercel deploy
- `.env.example` চূড়ান্ত

**Done when:** Lighthouse এর ৪টা score ই ৯০+; README পড়ে নতুন কেউ project চালাতে পারে।

---

### Phase 12 — Deploy (Vercel) & Final Acceptance

> Git commit/push, GitHub repo, Vercel — **তোমার সরাসরি অনুমতি ছাড়া আমি কিছু করব না।**

**কাজ**
- গিট ইতিহাস গুছিয়ে commit; GitHub repo (তুমি বানাবে, বা বললে আমি `gh` দিয়ে সাহায্য করব)
- Vercel এ **Add New Project** → repo import → Environment Variables: `NEXT_PUBLIC_FORMSPREE_ID`, `NEXT_PUBLIC_SITE_URL`
- Framework preset Next.js, output static (`out/`) ঠিক ধরেছে কি না যাচাই
- Deploy; `main` এ push করলেই auto-redeploy কি না দেখা
- **Live site smoke test:** form পাঠানো, resume ডাউনলোড, nav/scroll-spy, theme সংরক্ষণ, OG preview (Facebook/LinkedIn/Twitter debugger), live URL এ Lighthouse
- সব `TODO` placeholder খোঁজা (`grep -r "TODO" src public`) এবং আসল content দিয়ে বদলানো
- Custom domain পরে যোগ করার ধাপ বলে দেওয়া

**Final Acceptance** (requirements §14):
- [ ] `npm run build` সফল, static export, কোনো server feature নেই
- [ ] Backend/API route/database কোথাও নেই
- [ ] §5 এর সব section আছে এবং `src/data/` থেকে এডিট করা যায়
- [ ] Nav প্রতিটা section এ scroll করে ও active হাইলাইট করে
- [ ] Contact form Formspree দিয়ে পাঠায়, success/error দেখায়
- [ ] Resume ডাউনলোড হয়
- [ ] Light/dark mode কাজ করে ও মনে রাখে
- [ ] 360px, 768px, 1440px এ ঠিক দেখায়
- [ ] Lighthouse চারটাতেই 90+
- [ ] Vercel free plan এ সফল deploy
- [ ] UI `demo.png` এর look এর সাথে মেলে (তোমার sign-off)

---

## 6. Optional Phases (Phase 12 এর পরে, structure আগে থেকেই তৈরি রাখা হবে)

| Phase | Feature | কীভাবে |
|---|---|---|
| 13 | Testimonials | `data/testimonials.js`; array খালি হলে section লুকানো |
| 14 | Case study pages | `/projects/[slug]`, `generateStaticParams()` + `dynamicParams = false` (fully static) |
| 15 | Blog | লোকাল Markdown/MDX, static generate, কোনো CMS নয় |
| 16 | Featured In / Publications | data file + section |

---

## 7. সব Phase মিলিয়ে তোমার কাছ থেকে কী কী লাগবে (এক নজরে)

| কখন | কী |
|---|---|
| Phase 2–3 | নাম, আদ্যক্ষর, headline, intro, social links, hero ছবি (transparent background) |
| Phase 4 | তোমার গল্পের কিছু উত্তর, location, open-to-work, About ছবি |
| Phase 5 | Skill তালিকা |
| Phase 6 | ৩–৬ প্রজেক্ট তথ্য + screenshot |
| Phase 7 | Experience, education, certification, award |
| Phase 8 | Vision, goals, current focus |
| Phase 9 | Formspree form ID, email, resume.pdf |
| Phase 11–12 | Site URL (Vercel এর `*.vercel.app` বা নিজের domain), GitHub repo |

কোনো কিছু না থাকলে চিন্তা নেই। আমি স্পষ্ট `TODO` placeholder দিয়ে এগিয়ে যাব, পরে তুমি `src/data/` তে বদলে নেবে।
