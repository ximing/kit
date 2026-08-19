/**
 * Drops the first n elements from an array
 * @param array The array to process
 * @param n The number of elements to drop
 * @returns A new array without the first n elements
 * @example
 * drop([1, 2, 3, 4, 5], 2); // [3, 4, 5]
 * drop([1, 2, 3], 5); // []
 */
export function drop<T>(array: T[], n: number = 1): T[] {
  if (!Array.isArray(array)) {
    return [];
  }

  if (n <= 0) {
    return array;
  }

  return array.slice(n);
}
