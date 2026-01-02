/**
 * Computes the maximum value of array.
 * If array is empty or falsey, undefined is returned.
 *
 * @param numbers - The array of numbers to get the maximum from
 * @returns Returns the maximum value
 *
 * @example
 * max([1, 2, 3, 4]) // => 4
 * max([]) // => undefined
 * max([1.5, 2.5, 3]) // => 3
 */
export function max(numbers: number[]): number | undefined {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return undefined;
  }

  return Math.max(...numbers);
}

export default max;
