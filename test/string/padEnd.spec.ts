import { padEnd } from '../../src/string/padEnd';

describe('padEnd', () => {
  it('should pad string on the right side with spaces', () => {
    expect(padEnd('abc', 6)).toBe('abc   ');
    expect(padEnd('abc', 8)).toBe('abc     ');
  });

  it('should pad string with specified characters', () => {
    expect(padEnd('abc', 6, '_-')).toBe('abc_-_');
    expect(padEnd('abc', 8, '_-')).toBe('abc_-_-_');
  });

  it('should not pad if string is already longer than length', () => {
    expect(padEnd('abc', 3)).toBe('abc');
    expect(padEnd('abcdef', 3)).toBe('abcdef');
  });

  it('should handle empty string', () => {
    expect(padEnd('', 3)).toBe('   ');
    expect(padEnd('', 3, 'x')).toBe('xxx');
  });

  it('should handle single character padding', () => {
    expect(padEnd('a', 5, 'x')).toBe('axxxx');
  });

  it('should handle length equal to string length', () => {
    expect(padEnd('abc', 3)).toBe('abc');
    expect(padEnd('abc', 3, 'x')).toBe('abc');
  });

  it('should handle empty padding characters', () => {
    expect(padEnd('abc', 6, '')).toBe('abc');
  });

  it('should repeat padding characters as needed', () => {
    expect(padEnd('x', 10, 'ab')).toBe('xababababa');
  });

  it('should handle non-string input', () => {
    expect(padEnd(null as any, 5)).toBe('');
    expect(padEnd(undefined as any, 5)).toBe('');
  });

  it('should handle zero length', () => {
    expect(padEnd('abc', 0)).toBe('abc');
  });
});
