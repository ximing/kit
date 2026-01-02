/**
 * Checks if value is classified as a Function object.
 *
 * @param value - The value to check
 * @returns Returns true if value is a function, else false
 *
 * @example
 * isFunction(() => {}) // => true
 * isFunction(function() {}) // => true
 * isFunction(class MyClass {}) // => true
 * isFunction({}) // => false
 */
export function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function';
}

export default isFunction;
