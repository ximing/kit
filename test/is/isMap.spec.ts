import { isMap } from '../../src/is';

describe('isMap', () => {
  it('should return true for Map objects', () => {
    expect(isMap(new Map())).toBe(true);
    expect(isMap(new Map([['a', 1]]))).toBe(true);
  });

  it('should return false for non-Map values', () => {
    expect(isMap({})).toBe(false);
    expect(isMap(new WeakMap())).toBe(false);
    expect(isMap(new Set())).toBe(false);
    expect(isMap(null)).toBe(false);
    expect(isMap(undefined)).toBe(false);
  });
});