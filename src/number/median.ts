/**
 * Computes the median of the values in array.
 *
 * @param numbers - The array of numbers to get median from
 * @returns Returns the median
 *
 * @example
 * median([1, 2, 3, 4, 5]) // => 3
 * median([1, 2, 3, 4]) // => 2.5
 * median([]) // => 0
 */
export function median(numbers: number[]): number {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return 0;
  }

  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }

  return sorted[mid];
}

export default median;
