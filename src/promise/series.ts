/**
 * Executes multiple promises in series (one after another).
 *
 * @template T - The type of the resolved values
 * @param tasks - An array of functions that return promises
 * @returns Returns a promise that resolves with an array of results in the same order as tasks
 *
 * @example
 * const results = await series([
 *   () => fetchUser(1),
 *   () => fetchUser(2),
 *   () => fetchUser(3)
 * ]); // Executes one after another
 *
 * @example
 * const results = await series([
 *   () => delay(100, 'a'),
 *   () => delay(50, 'b'),
 *   () => delay(150, 'c')
 * ]); // Total time: 300ms
 */
export function series<T>(tasks: Array<() => Promise<T> | T>): Promise<T[]> {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return Promise.resolve([]);
  }

  return tasks.reduce(
    (promise, task, index) =>
      promise.then((results) =>
        Promise.resolve(task()).then((result) => {
          results[index] = result;
          return results;
        }),
      ),
    Promise.resolve<T[]>([]),
  );
}

export default series;
