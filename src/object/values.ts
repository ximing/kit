/**
 * Creates an array of the own enumerable property values of object
 * @param obj - The object to query
 * @returns Returns the array of property values
 * @example
 * values({ a: 1, b: 2, c: 3 }); // [1, 2, 3]
 */
export function values<T extends object>(obj: T): Array<T[keyof T]> {
  if (obj == null) {
    return [];
  }
  return Object.values(obj);
}
