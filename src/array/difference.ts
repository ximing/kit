/**
 * Creates an array of unique values that are in the first array but not in the other arrays
 * @param array The array to process
 * @param arrays The arrays to exclude
 * @returns A new array of unique values
 * @example
 * difference([1, 2, 3], [2, 3, 4]); // [1]
 * difference([1, 2, 3, 4], [2, 4], [3]); // [1]
 */
export function difference<T>(array: T[], ...arrays: T[][]): T[] {
  if (!Array.isArray(array)) {
    return [];
  }

  const excludeSet = new Set<T>();
  for (const arr of arrays) {
    if (Array.isArray(arr)) {
      for (const item of arr) {
        excludeSet.add(item);
      }
    }
  }

  const result: T[] = [];
  const seen = new Set<T>();

  for (const item of array) {
    if (!excludeSet.has(item) && !seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }

  return result;
}
