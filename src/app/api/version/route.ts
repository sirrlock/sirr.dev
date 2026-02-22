import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({
    sha: process.env.BUILD_SHA ?? 'unknown',
    build: process.env.BUILD_NUMBER ?? 'unknown',
    name: 'sirr.dev',
  })
}
