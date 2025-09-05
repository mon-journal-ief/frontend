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
export function calculateProjectedCycle(birthdate: Date | string | null | undefined): number | null {
  const age = calculateAge(birthdate)
  if (age === null || age === undefined) return null

  if (age < 6) return 1 // Cycle 1: Maternelle
  if (age < 9) return 2 // Cycle 2: CP, CE1, CE2
  if (age < 12) return 3 // Cycle 3: CM1, CM2, 6ème
  if (age < 15) return 4 // Cycle 4: Cinquième, Quatrième, Troisième

  return 5 // Cycle 5: Seconde, Première, Terminale
}
