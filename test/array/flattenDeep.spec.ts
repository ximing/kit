import { flattenDeep } from '../../src/array';

describe('flattenDeep', () => {
  it('should deeply flatten array', () => {
    expect(flattenDeep([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
  });

  it('should handle mixed depths', () => {
    expect(flattenDeep([1, [2], [[3]], [[[4]]]])).toEqual([1, 2, 3, 4]);
  });

  it('should handle empty array', () => {
    expect(flattenDeep([])).toEqual([]);
  });

  it('should handle non-array input', () => {
    expect(flattenDeep(null as any)).toEqual([]);
  });
});
