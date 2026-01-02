import { uniqBy } from '../../src/array';

describe('uniqBy', () => {
  it('should remove duplicates based on predicate', () => {
    const result = uniqBy(
      [
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
        { id: 1, name: 'c' },
      ],
      (item) => item.id,
    );
    expect(result).toEqual([
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ]);
  });

  it('should handle string values', () => {
    const result = uniqBy(['foo', 'bar', 'foo', 'baz'], (item) => item);
    expect(result).toEqual(['foo', 'bar', 'baz']);
  });

  it('should handle empty array', () => {
    expect(uniqBy([], (item) => item)).toEqual([]);
  });

  it('should handle non-array input', () => {
    expect(uniqBy(null as any, (item) => item)).toEqual([]);
  });
});
