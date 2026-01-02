import { isEmpty } from '../../src/is';

describe('isEmpty', () => {
  it('should return true for empty values', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty(NaN)).toBe(true);
  });

  it('should return false for non-empty values', () => {
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(false)).toBe(false);
    expect(isEmpty('0')).toBe(false);
    expect(isEmpty([0])).toBe(false);
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty(true)).toBe(false);
  });
});