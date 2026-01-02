/**
 * Creates a function that invokes func with the this binding of thisArg and
 * partialArgs prepended to the arguments it receives.
 *
 * @template T - The type of the function
 * @param func - The function to bind
 * @param thisArg - The this binding of func
 * @param partialArgs - The arguments to be partially applied
 * @returns Returns the new bound function
 *
 * @example
 * const obj = {
 *   name: 'Alice',
 *   greet(greeting: string) {
 *     return `${greeting}, ${this.name}!`;
 *   }
 * };
 * const boundGreet = bind(obj.greet, obj, 'Hello');
 * boundGreet(); // => 'Hello, Alice!'
 *
 * @example
 * function add(this: { base: number }, a: number, b: number) {
 *   return this.base + a + b;
 * }
 * const obj = { base: 10 };
 * const boundAdd = bind(add, obj, 5);
 * boundAdd(3); // => 18
 */
export function bind<T extends (...args: any[]) => any>(
  func: T,
  thisArg: any,
  ...partialArgs: any[]
): (...args: any[]) => ReturnType<T> {
  return function (...args: any[]): ReturnType<T> {
    return func.apply(thisArg, [...partialArgs, ...args]);
  };
}