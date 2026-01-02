import { keys } from '../../src/object';

describe('keys', () => {
  it('should return object keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(keys(obj)).toEqual(['a', 'b', 'c']);
  });

  it('should return empty array for empty object', () => {
    expect(keys({})).toEqual([]);
  });

  it('should return empty array for null', () => {
    expect(keys(null as any)).toEqual([]);
  });

  it('should only return own properties', () => {
    const obj = Object.create({ inherited: 1 });
    obj.own = 2;
    expect(keys(obj)).toEqual(['own']);
  });
});