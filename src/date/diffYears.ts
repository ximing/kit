/**
 * Calculates the number of years between two dates.
 *
 * @param date1 - The first date
 * @param date2 - The second date
 * @returns The number of years between the two dates (positive if date1 > date2)
 *
 * @example
 * diffYears(new Date('2026-01-15'), new Date('2024-01-15')) // => 2
 * diffYears(new Date('2024-01-15'), new Date('2026-01-15')) // => -2
 */
export function diffYears(date1: Date, date2: Date): number {
  if (!(date1 instanceof Date) || isNaN(date1.getTime())) {
    return NaN;
  }

  if (!(date2 instanceof Date) || isNaN(date2.getTime())) {
    return NaN;
  }

  return date1.getFullYear() - date2.getFullYear();
}
