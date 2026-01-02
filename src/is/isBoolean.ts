/**
 * Checks if value is classified as a Boolean primitive or object.
 *
 * @param value - The value to check
 * @returns Returns true if value is a boolean, else false
 *
 * @example
 * isBoolean(false) // => true
 * isBoolean(true) // => true
 * isBoolean(new Boolean(true)) // => false (primitive check only)
 * isBoolean(1) // => false
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export default isBoolean;
