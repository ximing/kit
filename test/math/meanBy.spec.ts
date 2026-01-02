import { meanBy } from '../../src/math';

describe('meanBy', () => {
  it('should calculate mean using iteratee', () => {
    const objects = [{ n: 1 }, { n: 2 }, { n: 3 }];
    expect(meanBy(objects, (o) => o.n)).toBe(2);
  });

  it('should calculate mean of computed values', () => {
    const objects = [{ a: 1, b: 5 }, { a: 2, b: 3 }, { a: 3, b: 1 }];
    expect(meanBy(objects, (o) => o.b)).toBe(3);
  });

  it('should return 0 for empty array', () => {
    expect(meanBy([], (o: any) => o.n)).toBe(0);
  });

  it('should handle single element', () => {
    const objects = [{ n: 5 }];
    expect(meanBy(objects, (o) => o.n)).toBe(5);
  });

  it('should handle negative values', () => {
    const objects = [{ n: -1 }, { n: -2 }, { n: -3 }];
    expect(meanBy(objects, (o) => o.n)).toBe(-2);
  });

  it('should handle floating point values', () => {
    const objects = [{ n: 1.5 }, { n: 2.5 }, { n: 3 }];
    expect(meanBy(objects, (o) => o.n)).toBeCloseTo(2.333333, 5);
  });

  it('should handle non-array input', () => {
    expect(meanBy(null as any, () => 0)).toBe(0);
    expect(meanBy(undefined as any, () => 0)).toBe(0);
  });
});