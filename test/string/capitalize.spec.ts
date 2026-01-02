import { capitalize } from '../../src/string/capitalize';

describe('capitalize', () => {
  it('should capitalize the first character', () => {
    expect(capitalize('fred')).toBe('Fred');
    expect(capitalize('FRED')).toBe('Fred');
  });

  it('should lowercase the rest of the string', () => {
    expect(capitalize('HELLO')).toBe('Hello');
    expect(capitalize('hELLO')).toBe('Hello');
  });

  it('should handle single character', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('A')).toBe('A');
  });

  it('should handle empty string', () => {
    expect(capitalize('')).toBe('');
  });

  it('should handle strings starting with non-alphabetic characters', () => {
    expect(capitalize('123abc')).toBe('123abc');
    expect(capitalize('_hello')).toBe('_hello');
  });

  it('should handle strings with spaces', () => {
    expect(capitalize('hello world')).toBe('Hello world');
  });

  it('should handle non-string input', () => {
    expect(capitalize(null as any)).toBe(null);
    expect(capitalize(undefined as any)).toBe(undefined);
  });
});
