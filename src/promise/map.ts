/**
 * Iterates over an array and returns a promise that resolves with an array of mapped values.
 * Supports concurrency limiting.
 *
 * @template T - The type of the input array elements
 * @template U - The type of the mapped values
 * @param array - The array to iterate over
 * @param mapper - The function to apply to each element (can be async or return a promise)
 * @param concurrency - The maximum number of concurrent operations (default: Infinity)
 * @returns Returns a promise that resolves with an array of mapped values in the same order
 *
 * @example
 * const ids = [1, 2, 3];
 * const users = await map(ids, (id) => fetchUser(id), 2); // Max 2 concurrent requests
 *
 * @example
 * const numbers = [1, 2, 3];
 * const doubled = await map(numbers, (n) => Promise.resolve(n * 2));
 */
export function map<T, U>(
  array: T[],
  mapper: (value: T, index: number) => Promise<U> | U,
  concurrency = Infinity
): Promise<U[]> {
  if (!Array.isArray(array) || array.length === 0) {
    return Promise.resolve([]);
  }

  return new Promise((resolve, reject) => {
    const results: U[] = new Array(array.length);
    let completed = 0;
    let inProgress = 0;
    let index = 0;
    let hasError = false;

    function execute() {
      while (index < array.length && inProgress < concurrency && !hasError) {
        const currentIndex = index++;
        inProgress++;

        Promise.resolve(mapper(array[currentIndex], currentIndex)).then(
          (result) => {
            if (!hasError) {
              results[currentIndex] = result;
              completed++;
              inProgress--;

              if (completed === array.length) {
                resolve(results);
              } else {
                execute();
              }
            }
          },
          (error) => {
            if (!hasError) {
              hasError = true;
              reject(error);
            }
          }
        );
      }
    }

    execute();
  });
}

export default map;