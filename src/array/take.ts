/**
 * Takes the first n elements from an array
 * @param array The array to process
 * @param n The number of elements to take
 * @returns A new array with the first n elements
 * @example
 * take([1, 2, 3, 4, 5], 2); // [1, 2]
 * take([1, 2, 3], 5); // [1, 2, 3]
 */
export function take<T>(array: T[], n: number = 1): T[] {
  if (!Array.isArray(array) || n <= 0) {
    return [];
  }

  return array.slice(0, n);
}
