/**
 * Adds the specified number of days to the given date.
 *
 * @param date - The date to modify
 * @param amount - The number of days to add (can be negative)
 * @returns A new Date object with the days added
 *
 * @example
 * addDays(new Date('2024-01-15'), 5) // => Date object for 2024-01-20
 * addDays(new Date('2024-01-15'), -3) // => Date object for 2024-01-12
 */
export function addDays(date: Date, amount: number): Date {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return new Date(NaN);
  }

  if (typeof amount !== 'number' || !isFinite(amount)) {
    return new Date(NaN);
  }

  const result = new Date(date);
  result.setDate(result.getDate() + Math.floor(amount));
  return result;
}