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

/**
 * Drops the first n elements from an array
 * @param array The array to process
 * @param n The number of elements to drop
 * @returns A new array without the first n elements
 * @example
 * drop([1, 2, 3, 4, 5], 2); // [3, 4, 5]
 * drop([1, 2, 3], 5); // []
 */
export function drop<T>(array: T[], n: number = 1): T[] {
  if (!Array.isArray(array)) {
    return [];
  }

  if (n <= 0) {
    return array;
  }

  return array.slice(n);
}
