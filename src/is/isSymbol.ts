/**
 * Checks if value is classified as a Symbol primitive or object.
 *
 * @param value - The value to check
 * @returns Returns true if value is a symbol, else false
 *
 * @example
 * isSymbol(Symbol('test')) // => true
 * isSymbol(Symbol.iterator) // => true
 * isSymbol('test') // => false
 * isSymbol({}) // => false
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol';
}

export default isSymbol;
