import { uniq } from '../../src/array';

describe('uniq', () => {
  it('should remove duplicate values', () => {
    expect(uniq([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
  });

  it('should preserve order of first occurrence', () => {
    expect(uniq([3, 1, 2, 1, 3])).toEqual([3, 1, 2]);
  });

  it('should handle strings', () => {
    expect(uniq(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
  });

  it('should handle empty array', () => {
    expect(uniq([])).toEqual([]);
  });

  it('should handle non-array input', () => {
    expect(uniq(null as any)).toEqual([]);
  });
});