export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 70 24" aria-hidden="true" {...props}>
      <text
        x="0"
        y="18"
        className="fill-zinc-900 dark:fill-white"
        style={{
          fontSize: '20px',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}
      >
        <tspan className="fill-brand-400">{'{ '}</tspan>
        sirr
        <tspan className="fill-brand-400">{' }'}</tspan>
      </text>
    </svg>
  )
}
