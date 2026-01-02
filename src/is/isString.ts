/**
 * Checks if value is classified as a String primitive or object.
 *
 * @param value - The value to check
 * @returns Returns true if value is a string, else false
 *
 * @example
 * isString('abc') // => true
 * isString(new String('abc')) // => true
 * isString(123) // => false
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export default isString;
