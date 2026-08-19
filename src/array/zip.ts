/**
 * Creates an array of grouped elements, the first of which contains the first elements of the given arrays
 * @param arrays The arrays to process
 * @returns A new array of grouped elements
 * @example
 * zip(['a', 'b', 'c'], [1, 2, 3]); // [['a', 1], ['b', 2], ['c', 3]]
 * zip(['a', 'b'], [1, 2, 3]); // [['a', 1], ['b', 2]]
 */
export function zip<T>(...arrays: T[][]): T[][] {
  if (arrays.length === 0) {
    return [];
  }

  // Find the minimum length among all arrays
  const minLength = Math.min(...arrays.filter((arr) => Array.isArray(arr)).map((arr) => arr.length));

  if (minLength === Infinity || minLength <= 0) {
    return [];
  }

  const result: T[][] = [];

  for (let i = 0; i < minLength; i++) {
    const group: T[] = [];
    for (const array of arrays) {
      if (Array.isArray(array)) {
        group.push(array[i]);
      }
    }
    result.push(group);
  }

  return result;
}
