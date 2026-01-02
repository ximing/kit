import { truncate } from '../../src/string/truncate';

describe('truncate', () => {
  it('should truncate string longer than length', () => {
    expect(truncate('Hi-Diddly-Ho there, Flanders!', { length: 20 })).toBe('Hi-Diddly-Ho ther...');
  });

  it('should use default length of 30', () => {
    const str = 'Hi-Diddly-Ho there, Flanders!';
    expect(truncate(str)).toBe(str);
    const longStr = 'a'.repeat(31);
    expect(truncate(longStr)).toBe('a'.repeat(27) + '...');
  });

  it('should use custom omission string', () => {
    expect(truncate('Hi-Diddly-Ho there, Flanders!', { length: 20, omission: ' [...]' })).toBe('Hi-Diddly-Ho t [...]');
  });

  it('should not truncate if string is shorter than length', () => {
    expect(truncate('abc', { length: 10 })).toBe('abc');
    expect(truncate('abc')).toBe('abc');
  });

  it('should handle length equal to string length', () => {
    expect(truncate('abc', { length: 3 })).toBe('abc');
  });

  it('should handle very small length', () => {
    expect(truncate('Hello', { length: 1 })).toBe('...');
    expect(truncate('Hello', { length: 3 })).toBe('...');
  });

  it('should handle empty string', () => {
    expect(truncate('')).toBe('');
    expect(truncate('', { length: 10 })).toBe('');
  });

  it('should handle length smaller than omission', () => {
    expect(truncate('Hello World', { length: 2, omission: '...' })).toBe('...');
  });

  it('should handle custom omission longer than length', () => {
    expect(truncate('Hello', { length: 3, omission: '...' })).toBe('...');
  });

  it('should handle empty omission', () => {
    expect(truncate('Hello World', { length: 5, omission: '' })).toBe('Hello');
  });

  it('should handle non-string input', () => {
    expect(truncate(null as any)).toBe('');
    expect(truncate(undefined as any)).toBe('');
  });
});
