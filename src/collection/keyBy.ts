/**
 * Creates an object composed from the elements of collection keyed by the results of running each element thru iteratee
 * @param collection - The collection to iterate over
 * @param iteratee - The iteratee to transform keys
 * @returns Returns the composed aggregate object
 * @example
 * const users = [
 *   { id: 1, name: 'John' },
 *   { id: 2, name: 'Jane' }
 * ];
 * keyBy(users, 'id');
 * // => { '1': {id: 1, name: 'John'}, '2': {id: 2, name: 'Jane'} }
 */
export function keyBy<T>(
  collection: T[],
  iteratee: ((item: T, index: number) => string | number) | string
): Record<string | number, T> {
  const result: Record<string | number, T> = {};

  collection.forEach((item, index) => {
    let key: string | number;

    if (typeof iteratee === 'function') {
      key = iteratee(item, index);
    } else if (typeof iteratee === 'string') {
      // Handle property access like 'id'
      key = (item as any)[iteratee];
    } else {
      key = String(item);
    }

    result[key] = item;
  });

  return result;
}