/**
 * Checks if value is a RegExp object.
 *
 * @param value - The value to check
 * @returns Returns true if value is a RegExp object, else false
 *
 * @example
 * isRegExp(/abc/) // => true
 * isRegExp(new RegExp('abc')) // => true
 * isRegExp('/abc/') // => false
 */
export function isRegExp(value: unknown): value is RegExp {
  return Object.prototype.toString.call(value) === '[object RegExp]';
}

export default isRegExp;
