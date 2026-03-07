'use client'

import Link from 'next/link'
import { useLocale } from '@/i18n/client'

// ── Icons ──────────────────────────────────────────────────────────────────────

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  )
}

function ServerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v.75a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25v-.75m19.5 0a2.25 2.25 0 0 0-2.25-2.25H4.5a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.75m-19.5-.75v.75M4.5 12.75h15M4.5 8.25h15m-15-4.5h15" />
    </svg>
  )
}

function CodeBracketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
    </svg>
  )
}

function CubeTransparentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  )
}

function LockClosedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  )
}

function SparklesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
  )
}

// ── Data ───────────────────────────────────────────────────────────────────────

const useCases = [
  {
    Icon: ShieldCheckIcon,
    title: 'Business & Compliance',
    description:
      'Zero-trust architecture with full audit trails. Reduce blast radius and satisfy SOC 2, ISO 27001, and GDPR requirements.',
    href: '/security',
  },
  {
    Icon: ServerIcon,
    title: 'DevOps & Infrastructure',
    description:
      'Single Rust binary, zero dependencies, self-hosted governance. Deploy tokens that self-destruct after your pipeline runs.',
    href: '/quickstart/devops',
  },
  {
    Icon: CodeBracketIcon,
    title: 'Developers & AI',
    description:
      'MCP Server for Claude, official SDKs for Node.js, Python, and .NET. Give AI agents one-read credentials that burn on use.',
    href: '/ai-workflows',
  },
]

const docLinks = [
  { Icon: BoltIcon, title: 'Quickstart', href: '/quickstart' },
  { Icon: CubeTransparentIcon, title: 'Architecture', href: '/architecture' },
  { Icon: LockClosedIcon, title: 'Security', href: '/security' },
  { Icon: SparklesIcon, title: 'AI Workflows', href: '/ai-workflows' },
]

const resources = [
  { title: 'API Reference', description: 'RESTful endpoints documentation', href: '/api-reference' },
  { title: 'CLI Reference', description: 'Command line tool commands', href: '/cli' },
  { title: 'MCP Server', description: 'Model Context Protocol setup', href: '/mcp' },
  { title: 'SDKs', description: 'Libraries for your language', href: '/sdks' },
]

// ── Component ─────────────────────────────────────────────────────────────────

