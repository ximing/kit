import {
  clone,
  cloneDeep,
  merge,
  mergeDeep,
  pick,
  omit,
  get,
  set,
  has,
  keys,
  values,
  entries,
  mapKeys,
  mapValues,
  invert,
} from '../../src/object';

describe('Object Utils', () => {
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
      const map = new Map([['a', 1], ['b', 2]]);
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
      const map = new Map([['a', { x: 1 }], ['b', { y: 2 }]]);
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

  describe('pick', () => {
    it('should pick properties', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = pick(obj, ['a', 'c']);
      expect(result).toEqual({ a: 1, c: 3 });
    });

    it('should handle non-existent keys', () => {
      const obj = { a: 1, b: 2 };
      const result = pick(obj, ['a', 'c'] as any);
      expect(result).toEqual({ a: 1 });
    });

    it('should return empty object for null', () => {
      const result = pick(null as any, ['a']);
      expect(result).toEqual({});
    });

    it('should handle empty keys array', () => {
      const obj = { a: 1, b: 2 };
      const result = pick(obj, []);
      expect(result).toEqual({});
    });
  });

  describe('omit', () => {
    it('should omit properties', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = omit(obj, ['b']);
      expect(result).toEqual({ a: 1, c: 3 });
    });

    it('should omit multiple properties', () => {
      const obj = { a: 1, b: 2, c: 3, d: 4 };
      const result = omit(obj, ['a', 'c']);
      expect(result).toEqual({ b: 2, d: 4 });
    });

    it('should handle non-existent keys', () => {
      const obj = { a: 1, b: 2 };
      const result = omit(obj, ['c'] as any);
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('should return empty object for null', () => {
      const result = omit(null as any, ['a']);
      expect(result).toEqual({});
    });

    it('should handle empty keys array', () => {
      const obj = { a: 1, b: 2 };
      const result = omit(obj, []);
      expect(result).toEqual({ a: 1, b: 2 });
    });
  });

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

  describe('keys', () => {
    it('should return object keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(keys(obj)).toEqual(['a', 'b', 'c']);
    });

    it('should return empty array for empty object', () => {
      expect(keys({})).toEqual([]);
    });

    it('should return empty array for null', () => {
      expect(keys(null as any)).toEqual([]);
    });

    it('should only return own properties', () => {
      const obj = Object.create({ inherited: 1 });
      obj.own = 2;
      expect(keys(obj)).toEqual(['own']);
    });
  });

  describe('values', () => {
    it('should return object values', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(values(obj)).toEqual([1, 2, 3]);
    });

    it('should return empty array for empty object', () => {
      expect(values({})).toEqual([]);
    });

    it('should return empty array for null', () => {
      expect(values(null as any)).toEqual([]);
    });

    it('should only return own property values', () => {
      const obj = Object.create({ inherited: 1 });
      obj.own = 2;
      expect(values(obj)).toEqual([2]);
    });
  });

  describe('entries', () => {
    it('should return key-value pairs', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(entries(obj)).toEqual([['a', 1], ['b', 2], ['c', 3]]);
    });

    it('should return empty array for empty object', () => {
      expect(entries({})).toEqual([]);
    });

    it('should return empty array for null', () => {
      expect(entries(null as any)).toEqual([]);
    });

    it('should only return own property entries', () => {
      const obj = Object.create({ inherited: 1 });
      obj.own = 2;
      expect(entries(obj)).toEqual([['own', 2]]);
    });
  });

  describe('mapKeys', () => {
    it('should map object keys', () => {
      const obj = { a: 1, b: 2 };
      const result = mapKeys(obj, (value, key) => key + value);
      expect(result).toEqual({ a1: 1, b2: 2 });
    });

    it('should handle key collisions', () => {
      const obj = { a: 1, b: 1 };
      const result = mapKeys(obj, (value) => 'key' + value);
      expect(result).toEqual({ key1: 1 }); // last one wins
    });

    it('should return empty object for null', () => {
      const result = mapKeys(null as any, (v, k) => k);
      expect(result).toEqual({});
    });

    it('should pass correct arguments', () => {
      const obj = { a: 1 };
      mapKeys(obj, (value, key, object) => {
        expect(value).toBe(1);
        expect(key).toBe('a');
        expect(object).toBe(obj);
        return 'x';
      });
    });
  });

  describe('mapValues', () => {
    it('should map object values', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = mapValues(obj, (value) => value * 2);
      expect(result).toEqual({ a: 2, b: 4, c: 6 });
    });

    it('should transform value types', () => {
      const obj = { a: 1, b: 2 };
      const result = mapValues(obj, (value) => String(value));
      expect(result).toEqual({ a: '1', b: '2' });
    });

    it('should return empty object for null', () => {
      const result = mapValues(null as any, (v) => v);
      expect(result).toEqual({});
    });

    it('should pass correct arguments', () => {
      const obj = { a: 1 };
      mapValues(obj, (value, key, object) => {
        expect(value).toBe(1);
        expect(key).toBe('a');
        expect(object).toBe(obj);
        return value;
      });
    });
  });

  describe('invert', () => {
    it('should invert object', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = invert(obj);
      expect(result).toEqual({ '1': 'a', '2': 'b', '3': 'c' });
    });

    it('should handle duplicate values', () => {
      const obj = { a: 1, b: 2, c: 1 };
      const result = invert(obj);
      expect(result).toEqual({ '1': 'c', '2': 'b' }); // last one wins
    });

    it('should return empty object for null', () => {
      const result = invert(null as any);
      expect(result).toEqual({});
    });

    it('should handle numeric keys', () => {
      const obj = { 1: 'a', 2: 'b' };
      const result = invert(obj);
      expect(result).toEqual({ a: '1', b: '2' });
    });
  });
});