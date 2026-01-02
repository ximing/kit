/**
 * Creates a function that is the composition of the provided functions,
 * where each successive invocation is supplied the return value of the previous.
 * Functions are executed from right to left.
 *
 * @param funcs - The functions to compose
 * @returns Returns the new composite function
 *
 * @example
 * const add = (x: number) => x + 1;
 * const multiply = (x: number) => x * 2;
 * const composed = compose(add, multiply);
 * composed(5); // => 11 (multiply(5) = 10, then add(10) = 11)
 *
 * @example
 * const toUpper = (str: string) => str.toUpperCase();
 * const exclaim = (str: string) => `${str}!`;
 * const shout = compose(exclaim, toUpper);
 * shout('hello'); // => 'HELLO!'
 */
export function compose<R>(...funcs: Array<(arg: any) => any>): (arg: any) => R {
  if (funcs.length === 0) {
    return (arg: any) => arg as R;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return function composed(...args: any[]): any {
    let result = args[0];
    for (let i = funcs.length - 1; i >= 0; i--) {
      result = funcs[i](result);
    }
    return result;
  } as (arg: any) => R;
}