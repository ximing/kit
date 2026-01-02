/**
 * Calculates the number of months between two dates.
 *
 * @param date1 - The first date
 * @param date2 - The second date
 * @returns The number of months between the two dates (positive if date1 > date2)
 *
 * @example
 * diffMonths(new Date('2024-04-15'), new Date('2024-01-15')) // => 3
 * diffMonths(new Date('2024-01-15'), new Date('2024-04-15')) // => -3
 */
export function diffMonths(date1: Date, date2: Date): number {
  if (!(date1 instanceof Date) || isNaN(date1.getTime())) {
    return NaN;
  }

  if (!(date2 instanceof Date) || isNaN(date2.getTime())) {
    return NaN;
  }

  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();
  const year2 = date2.getFullYear();
  const month2 = date2.getMonth();

  return (year1 - year2) * 12 + (month1 - month2);
}
