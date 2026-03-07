'use client'

import { useLocale } from '@/i18n/client'
import { Button } from '@/components/Button'

function TerminalIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.5 6.5 7 10l-3.5 3.5M9 14h7.5"
      />
    </svg>
  )
}

function CpuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 4h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm2 4h4v4H8V8ZM10 1v3m0 12v3M1 10h3m12 0h3M3.5 3.5l2 2m9 9 2 2M16.5 3.5l-2 2m-9 9-2 2"
      />
    </svg>
  )
}

function ShieldIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 1.5 3 5v4.5c0 4.5 3 8 7 9.5 4-1.5 7-5 7-9.5V5l-7-3.5ZM7.5 10l2 2 3.5-4"
      />
    </svg>
  )
}

const useCases = [
  {
    title: 'DevOps & CI/CD',
    description:
      'Deploy tokens that self-destruct after your pipeline runs. No cleanup scripts, no secret sprawl, no credentials lingering in CI logs.',
    icon: TerminalIcon,
    href: '/ai-workflows#ci-cd-one-time-tokens',
    cta: 'See CI/CD patterns',
  },
  {
    title: 'AI Agents',
    description:
      'Give Claude, GPT, Gemini, n8n, or OpenClaw one-read credentials via MCP or SDK. The secret burns after a single use — the agent never retains it.',
    icon: CpuIcon,
    href: '/ai-workflows#claude-code-mcp',
    cta: 'See AI workflows',
  },
  {
    title: 'Enterprise & Compliance',
    description:
      'SOC 2-ready architecture with ChaCha20Poly1305 encryption, Argon2id key derivation, full audit trail, key rotation, and zero telemetry.',
    icon: ShieldIcon,
    href: '/security',
    cta: 'See security details',
  },
]

export function UseCaseCards() {
  const { locale } = useLocale()

  return (
    <div className="not-prose my-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {useCases.map((useCase) => (
          <div
            key={useCase.title}
            className="group relative rounded-2xl border border-zinc-900/7.5 bg-zinc-50 p-6 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:border-white/10 dark:bg-white/2.5 dark:hover:shadow-black/5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 dark:bg-white/7.5 dark:ring-white/15">
              <useCase.icon className="h-5 w-5 fill-zinc-700/10 stroke-zinc-700 dark:fill-white/10 dark:stroke-zinc-400" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-zinc-900 dark:text-white">
              {useCase.title}
            </h3>
            <p className="mt-2 text-sm/6 text-zinc-600 dark:text-zinc-400">
              {useCase.description}
            </p>
            <div className="mt-4">
              <Button
                href={`/${locale}${useCase.href}`}
                variant="text"
                arrow="right"
              >
                {useCase.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
