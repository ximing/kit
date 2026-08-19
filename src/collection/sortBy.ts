/**
 * Creates an array of elements, sorted in ascending order by the results of running each element thru iteratee
 * @param collection - The collection to iterate over
 * @param iteratees - The iteratees to sort by
 * @returns Returns the new sorted array
 * @example
 * const users = [
 *   { name: 'John', age: 30 },
 *   { name: 'Jane', age: 25 }
 * ];
 * sortBy(users, 'age');
 * // => [{name: 'Jane', age: 25}, {name: 'John', age: 30}]
 */
export function sortBy<T>(
  collection: T[],
  iteratees: ((item: T) => unknown) | string | Array<((item: T) => unknown) | string>,
): T[] {
  const iterateeArray = Array.isArray(iteratees) ? iteratees : [iteratees];

  return [...collection].sort((a, b) => {
    for (const iteratee of iterateeArray) {
      let aVal: unknown;
      let bVal: unknown;

      if (typeof iteratee === 'function') {
        aVal = iteratee(a);
        bVal = iteratee(b);
      } else if (typeof iteratee === 'string') {
        aVal = (a as Record<string, unknown>)[iteratee];
        bVal = (b as Record<string, unknown>)[iteratee];
      } else {
        aVal = a;
        bVal = b;
      }

      const left = aVal as string | number;
      const right = bVal as string | number;
      if (left < right) return -1;
      if (left > right) return 1;
    }

    return 0;
  });
}
