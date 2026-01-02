/**
 * Executes multiple promises in parallel with a concurrency limit.
 *
 * @template T - The type of the resolved values
 * @param tasks - An array of functions that return promises
 * @param concurrency - The maximum number of concurrent promises (default: Infinity)
 * @returns Returns a promise that resolves with an array of results in the same order as tasks
 *
 * @example
 * const results = await parallel([
 *   () => fetchUser(1),
 *   () => fetchUser(2),
 *   () => fetchUser(3)
 * ], 2); // Max 2 concurrent requests
 *
 * @example
 * const results = await parallel([
 *   () => delay(100, 'a'),
 *   () => delay(50, 'b'),
 *   () => delay(150, 'c')
 * ]); // Executes all at once
 */
export function parallel<T>(tasks: Array<() => Promise<T> | T>, concurrency = Infinity): Promise<T[]> {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return Promise.resolve([]);
  }

  return new Promise((resolve, reject) => {
    const results: T[] = new Array(tasks.length);
    let completed = 0;
    let inProgress = 0;
    let index = 0;
    let hasError = false;

    function execute() {
      while (index < tasks.length && inProgress < concurrency && !hasError) {
        const taskIndex = index++;
        inProgress++;

        Promise.resolve(tasks[taskIndex]()).then(
          (result) => {
            if (!hasError) {
              results[taskIndex] = result;
              completed++;
              inProgress--;

              if (completed === tasks.length) {
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

export default parallel;
