import { camelCase } from '../../src/string/camelCase';

describe('camelCase', () => {
  it('should convert space-separated words to camel case', () => {
    expect(camelCase('Foo Bar')).toBe('fooBar');
    expect(camelCase('foo bar')).toBe('fooBar');
    expect(camelCase('FOO BAR')).toBe('fooBar');
  });

  it('should convert hyphen-separated words to camel case', () => {
    expect(camelCase('--foo-bar--')).toBe('fooBar');
    expect(camelCase('-foo-bar')).toBe('fooBar');
    expect(camelCase('foo-bar')).toBe('fooBar');
  });

  it('should convert underscore-separated words to camel case', () => {
    expect(camelCase('foo_bar')).toBe('fooBar');
    expect(camelCase('_foo_bar_')).toBe('fooBar');
  });

  it('should handle mixed separators', () => {
    expect(camelCase('foo-bar_baz qux')).toBe('fooBarBazQux');
  });

  it('should handle already camel case strings', () => {
    expect(camelCase('fooBar')).toBe('fooBar');
    expect(camelCase('fooBarBaz')).toBe('fooBarBaz');
  });

  it('should handle single word', () => {
    expect(camelCase('foo')).toBe('foo');
    expect(camelCase('Foo')).toBe('foo');
  });

  it('should handle empty string', () => {
    expect(camelCase('')).toBe('');
  });

  it('should handle only separators', () => {
    expect(camelCase('---')).toBe('');
    expect(camelCase('___')).toBe('');
  });

  it('should handle non-string input', () => {
    expect(camelCase(null as any)).toBe('');
    expect(camelCase(undefined as any)).toBe('');
  });

  it('should handle consecutive separators', () => {
    expect(camelCase('foo---bar')).toBe('fooBar');
    expect(camelCase('foo___bar')).toBe('fooBar');
  });
});
