import { isWeakMap } from '../../src/is';

describe('isWeakMap', () => {
  it('should return true for WeakMap objects', () => {
    expect(isWeakMap(new WeakMap())).toBe(true);
  });

  it('should return false for non-WeakMap values', () => {
    expect(isWeakMap(new Map())).toBe(false);
    expect(isWeakMap({})).toBe(false);
    expect(isWeakMap(null)).toBe(false);
    expect(isWeakMap(undefined)).toBe(false);
  });
});
