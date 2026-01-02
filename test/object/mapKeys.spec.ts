import { mapKeys } from '../../src/object';

describe('mapKeys', () => {
  it('should map object keys', () => {
    const obj = { a: 1, b: 2 };
    const result = mapKeys(obj, (value, key) => key + value);
    expect(result).toEqual({ a1: 1, b2: 2 });
  });

  it('should handle key collisions', () => {
    const obj = { a: 1, b: 1 };
    const result = mapKeys(obj, (value) => 'key' + value);
    expect(result).toEqual({ key1: 1 }); // last one wins
  });

  it('should return empty object for null', () => {
    const result = mapKeys(null as any, (v, k) => k);
    expect(result).toEqual({});
  });

  it('should pass correct arguments', () => {
    const obj = { a: 1 };
    mapKeys(obj, (value, key, object) => {
      expect(value).toBe(1);
      expect(key).toBe('a');
      expect(object).toBe(obj);
      return 'x';
    });
  });
});
