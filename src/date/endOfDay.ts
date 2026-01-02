/**
 * Returns a new Date object set to the end of the day (23:59:59.999).
 *
 * @param date - The date to modify
 * @returns A new Date object set to the end of the day
 *
 * @example
 * endOfDay(new Date('2024-01-15T14:30:45.123Z'))
 * // => Date object for 2024-01-15T23:59:59.999Z
 */
export function endOfDay(date: Date): Date {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return new Date(NaN);
  }

  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}