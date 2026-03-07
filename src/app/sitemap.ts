import { type MetadataRoute } from 'next'

import { locales } from '@/i18n/config'

const baseUrl = 'https://sirr.dev'

const pages = [
  '',
  '/quickstart',
  '/install',
  '/architecture',
  '/configuration',
  '/authentication',
  '/errors',
  '/sdks',
  '/api-reference',
  '/audit-logs',
  '/webhooks',
  '/api-keys',
  '/deployment',
  '/self-hosting',
  '/security',
  '/vault-encryption',
  '/licensing',
  '/cli',
  '/mcp',
  '/n8n',
  '/openclaw',
  '/ai-workflows',
  '/blog',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const page of pages) {
    const languages: Record<string, string> = {}
    for (const locale of locales) {
      languages[locale] = `${baseUrl}/${locale}${page}`
    }

    entries.push({
      url: `${baseUrl}/en${page}`,
      lastModified: new Date(),
      alternates: {
        languages,
      },
    })
  }

  return entries
}
