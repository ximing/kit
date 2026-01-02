import { maxBy } from '../../src/math';

describe('maxBy', () => {
  it('should return object with maximum value', () => {
    const objects = [{ n: 1 }, { n: 2 }, { n: 3 }];
    expect(maxBy(objects, (o) => o.n)).toEqual({ n: 3 });
  });

  it('should return object with maximum computed value', () => {
    const objects = [{ a: 1, b: 5 }, { a: 2, b: 3 }, { a: 3, b: 1 }];
    expect(maxBy(objects, (o) => o.b)).toEqual({ a: 1, b: 5 });
  });

  it('should return first element for single item', () => {
    const objects = [{ n: 5 }];
    expect(maxBy(objects, (o) => o.n)).toEqual({ n: 5 });
  });

  it('should return undefined for empty array', () => {
    expect(maxBy([], (o: any) => o.n)).toBe(undefined);
  });

  it('should handle negative values', () => {
    const objects = [{ n: -1 }, { n: -2 }, { n: -3 }];
    expect(maxBy(objects, (o) => o.n)).toEqual({ n: -1 });
  });

  it('should handle non-array input', () => {
    expect(maxBy(null as any, () => 0)).toBe(undefined);
    expect(maxBy(undefined as any, () => 0)).toBe(undefined);
  });
});