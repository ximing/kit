/**
 * Checks if value is a Map object.
 *
 * @param value - The value to check
 * @returns Returns true if value is a Map object, else false
 *
 * @example
 * isMap(new Map()) // => true
 * isMap(new Map([['a', 1]])) // => true
 * isMap({}) // => false
 * isMap(new WeakMap()) // => false
 */
export function isMap(value: unknown): value is Map<any, any> {
  return Object.prototype.toString.call(value) === '[object Map]';
}

export default isMap;
