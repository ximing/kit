/**
 * Checks if value is a WeakSet object.
 *
 * @param value - The value to check
 * @returns Returns true if value is a WeakSet object, else false
 *
 * @example
 * isWeakSet(new WeakSet()) // => true
 * isWeakSet(new Set()) // => false
 * isWeakSet({}) // => false
 */
export function isWeakSet(value: unknown): value is WeakSet<any> {
  return Object.prototype.toString.call(value) === '[object WeakSet]';
}

export default isWeakSet;
