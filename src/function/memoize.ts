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
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => any
): T & { cache: Map<any, ReturnType<T>> } {
  const cache = new Map<any, ReturnType<T>>();

  const memoized = function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = resolver ? resolver.apply(this, args) : args[0];

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  } as T & { cache: Map<any, ReturnType<T>> };

  memoized.cache = cache;

  return memoized;
}