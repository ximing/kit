import { padStart } from '../../src/string/padStart';

describe('padStart', () => {
  it('should pad string on the left side with spaces', () => {
    expect(padStart('abc', 6)).toBe('   abc');
    expect(padStart('abc', 8)).toBe('     abc');
  });

  it('should pad string with specified characters', () => {
    expect(padStart('abc', 6, '_-')).toBe('_-_abc');
    expect(padStart('abc', 8, '_-')).toBe('_-_-_abc');
  });

  it('should not pad if string is already longer than length', () => {
    expect(padStart('abc', 3)).toBe('abc');
    expect(padStart('abcdef', 3)).toBe('abcdef');
  });

  it('should handle empty string', () => {
    expect(padStart('', 3)).toBe('   ');
    expect(padStart('', 3, 'x')).toBe('xxx');
  });

  it('should handle single character padding', () => {
    expect(padStart('a', 5, 'x')).toBe('xxxxa');
  });

  it('should handle length equal to string length', () => {
    expect(padStart('abc', 3)).toBe('abc');
    expect(padStart('abc', 3, 'x')).toBe('abc');
  });

  it('should handle empty padding characters', () => {
    expect(padStart('abc', 6, '')).toBe('abc');
  });

  it('should repeat padding characters as needed', () => {
    expect(padStart('x', 10, 'ab')).toBe('ababababax');
  });

  it('should handle non-string input', () => {
    expect(padStart(null as any, 5)).toBe('');
    expect(padStart(undefined as any, 5)).toBe('');
  });

  it('should handle zero length', () => {
    expect(padStart('abc', 0)).toBe('abc');
  });
});