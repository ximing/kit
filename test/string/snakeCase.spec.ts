import { snakeCase } from '../../src/string/snakeCase';

describe('snakeCase', () => {
  it('should convert camel case to snake case', () => {
    expect(snakeCase('fooBar')).toBe('foo_bar');
    expect(snakeCase('fooBarBaz')).toBe('foo_bar_baz');
  });

  it('should convert space-separated words to snake case', () => {
    expect(snakeCase('Foo Bar')).toBe('foo_bar');
    expect(snakeCase('foo bar')).toBe('foo_bar');
  });

  it('should convert hyphen-separated words to snake case', () => {
    expect(snakeCase('foo-bar')).toBe('foo_bar');
    expect(snakeCase('-foo-bar-')).toBe('foo_bar');
  });

  it('should handle mixed separators', () => {
    expect(snakeCase('foo-bar baz_qux')).toBe('foo_bar_baz_qux');
  });

  it('should handle already snake case strings', () => {
    expect(snakeCase('foo_bar')).toBe('foo_bar');
    expect(snakeCase('foo_bar_baz')).toBe('foo_bar_baz');
  });

  it('should handle single word', () => {
    expect(snakeCase('foo')).toBe('foo');
    expect(snakeCase('Foo')).toBe('foo');
  });

  it('should handle empty string', () => {
    expect(snakeCase('')).toBe('');
  });

  it('should handle uppercase letters', () => {
    expect(snakeCase('FooBar')).toBe('foo_bar');
    expect(snakeCase('FOOBar')).toBe('foo_bar');
  });

  it('should handle consecutive separators', () => {
    expect(snakeCase('foo---bar')).toBe('foo_bar');
    expect(snakeCase('foo___bar')).toBe('foo_bar');
  });

  it('should handle non-string input', () => {
    expect(snakeCase(null as any)).toBe('');
    expect(snakeCase(undefined as any)).toBe('');
  });
});