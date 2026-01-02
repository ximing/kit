/**
 * This method is like sum except that it accepts iteratee which is invoked for each element
 * in array to generate the value to be summed.
 * The iteratee is invoked with one argument: (value).
 *
 * @param array - The array to iterate over
 * @param iteratee - The iteratee invoked per element
 * @returns Returns the sum
 *
 * @example
 * sumBy([{ n: 1 }, { n: 2 }, { n: 3 }], (o) => o.n) // => 6
 * sumBy([], (o) => o.n) // => 0
 */
export function sumBy<T>(array: T[], iteratee: (item: T) => number): number {
  if (!Array.isArray(array) || array.length === 0) {
    return 0;
  }

  return array.reduce((total, item) => total + iteratee(item), 0);
}

export default sumBy;