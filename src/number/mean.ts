/**
 * Computes the mean (average) of the values in array.
 *
 * @param numbers - The array of numbers to average
 * @returns Returns the mean
 *
 * @example
 * mean([1, 2, 3, 4]) // => 2.5
 * mean([]) // => 0
 * mean([5]) // => 5
 */
export function mean(numbers: number[]): number {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return 0;
  }

  const sum = numbers.reduce((total, num) => total + num, 0);
  return sum / numbers.length;
}

export default mean;