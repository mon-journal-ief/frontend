function frenchOrdinal(n: number) {
  return n === 1 ? '1er' : `${n}`
}

/**
 * output dates look like this:
 * 1er janvier 2025
 * 2 février 2025
 */
export default function useDateFormatter(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
  const d = new Date(date)
  // Get the day as a number
  const day = d.getDate()
  // Format the date
  let formatted = d.toLocaleDateString('fr-FR', options)
  // Replace the day number with the ordinal
  // This regex matches the day number surrounded by spaces (to avoid replacing in year)
  formatted = formatted.replace(
    new RegExp(`\\b${day}\\b`),
    frenchOrdinal(day),
  )

  return formatted
}
