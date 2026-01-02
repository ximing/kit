import { flatten } from '../../src/array';

describe('flatten', () => {
  it('should flatten array by one level by default', () => {
    expect(flatten([1, [2, 3], [4, [5]]])).toEqual([1, 2, 3, 4, [5]]);
  });

  it('should flatten array to specified depth', () => {
    expect(flatten([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
    expect(flatten([1, [2, [3, [4]]]], 3)).toEqual([1, 2, 3, 4]);
  });

  it('should handle depth of 0', () => {
    expect(flatten([1, [2, 3]], 0)).toEqual([1, [2, 3]]);
  });

  it('should handle empty array', () => {
    expect(flatten([])).toEqual([]);
  });

  it('should handle non-array input', () => {
    expect(flatten(null as any)).toEqual([]);
  });
});
