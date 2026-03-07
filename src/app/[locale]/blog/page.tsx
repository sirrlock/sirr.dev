import { type Metadata } from 'next'

import { FormattedDate } from '@/components/blog/FormattedDate'
import { SparkleIcon } from '@/components/blog/SparkleIcon'
import { type Locale, isValidLocale } from '@/i18n/config'
import { getTranslations, t } from '@/i18n/server'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'What we shipped this week. Progress updates, new features, and behind-the-scenes notes from the Sirr team.',
}

interface BlogPost {
  date: string
  title: string
  body: string
  highlights: string[]
}

function getBlogPosts(translations: Record<string, unknown>): BlogPost[] {
  const blog = translations.blog as Record<string, unknown> | undefined
  if (!blog) return []
  const posts = blog.posts
  if (!Array.isArray(posts)) return []
  return posts as BlogPost[]
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale: Locale = isValidLocale(locale) ? locale : 'en'
  const translations = await getTranslations(validLocale)
  const posts = getBlogPosts(translations)

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Hero */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          {t(translations, 'blog.title')}
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          {t(translations, 'blog.subtitle')}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute top-0 bottom-0 left-0 hidden w-px bg-zinc-200 dark:bg-zinc-800 sm:block" />

        <div className="space-y-16 sm:space-y-20">
          {posts.map((post, i) => (
            <article key={i} className="relative sm:pl-10">
              {/* Timeline dot */}
              <div className="absolute top-1.5 left-[-4.5px] hidden h-2.5 w-2.5 rounded-full border-2 border-brand-500 bg-white dark:bg-zinc-900 sm:block" />

              {/* Date */}
              <FormattedDate
                date={post.date}
                className="text-2xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-500"
              />

              {/* Title */}
              <h2
                id={`post-${i}`}
                className="mt-3 text-xl font-semibold text-zinc-900 dark:text-white"
              >
                {post.title}
              </h2>

              {/* Body */}
              <p className="mt-3 text-sm/6 text-zinc-600 dark:text-zinc-400">
                {post.body}
              </p>

              {/* Highlights */}
              {post.highlights.length > 0 && (
                <div className="mt-6">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
                    <SparkleIcon className="h-4 w-4" />
                    Highlights
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {post.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-brand-500" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Separator */}
              {i < posts.length - 1 && (
                <div className="mt-12 border-t border-zinc-100 dark:border-zinc-800/50" />
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
