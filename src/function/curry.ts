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
type Curried = {
  (...args: unknown[]): Curried;
};

export function curry<T extends (...args: never[]) => unknown>(func: T, arity: number = func.length): Curried {
  const call = (thisArg: unknown, args: unknown[]): unknown =>
    (func as (this: unknown, ...args: never[]) => unknown).apply(thisArg, args as never[]);

  function curried(this: unknown, ...args: unknown[]): unknown {
    if (args.length >= arity) {
      return call(this, args);
    }
    return function (this: unknown, ...nextArgs: unknown[]): unknown {
      return curried.apply(this, [...args, ...nextArgs]);
    };
  }

  return curried as Curried;
}
