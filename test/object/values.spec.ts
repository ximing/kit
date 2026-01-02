import { values } from '../../src/object';

describe('values', () => {
  it('should return object values', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(values(obj)).toEqual([1, 2, 3]);
  });

  it('should return empty array for empty object', () => {
    expect(values({})).toEqual([]);
  });

  it('should return empty array for null', () => {
    expect(values(null as any)).toEqual([]);
  });

  it('should only return own property values', () => {
    const obj = Object.create({ inherited: 1 });
    obj.own = 2;
    expect(values(obj)).toEqual([2]);
  });
});