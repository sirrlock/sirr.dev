'use client'

import clsx from 'clsx'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'

import { Button } from '@/components/Button'
import { useIsInsideMobileNavigation } from '@/components/MobileNavigation'
import { useSectionStore } from '@/components/SectionProvider'
import { Tag } from '@/components/Tag'
import { useLocale } from '@/i18n/client'
import { remToPx } from '@/lib/remToPx'
import { CloseButton } from '@headlessui/react'

interface NavGroup {
  title: string
  links: Array<{
    title: string
    href: string
  }>
}

function useInitialValue<T>(value: T, condition = true) {
  let initialValue = useRef(value).current
  return condition ? initialValue : value
}

function TopLevelNavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <li className="md:hidden">
      <CloseButton
        as={Link}
        href={href}
        className="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </CloseButton>
    </li>
  )
}

function NavLink({
  href,
  children,
  tag,
  active = false,
  isAnchorLink = false,
}: {
  href: string
  children: React.ReactNode
  tag?: string
  active?: boolean
  isAnchorLink?: boolean
}) {
  return (
    <CloseButton
      as={Link}
      href={href}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex justify-between gap-2 py-1 pr-3 text-sm transition',
        isAnchorLink ? 'pl-7' : 'pl-4',
        active
          ? 'text-zinc-900 dark:text-white'
          : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white',
      )}
    >
      <span className="truncate">{children}</span>
      {tag && (
        <Tag variant="small" color="zinc">
          {tag}
        </Tag>
      )}
    </CloseButton>
  )
}

function VisibleSectionHighlight({
  group,
  pathname,
}: {
  group: NavGroup
  pathname: string
}) {
  let [sections, visibleSections] = useInitialValue(
    [
      useSectionStore((s) => s.sections),
      useSectionStore((s) => s.visibleSections),
    ],
    useIsInsideMobileNavigation(),
  )

  let isPresent = useIsPresent()
  let firstVisibleSectionIndex = Math.max(
    0,
    [{ id: '_top' }, ...sections].findIndex(
      (section) => section.id === visibleSections[0],
    ),
  )
  let itemHeight = remToPx(2)
  let height = isPresent
    ? Math.max(1, visibleSections.length) * itemHeight
    : itemHeight
  let top =
    group.links.findIndex((link) => link.href === pathname) * itemHeight +
    firstVisibleSectionIndex * itemHeight

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"
      style={{ borderRadius: 8, height, top }}
    />
  )
}

