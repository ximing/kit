/**
 * Converts string to pascal case.
 *
 * @param str - The string to convert
 * @returns The pascal cased string
 *
 * @example
 * pascalCase('foo bar') // => 'FooBar'
 * pascalCase('--foo-bar--') // => 'FooBar'
 * pascalCase('foo_bar') // => 'FooBar'
 */
export function pascalCase(str: string): string {
  if (typeof str !== 'string') {
    return '';
  }

  // First, insert separators before uppercase letters (for camelCase/PascalCase)
  let normalized = str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2');

  // Split by non-alphanumeric characters and filter empty strings
  const words = normalized.split(/[-_\s]+/).filter((word) => word.length > 0);

  if (words.length === 0) {
    return '';
  }

  // Convert all words to title case
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}