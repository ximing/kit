import { merge } from '../../src/object';

describe('merge', () => {
  it('should merge objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    const result = merge(obj1, obj2);
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  it('should merge multiple sources', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const obj3 = { c: 3 };
    const result = merge(obj1, obj2, obj3);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should perform shallow merge', () => {
    const obj1 = { a: { x: 1 } };
    const obj2 = { a: { y: 2 } };
    const result = merge(obj1, obj2);
    expect(result).toEqual({ a: { y: 2 } });
  });

  it('should ignore null and undefined sources', () => {
    const obj = { a: 1 };
    const result = merge(obj, null as any, undefined as any, { b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should throw on null target', () => {
    expect(() => merge(null as any, { a: 1 })).toThrow(TypeError);
  });
});
