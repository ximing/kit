import { upperFirst } from '../../src/string/upperFirst';

describe('upperFirst', () => {
  it('should convert first character to uppercase', () => {
    expect(upperFirst('fred')).toBe('Fred');
    expect(upperFirst('FRED')).toBe('FRED');
  });

  it('should not change rest of the string', () => {
    expect(upperFirst('hello')).toBe('Hello');
    expect(upperFirst('hELLO')).toBe('HELLO');
  });

  it('should handle single character', () => {
    expect(upperFirst('a')).toBe('A');
    expect(upperFirst('A')).toBe('A');
  });

  it('should handle empty string', () => {
    expect(upperFirst('')).toBe('');
  });

  it('should handle strings starting with non-alphabetic characters', () => {
    expect(upperFirst('123abc')).toBe('123abc');
    expect(upperFirst('_hello')).toBe('_hello');
  });

  it('should handle strings with spaces', () => {
    expect(upperFirst('hello world')).toBe('Hello world');
  });

  it('should handle non-string input', () => {
    expect(upperFirst(null as any)).toBe(null);
    expect(upperFirst(undefined as any)).toBe(undefined);
  });
});
