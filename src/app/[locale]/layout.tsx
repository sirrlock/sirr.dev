import glob from 'fast-glob'
import { type Metadata } from 'next'
import path from 'path'

import { Providers } from '@/app/providers'
import { LocaleProvider } from '@/i18n/client'
import { type Locale, isValidLocale, locales } from '@/i18n/config'
import { getTranslations, t } from '@/i18n/server'
import { Layout } from '@/components/Layout'
import { type Section } from '@/components/SectionProvider'

import '@/styles/tailwind.css'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale: Locale = isValidLocale(locale) ? locale : 'en'
  const translations = await getTranslations(validLocale)

  return {
    title: {
      template: t(translations, 'meta.siteTitleTemplate'),
      default: t(translations, 'meta.pages./.title'),
    },
    description: t(translations, 'meta.siteDescription'),
    manifest: '/site.webmanifest',
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
        { url: '/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale: Locale = isValidLocale(locale) ? locale : 'en'
  const translations = await getTranslations(validLocale)

  const pagesDir = path.join(process.cwd(), 'src', 'app', '[locale]')
  let pages = await glob('**/page.mdx', { cwd: pagesDir })
  let allSectionsEntries = (await Promise.all(
    pages.map(async (filename) => [
      '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
      (await import(`./${filename}`)).sections,
    ]),
  )) as Array<[string, Array<Section>]>
  let allSections = Object.fromEntries(allSectionsEntries)

  return (
    <html
      lang={validLocale}
      dir={validLocale === 'ar' ? 'rtl' : 'ltr'}
      className="h-full"
      suppressHydrationWarning
    >
      <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
        <Providers>
          <LocaleProvider locale={validLocale} translations={translations}>
            <div className="w-full">
              <Layout allSections={allSections}>{children}</Layout>
            </div>
          </LocaleProvider>
        </Providers>
      </body>
    </html>
  )
}
