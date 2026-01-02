import { omit } from '../../src/object';

describe('omit', () => {
  it('should omit properties', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ['b']);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('should omit multiple properties', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const result = omit(obj, ['a', 'c']);
    expect(result).toEqual({ b: 2, d: 4 });
  });

  it('should handle non-existent keys', () => {
    const obj = { a: 1, b: 2 };
    const result = omit(obj, ['c'] as any);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should return empty object for null', () => {
    const result = omit(null as any, ['a']);
    expect(result).toEqual({});
  });

  it('should handle empty keys array', () => {
    const obj = { a: 1, b: 2 };
    const result = omit(obj, []);
    expect(result).toEqual({ a: 1, b: 2 });
  });
});
