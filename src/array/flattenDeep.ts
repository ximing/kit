/**
 * Deeply flattens an array
 * @param array The array to flatten
 * @returns A new completely flattened array
 * @example
 * flattenDeep([1, [2, [3, [4]]]]); // [1, 2, 3, 4]
 */
export function flattenDeep<T>(array: readonly unknown[]): T[] {
  if (!Array.isArray(array)) {
    return [];
  }

  const result: T[] = [];

  for (const item of array) {
    if (Array.isArray(item)) {
      result.push(...flattenDeep<T>(item));
    } else {
      result.push(item as T);
    }
  }

  return result;
}
