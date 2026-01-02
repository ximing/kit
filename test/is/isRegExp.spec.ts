import { isRegExp } from '../../src/is';

describe('isRegExp', () => {
  it('should return true for RegExp objects', () => {
    expect(isRegExp(/abc/)).toBe(true);
    expect(isRegExp(new RegExp('abc'))).toBe(true);
  });

  it('should return false for non-RegExp values', () => {
    expect(isRegExp('/abc/')).toBe(false);
    expect(isRegExp({ source: 'abc' })).toBe(false);
    expect(isRegExp(null)).toBe(false);
    expect(isRegExp(undefined)).toBe(false);
  });
});
