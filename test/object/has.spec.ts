import { has } from '../../src/object';

describe('has', () => {
  const obj = {
    a: { b: { c: 3 } },
    d: [1, 2, 3],
    e: null,
    f: undefined,
  };

  it('should check nested property with string path', () => {
    expect(has(obj, 'a.b.c')).toBe(true);
  });

  it('should check nested property with array path', () => {
    expect(has(obj, ['a', 'b', 'c'])).toBe(true);
  });

  it('should check array element', () => {
    expect(has(obj, 'd[0]')).toBe(true);
    expect(has(obj, 'd[10]')).toBe(false);
  });

  it('should return true for null value', () => {
    expect(has(obj, 'e')).toBe(true);
  });

  it('should return true for undefined value', () => {
    expect(has(obj, 'f')).toBe(true);
  });

  it('should return false for non-existent path', () => {
    expect(has(obj, 'x.y.z')).toBe(false);
  });

  it('should return false for null object', () => {
    expect(has(null, 'a.b')).toBe(false);
  });
});