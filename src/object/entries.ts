/**
 * Creates an array of own enumerable string keyed-value pairs for object
 * @param obj - The object to query
 * @returns Returns the key-value pairs
 * @example
 * entries({ a: 1, b: 2, c: 3 }); // [['a', 1], ['b', 2], ['c', 3]]
 */
export function entries<T extends object>(
  obj: T
): Array<[keyof T, T[keyof T]]> {
  if (obj == null) {
    return [];
  }
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}