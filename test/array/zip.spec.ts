import { zip } from '../../src/array';

describe('zip', () => {
  it('should zip arrays together', () => {
    expect(zip(['a', 'b', 'c'], [1, 2, 3])).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
  });

  it('should use minimum length', () => {
    expect(zip(['a', 'b'], [1, 2, 3])).toEqual([
      ['a', 1],
      ['b', 2],
    ]);
  });

  it('should handle single array', () => {
    expect(zip([1, 2, 3])).toEqual([[1], [2], [3]]);
  });

  it('should handle empty arrays', () => {
    expect(zip([], [])).toEqual([]);
  });

  it('should handle multiple arrays', () => {
    expect(zip([1, 2], ['a', 'b'], [true, false])).toEqual([
      [1, 'a', true],
      [2, 'b', false],
    ]);
  });
});
