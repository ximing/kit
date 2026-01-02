import { mergeDeep } from '../../src/object';

describe('mergeDeep', () => {
  it('should deep merge objects', () => {
    const obj1 = { a: 1, b: { c: 2, d: 3 } };
    const obj2 = { b: { d: 4, e: 5 }, f: 6 };
    const result = mergeDeep(obj1, obj2);
    expect(result).toEqual({ a: 1, b: { c: 2, d: 4, e: 5 }, f: 6 });
  });

  it('should merge nested objects', () => {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = { a: { b: { d: 2 } } };
    const result = mergeDeep(obj1, obj2);
    expect(result).toEqual({ a: { b: { c: 1, d: 2 } } });
  });

  it('should replace non-plain objects', () => {
    const obj1 = { a: [1, 2] };
    const obj2 = { a: [3, 4] };
    const result = mergeDeep(obj1, obj2);
    expect(result).toEqual({ a: [3, 4] });
  });

  it('should merge multiple sources', () => {
    const obj1 = { a: { x: 1 } };
    const obj2 = { a: { y: 2 } };
    const obj3 = { a: { z: 3 } };
    const result = mergeDeep(obj1, obj2, obj3);
    expect(result).toEqual({ a: { x: 1, y: 2, z: 3 } });
  });
});
