/**
 * Checks if value is undefined.
 *
 * @param value - The value to check
 * @returns Returns true if value is undefined, else false
 *
 * @example
 * isUndefined(undefined) // => true
 * isUndefined(void 0) // => true
 * isUndefined(null) // => false
 * isUndefined(0) // => false
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

export default isUndefined;
