/**
 * Calculates the number of days between two dates.
 *
 * @param date1 - The first date
 * @param date2 - The second date
 * @returns The number of days between the two dates (positive if date1 > date2)
 *
 * @example
 * diffDays(new Date('2024-01-20'), new Date('2024-01-15')) // => 5
 * diffDays(new Date('2024-01-15'), new Date('2024-01-20')) // => -5
 */
export function diffDays(date1: Date, date2: Date): number {
  if (!(date1 instanceof Date) || isNaN(date1.getTime())) {
    return NaN;
  }

  if (!(date2 instanceof Date) || isNaN(date2.getTime())) {
    return NaN;
  }

  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  return Math.floor((date1.getTime() - date2.getTime()) / MS_PER_DAY);
}