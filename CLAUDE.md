# Provendy Landing Page (Snaxology-wait)

## What this is
This repo is the **public marketing landing page** served at **https://provendy.ai**
(title: "Provendy — Turn Scouting into Installs"). Provendy was formerly branded
"Snaxology" — hence the repo name and some asset filenames.

**This is NOT the product app.** The logged-in product at `app.provendy.ai` is a
separate Flask repo (`CCC1031/content-automation`, folder `Content-Automation-Demo`).
Two different codebases, two different Railway services. Don't confuse them.

## Tech Stack
- **Frontend:** Vite + React + TypeScript, Tailwind CSS v4, shadcn/ui (`client/src/components/ui/`)
- **Server:** Express (`server/index.ts`, single file) — serves the built client
- **Package manager:** pnpm (v10+)
- **Deploy:** Railway (`railway.json`, `nixpacks.toml`), auto-deploys on push to `main`

## Where things are
- **`client/src/pages/Home.tsx`** — the entire landing page (~635 lines). This is the
  main edit target. Sections in order: Hero (`#hero`) → value props → How it works
  (`#how`) → Features (`#features`) → Scout (`#scout`) → **AI Receptionist** → FAQ
  (`#faq`) → footer CTA. The FAQ Q&A array is near the top of the component (~line 86).
- **`client/src/components/`** — Header, Footer, Map, ProcessTimeline, ManusDialog, etc.
- **`client/src/pages/NotFound.tsx`** — 404.
- Design: HappyPath-inspired clean white + Provendy red/black + teal accents (TEAL* consts
  in Home.tsx), Plus Jakarta Sans font.

## Run locally
```bash
pnpm install
pnpm dev          # Vite dev server with --host; opens on :3000 (or :3001 if taken)
```
Other scripts: `pnpm build` (Vite build + esbuild bundles the Express server),
`pnpm start` (prod), `pnpm check` (tsc), `pnpm format` (prettier).

## Deploy
Push to `main` on `CCC1031/Snaxology-wait` → Railway rebuilds and deploys to provendy.ai.
Railway healthcheck path is `/`.

## Notes
- The git remote URL has a GitHub PAT embedded in it (`git remote -v`). Should be rotated
  and removed from the remote config for security.
