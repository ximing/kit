import { mapValues } from '../../src/object';

describe('mapValues', () => {
  it('should map object values', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = mapValues(obj, (value) => value * 2);
    expect(result).toEqual({ a: 2, b: 4, c: 6 });
  });

  it('should transform value types', () => {
    const obj = { a: 1, b: 2 };
    const result = mapValues(obj, (value) => String(value));
    expect(result).toEqual({ a: '1', b: '2' });
  });

  it('should return empty object for null', () => {
    const result = mapValues(null as any, (v) => v);
    expect(result).toEqual({});
  });

  it('should pass correct arguments', () => {
    const obj = { a: 1 };
    mapValues(obj, (value, key, object) => {
      expect(value).toBe(1);
      expect(key).toBe('a');
      expect(object).toBe(obj);
      return value;
    });
  });
});