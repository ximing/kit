import {
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  capitalize,
  upperFirst,
  lowerFirst,
  trim,
  trimStart,
  trimEnd,
  truncate,
  padStart,
  padEnd,
  repeat,
  template,
} from '../../src/string';

describe('String module exports', () => {
  it('should export all string functions', () => {
    expect(typeof camelCase).toBe('function');
    expect(typeof kebabCase).toBe('function');
    expect(typeof snakeCase).toBe('function');
    expect(typeof pascalCase).toBe('function');
    expect(typeof capitalize).toBe('function');
    expect(typeof upperFirst).toBe('function');
    expect(typeof lowerFirst).toBe('function');
    expect(typeof trim).toBe('function');
    expect(typeof trimStart).toBe('function');
    expect(typeof trimEnd).toBe('function');
    expect(typeof truncate).toBe('function');
    expect(typeof padStart).toBe('function');
    expect(typeof padEnd).toBe('function');
    expect(typeof repeat).toBe('function');
    expect(typeof template).toBe('function');
  });

  it('should work with real-world examples', () => {
    // Case conversion examples
    const apiEndpoint = 'user_profile_settings';
    expect(camelCase(apiEndpoint)).toBe('userProfileSettings');
    expect(pascalCase(apiEndpoint)).toBe('UserProfileSettings');

    // String manipulation examples
    const longText = 'The quick brown fox jumps over the lazy dog';
    const truncated = truncate(longText, { length: 20 });
    expect(truncated.length).toBeLessThanOrEqual(20);

    // Template example
    const message = template('Welcome ${name}, you are ${age} years old', {
      name: 'Alice',
      age: 25,
    });
    expect(message).toBe('Welcome Alice, you are 25 years old');

    // Padding example
    const padded = padStart('5', 3, '0');
    expect(padded).toBe('005');
  });
});
