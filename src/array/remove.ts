/**
 * Returns items that match the predicate without mutating the input
 * @param array The array to filter
 * @param predicate The function to test each element
 * @returns A new array of matching (removed) elements
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * remove(arr, (item) => item > 3); // [4, 5]
 * // arr is still [1, 2, 3, 4, 5]
 */
export function remove<T>(
  array: readonly T[],
  predicate: (item: T, index: number) => boolean,
): T[] {
  if (!Array.isArray(array)) {
    return [];
  }
  return array.filter((item, index) => predicate(item, index));
}
