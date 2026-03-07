const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
})

export function FormattedDate({
  date,
  ...props
}: React.ComponentPropsWithoutRef<'time'> & { date: string | Date }) {
  const d = typeof date === 'string' ? new Date(date) : date

  return (
    <time dateTime={d.toISOString()} {...props}>
      {dateFormatter.format(d)}
    </time>
  )
}
