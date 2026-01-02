/**
 * This method is like max except that it accepts iteratee which is invoked for each element
 * in array to generate the criterion by which the value is ranked.
 * The iteratee is invoked with one argument: (value).
 *
 * @param array - The array to iterate over
 * @param iteratee - The iteratee invoked per element
 * @returns Returns the maximum value
 *
 * @example
 * maxBy([{ n: 1 }, { n: 2 }, { n: 3 }], (o) => o.n) // => { n: 3 }
 * maxBy([], (o) => o.n) // => undefined
 */
export function maxBy<T>(
  array: T[],
  iteratee: (item: T) => number
): T | undefined {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }

  let maxItem = array[0];
  let maxValue = iteratee(array[0]);

  for (let i = 1; i < array.length; i++) {
    const value = iteratee(array[i]);
    if (value > maxValue) {
      maxValue = value;
      maxItem = array[i];
    }
  }

  return maxItem;
}

export default maxBy;