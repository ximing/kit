import { trim } from '../../src/string/trim';

describe('trim', () => {
  it('should remove leading and trailing whitespace', () => {
    expect(trim('  abc  ')).toBe('abc');
    expect(trim('\t\nabc\n\t')).toBe('abc');
    expect(trim('   ')).toBe('');
  });

  it('should remove specified characters from both ends', () => {
    expect(trim('-_-abc-_-', '-_')).toBe('abc');
    expect(trim('xxxabc xxx', 'x ')).toBe('abc');
  });

  it('should handle empty string', () => {
    expect(trim('')).toBe('');
    expect(trim('', '-')).toBe('');
  });

  it('should not remove characters from middle', () => {
    expect(trim('  a-b-c  ')).toBe('a-b-c');
    expect(trim('--a-b-c--', '-')).toBe('a-b-c');
  });

  it('should handle single character', () => {
    expect(trim('a')).toBe('a');
    expect(trim('a', 'a')).toBe('');
  });

  it('should handle strings with no whitespace', () => {
    expect(trim('abc')).toBe('abc');
  });

  it('should handle special regex characters in chars parameter', () => {
    expect(trim('[abc]', '[]')).toBe('abc');
    expect(trim('(test)', '()')).toBe('test');
  });

  it('should handle non-string input', () => {
    expect(trim(null as any)).toBe('');
    expect(trim(undefined as any)).toBe('');
  });
});