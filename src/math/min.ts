/**
 * Computes the minimum value of array.
 * If array is empty or falsey, undefined is returned.
 *
 * @param numbers - The array of numbers to get the minimum from
 * @returns Returns the minimum value
 *
 * @example
 * min([1, 2, 3, 4]) // => 1
 * min([]) // => undefined
 * min([1.5, 2.5, 3]) // => 1.5
 */
export function min(numbers: number[]): number | undefined {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return undefined;
  }

  return Math.min(...numbers);
}

export default min;
