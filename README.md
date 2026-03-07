[![CI](https://github.com/sirrlock/sirr.dev/actions/workflows/ci.yml/badge.svg)](https://github.com/sirrlock/sirr.dev/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com)

# sirr.dev

Documentation website for [Sirr](https://github.com/sirrlock/sirr) — the ephemeral secret vault built for the AI era.

## Stack

- **Next.js 16** with App Router and MDX
- **Tailwind CSS 4** with typography plugin
- **Multilingual** — 10 languages with path-based routing (`/en`, `/ja`, `/ar`, etc.)
- **FlexSearch** for full-text client-side search
- **Framer Motion** for navigation animations
- **Vitest** + React Testing Library for tests

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/en`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm test` | Run Vitest tests |
| `npm run format` | Prettier format |

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # Locale-based routing
│   │   ├── layout.tsx      # Root layout with i18n
│   │   ├── page.mdx        # Home page
│   │   ├── quickstart/     # Guide pages
│   │   ├── api-reference/  # Server pages
│   │   ├── cli/            # Tool pages
│   │   └── ...
│   ├── layout.tsx          # Passthrough root layout
│   └── sitemap.ts          # Dynamic sitemap generation
├── components/             # React components
├── i18n/
│   ├── config.ts           # Locale definitions
│   ├── client.tsx          # useLocale() hook + provider
│   ├── server.ts           # Server-side translation
│   └── translations/       # JSON translation files (10 languages)
├── mdx/                    # MDX plugins (search, syntax highlighting)
└── middleware.ts            # Locale detection + redirect
```

## Internationalization

Translations live in `src/i18n/translations/*.json`. To add a language:

1. Create `src/i18n/translations/<code>.json` (copy `en.json` as template)
2. Add the locale code to `locales` array in `src/i18n/config.ts`
3. Add the locale name to `localeNames` in the same file

Supported: English, Chinese, Spanish, Arabic (RTL), French, German, Japanese, Portuguese, Korean, Russian.

## Deployment

Deployed via [Dokploy](https://dokploy.com) using a multi-stage Dockerfile. Dokploy pulls from GitHub and builds inside Docker — same environment every time.

```
GET https://sirr.dev/api/version
→ { "name": "sirr.dev", "version": "1.0.202602221430-041ede9", "sha": "041ede9" }
```

## Related

| Package | Description |
|---------|-------------|
| [sirr](https://github.com/sirrlock/sirr) | Rust monorepo: `sirrd` server + `sirr` CLI |
| [@sirrlock/mcp](https://github.com/sirrlock/mcp) | MCP server for AI assistants |
| [@sirrlock/node](https://github.com/sirrlock/node) | Node.js / TypeScript SDK |
| [sirr (PyPI)](https://github.com/sirrlock/python) | Python SDK |
| [Sirr.Client (NuGet)](https://github.com/sirrlock/dotnet) | .NET SDK |
| [sirrlock.com](https://sirrlock.com) | Hosted service + license keys |
