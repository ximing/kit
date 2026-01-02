import { difference } from '../../src/array';

describe('difference', () => {
  it('should return unique values in first array not in others', () => {
    expect(difference([1, 2, 3], [2, 3, 4])).toEqual([1]);
  });

  it('should handle multiple exclude arrays', () => {
    expect(difference([1, 2, 3, 4], [2, 4], [3])).toEqual([1]);
  });

  it('should remove duplicates from result', () => {
    expect(difference([1, 1, 2, 3], [2])).toEqual([1, 3]);
  });

  it('should handle empty arrays', () => {
    expect(difference([1, 2, 3], [])).toEqual([1, 2, 3]);
    expect(difference([], [1, 2, 3])).toEqual([]);
  });

  it('should handle non-array input', () => {
    expect(difference(null as any, [1, 2])).toEqual([]);
  });
});