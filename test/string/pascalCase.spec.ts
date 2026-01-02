import { pascalCase } from '../../src/string/pascalCase';

describe('pascalCase', () => {
  it('should convert space-separated words to pascal case', () => {
    expect(pascalCase('foo bar')).toBe('FooBar');
    expect(pascalCase('Foo Bar')).toBe('FooBar');
  });

  it('should convert hyphen-separated words to pascal case', () => {
    expect(pascalCase('--foo-bar--')).toBe('FooBar');
    expect(pascalCase('-foo-bar')).toBe('FooBar');
  });

  it('should convert underscore-separated words to pascal case', () => {
    expect(pascalCase('foo_bar')).toBe('FooBar');
    expect(pascalCase('_foo_bar_')).toBe('FooBar');
  });

  it('should handle mixed separators', () => {
    expect(pascalCase('foo-bar_baz qux')).toBe('FooBarBazQux');
  });

  it('should handle already pascal case strings', () => {
    expect(pascalCase('FooBar')).toBe('FooBar');
    expect(pascalCase('FooBarBaz')).toBe('FooBarBaz');
  });

  it('should handle camel case strings', () => {
    expect(pascalCase('fooBar')).toBe('FooBar');
    expect(pascalCase('fooBarBaz')).toBe('FooBarBaz');
  });

  it('should handle single word', () => {
    expect(pascalCase('foo')).toBe('Foo');
    expect(pascalCase('Foo')).toBe('Foo');
  });

  it('should handle empty string', () => {
    expect(pascalCase('')).toBe('');
  });

  it('should handle only separators', () => {
    expect(pascalCase('---')).toBe('');
    expect(pascalCase('___')).toBe('');
  });

  it('should handle consecutive separators', () => {
    expect(pascalCase('foo---bar')).toBe('FooBar');
    expect(pascalCase('foo___bar')).toBe('FooBar');
  });

  it('should handle non-string input', () => {
    expect(pascalCase(null as any)).toBe('');
    expect(pascalCase(undefined as any)).toBe('');
  });
});
