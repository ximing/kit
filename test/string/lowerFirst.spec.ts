import { lowerFirst } from '../../src/string/lowerFirst';

describe('lowerFirst', () => {
  it('should convert first character to lowercase', () => {
    expect(lowerFirst('Fred')).toBe('fred');
    expect(lowerFirst('FRED')).toBe('fRED');
  });

  it('should not change rest of the string', () => {
    expect(lowerFirst('Hello')).toBe('hello');
    expect(lowerFirst('HELLO')).toBe('hELLO');
  });

  it('should handle single character', () => {
    expect(lowerFirst('A')).toBe('a');
    expect(lowerFirst('a')).toBe('a');
  });

  it('should handle empty string', () => {
    expect(lowerFirst('')).toBe('');
  });

  it('should handle strings starting with non-alphabetic characters', () => {
    expect(lowerFirst('123abc')).toBe('123abc');
    expect(lowerFirst('_hello')).toBe('_hello');
  });

  it('should handle strings with spaces', () => {
    expect(lowerFirst('Hello world')).toBe('hello world');
  });

  it('should handle non-string input', () => {
    expect(lowerFirst(null as any)).toBe(null);
    expect(lowerFirst(undefined as any)).toBe(undefined);
  });
});