import { set } from '../../src/object';

describe('set', () => {
  it('should set nested value with string path', () => {
    const obj = { a: { b: { c: 3 } } };
    set(obj, 'a.b.c', 4);
    expect(obj.a.b.c).toBe(4);
  });

  it('should set nested value with array path', () => {
    const obj: any = { a: {} };
    set(obj, ['a', 'b', 'c'], 5);
    expect(obj.a.b.c).toBe(5);
  });

  it('should create missing paths', () => {
    const obj: any = {};
    set(obj, 'x.y.z', 1);
    expect(obj.x.y.z).toBe(1);
  });

  it('should create array for numeric keys', () => {
    const obj: any = {};
    set(obj, 'a.b[0]', 1);
    expect(Array.isArray(obj.a.b)).toBe(true);
    expect(obj.a.b[0]).toBe(1);
  });

  it('should handle bracket notation', () => {
    const obj: any = {};
    set(obj, 'a[0].b', 2);
    expect(obj.a[0].b).toBe(2);
  });

  it('should return object on null', () => {
    expect(set(null as any, 'a.b', 1)).toBe(null);
  });
});
