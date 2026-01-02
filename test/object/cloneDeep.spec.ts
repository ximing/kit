import { cloneDeep } from '../../src/object';

describe('cloneDeep', () => {
  it('should create deep copy of object', () => {
    const obj = { a: 1, b: { c: 2, d: { e: 3 } } };
    const cloned = cloneDeep(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).not.toBe(obj.b); // deep copy
    expect(cloned.b.d).not.toBe(obj.b.d);
  });

  it('should deep clone array', () => {
    const arr = [1, [2, [3, 4]]];
    const cloned = cloneDeep(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
    expect(cloned[1]).not.toBe(arr[1]);
  });

  it('should handle circular references', () => {
    const obj: any = { a: 1 };
    obj.self = obj;
    const cloned = cloneDeep(obj);
    expect(cloned.self).toBe(cloned);
    expect(cloned).not.toBe(obj);
  });

  it('should deep clone Map', () => {
    const map = new Map([
      ['a', { x: 1 }],
      ['b', { y: 2 }],
    ]);
    const cloned = cloneDeep(map);
    expect(cloned).toEqual(map);
    expect(cloned).not.toBe(map);
    expect(cloned.get('a')).not.toBe(map.get('a'));
  });

  it('should deep clone Set', () => {
    const set = new Set([{ a: 1 }, { b: 2 }]);
    const cloned = cloneDeep(set);
    expect(cloned).toEqual(set);
    expect(cloned).not.toBe(set);
  });

  it('should handle Date and RegExp', () => {
    const obj = {
      date: new Date('2024-01-01'),
      regex: /test/gi,
    };
    const cloned = cloneDeep(obj);
    expect(cloned.date).toEqual(obj.date);
    expect(cloned.date).not.toBe(obj.date);
    expect(cloned.regex).toEqual(obj.regex);
    expect(cloned.regex).not.toBe(obj.regex);
  });
});
