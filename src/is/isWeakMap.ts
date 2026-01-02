/**
 * Checks if value is a WeakMap object.
 *
 * @param value - The value to check
 * @returns Returns true if value is a WeakMap object, else false
 *
 * @example
 * isWeakMap(new WeakMap()) // => true
 * isWeakMap(new Map()) // => false
 * isWeakMap({}) // => false
 */
export function isWeakMap(value: unknown): value is WeakMap<any, any> {
  return Object.prototype.toString.call(value) === '[object WeakMap]';
}

export default isWeakMap;
