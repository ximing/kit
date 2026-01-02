/**
 * Checks if value is an Error object.
 *
 * @param value - The value to check
 * @returns Returns true if value is an Error object, else false
 *
 * @example
 * isError(new Error()) // => true
 * isError(new TypeError()) // => true
 * isError('error') // => false
 * isError({ message: 'error' }) // => false
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error || Object.prototype.toString.call(value) === '[object Error]';
}

export default isError;
