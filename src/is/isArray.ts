/**
 * Checks if value is classified as an Array object.
 *
 * @param value - The value to check
 * @returns Returns true if value is an array, else false
 *
 * @example
 * isArray([1, 2, 3]) // => true
 * isArray('abc') // => false
 * isArray({ length: 0 }) // => false
 */
export function isArray(value: unknown): value is any[] {
  return Array.isArray(value);
}

export default isArray;
