/**
 * Iterates over an array and reduces it to a single value using an async reducer function.
 *
 * @template T - The type of the array elements
 * @template U - The type of the accumulator and final result
 * @param array - The array to reduce
 * @param reducer - The function to reduce each element (can be async or return a promise)
 * @param initialValue - The initial value for the accumulator
 * @returns Returns a promise that resolves with the final accumulated value
 *
 * @example
 * const sum = await reduce(
 *   [1, 2, 3, 4],
 *   (acc, value) => Promise.resolve(acc + value),
 *   0
 * ); // => 10
 *
 * @example
 * const users = await reduce(
 *   [1, 2, 3],
 *   async (acc, id) => {
 *     const user = await fetchUser(id);
 *     return [...acc, user];
 *   },
 *   []
 * );
 */
export function reduce<T, U>(
  array: T[],
  reducer: (accumulator: U, value: T, index: number) => Promise<U> | U,
  initialValue: U
): Promise<U> {
  if (!Array.isArray(array) || array.length === 0) {
    return Promise.resolve(initialValue);
  }

  return array.reduce(
    (promise, value, index) =>
      promise.then((accumulator) =>
        Promise.resolve(reducer(accumulator, value, index))
      ),
    Promise.resolve(initialValue)
  );
}

export default reduce;