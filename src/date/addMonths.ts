/**
 * Adds the specified number of months to the given date.
 *
 * @param date - The date to modify
 * @param amount - The number of months to add (can be negative)
 * @returns A new Date object with the months added
 *
 * @example
 * addMonths(new Date('2024-01-15'), 3) // => Date object for 2024-04-15
 * addMonths(new Date('2024-01-15'), -2) // => Date object for 2023-11-15
 */
export function addMonths(date: Date, amount: number): Date {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return new Date(NaN);
  }

  if (typeof amount !== 'number' || !isFinite(amount)) {
    return new Date(NaN);
  }

  const result = new Date(date);
  result.setMonth(result.getMonth() + Math.floor(amount));
  return result;
}
