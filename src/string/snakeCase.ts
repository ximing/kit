/**
 * Converts string to snake case.
 *
 * @param str - The string to convert
 * @returns The snake cased string
 *
 * @example
 * snakeCase('Foo Bar') // => 'foo_bar'
 * snakeCase('fooBar') // => 'foo_bar'
 * snakeCase('foo-bar') // => 'foo_bar'
 */
export function snakeCase(str: string): string {
  if (typeof str !== 'string') {
    return '';
  }

  // Insert an underscore before uppercase letters preceded by lowercase letters
  // and replace separators with underscores
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
    .replace(/[-\s_]+/g, '_')
    .replace(/^_+|_+$/g, '') // Remove leading/trailing underscores
    .toLowerCase();
}
