import { clone } from '../../src/object';

describe('clone', () => {
  it('should create shallow copy of object', () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = clone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).toBe(obj.b); // shallow copy
  });

  it('should clone array', () => {
    const arr = [1, 2, 3];
    const cloned = clone(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
  });

  it('should clone Date', () => {
    const date = new Date('2024-01-01');
    const cloned = clone(date);
    expect(cloned).toEqual(date);
    expect(cloned).not.toBe(date);
  });

  it('should clone RegExp', () => {
    const regex = /test/gi;
    const cloned = clone(regex);
    expect(cloned).toEqual(regex);
    expect(cloned).not.toBe(regex);
  });

  it('should clone Map', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const cloned = clone(map);
    expect(cloned).toEqual(map);
    expect(cloned).not.toBe(map);
  });

  it('should clone Set', () => {
    const set = new Set([1, 2, 3]);
    const cloned = clone(set);
    expect(cloned).toEqual(set);
    expect(cloned).not.toBe(set);
  });

  it('should return primitives as is', () => {
    expect(clone(1)).toBe(1);
    expect(clone('test')).toBe('test');
    expect(clone(true)).toBe(true);
    expect(clone(null)).toBe(null);
    expect(clone(undefined)).toBe(undefined);
  });
});
