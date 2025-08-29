/**
 * Calculate age from birthdate
 * @param birthdate - The birthdate as a Date object or string
 * @returns The age in years, or null if birthdate is not provided
 */
export function calculateAge(birthdate: Date | string | null | undefined): number | null {
  if (!birthdate) return null

  const today = new Date()
  const birth = new Date(birthdate)

  // Check if the date is valid
  if (Number.isNaN(birth.getTime())) return null

  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  // If birthday hasn't occurred this year yet, subtract 1
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age >= 0 ? age : null
}

/**
 * Calculate projected grade based on birthdate
 * @param birthdate - The birthdate as a Date object or string
 * @returns The projected grade or null if birthdate is not provided
 */
export function calculateProjectedGrade(birthdate: Date | string | null | undefined): string | null {
  const age = calculateAge(birthdate)
  if (age === null || age === undefined) return null

  if (age < 6) return 'Maternelle'
  if (age < 7) return 'CP'
  if (age < 8) return 'CE1'
  if (age < 9) return 'CE2'
  if (age < 10) return 'CM1'
  if (age < 11) return 'CM2'
  if (age < 12) return 'Sixième'
  if (age < 13) return 'Cinquième'
  if (age < 14) return 'Quatrième'
  if (age < 15) return 'Troisième'
  if (age < 16) return 'Seconde'
  if (age < 17) return 'Première'

  return 'Terminale'
}
