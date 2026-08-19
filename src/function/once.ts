/**
 * Creates a function that is restricted to invoking func once.
 * Repeat calls to the function return the value of the first invocation.
 *
 * @template T - The type of the function
 * @param func - The function to restrict
 * @returns Returns the new restricted function
 *
 * @example
 * let count = 0;
 * const initialize = once(() => ++count);
 * initialize(); // => 1
 * initialize(); // => 1
 * console.log(count); // => 1
 *
 * @example
 * const greet = once((name: string) => `Hello, ${name}!`);
 * greet('Alice'); // => 'Hello, Alice!'
 * greet('Bob'); // => 'Hello, Alice!' (returns cached result)
 */
export function once<T extends (...args: never[]) => unknown>(func: T): T {
  let called = false;
  let result: ReturnType<T> | undefined;

  return function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
    if (!called) {
      called = true;
      result = (func as (this: unknown, ...args: Parameters<T>) => ReturnType<T>).apply(this, args);
    }
    return result as ReturnType<T>;
  } as T;
}
