import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title') || 'Sirr'
  const description =
    searchParams.get('description') ||
    'The ephemeral secret vault built for the AI era.'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 80px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #184f8d, #6ba3d9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 20 20"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 1a4.5 4.5 0 0 0-4.5 4.5V8h-1A1.5 1.5 0 0 0 3 9.5v8A1.5 1.5 0 0 0 4.5 19h11a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 15.5 8h-1V5.5A4.5 4.5 0 0 0 10 1Z"
                />
              </svg>
            </div>
            <span
              style={{
                fontSize: '28px',
                fontWeight: 600,
                color: '#94a3b8',
                letterSpacing: '0.05em',
              }}
            >
              sirr.dev
            </span>
          </div>
          <div
            style={{
              fontSize: '56px',
              fontWeight: 700,
              color: '#f8fafc',
              lineHeight: 1.15,
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#94a3b8',
              lineHeight: 1.5,
              maxWidth: '800px',
            }}
          >
            {description}
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '18px',
            color: '#64748b',
          }}
        >
          Every secret expires. By design.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
