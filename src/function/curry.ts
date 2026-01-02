/**
 * Creates a function that accepts arguments of func and either invokes func returning
 * its result, if at least arity number of arguments have been provided, or returns a
 * function that accepts the remaining func arguments, and so on.
 *
 * @template T - The type of the function to curry
 * @param func - The function to curry
 * @param arity - The arity of func (default: func.length)
 * @returns Returns the new curried function
 *
 * @example
 * const add = (a: number, b: number, c: number) => a + b + c;
 * const curried = curry(add);
 * curried(1)(2)(3); // => 6
 * curried(1, 2)(3); // => 6
 * curried(1)(2, 3); // => 6
 * curried(1, 2, 3); // => 6
 *
 * @example
 * const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
 * const curriedGreet = curry(greet);
 * const sayHello = curriedGreet('Hello');
 * sayHello('Alice'); // => 'Hello, Alice!'
 * sayHello('Bob'); // => 'Hello, Bob!'
 */
export function curry<T extends (...args: any[]) => any>(func: T, arity: number = func.length): any {
  return function curried(this: any, ...args: any[]): any {
    if (args.length >= arity) {
      return func.apply(this, args);
    }
    return function (this: any, ...nextArgs: any[]): any {
      return curried.apply(this, [...args, ...nextArgs]);
    };
  };
}