# Attendance Calculator

A responsive attendance percentage calculator built with **Vite + React + Tailwind CSS + shadcn/ui**. It tells you how many classes you can miss while staying above your required percentage, or how many classes you must attend to reach your target.

## Features

- Fast, responsive UI
- Validates inputs (no negatives, no `present > total`, whole numbers only)
- Clean SEO + Open Graph metadata
- Ready to deploy on Vercel

## Formulas Used

Let:

- `P` = present classes
- `T` = total classes
- `R` = required percentage (0–100)

**If current attendance is already at/above the requirement:**

```
Bunk Days = floor((100 * P - R * T) / R)
```

**If current attendance is below the requirement:**

```
Classes Needed = ceil((R * T - 100 * P) / (100 - R))
```

## Getting Started

Install dependencies and run locally:

```bash
bun install
bun dev
```

Build for production:

```bash
bun run build
```

Preview production build:

```bash
bun run preview
```

> You can also use `npm` or `pnpm` if you prefer.

## Deploy (Vercel)

1. Push the repo to GitHub.
2. Import the project in Vercel.
3. Framework preset: **Vite**
4. Build command: `bun run build`
5. Output directory: `dist`

## Copy / Reuse

You can fork or clone this project and reuse it for your own deployment. Recommended edits:

- Update SEO metadata in `index.html` (title, description, canonical URL)
- Replace the Open Graph image in `public/og-image.svg`
- Update credits in `src/App.jsx`

---

Created by **Ali Raza** — https://github.com/AliRaza-033
