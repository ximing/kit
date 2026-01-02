/**
 * Adds the specified number of years to the given date.
 *
 * @param date - The date to modify
 * @param amount - The number of years to add (can be negative)
 * @returns A new Date object with the years added
 *
 * @example
 * addYears(new Date('2024-01-15'), 1) // => Date object for 2025-01-15
 * addYears(new Date('2024-01-15'), -2) // => Date object for 2022-01-15
 */
export function addYears(date: Date, amount: number): Date {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return new Date(NaN);
  }

  if (typeof amount !== 'number' || !isFinite(amount)) {
    return new Date(NaN);
  }

  const result = new Date(date);
  result.setFullYear(result.getFullYear() + Math.floor(amount));
  return result;
}