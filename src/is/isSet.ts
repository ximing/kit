/**
 * Checks if value is a Set object.
 *
 * @param value - The value to check
 * @returns Returns true if value is a Set object, else false
 *
 * @example
 * isSet(new Set()) // => true
 * isSet(new Set([1, 2, 3])) // => true
 * isSet([]) // => false
 * isSet(new WeakSet()) // => false
 */
export function isSet(value: unknown): value is Set<any> {
  return Object.prototype.toString.call(value) === '[object Set]';
}

export default isSet;
