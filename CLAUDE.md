# sirr.dev — Claude Development Guide

## Purpose

Documentation website for Sirr — the ephemeral secret vault built for the AI era.
This is NOT the web UI (that's `sirrlock/web`). This is the docs site at sirr.dev.

## Stack

- Next.js 16 (App Router) + MDX for documentation pages
- Tailwind CSS 4 + typography plugin
- Framer Motion for navigation animations
- FlexSearch for client-side full-text search
- Vitest + React Testing Library for tests
- 10-language i18n with path-based routing (`/en`, `/ja`, `/ar`, etc.)

## Project Layout

```
src/
├── app/
│   ├── [locale]/           # All pages under locale dynamic segment
│   │   ├── layout.tsx      # Root layout (html, body, locale provider)
│   │   ├── page.mdx        # Home page
│   │   └── */page.mdx      # 14 documentation pages
│   ├── layout.tsx          # Passthrough root (just returns children)
│   └── sitemap.ts          # Dynamic sitemap with all locale variants
├── components/             # React components (locale-aware via useLocale hook)
├── i18n/
│   ├── config.ts           # Locale list, RTL config
│   ├── client.tsx          # LocaleProvider + useLocale() hook
│   ├── server.ts           # getTranslations() + t() helper
│   └── translations/*.json # 10 JSON translation files
├── mdx/                    # MDX plugins (search index, syntax highlight, remark)
└── middleware.ts            # Redirects bare paths to /en prefix
```

## Commands

```bash
npm run dev       # Dev server (localhost:3000 → redirects to /en)
npm run build     # Production build
npm run lint      # ESLint
npm test          # Vitest
npm run format    # Prettier
```

## Key Constraints

- Navigation is locale-aware: all hrefs include `/${locale}` prefix
- Search results are locale-prefixed (search index stores paths without locale, prepended at runtime)
- Layout.tsx strips locale prefix from pathname for section matching
- The `[locale]` directory is a literal directory name on disk (Next.js dynamic segment)
- MDX content is English-only; UI strings (nav, labels, metadata) are translated via JSON
- Arabic (ar) is RTL — handled via `dir` attribute on `<html>` and useEffect in LocaleProvider

## Deployment

Deployed via **Docker Compose + Traefik** on remote server `162.55.226.118`. Images pulled from GitHub Container Registry (GHCR).

- **Domain**: `sirr.dev`
- **Image**: `ghcr.io/sirrlock/sirr.dev:latest`
- **Reverse proxy**: Traefik (handles TLS, routing)

### Version endpoint

```
GET /api/version
→ { "name": "sirr.dev", "version": "1.0.202602221430-041ede9", "sha": "041ede9" }
```

Version format: `1.0.YYYYMMDDHHmm-<short sha>`. Baked at build time via `next.config.mjs`.

### Deploy

Push to `main` → GitHub Actions builds and pushes image to GHCR → SSH into server and pull the new image:

```bash
ssh -p 10930 luntik@162.55.226.118 'cd /srv/sirr.dev && docker compose pull && docker compose up -d'
```

## Pre-Commit Checklist

Before every commit and push, review and update if needed:

1. **README.md** — Does it reflect new pages, languages, or setup changes?
2. **CLAUDE.md** — New constraints or architecture decisions worth recording?
