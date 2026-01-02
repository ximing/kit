/**
 * Checks if value is a Promise object.
 *
 * @param value - The value to check
 * @returns Returns true if value is a Promise object, else false
 *
 * @example
 * isPromise(Promise.resolve(1)) // => true
 * isPromise(new Promise(() => {})) // => true
 * isPromise(async () => {}) // => false
 * isPromise({ then: () => {} }) // => false
 */
export function isPromise(value: unknown): value is Promise<any> {
  return Object.prototype.toString.call(value) === '[object Promise]';
}

export default isPromise;
