/**
 * Finds the index of the first element that matches the predicate
 * @param array The array to search
 * @param predicate The function to test each element
 * @returns The index of the first matching element, or -1 if not found
 * @example
 * findIndex([1, 2, 3, 4], (item) => item > 2); // 2
 * findIndex([1, 2, 3], (item) => item > 5); // -1
 */
export function findIndex<T>(array: T[], predicate: (item: T, index: number) => boolean): number {
  if (!Array.isArray(array)) {
    return -1;
  }

  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i)) {
      return i;
    }
  }

  return -1;
}
