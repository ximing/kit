/**
 * Converts string to kebab case.
 *
 * @param str - The string to convert
 * @returns The kebab cased string
 *
 * @example
 * kebabCase('Foo Bar') // => 'foo-bar'
 * kebabCase('fooBar') // => 'foo-bar'
 * kebabCase('foo_bar') // => 'foo-bar'
 */
export function kebabCase(str: string): string {
  if (typeof str !== 'string') {
    return '';
  }

  // Insert a dash before uppercase letters preceded by lowercase letters
  // and replace separators with dashes
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .replace(/[-_\s]+/g, '-')
    .replace(/^-+|-+$/g, '') // Remove leading/trailing dashes
    .toLowerCase();
}