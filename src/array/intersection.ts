/**
 * Creates an array of unique values that are included in all given arrays
 * @param arrays The arrays to process
 * @returns A new array of unique values present in all arrays
 * @example
 * intersection([1, 2, 3], [2, 3, 4]); // [2, 3]
 * intersection([1, 2, 3], [2, 3, 4], [2, 3, 5]); // [2, 3]
 */
export function intersection<T>(...arrays: T[][]): T[] {
  if (arrays.length === 0) {
    return [];
  }

  const firstArray = arrays[0];
  if (!Array.isArray(firstArray)) {
    return [];
  }

  // Create sets from all other arrays for efficient lookup
  const otherSets = arrays.slice(1).map((arr) => new Set(arr));

  const result: T[] = [];
  const seen = new Set<T>();

  for (const item of firstArray) {
    // Check if item exists in all other arrays
    if (otherSets.every((set) => set.has(item)) && !seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }

  return result;
}
