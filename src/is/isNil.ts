/**
 * Checks if value is null or undefined.
 *
 * @param value - The value to check
 * @returns Returns true if value is null or undefined, else false
 *
 * @example
 * isNil(null) // => true
 * isNil(undefined) // => true
 * isNil(void 0) // => true
 * isNil(0) // => false
 * isNil('') // => false
 */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

export default isNil;
