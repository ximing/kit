/**
 * Creates an array of the own enumerable property names of object
 * @param obj - The object to query
 * @returns Returns the array of property names
 * @example
 * keys({ a: 1, b: 2, c: 3 }); // ['a', 'b', 'c']
 */
export function keys<T extends object>(obj: T): Array<keyof T> {
  if (obj == null) {
    return [];
  }
  return Object.keys(obj) as Array<keyof T>;
}
