import { abortError, onAbort } from './abort';

/**
 * Returns a promise that rejects if the given promise doesn't settle within the specified time.
 *
 * @template T - The type of the resolved value
 * @param promise - The promise to wrap with a timeout
 * @param ms - The timeout in milliseconds
 * @param message - The error message to use when timeout occurs (default: 'Promise timeout')
 * @param signal - Optional AbortSignal that rejects the timeout when aborted
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
  message = 'Promise timeout',
  signal?: AbortSignal,
): Promise<T> {
  if (signal?.aborted) {
    return Promise.reject(abortError(signal));
  }

  return new Promise<T>((resolve, reject) => {
    let settled = false;
    let unlisten: () => void = () => undefined;

    const finish = (cb: () => void) => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timer);
      unlisten();
      cb();
    };

    const timer = setTimeout(() => {
      finish(() => {
        reject(new Error(message));
      });
    }, ms);

    if (signal) {
      unlisten = onAbort(signal, () => {
        finish(() => {
          reject(abortError(signal));
        });
      });
    }

    promise.then(
      (value) => {
        finish(() => {
          resolve(value);
        });
      },
      (error: unknown) => {
        finish(() => {
          reject(error);
        });
      },
    );
  });
}
