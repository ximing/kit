import { isSymbol } from '../../src/is';

describe('isSymbol', () => {
  it('should return true for Symbol values', () => {
    expect(isSymbol(Symbol('test'))).toBe(true);
    expect(isSymbol(Symbol.iterator)).toBe(true);
  });

  it('should return false for non-Symbol values', () => {
    expect(isSymbol('test')).toBe(false);
    expect(isSymbol({})).toBe(false);
    expect(isSymbol(null)).toBe(false);
    expect(isSymbol(undefined)).toBe(false);
  });
});