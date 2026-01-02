/**
 * Removes falsy values from an array
 * @param array The array to compact
 * @returns A new array with falsy values removed
 * @example
 * compact([0, 1, false, 2, '', 3, null, undefined, 4]); // [1, 2, 3, 4]
 */
export function compact<T>(array: (T | null | undefined | false | 0 | '')[]): T[] {
  if (!Array.isArray(array)) {
    return [];
  }

  return array.filter((item) => Boolean(item)) as T[];
}
