import { isWeakSet } from '../../src/is';

describe('isWeakSet', () => {
  it('should return true for WeakSet objects', () => {
    expect(isWeakSet(new WeakSet())).toBe(true);
  });

  it('should return false for non-WeakSet values', () => {
    expect(isWeakSet(new Set())).toBe(false);
    expect(isWeakSet({})).toBe(false);
    expect(isWeakSet(null)).toBe(false);
    expect(isWeakSet(undefined)).toBe(false);
  });
});