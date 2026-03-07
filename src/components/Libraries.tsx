'use client'

import Image from 'next/image'

import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'
import { useLocale } from '@/i18n/client'
import logoNode from '@/images/logos/node.svg'
import logoPython from '@/images/logos/python.svg'

const logoMap: Record<string, typeof logoNode | null> = {
  'Node.js': logoNode,
  Python: logoPython,
  '.NET': null,
  'Rust CLI': null,
}

function LanguageIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const logo = logoMap[name]
  if (logo) {
    return <Image src={logo} alt="" className={className} unoptimized />
  }

  // Fallback text icon for languages without a logo image
  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-100 text-xs font-bold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 ${className ?? ''}`}
    >
      {name === '.NET' ? '.N' : 'Rs'}
    </div>
  )
}

export function Libraries() {
  const { t, translations } = useLocale()
  const libraries = (translations.libraries ?? []) as Array<{
    name: string
    description: string
    href: string
  }>

  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="official-libraries">
        {t('common.officialLibraries')}
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-x-6 gap-y-10 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:max-w-none xl:grid-cols-3 dark:border-white/5">
        {libraries.map((library) => (
          <div key={library.name} className="flex flex-row-reverse gap-6">
            <div className="flex-auto">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                {library.name}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {library.description}
              </p>
              <p className="mt-4">
                <Button href={library.href} variant="text" arrow="right">
                  {t('common.readMore')}
                </Button>
              </p>
            </div>
            <LanguageIcon name={library.name} className="h-12 w-12" />
          </div>
        ))}
      </div>
    </div>
  )
}
