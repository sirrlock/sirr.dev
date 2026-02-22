import { execFileSync } from 'child_process'
import nextMDX from '@next/mdx'

import { recmaPlugins } from './src/mdx/recma.mjs'
import { rehypePlugins } from './src/mdx/rehype.mjs'
import { remarkPlugins } from './src/mdx/remark.mjs'
import withSearch from './src/mdx/search.mjs'

const git = (...args) => { try { return execFileSync('git', args).toString().trim() } catch { return 'unknown' } }

const buildSha = git('rev-parse', '--short', 'HEAD')
const buildTime = new Date().toISOString().replace(/[-T:]/g, '').slice(0, 14)
const buildVersion = `1.0.${buildTime}`

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
}

export default withSearch(withMDX(nextConfig))
