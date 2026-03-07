import nextMDX from '@next/mdx'
import { withSentryConfig } from '@sentry/nextjs'
import { execFileSync } from 'child_process'

import { recmaPlugins } from './src/mdx/recma.mjs'
import { rehypePlugins } from './src/mdx/rehype.mjs'
import { remarkPlugins } from './src/mdx/remark.mjs'
import withSearch from './src/mdx/search.mjs'

const git = (...args) => {
  try {
    return execFileSync('git', args).toString().trim()
  } catch {
    return null
  }
}

const buildSha =
  process.env.BUILD_SHA || git('rev-parse', '--short', 'HEAD') || 'unknown'
const buildTime = new Date().toISOString().replace(/[-T:]/g, '').slice(0, 12)
const buildVersion = `1.0.${buildTime}-${buildSha}`

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  outputFileTracingIncludes: {
    '/**/*': ['./src/app/**/*.mdx'],
  },
  env: {
    BUILD_SHA: buildSha,
    BUILD_VERSION: buildVersion,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          has: [{ type: 'host', value: 'get.sirr.dev' }],
          source: '/',
          destination: '/install.sh',
        },
      ],
    }
  },
}

export default withSentryConfig(withSearch(withMDX(nextConfig)), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'sirrlock',

  project: 'sirrdev',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
})
