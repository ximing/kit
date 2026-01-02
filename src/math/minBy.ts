/**
 * This method is like min except that it accepts iteratee which is invoked for each element
 * in array to generate the criterion by which the value is ranked.
 * The iteratee is invoked with one argument: (value).
 *
 * @param array - The array to iterate over
 * @param iteratee - The iteratee invoked per element
 * @returns Returns the minimum value
 *
 * @example
 * minBy([{ n: 1 }, { n: 2 }, { n: 3 }], (o) => o.n) // => { n: 1 }
 * minBy([], (o) => o.n) // => undefined
 */
export function minBy<T>(
  array: T[],
  iteratee: (item: T) => number
): T | undefined {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }

  let minItem = array[0];
  let minValue = iteratee(array[0]);

  for (let i = 1; i < array.length; i++) {
    const value = iteratee(array[i]);
    if (value < minValue) {
      minValue = value;
      minItem = array[i];
    }
  }

  return minItem;
}

export default minBy;