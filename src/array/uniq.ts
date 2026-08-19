/**
 * Removes duplicate values from an array
 * @param array The array to deduplicate
 * @returns A new array with duplicate values removed
 * @example
 * uniq([1, 2, 2, 3, 3, 3]); // [1, 2, 3]
 * uniq(['a', 'b', 'a', 'c']); // ['a', 'b', 'c']
 */
export function uniq<T>(array: T[]): T[] {
  if (!Array.isArray(array)) {
    return [];
  }

  return Array.from(new Set(array));
}
