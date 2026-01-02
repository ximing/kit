import { entries } from '../../src/object';

describe('entries', () => {
  it('should return key-value pairs', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(entries(obj)).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
  });

  it('should return empty array for empty object', () => {
    expect(entries({})).toEqual([]);
  });

  it('should return empty array for null', () => {
    expect(entries(null as any)).toEqual([]);
  });

  it('should only return own property entries', () => {
    const obj = Object.create({ inherited: 1 });
    obj.own = 2;
    expect(entries(obj)).toEqual([['own', 2]]);
  });
});
