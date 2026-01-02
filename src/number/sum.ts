/**
 * Computes the sum of the values in array.
 *
 * @param numbers - The array of numbers to sum
 * @returns Returns the sum
 *
 * @example
 * sum([1, 2, 3, 4]) // => 10
 * sum([]) // => 0
 * sum([1.5, 2.5, 3]) // => 7
 */
export function sum(numbers: number[]): number {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return 0;
  }

  return numbers.reduce((total, num) => total + num, 0);
}

export default sum;
