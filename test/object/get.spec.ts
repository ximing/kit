import { get } from '../../src/object';

describe('get', () => {
  const obj = {
    a: { b: { c: 3 } },
    d: [1, 2, { e: 4 }],
    f: null,
  };

  it('should get nested value with string path', () => {
    expect(get(obj, 'a.b.c')).toBe(3);
  });

  it('should get nested value with array path', () => {
    expect(get(obj, ['a', 'b', 'c'])).toBe(3);
  });

  it('should get array element with bracket notation', () => {
    expect(get(obj, 'd[0]')).toBe(1);
    expect(get(obj, 'd[2].e')).toBe(4);
  });

  it('should get array element with array path', () => {
    expect(get(obj, ['d', 2, 'e'])).toBe(4);
  });

  it('should return default value for undefined', () => {
    expect(get(obj, 'x.y.z', 'default')).toBe('default');
    expect(get(obj, 'a.b.x', 'default')).toBe('default');
  });

  it('should return default value for null object', () => {
    expect(get(null, 'a.b', 'default')).toBe('default');
  });

  it('should handle null in path', () => {
    expect(get(obj, 'f.g', 'default')).toBe('default');
  });

  it('should return undefined when no default provided', () => {
    expect(get(obj, 'x.y.z')).toBeUndefined();
  });
});
