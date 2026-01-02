/**
 * Creates an object composed from the elements of collection grouped by the results of running each element thru iteratee
 * @param collection - The collection to iterate over
 * @param iteratee - The iteratee to transform keys
 * @returns Returns the composed aggregate object
 * @example
 * const users = [
 *   { name: 'John', age: 30 },
 *   { name: 'Jane', age: 30 },
 *   { name: 'Bob', age: 25 }
 * ];
 * groupBy(users, 'age');
 * // => { '30': [{name: 'John', age: 30}, {name: 'Jane', age: 30}], '25': [{name: 'Bob', age: 25}] }
 */
export function groupBy<T>(
  collection: T[],
  iteratee: ((item: T, index: number) => string | number) | string,
): Record<string | number, T[]> {
  const result: Record<string | number, T[]> = {};

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

    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  });

  return result;
}
