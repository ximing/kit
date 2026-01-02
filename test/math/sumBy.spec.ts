import { sumBy } from '../../src/math';

describe('sumBy', () => {
  it('should sum values using iteratee', () => {
    const objects = [{ n: 1 }, { n: 2 }, { n: 3 }];
    expect(sumBy(objects, (o) => o.n)).toBe(6);
  });

  it('should sum computed values', () => {
    const objects = [{ a: 1, b: 5 }, { a: 2, b: 3 }, { a: 3, b: 1 }];
    expect(sumBy(objects, (o) => o.b)).toBe(9);
  });

  it('should return 0 for empty array', () => {
    expect(sumBy([], (o: any) => o.n)).toBe(0);
  });

  it('should handle single element', () => {
    const objects = [{ n: 5 }];
    expect(sumBy(objects, (o) => o.n)).toBe(5);
  });

  it('should handle negative values', () => {
    const objects = [{ n: -1 }, { n: -2 }, { n: -3 }];
    expect(sumBy(objects, (o) => o.n)).toBe(-6);
  });

  it('should handle floating point values', () => {
    const objects = [{ n: 1.5 }, { n: 2.5 }, { n: 3 }];
    expect(sumBy(objects, (o) => o.n)).toBe(7);
  });

  it('should handle non-array input', () => {
    expect(sumBy(null as any, () => 0)).toBe(0);
    expect(sumBy(undefined as any, () => 0)).toBe(0);
  });
});