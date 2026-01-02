/**
 * Converts string to camel case.
 *
 * @param str - The string to convert
 * @returns The camel cased string
 *
 * @example
 * camelCase('Foo Bar') // => 'fooBar'
 * camelCase('--foo-bar--') // => 'fooBar'
 * camelCase('foo_bar') // => 'fooBar'
 */
export function camelCase(str: string): string {
  if (typeof str !== 'string') {
    return '';
  }

  // First, insert separators before uppercase letters (for camelCase/PascalCase)
  let normalized = str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z][a-z])/g, '$1-$2');

  // Split by non-alphanumeric characters and filter empty strings
  const words = normalized.split(/[-_\s]+/).filter((word) => word.length > 0);

  if (words.length === 0) {
    return '';
  }

  // Convert first word to lowercase, rest to title case
  return (
    words[0].toLowerCase() +
    words
      .slice(1)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('')
  );
}
