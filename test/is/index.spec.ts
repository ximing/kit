import {
  isArray,
  isBoolean,
  isDate,
  isEmpty,
  isError,
  isFunction,
  isMap,
  isNil,
  isNull,
  isNumber,
  isObject,
  isPlainObject,
  isPromise,
  isRegExp,
  isSet,
  isString,
  isSymbol,
  isUndefined,
  isWeakMap,
  isWeakSet,
} from '../../src/is';

describe('is module', () => {
  describe('isArray', () => {
    it('should return true for arrays', () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
      expect(isArray([])).toBe(true);
    });

    it('should return false for non-arrays', () => {
      expect(isArray('abc')).toBe(false);
      expect(isArray({ length: 0 })).toBe(false);
      expect(isArray(123)).toBe(false);
      expect(isArray(null)).toBe(false);
      expect(isArray(undefined)).toBe(false);
    });
  });

  describe('isObject', () => {
    it('should return true for objects', () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ a: 1 })).toBe(true);
      expect(isObject([])).toBe(true);
      expect(isObject(() => {})).toBe(true);
      expect(isObject(new Date())).toBe(true);
    });

    it('should return false for non-objects', () => {
      expect(isObject(null)).toBe(false);
      expect(isObject(undefined)).toBe(false);
      expect(isObject('abc')).toBe(false);
      expect(isObject(123)).toBe(false);
      expect(isObject(true)).toBe(false);
    });
  });

  describe('isPlainObject', () => {
    it('should return true for plain objects', () => {
      expect(isPlainObject({})).toBe(true);
      expect(isPlainObject({ a: 1 })).toBe(true);
      expect(isPlainObject(Object.create(null))).toBe(true);
    });

    it('should return false for non-plain objects', () => {
      expect(isPlainObject([])).toBe(false);
      expect(isPlainObject(() => {})).toBe(false);
      expect(isPlainObject(new Date())).toBe(false);
      expect(isPlainObject(/test/)).toBe(false);
      expect(isPlainObject(new Map())).toBe(false);
      expect(isPlainObject(null)).toBe(false);
      expect(isPlainObject(undefined)).toBe(false);
    });
  });

  describe('isString', () => {
    it('should return true for strings', () => {
      expect(isString('abc')).toBe(true);
      expect(isString('')).toBe(true);
      expect(isString('123')).toBe(true);
    });

    it('should return false for non-strings', () => {
      expect(isString(123)).toBe(false);
      expect(isString(new String('abc'))).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
    });
  });

  describe('isNumber', () => {
    it('should return true for numbers', () => {
      expect(isNumber(123)).toBe(true);
      expect(isNumber(0)).toBe(true);
      expect(isNumber(-123)).toBe(true);
      expect(isNumber(NaN)).toBe(true);
      expect(isNumber(Infinity)).toBe(true);
      expect(isNumber(-Infinity)).toBe(true);
    });

    it('should return false for non-numbers', () => {
      expect(isNumber('123')).toBe(false);
      expect(isNumber(new Number(123))).toBe(false);
      expect(isNumber(null)).toBe(false);
      expect(isNumber(undefined)).toBe(false);
    });
  });

  describe('isBoolean', () => {
    it('should return true for booleans', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
    });

    it('should return false for non-booleans', () => {
      expect(isBoolean(1)).toBe(false);
      expect(isBoolean(0)).toBe(false);
      expect(isBoolean('true')).toBe(false);
      expect(isBoolean(null)).toBe(false);
      expect(isBoolean(undefined)).toBe(false);
    });
  });

  describe('isFunction', () => {
    it('should return true for functions', () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(function () {})).toBe(true);
      expect(isFunction(class MyClass {})).toBe(true);
      expect(isFunction(async () => {})).toBe(true);
      expect(isFunction(function* () {})).toBe(true);
    });

    it('should return false for non-functions', () => {
      expect(isFunction({})).toBe(false);
      expect(isFunction([])).toBe(false);
      expect(isFunction('function')).toBe(false);
      expect(isFunction(123)).toBe(false);
      expect(isFunction(null)).toBe(false);
      expect(isFunction(undefined)).toBe(false);
    });
  });

  describe('isNull', () => {
    it('should return true for null', () => {
      expect(isNull(null)).toBe(true);
    });

    it('should return false for non-null values', () => {
      expect(isNull(undefined)).toBe(false);
      expect(isNull(0)).toBe(false);
      expect(isNull('')).toBe(false);
      expect(isNull(false)).toBe(false);
      expect(isNull({})).toBe(false);
    });
  });

  describe('isUndefined', () => {
    it('should return true for undefined', () => {
      expect(isUndefined(undefined)).toBe(true);
      expect(isUndefined(void 0)).toBe(true);
    });

    it('should return false for non-undefined values', () => {
      expect(isUndefined(null)).toBe(false);
      expect(isUndefined(0)).toBe(false);
      expect(isUndefined('')).toBe(false);
      expect(isUndefined(false)).toBe(false);
      expect(isUndefined({})).toBe(false);
    });
  });

  describe('isNil', () => {
    it('should return true for null or undefined', () => {
      expect(isNil(null)).toBe(true);
      expect(isNil(undefined)).toBe(true);
      expect(isNil(void 0)).toBe(true);
    });

    it('should return false for non-nil values', () => {
      expect(isNil(0)).toBe(false);
      expect(isNil('')).toBe(false);
      expect(isNil(false)).toBe(false);
      expect(isNil({})).toBe(false);
      expect(isNil([])).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('should return true for empty values', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty('')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
      expect(isEmpty(NaN)).toBe(true);
    });

    it('should return false for non-empty values', () => {
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(false)).toBe(false);
      expect(isEmpty('0')).toBe(false);
      expect(isEmpty([0])).toBe(false);
      expect(isEmpty({ a: 1 })).toBe(false);
      expect(isEmpty(true)).toBe(false);
    });
  });

  describe('isDate', () => {
    it('should return true for Date objects', () => {
      expect(isDate(new Date())).toBe(true);
      expect(isDate(new Date('2023-01-01'))).toBe(true);
    });

    it('should return false for non-Date values', () => {
      expect(isDate(Date.now())).toBe(false);
      expect(isDate('2023-01-01')).toBe(false);
      expect(isDate(1234567890)).toBe(false);
      expect(isDate({})).toBe(false);
      expect(isDate(null)).toBe(false);
    });
  });

  describe('isRegExp', () => {
    it('should return true for RegExp objects', () => {
      expect(isRegExp(/abc/)).toBe(true);
      expect(isRegExp(new RegExp('abc'))).toBe(true);
    });

    it('should return false for non-RegExp values', () => {
      expect(isRegExp('/abc/')).toBe(false);
      expect(isRegExp({ source: 'abc' })).toBe(false);
      expect(isRegExp(null)).toBe(false);
      expect(isRegExp(undefined)).toBe(false);
    });
  });

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

  describe('isPromise', () => {
    it('should return true for Promise objects', () => {
      expect(isPromise(Promise.resolve(1))).toBe(true);
      expect(isPromise(new Promise(() => {}))).toBe(true);
    });

    it('should return false for non-Promise values', () => {
      expect(isPromise(async () => {})).toBe(false);
      expect(isPromise({ then: () => {} })).toBe(false);
      expect(isPromise(null)).toBe(false);
      expect(isPromise(undefined)).toBe(false);
    });
  });

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

  describe('isMap', () => {
    it('should return true for Map objects', () => {
      expect(isMap(new Map())).toBe(true);
      expect(isMap(new Map([['a', 1]]))).toBe(true);
    });

    it('should return false for non-Map values', () => {
      expect(isMap({})).toBe(false);
      expect(isMap(new WeakMap())).toBe(false);
      expect(isMap(new Set())).toBe(false);
      expect(isMap(null)).toBe(false);
      expect(isMap(undefined)).toBe(false);
    });
  });

  describe('isSet', () => {
    it('should return true for Set objects', () => {
      expect(isSet(new Set())).toBe(true);
      expect(isSet(new Set([1, 2, 3]))).toBe(true);
    });

    it('should return false for non-Set values', () => {
      expect(isSet([])).toBe(false);
      expect(isSet(new Map())).toBe(false);
      expect(isSet(new WeakSet())).toBe(false);
      expect(isSet(null)).toBe(false);
      expect(isSet(undefined)).toBe(false);
    });
  });

  describe('isWeakMap', () => {
    it('should return true for WeakMap objects', () => {
      expect(isWeakMap(new WeakMap())).toBe(true);
    });

    it('should return false for non-WeakMap values', () => {
      expect(isWeakMap(new Map())).toBe(false);
      expect(isWeakMap({})).toBe(false);
      expect(isWeakMap(null)).toBe(false);
      expect(isWeakMap(undefined)).toBe(false);
    });
  });

  describe('isWeakSet', () => {
    it('should return true for WeakSet objects', () => {
      expect(isWeakSet(new WeakSet())).toBe(true);
    });

    it('should return false for non-WeakSet values', () => {
      expect(isWeakSet(new Set())).toBe(false);
      expect(isWeakSet({})).toBe(false);
      expect(isWeakSet(null)).toBe(false);
      expect(isWeakSet(undefined)).toBe(false);
    });
  });
});
