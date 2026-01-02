/**
 * Iterates over an array and returns a promise that resolves with an array of elements
 * that pass the predicate test. Supports concurrency limiting.
 *
 * @template T - The type of the array elements
 * @param array - The array to iterate over
 * @param predicate - The function to test each element (can be async or return a promise)
 * @param concurrency - The maximum number of concurrent operations (default: Infinity)
 * @returns Returns a promise that resolves with an array of elements that passed the test
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const evens = await filter(numbers, (n) => n % 2 === 0);
 *
 * @example
 * const users = await filter(userIds, (id) => checkUserActive(id), 2); // Max 2 concurrent checks
 */
export function filter<T>(
  array: T[],
  predicate: (value: T, index: number) => Promise<boolean> | boolean,
  concurrency = Infinity,
): Promise<T[]> {
  if (!Array.isArray(array) || array.length === 0) {
    return Promise.resolve([]);
  }

  return new Promise((resolve, reject) => {
    const results: T[] = [];
    let completed = 0;
    let inProgress = 0;
    let index = 0;
    let hasError = false;

    function execute() {
      while (index < array.length && inProgress < concurrency && !hasError) {
        const currentIndex = index++;
        inProgress++;

        Promise.resolve(predicate(array[currentIndex], currentIndex)).then(
          (passed) => {
            if (!hasError) {
              if (passed) {
                results.push(array[currentIndex]);
              }
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
          },
        );
      }
    }

    execute();
  });
}

export default filter;
