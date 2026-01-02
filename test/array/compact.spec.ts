import { compact } from '../../src/array';

describe('compact', () => {
  it('should remove falsy values', () => {
    expect(compact([0, 1, false, 2, '', 3, null, undefined, 4])).toEqual([1, 2, 3, 4]);
  });

  it('should preserve truthy values', () => {
    expect(compact([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should handle empty array', () => {
    expect(compact([])).toEqual([]);
  });

  it('should handle array with only falsy values', () => {
    expect(compact([0, false, '', null, undefined])).toEqual([]);
  });

  it('should handle non-array input', () => {
    expect(compact(null as any)).toEqual([]);
    expect(compact(undefined as any)).toEqual([]);
  });

  it('should keep 0 as falsy but remove it', () => {
    expect(compact([0, 1, 2])).toEqual([1, 2]);
  });
});
