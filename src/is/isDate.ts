/**
 * Checks if value is a Date object.
 *
 * @param value - The value to check
 * @returns Returns true if value is a Date object, else false
 *
 * @example
 * isDate(new Date()) // => true
 * isDate(Date.now()) // => false
 * isDate('2023-01-01') // => false
 */
export function isDate(value: unknown): value is Date {
  return Object.prototype.toString.call(value) === '[object Date]';
}

export default isDate;
