import { invert } from '../../src/object';

describe('invert', () => {
  it('should invert object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = invert(obj);
    expect(result).toEqual({ '1': 'a', '2': 'b', '3': 'c' });
  });

  it('should handle duplicate values', () => {
    const obj = { a: 1, b: 2, c: 1 };
    const result = invert(obj);
    expect(result).toEqual({ '1': 'c', '2': 'b' }); // last one wins
  });

  it('should return empty object for null', () => {
    const result = invert(null as any);
    expect(result).toEqual({});
  });

  it('should handle numeric keys', () => {
    const obj = { 1: 'a', 2: 'b' };
    const result = invert(obj);
    expect(result).toEqual({ a: '1', b: '2' });
  });
});