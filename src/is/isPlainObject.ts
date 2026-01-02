/**
 * Checks if value is a plain object, that is, an object created by the Object constructor
 * or one with a [[Prototype]] of null.
 *
 * @param value - The value to check
 * @returns Returns true if value is a plain object, else false
 *
 * @example
 * isPlainObject({}) // => true
 * isPlainObject({ a: 1 }) // => true
 * isPlainObject(Object.create(null)) // => true
 * isPlainObject([]) // => false
 * isPlainObject(() => {}) // => false
 * isPlainObject(new Date()) // => false
 */
export function isPlainObject(value: unknown): value is Record<string, any> {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  // Handle objects with null prototype
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }

  // Check if it's a plain object by verifying its constructor
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === proto;
}

export default isPlainObject;
