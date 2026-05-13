# Maharashtra NDA Promise & Performance Tracker

Production-grade civic-tech website for tracking Maharashtra NDA government promises, budgets, projects, evidence, districts, leaders, and citizen submissions for the 2024-2029 term.

## Folder Structure

```text
frontend/
  app/
    page.tsx
    promises/page.tsx
    projects/page.tsx
    budget/page.tsx
    evidence/page.tsx
    districts/page.tsx
    leaders/page.tsx
    participate/page.tsx
    methodology/page.tsx
    reports/state-of-promises/page.mdx
  components/
    tracker/
    ui/
  data/
    promises/promises.json
    projects/projects.json
    budgets/budget.json
    leaders/leaders.json
    districts/districts.json
    sources/sources.json
    schema.md
  lib/
    tracker-data.ts
  public/
    manifest.json
    sw.js
    icon.svg
```

## Features

- Next.js 15 App Router, TypeScript, TailwindCSS, and shadcn-style primitives.
- Framer Motion animated statistics.
- Recharts budget and project analytics.
- Static JSON database with schema documentation.
- MDX report support.
- Global search, filters, status badges, district filtering, and shareable URL anchors.
- Responsive dashboard UI with light and dark mode.
- SEO metadata, OpenGraph metadata, structured dataset schema, PWA manifest, and service worker.
- Vercel-ready build.

## Local Development

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
cd frontend
npm run build
npm run start
```

## Vercel Deployment

1. Import the repository in Vercel.
2. Set the project root to `frontend`.
3. Framework preset: `Next.js`.
4. Build command: `npm run build`.
5. Install command: `npm install`.
6. Output directory: leave default.

## Data Updates

Edit JSON files in `frontend/data`. Each promise and project references source IDs from `frontend/data/sources/sources.json`.

Completion status must follow the methodology in `frontend/data/schema.md`: claims are not marked completed without documentary evidence.
