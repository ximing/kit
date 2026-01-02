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
export function once<T extends (...args: any[]) => any>(func: T): T {
  let called = false;
  let result: ReturnType<T>;

  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
    if (!called) {
      called = true;
      result = func.apply(this, args);
    }
    return result;
  } as T;
}
