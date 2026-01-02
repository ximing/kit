import { pick } from '../../src/object';

describe('pick', () => {
  it('should pick properties', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pick(obj, ['a', 'c']);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('should handle non-existent keys', () => {
    const obj = { a: 1, b: 2 };
    const result = pick(obj, ['a', 'c'] as any);
    expect(result).toEqual({ a: 1 });
  });

  it('should return empty object for null', () => {
    const result = pick(null as any, ['a']);
    expect(result).toEqual({});
  });

  it('should handle empty keys array', () => {
    const obj = { a: 1, b: 2 };
    const result = pick(obj, []);
    expect(result).toEqual({});
  });
});