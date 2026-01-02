/**
 * Creates an object composed from the elements of collection grouped by the results of running each element thru iteratee, with counts
 * @param collection - The collection to iterate over
 * @param iteratee - The iteratee to transform keys
 * @returns Returns the composed aggregate object with counts
 * @example
 * const users = [
 *   { name: 'John', age: 30 },
 *   { name: 'Jane', age: 30 },
 *   { name: 'Bob', age: 25 }
 * ];
 * countBy(users, 'age');
 * // => { '30': 2, '25': 1 }
 */
export function countBy<T>(
  collection: T[],
  iteratee: ((item: T, index: number) => string | number) | string,
): Record<string | number, number> {
  const result: Record<string | number, number> = {};

  collection.forEach((item, index) => {
    let key: string | number;

    if (typeof iteratee === 'function') {
      key = iteratee(item, index);
    } else if (typeof iteratee === 'string') {
      // Handle property access like 'age'
      key = (item as any)[iteratee];
    } else {
      key = String(item);
    }

    result[key] = (result[key] || 0) + 1;
  });

  return result;
}
