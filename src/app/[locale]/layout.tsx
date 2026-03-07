import glob from 'fast-glob'
import { type Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import path from 'path'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

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

  const siteDescription = t(translations, 'meta.siteDescription')
  const canonicalUrl = `https://sirr.dev/${validLocale}`

  return {
    metadataBase: new URL('https://sirr.dev'),
    title: {
      template: t(translations, 'meta.siteTitleTemplate'),
      default: t(translations, 'meta.pages./.title'),
    },
    description: siteDescription,
    manifest: '/site.webmanifest',
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        locales.map((l) => [l, `https://sirr.dev/${l}`]),
      ),
    },
    openGraph: {
      type: 'website',
      siteName: 'Sirr Docs',
      locale: validLocale,
      url: canonicalUrl,
      title: t(translations, 'meta.pages./.title'),
      description: siteDescription,
      images: [
        {
          url: '/api/og',
          width: 1200,
          height: 630,
          alt: 'Sirr — The ephemeral secret vault built for the AI era',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t(translations, 'meta.pages./.title'),
      description: siteDescription,
      images: ['/api/og'],
    },
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
      <head>
        {/* JSON-LD structured data — static content only, no user input */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  name: 'Sirr Docs',
                  url: 'https://sirr.dev',
                  description: t(translations, 'meta.siteDescription'),
                },
                {
                  '@type': 'Organization',
                  name: 'Sirrlock',
                  url: 'https://sirrlock.com',
                  logo: 'https://sirr.dev/icon-256x256.png',
                  sameAs: ['https://github.com/sirrlock'],
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`flex min-h-full bg-sirr-bg-light antialiased dark:bg-sirr-bg ${spaceGrotesk.variable}`}>
        <div className="w-full bg-amber-500 text-black text-center text-sm font-medium py-2 px-4 shrink-0 fixed top-0 z-50">
          Free for now while in alpha pre-release-candidate phase
        </div>
        <Providers>
          <LocaleProvider locale={validLocale} translations={translations}>
            <div className="w-full pt-9">
              <Layout allSections={allSections}>{children}</Layout>
            </div>
          </LocaleProvider>
        </Providers>
      </body>
    </html>
  )
}
