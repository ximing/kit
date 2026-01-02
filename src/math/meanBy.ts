/**
 * This method is like mean except that it accepts iteratee which is invoked for each element
 * in array to generate the value to be averaged.
 * The iteratee is invoked with one argument: (value).
 *
 * @param array - The array to iterate over
 * @param iteratee - The iteratee invoked per element
 * @returns Returns the mean
 *
 * @example
 * meanBy([{ n: 1 }, { n: 2 }, { n: 3 }], (o) => o.n) // => 2
 * meanBy([], (o) => o.n) // => 0
 */
export function meanBy<T>(array: T[], iteratee: (item: T) => number): number {
  if (!Array.isArray(array) || array.length === 0) {
    return 0;
  }

  const sum = array.reduce((total, item) => total + iteratee(item), 0);
  return sum / array.length;
}

export default meanBy;