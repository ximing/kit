/**
 * Checks if value is the language type of Object.
 * (e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))
 *
 * @param value - The value to check
 * @returns Returns true if value is an object, else false
 *
 * @example
 * isObject({}) // => true
 * isObject([1, 2, 3]) // => true
 * isObject(() => {}) // => true
 * isObject(null) // => false
 * isObject(undefined) // => false
 * isObject('abc') // => false
 */
export function isObject(value: unknown): value is Record<string, any> {
  return value !== null && (typeof value === 'object' || typeof value === 'function');
}

export default isObject;