function ActivePageMarker({
  group,
  pathname,
}: {
  group: NavGroup
  pathname: string
}) {
  let itemHeight = remToPx(2)
  let offset = remToPx(0.25)
  let activePageIndex = group.links.findIndex((link) => link.href === pathname)
  let top = offset + activePageIndex * itemHeight

  return (
    <motion.div
      layout
      className="absolute left-2 h-6 w-px bg-emerald-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  )
}

function NavigationGroup({
  group,
  className,
}: {
  group: NavGroup
  className?: string
}) {
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  let [pathname, sections] = useInitialValue(
    [usePathname(), useSectionStore((s) => s.sections)],
    isInsideMobileNavigation,
  )

  let isActiveGroup =
    group.links.findIndex((link) => link.href === pathname) !== -1

  return (
    <li className={clsx('relative mt-6', className)}>
      <motion.h2
        layout="position"
        className="text-xs font-semibold text-zinc-900 dark:text-white"
      >
        {group.title}
      </motion.h2>
      <div className="relative mt-3 pl-2">
        <AnimatePresence initial={!isInsideMobileNavigation}>
          {isActiveGroup && (
            <VisibleSectionHighlight group={group} pathname={pathname} />
          )}
        </AnimatePresence>
        <motion.div
          layout
          className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
        />
        <AnimatePresence initial={false}>
          {isActiveGroup && (
            <ActivePageMarker group={group} pathname={pathname} />
          )}
        </AnimatePresence>
        <ul role="list" className="border-l border-transparent">
          {group.links.map((link) => (
            <motion.li key={link.href} layout="position" className="relative">
              <NavLink href={link.href} active={link.href === pathname}>
                {link.title}
              </NavLink>
              <AnimatePresence mode="popLayout" initial={false}>
                {link.href === pathname && sections.length > 0 && (
                  <motion.ul
                    role="list"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 0.1 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15 },
                    }}
                  >
                    {sections.map((section) => (
                      <li key={section.id}>
                        <NavLink
                          href={`${link.href}#${section.id}`}
                          tag={section.tag}
                          isAnchorLink
                        >
                          {section.title}
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export function useNavigation(): Array<NavGroup> {
  const { locale, t } = useLocale()
  const prefix = `/${locale}`

  return [
    {
      title: t('nav.groups.guides'),
      links: [
        { title: t('nav.links.introduction'), href: `${prefix}` },
        { title: t('nav.links.quickstart'), href: `${prefix}/quickstart` },
        { title: t('nav.links.architecture'), href: `${prefix}/architecture` },
        {
          title: t('nav.links.configuration'),
          href: `${prefix}/configuration`,
        },
        {
          title: t('nav.links.authentication'),
          href: `${prefix}/authentication`,
        },
        { title: t('nav.links.errors'), href: `${prefix}/errors` },
        { title: t('nav.links.sdks'), href: `${prefix}/sdks` },
      ],
    },
    {
      title: t('nav.groups.server'),
      links: [
        { title: t('nav.links.apiReference'), href: `${prefix}/api-reference` },
        { title: t('nav.links.deployment'), href: `${prefix}/deployment` },
        { title: t('nav.links.selfHosting'), href: `${prefix}/self-hosting` },
        { title: t('nav.links.security'), href: `${prefix}/security` },
        { title: t('nav.links.licensing'), href: `${prefix}/licensing` },
      ],
    },
    {
      title: t('nav.groups.tools'),
      links: [
        { title: t('nav.links.cli'), href: `${prefix}/cli` },
        { title: t('nav.links.mcp'), href: `${prefix}/mcp` },
        { title: t('nav.links.aiWorkflows'), href: `${prefix}/ai-workflows` },
      ],
    },
  ]
}

// Static navigation for search indexing and footer page navigation
export const navigation: Array<NavGroup> = [
  {
    title: 'Guides',
    links: [
      { title: 'Introduction', href: '/' },
      { title: 'Quickstart', href: '/quickstart' },
      { title: 'Architecture', href: '/architecture' },
      { title: 'Configuration', href: '/configuration' },
      { title: 'Authentication', href: '/authentication' },
      { title: 'Errors', href: '/errors' },
      { title: 'SDKs', href: '/sdks' },
    ],
  },
  {
    title: 'Server',
    links: [
      { title: 'API Reference', href: '/api-reference' },
      { title: 'Deployment', href: '/deployment' },
      { title: 'Self-Hosting', href: '/self-hosting' },
      { title: 'Security', href: '/security' },
      { title: 'Licensing', href: '/licensing' },
    ],
  },
  {
    title: 'Tools',
    links: [
      { title: 'CLI Reference', href: '/cli' },
      { title: 'MCP Server', href: '/mcp' },
      { title: 'AI Workflows', href: '/ai-workflows' },
    ],
  },
]

export function Navigation(props: React.ComponentPropsWithoutRef<'nav'>) {
  const navGroups = useNavigation()
  const { locale, t } = useLocale()

  return (
    <nav {...props}>
      <ul role="list">
        <TopLevelNavItem href={`/${locale}`}>
          {t('nav.topLevel.docs')}
        </TopLevelNavItem>
        <TopLevelNavItem href="https://github.com/SirrVault/sirr">
          {t('nav.topLevel.github')}
        </TopLevelNavItem>
        {navGroups.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 ? 'md:mt-0' : ''}
          />
        ))}
      </ul>
    </nav>
  )
}