export function LandingPage() {
  const { locale } = useLocale()

  return (
    <div
      className="not-prose -mt-14 -mx-4 sm:-mx-6 lg:-mx-8 min-h-screen"
      style={{ fontFamily: 'var(--font-family-display, "Space Grotesk", sans-serif)' }}
    >
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="flex flex-col gap-10 py-12 lg:flex-row lg:items-center lg:gap-12">
          {/* Left: headline + CTAs */}
          <div className="flex flex-col gap-6 flex-1 min-w-0">
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl font-black leading-[1.1] tracking-[-0.03em] text-slate-900 dark:text-slate-50 sm:text-5xl">
                The secret manager<br className="hidden sm:block" /> built for the AI era.
              </h1>
              <p className="text-lg font-normal leading-relaxed text-slate-600 dark:text-slate-300">
                Every secret expires. By design.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/quickstart`}
                className="inline-flex min-w-[120px] items-center justify-center rounded-lg h-12 px-6 bg-sirr-primary text-sirr-bg text-sm font-bold leading-none tracking-wide hover:bg-sirr-primary/90 transition-colors shadow-lg shadow-sirr-primary/20"
              >
                Quickstart
              </Link>
              <Link
                href={`/${locale}/sdks`}
                className="inline-flex min-w-[120px] items-center justify-center rounded-lg h-12 px-6 bg-sirr-teal-800 text-slate-100 text-sm font-bold leading-none tracking-wide hover:bg-sirr-teal-700 transition-colors border border-sirr-teal-700"
              >
                Explore SDKs
              </Link>
            </div>
          </div>

          {/* Right: terminal demo */}
          <div className="flex-1 w-full min-w-0 bg-sirr-teal-900 border border-sirr-teal-800 rounded-xl p-6 font-mono text-sm overflow-hidden shadow-2xl shadow-sirr-primary/5">
            {/* traffic lights */}
            <div className="flex gap-2 mb-5">
              <div className="w-3 h-3 rounded-full bg-red-400/40" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/40" />
              <div className="w-3 h-3 rounded-full bg-green-400/40" />
            </div>
            <div className="space-y-1 text-slate-300">
              <p>
                <span className="text-sirr-primary select-none">$ </span>
                sirr set OPENAI_API_KEY sk-proj-... --ttl 1h
              </p>
              <p className="text-emerald-400 pl-2">✓ Secret stored. Expires in 1 hour.</p>
              <p className="mt-4">
                <span className="text-sirr-primary select-none">$ </span>
                sirr run -- pnpm start
              </p>
              <p className="text-slate-500 pl-2">&gt; Injected 1 secret into environment.</p>
              <p className="text-slate-500 pl-2">&gt; Server listening on port 3000...</p>
              <p className="mt-4">
                <span className="text-sirr-primary select-none">$ </span>
                sirr get OPENAI_API_KEY
              </p>
              <p className="text-rose-400/70 pl-2">✗ Secret not found — already burned.</p>
            </div>
          </div>
        </section>

        {/* ── Built for every team ─────────────────────────────────────────── */}
        <section className="py-12 border-t border-sirr-teal-800/50">
          <div className="flex flex-col gap-3 text-center items-center mb-10">
            <h2 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-slate-900 dark:text-slate-50 sm:text-4xl">
              Built for every team
            </h2>
            <p className="text-base font-normal leading-relaxed text-slate-600 dark:text-slate-300 max-w-xl">
              Secure your infrastructure with a zero-trust architecture designed for modern workflows.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {useCases.map(({ Icon, title, description, href }) => (
              <Link
                key={title}
                href={`/${locale}${href}`}
                className="flex flex-col gap-4 rounded-xl border border-sirr-teal-800 bg-white/50 dark:bg-sirr-teal-900/50 p-6 hover:border-sirr-primary/40 transition-colors"
              >
                <div className="text-sirr-primary w-11 h-11 flex items-center justify-center rounded-lg bg-sirr-teal-800/60 shrink-0">
                  <Icon />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-bold leading-tight text-slate-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="text-sm font-normal leading-relaxed text-slate-500 dark:text-slate-400">
                    {description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Documentation quick links ─────────────────────────────────────── */}
        <section className="py-8">
          <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-slate-900 dark:text-slate-50 mb-5">
            Documentation
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {docLinks.map(({ Icon, title, href }) => (
              <Link
                key={href}
                href={`/${locale}${href}`}
                className="flex gap-3 rounded-lg border border-sirr-teal-800 bg-white/40 dark:bg-sirr-teal-900/30 p-4 items-center hover:bg-sirr-teal-800/40 hover:border-sirr-primary/30 transition-all group"
              >
                <div className="text-sirr-primary/60 group-hover:text-sirr-primary transition-colors shrink-0">
                  <Icon />
                </div>
                <span className="text-sm font-semibold leading-tight text-slate-900 dark:text-white">
                  {title}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Resources ────────────────────────────────────────────────────── */}
        <section className="py-8">
          <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-slate-900 dark:text-slate-50 mb-5">
            Resources
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {resources.map(({ title, description, href }) => (
              <Link
                key={href}
                href={`/${locale}${href}`}
                className="flex flex-col gap-1.5 rounded-lg border border-sirr-teal-800/50 bg-white/30 dark:bg-sirr-teal-900/20 p-4 hover:bg-sirr-teal-800/30 transition-all"
              >
                <span className="text-sm font-semibold text-sirr-primary">{title}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{description}</span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
