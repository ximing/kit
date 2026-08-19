import { abortError, onAbort } from './abort';

/**
 * Returns a promise that resolves after a specified delay with an optional value.
 *
 * @template T - The type of the value to resolve with
 * @param ms - The number of milliseconds to delay
 * @param value - The optional value to resolve with (default: undefined)
 * @param signal - Optional AbortSignal that rejects the delay when aborted
 * @returns Returns a promise that resolves after the delay
 *
 * @example
 * await delay(1000); // Waits 1 second
 *
 * @example
 * const result = await delay(500, 'Hello');
 * console.log(result); // 'Hello' after 500ms
 */
export function delay<T = void>(ms: number, value?: T, signal?: AbortSignal): Promise<T | void> {
  if (signal?.aborted) {
    return Promise.reject(abortError(signal));
  }

  return new Promise((resolve, reject) => {
    let unlisten: () => void = () => undefined;

    const timer = setTimeout(() => {
      unlisten();
      resolve(value);
    }, ms);

    if (signal) {
      unlisten = onAbort(signal, () => {
        clearTimeout(timer);
        reject(abortError(signal));
      });
    }
  });
}
