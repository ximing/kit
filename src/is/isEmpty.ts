/**
 * Checks if value is empty. A value is considered empty if it is one of the following:
 * - null or undefined
 * - empty string
 * - empty array
 * - empty object (no enumerable properties)
 * - NaN
 *
 * @param value - The value to check
 * @returns Returns true if value is empty, else false
 *
 * @example
 * isEmpty(null) // => true
 * isEmpty(undefined) // => true
 * isEmpty('') // => true
 * isEmpty([]) // => true
 * isEmpty({}) // => true
 * isEmpty(NaN) // => true
 * isEmpty(0) // => false
 * isEmpty(false) // => false
 * isEmpty([0]) // => false
 * isEmpty({ a: 1 }) // => false
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'number') {
    return Number.isNaN(value);
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
}

export default isEmpty;
