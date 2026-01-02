/**
 * Creates an array of unique values that are in any of the given arrays
 * @param arrays The arrays to process
 * @returns A new array of unique values from all arrays
 * @example
 * union([1, 2, 3], [2, 3, 4]); // [1, 2, 3, 4]
 * union([1, 2], [3, 4], [2, 5]); // [1, 2, 3, 4, 5]
 */
export function union<T>(...arrays: T[][]): T[] {
  const result: T[] = [];
  const seen = new Set<T>();

  for (const array of arrays) {
    if (Array.isArray(array)) {
      for (const item of array) {
        if (!seen.has(item)) {
          seen.add(item);
          result.push(item);
        }
      }
    }
  }

  return result;
}
