/**
 * Creates a function that is the composition of the provided functions,
 * where each successive invocation is supplied the return value of the previous.
 * Functions are executed from left to right.
 *
 * @param funcs - The functions to pipe
 * @returns Returns the new composite function
 *
 * @example
 * const add = (x: number) => x + 1;
 * const multiply = (x: number) => x * 2;
 * const piped = pipe(add, multiply);
 * piped(5); // => 12 (add(5) = 6, then multiply(6) = 12)
 *
 * @example
 * const toUpper = (str: string) => str.toUpperCase();
 * const exclaim = (str: string) => `${str}!`;
 * const shout = pipe(toUpper, exclaim);
 * shout('hello'); // => 'HELLO!'
 */
export function pipe<R>(...funcs: Array<(arg: any) => any>): (arg: any) => R {
  if (funcs.length === 0) {
    return (arg: any) => arg as R;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return function piped(...args: any[]): any {
    let result = args[0];
    for (let i = 0; i < funcs.length; i++) {
      result = funcs[i](result);
    }
    return result;
  } as (arg: any) => R;
}