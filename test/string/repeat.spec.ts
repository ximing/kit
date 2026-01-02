import { repeat } from '../../src/string/repeat';

describe('repeat', () => {
  it('should repeat string n times', () => {
    expect(repeat('*', 3)).toBe('***');
    expect(repeat('abc', 2)).toBe('abcabc');
    expect(repeat('x', 5)).toBe('xxxxx');
  });

  it('should handle n = 0', () => {
    expect(repeat('abc', 0)).toBe('');
  });

  it('should handle n = 1', () => {
    expect(repeat('abc', 1)).toBe('abc');
  });

  it('should handle empty string', () => {
    expect(repeat('', 5)).toBe('');
  });

  it('should handle negative n', () => {
    expect(repeat('abc', -1)).toBe('');
  });

  it('should handle large n', () => {
    expect(repeat('a', 100)).toBe('a'.repeat(100));
  });

  it('should handle non-integer n', () => {
    expect(repeat('a', 3.5)).toBe('');
    expect(repeat('a', 3.1)).toBe('');
  });

  it('should handle Infinity', () => {
    expect(repeat('a', Infinity)).toBe('');
  });

  it('should handle NaN', () => {
    expect(repeat('a', NaN)).toBe('');
  });

  it('should handle non-string input', () => {
    expect(repeat(null as any, 3)).toBe('');
    expect(repeat(undefined as any, 3)).toBe('');
  });
});