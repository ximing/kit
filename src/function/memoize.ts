/**
 * Creates a function that memoizes the result of func.
 * If resolver is provided, it determines the cache key for storing the result
 * based on the arguments provided to the memoized function.
 *
 * @template T - The type of the function to memoize
 * @param func - The function to have its output memoized
 * @param resolver - The function to resolve the cache key (optional)
 * @returns Returns the new memoized function
 *
 * @example
 * const fibonacci = memoize((n: number): number => {
 *   if (n <= 1) return n;
 *   return fibonacci(n - 1) + fibonacci(n - 2);
 * });
 * fibonacci(10); // Calculates and caches
 * fibonacci(10); // Returns cached result
 *
 * @example
 * // With custom resolver
 * const memoized = memoize(
 *   (a: number, b: number) => a + b,
 *   (a: number, b: number) => `${a}-${b}`
 * );
 * memoized(1, 2); // => 3 (calculates)
 * memoized(1, 2); // => 3 (cached)
 */
export function memoize<T extends (...args: never[]) => unknown>(
  func: T,
  resolver?: (...args: Parameters<T>) => unknown,
): T & { cache: Map<unknown, ReturnType<T>> } {
  type Memoized = T & { cache: Map<unknown, ReturnType<T>> };

  const cache = new Map<unknown, ReturnType<T>>();
  const call = (thisArg: unknown, args: Parameters<T>): ReturnType<T> =>
    (func as (this: unknown, ...args: Parameters<T>) => ReturnType<T>).apply(thisArg, args);

  const memoized = function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
    const key = resolver ? resolver.apply(this as ThisParameterType<typeof resolver>, args) : args[0];

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = call(this, args);
    cache.set(key, result);
    return result;
  } as Memoized;

  memoized.cache = cache;

  return memoized;
}
