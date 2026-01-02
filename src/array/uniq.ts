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

/**
 * Removes duplicate values from an array based on a predicate function
 * @param array The array to deduplicate
 * @param iteratee The function to compute the value to check for uniqueness
 * @returns A new array with duplicate values removed
 * @example
 * uniqBy([{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 1, name: 'c' }], (item) => item.id);
 * // [{ id: 1, name: 'a' }, { id: 2, name: 'b' }]
 */
export function uniqBy<T>(array: T[], iteratee: (item: T) => any): T[] {
  if (!Array.isArray(array)) {
    return [];
  }

  const seen = new Set<any>();
  const result: T[] = [];

  for (const item of array) {
    const computed = iteratee(item);
    if (!seen.has(computed)) {
      seen.add(computed);
      result.push(item);
    }
  }

  return result;
}
