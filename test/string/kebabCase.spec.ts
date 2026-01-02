import { kebabCase } from '../../src/string/kebabCase';

describe('kebabCase', () => {
  it('should convert camel case to kebab case', () => {
    expect(kebabCase('fooBar')).toBe('foo-bar');
    expect(kebabCase('fooBarBaz')).toBe('foo-bar-baz');
  });

  it('should convert space-separated words to kebab case', () => {
    expect(kebabCase('Foo Bar')).toBe('foo-bar');
    expect(kebabCase('foo bar')).toBe('foo-bar');
  });

  it('should convert underscore-separated words to kebab case', () => {
    expect(kebabCase('foo_bar')).toBe('foo-bar');
    expect(kebabCase('_foo_bar_')).toBe('foo-bar');
  });

  it('should handle mixed separators', () => {
    expect(kebabCase('foo_bar-baz qux')).toBe('foo-bar-baz-qux');
  });

  it('should handle already kebab case strings', () => {
    expect(kebabCase('foo-bar')).toBe('foo-bar');
    expect(kebabCase('foo-bar-baz')).toBe('foo-bar-baz');
  });

  it('should handle single word', () => {
    expect(kebabCase('foo')).toBe('foo');
    expect(kebabCase('Foo')).toBe('foo');
  });

  it('should handle empty string', () => {
    expect(kebabCase('')).toBe('');
  });

  it('should handle uppercase letters', () => {
    expect(kebabCase('FooBar')).toBe('foo-bar');
    expect(kebabCase('FOOBar')).toBe('foo-bar');
  });

  it('should handle consecutive separators', () => {
    expect(kebabCase('foo---bar')).toBe('foo-bar');
    expect(kebabCase('foo___bar')).toBe('foo-bar');
  });

  it('should handle non-string input', () => {
    expect(kebabCase(null as any)).toBe('');
    expect(kebabCase(undefined as any)).toBe('');
  });
});