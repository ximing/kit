/**
 * Checks if value is classified as a Number primitive or object.
 *
 * @param value - The value to check
 * @returns Returns true if value is a number, else false
 *
 * @example
 * isNumber(3) // => true
 * isNumber(new Number(3)) // => true
 * isNumber(NaN) // => true
 * isNumber(Infinity) // => true
 * isNumber('3') // => false
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export default isNumber;
