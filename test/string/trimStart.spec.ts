import { trimStart } from '../../src/string/trimStart';

describe('trimStart', () => {
  it('should remove leading whitespace', () => {
    expect(trimStart('  abc  ')).toBe('abc  ');
    expect(trimStart('\t\nabc\n\t')).toBe('abc\n\t');
    expect(trimStart('   ')).toBe('');
  });

  it('should remove specified characters from start', () => {
    expect(trimStart('-_-abc-_-', '-_')).toBe('abc-_-');
    expect(trimStart('xxxabc xxx', 'x ')).toBe('abc xxx');
  });

  it('should handle empty string', () => {
    expect(trimStart('')).toBe('');
    expect(trimStart('', '-')).toBe('');
  });

  it('should not remove characters from middle or end', () => {
    expect(trimStart('  a-b-c  ')).toBe('a-b-c  ');
    expect(trimStart('--a-b-c--', '-')).toBe('a-b-c--');
  });

  it('should handle single character', () => {
    expect(trimStart('a')).toBe('a');
    expect(trimStart('a', 'a')).toBe('');
  });

  it('should handle strings with no leading whitespace', () => {
    expect(trimStart('abc  ')).toBe('abc  ');
  });

  it('should handle special regex characters in chars parameter', () => {
    expect(trimStart('[abc]', '[')).toBe('abc]');
    expect(trimStart('(test)', '(')).toBe('test)');
  });

  it('should handle non-string input', () => {
    expect(trimStart(null as any)).toBe('');
    expect(trimStart(undefined as any)).toBe('');
  });
});