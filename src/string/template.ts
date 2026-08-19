/**
 * Replaces template placeholders with values from the data object.
 *
 * @param str - The template string
 * @param data - The data object with placeholder values
 * @returns The template string with placeholders replaced
 *
 * @example
 * template('Hello <%= name %>', { name: 'World' }) // => 'Hello World'
 * template('${name} is ${age} years old', { name: 'John', age: 30 }) // => 'John is 30 years old'
 */
export function template(str: string, data?: Record<string, unknown>): string {
  if (typeof str !== 'string') {
    return '';
  }

  if (!data) {
    return str;
  }

  const stringify = (value: unknown): string => String(value as string | number | boolean | bigint | symbol | null);

  // Replace <%= placeholder %> style
  let result = str.replace(/<%=\s*([^%]*?)\s*%>/g, (_, key) => {
    const value = data[key.trim()];
    return value !== undefined ? stringify(value) : '';
  });

  // Replace ${placeholder} style
  result = result.replace(/\$\{\s*([^}]*?)\s*\}/g, (_, key) => {
    const value = data[key.trim()];
    return value !== undefined ? stringify(value) : '';
  });

  // Replace {placeholder} style
  result = result.replace(/\{\s*([^}]*?)\s*\}/g, (_, key) => {
    const value = data[key.trim()];
    return value !== undefined ? stringify(value) : '';
  });

  return result;
}
