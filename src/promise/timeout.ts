/**
 * Returns a promise that rejects if the given promise doesn't settle within the specified time.
 *
 * @template T - The type of the resolved value
 * @param promise - The promise to wrap with a timeout
 * @param ms - The timeout in milliseconds
 * @param message - The error message to use when timeout occurs (default: 'Promise timeout')
 * @returns Returns a promise that resolves or rejects based on the original promise or timeout
 *
 * @example
 * try {
 *   const result = await timeout(fetchData(), 5000);
 * } catch (error) {
 *   console.log(error.message); // 'Promise timeout'
 * }
 *
 * @example
 * const result = await timeout(fetchData(), 5000, 'Request took too long');
 */
export function timeout<T>(
  promise: Promise<T>,
  ms: number,
  message = 'Promise timeout'
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => {
        reject(new Error(message));
      }, ms);
    }),
  ]);
}

export default timeout;