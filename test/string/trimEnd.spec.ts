import { trimEnd } from '../../src/string/trimEnd';

describe('trimEnd', () => {
  it('should remove trailing whitespace', () => {
    expect(trimEnd('  abc  ')).toBe('  abc');
    expect(trimEnd('\t\nabc\n\t')).toBe('\t\nabc');
    expect(trimEnd('   ')).toBe('');
  });

  it('should remove specified characters from end', () => {
    expect(trimEnd('-_-abc-_-', '-_')).toBe('-_-abc');
    expect(trimEnd('xxxabc xxx', 'x ')).toBe('xxxabc');
  });

  it('should handle empty string', () => {
    expect(trimEnd('')).toBe('');
    expect(trimEnd('', '-')).toBe('');
  });

  it('should not remove characters from middle or start', () => {
    expect(trimEnd('  a-b-c  ')).toBe('  a-b-c');
    expect(trimEnd('--a-b-c--', '-')).toBe('--a-b-c');
  });

  it('should handle single character', () => {
    expect(trimEnd('a')).toBe('a');
    expect(trimEnd('a', 'a')).toBe('');
  });

  it('should handle strings with no trailing whitespace', () => {
    expect(trimEnd('  abc')).toBe('  abc');
  });

  it('should handle special regex characters in chars parameter', () => {
    expect(trimEnd('abc]', ']')).toBe('abc');
    expect(trimEnd('test)', ')')).toBe('test');
  });

  it('should handle non-string input', () => {
    expect(trimEnd(null as any)).toBe('');
    expect(trimEnd(undefined as any)).toBe('');
  });
});