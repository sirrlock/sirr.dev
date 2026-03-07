import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({
    name: 'sirr.dev',
    version: process.env.BUILD_VERSION ?? 'unknown',
    sha: process.env.BUILD_SHA ?? 'unknown',
  })
}
