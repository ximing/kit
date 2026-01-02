import { isError } from '../../src/is';

describe('isError', () => {
  it('should return true for Error objects', () => {
    expect(isError(new Error())).toBe(true);
    expect(isError(new TypeError())).toBe(true);
    expect(isError(new RangeError())).toBe(true);
    expect(isError(new SyntaxError())).toBe(true);
  });

  it('should return false for non-Error values', () => {
    expect(isError('error')).toBe(false);
    expect(isError({ message: 'error' })).toBe(false);
    expect(isError(null)).toBe(false);
    expect(isError(undefined)).toBe(false);
  });
});