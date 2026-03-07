'use client'

import { useLocale } from '@/i18n/client'

export function SaasBanner() {
  const { locale } = useLocale()

  return (
    <div className="not-prose mb-8 rounded-lg border border-brand-500/20 bg-brand-500/5 px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
      This is the <span className="font-medium text-zinc-900 dark:text-white">Sirr server &amp; client</span> documentation.
      Looking for Sirr as a managed service?{' '}
      <a
        href="https://sirrlock.com"
        className="inline-flex items-center gap-1 font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300"
      >
        Head to sirrlock.com
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path
            fillRule="evenodd"
            d="M5.22 14.78a.75.75 0 0 1 0-1.06l7.22-7.22H8.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V7.06l-7.22 7.22a.75.75 0 0 1-1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </div>
  )
}
