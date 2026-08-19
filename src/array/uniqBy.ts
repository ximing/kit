/**
 * Removes duplicate values from an array based on a predicate function
 * @param array The array to deduplicate
 * @param iteratee The function to compute the value to check for uniqueness
 * @returns A new array with duplicate values removed
 * @example
 * uniqBy([{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 1, name: 'c' }], (item) => item.id);
 * // [{ id: 1, name: 'a' }, { id: 2, name: 'b' }]
 */
export function uniqBy<T, K = unknown>(array: T[], iteratee: (item: T) => K): T[] {
  if (!Array.isArray(array)) {
    return [];
  }

  const seen = new Set<K>();
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
