/**
 * Creates an array of elements split into two groups, the first of which contains elements predicate returns truthy for, the second of which contains elements predicate returns falsy for
 * @param collection - The collection to iterate over
 * @param predicate - The function invoked per iteration
 * @returns Returns the array of grouped elements
 * @example
 * const users = [
 *   { name: 'John', active: true },
 *   { name: 'Jane', active: false },
 *   { name: 'Bob', active: true }
 * ];
 * partition(users, 'active');
 * // => [[{name: 'John', active: true}, {name: 'Bob', active: true}], [{name: 'Jane', active: false}]]
 */
export function partition<T>(
  collection: T[],
  predicate: ((item: T, index: number) => boolean) | string
): [T[], T[]] {
  const trueGroup: T[] = [];
  const falseGroup: T[] = [];

  collection.forEach((item, index) => {
    let result: boolean;

    if (typeof predicate === 'function') {
      result = predicate(item, index);
    } else if (typeof predicate === 'string') {
      // Handle property access like 'active'
      result = !!(item as any)[predicate];
    } else {
      result = !!item;
    }

    if (result) {
      trueGroup.push(item);
    } else {
      falseGroup.push(item);
    }
  });

  return [trueGroup, falseGroup];
}