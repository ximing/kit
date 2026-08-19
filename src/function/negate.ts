/**
 * Creates a function that negates the result of the predicate func.
 *
 * @template T - The type of the predicate function
 * @param predicate - The predicate to negate
 * @returns Returns the new negated function
 *
 * @example
 * const isEven = (n: number) => n % 2 === 0;
 * const isOdd = negate(isEven);
 * isOdd(3); // => true
 * isOdd(4); // => false
 *
 * @example
 * const users = [
 *   { name: 'Alice', active: true },
 *   { name: 'Bob', active: false }
 * ];
 * const isActive = (user: typeof users[0]) => user.active;
 * users.filter(negate(isActive)); // => [{ name: 'Bob', active: false }]
 */
export function negate<T extends (...args: never[]) => boolean>(predicate: T): T {
  return function (this: unknown, ...args: Parameters<T>): boolean {
    return !(predicate as (this: unknown, ...args: Parameters<T>) => boolean).apply(this, args);
  } as T;
}
