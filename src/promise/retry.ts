/**
 * Retries a function until it succeeds or max attempts are reached.
 *
 * @template T - The type of the resolved value
 * @param fn - The function to retry (can be async or return a promise)
 * @param options - The options object
 * @param options.maxAttempts - Maximum number of attempts (default: 3)
 * @param options.delay - Delay between attempts in milliseconds (default: 1000)
 * @param options.backoff - Backoff multiplier for exponential backoff (default: 1, no backoff)
 * @param options.onRetry - Callback function called on each retry with the attempt number and error
 * @returns Returns a promise that resolves with the function result or rejects with the last error
 *
 * @example
 * const result = await retry(() => fetchData(), { maxAttempts: 5, delay: 1000 });
 *
 * @example
 * const result = await retry(() => fetchData(), {
 *   maxAttempts: 5,
 *   delay: 1000,
 *   backoff: 2, // exponential backoff
 *   onRetry: (attempt, error) => console.log(`Attempt ${attempt} failed: ${error.message}`)
 * });
 */
export function retry<T>(
  fn: () => T | Promise<T>,
  options: {
    maxAttempts?: number;
    delay?: number;
    backoff?: number;
    onRetry?: (attempt: number, error: Error) => void;
  } = {},
): Promise<T> {
  const { maxAttempts = 3, delay: initialDelay = 1000, backoff = 1, onRetry } = options;

  let lastError: Error;
  let attempt = 0;

  async function execute(): Promise<T> {
    attempt++;

    try {
      return await Promise.resolve(fn());
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt >= maxAttempts) {
        throw lastError;
      }

      if (onRetry) {
        onRetry(attempt, lastError);
      }

      const waitTime = initialDelay * Math.pow(backoff, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, waitTime));

      return execute();
    }
  }

  return execute();
}

export default retry;
