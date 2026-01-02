/**
 * This method is like sortBy except that it allows specifying the sort orders of the iteratees to sort by
 * @param collection - The collection to iterate over
 * @param iteratees - The iteratees to sort by
 * @param orders - The sort orders of iteratees ('asc' or 'desc')
 * @returns Returns the new sorted array
 * @example
 * const users = [
 *   { name: 'John', age: 30 },
 *   { name: 'Jane', age: 25 }
 * ];
 * orderBy(users, ['age'], ['desc']);
 * // => [{name: 'John', age: 30}, {name: 'Jane', age: 25}]
 */
export function orderBy<T>(
  collection: T[],
  iteratees: ((item: T) => any) | string | (((item: T) => any) | string)[],
  orders?: ('asc' | 'desc')[]
): T[] {
  const iterateeArray = Array.isArray(iteratees) ? iteratees : [iteratees];
  const orderArray = orders || iterateeArray.map(() => 'asc');

  return [...collection].sort((a, b) => {
    for (let i = 0; i < iterateeArray.length; i++) {
      const iteratee = iterateeArray[i];
      const order = orderArray[i] || 'asc';

      let aVal: any;
      let bVal: any;

      if (typeof iteratee === 'function') {
        aVal = iteratee(a);
        bVal = iteratee(b);
      } else if (typeof iteratee === 'string') {
        aVal = (a as any)[iteratee];
        bVal = (b as any)[iteratee];
      } else {
        aVal = a;
        bVal = b;
      }

      if (aVal < bVal) {
        return order === 'asc' ? -1 : 1;
      }
      if (aVal > bVal) {
        return order === 'asc' ? 1 : -1;
      }
    }

    return 0;
  });
}