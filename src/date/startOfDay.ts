/**
 * Returns a new Date object set to the start of the day (00:00:00.000).
 *
 * @param date - The date to modify
 * @returns A new Date object set to the start of the day
 *
 * @example
 * startOfDay(new Date('2024-01-15T14:30:45.123Z'))
 * // => Date object for 2024-01-15T00:00:00.000Z
 */
export function startOfDay(date: Date): Date {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return new Date(NaN);
  }

  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}