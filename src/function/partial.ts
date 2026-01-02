/**
 * Creates a function that invokes func with partialArgs prepended to the arguments it receives.
 * This method is like bind except it does not alter the this binding.
 *
 * @template T - The type of the function
 * @param func - The function to partially apply arguments to
 * @param partialArgs - The arguments to be partially applied
 * @returns Returns the new partially applied function
 *
 * @example
 * const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
 * const sayHelloTo = partial(greet, 'Hello');
 * sayHelloTo('Alice'); // => 'Hello, Alice!'
 * sayHelloTo('Bob'); // => 'Hello, Bob!'
 *
 * @example
 * const add = (a: number, b: number, c: number) => a + b + c;
 * const add5 = partial(add, 5);
 * add5(10, 15); // => 30
 */
export function partial<T extends (...args: any[]) => any>(func: T, ...partialArgs: any[]): (...args: any[]) => ReturnType<T> {
  return function (this: any, ...args: any[]): ReturnType<T> {
    return func.apply(this, [...partialArgs, ...args]);
  };
}