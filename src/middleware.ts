import { type NextRequest, NextResponse } from 'next/server'

import { defaultLocale, locales } from '@/i18n/config'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Let get.sirr.dev pass through — the rewrite in next.config.mjs serves install.sh
  if (request.headers.get('host')?.startsWith('get.')) return

  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next|favicon\\.ico|images|.*\\..*).*)'],
}
