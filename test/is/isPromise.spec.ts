import { isPromise } from '../../src/is';

describe('isPromise', () => {
  it('should return true for Promise objects', () => {
    expect(isPromise(Promise.resolve(1))).toBe(true);
    expect(isPromise(new Promise(() => {}))).toBe(true);
  });

  it('should return false for non-Promise values', () => {
    expect(isPromise(async () => {})).toBe(false);
    expect(isPromise({ then: () => {} })).toBe(false);
    expect(isPromise(null)).toBe(false);
    expect(isPromise(undefined)).toBe(false);
  });
});