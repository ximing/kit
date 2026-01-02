/**
 * Flattens an array to a specified depth
 * @param array The array to flatten
 * @param depth The depth to flatten to (default: 1)
 * @returns A new flattened array
 * @example
 * flatten([1, [2, 3], [4, [5]]]); // [1, 2, 3, 4, [5]]
 * flatten([1, [2, 3], [4, [5]]], 2); // [1, 2, 3, 4, 5]
 */
export function flatten<T>(array: any[], depth: number = 1): T[] {
  if (!Array.isArray(array)) {
    return [];
  }

  if (depth <= 0) {
    return array as T[];
  }

  const result: T[] = [];

  for (const item of array) {
    if (Array.isArray(item) && depth > 0) {
      result.push(...(flatten(item, depth - 1) as any));
    } else {
      result.push(item as T);
    }
  }

  return result;
}

/**
 * Deeply flattens an array
 * @param array The array to flatten
 * @returns A new completely flattened array
 * @example
 * flattenDeep([1, [2, [3, [4]]]]); // [1, 2, 3, 4]
 */
export function flattenDeep<T>(array: any[]): T[] {
  if (!Array.isArray(array)) {
    return [];
  }

  const result: T[] = [];

  for (const item of array) {
    if (Array.isArray(item)) {
      result.push(...(flattenDeep(item) as any));
    } else {
      result.push(item as T);
    }
  }

  return result;
}
