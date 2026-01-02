import { keyBy } from '../../src/collection';

describe('keyBy', () => {
  it('should key elements by property', () => {
    const users = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ];
    const result = keyBy(users, 'id');
    expect(result[1].name).toBe('John');
    expect(result[2].name).toBe('Jane');
  });

  it('should key elements by function', () => {
    const users = [
      { email: 'john@example.com', name: 'John' },
      { email: 'jane@example.com', name: 'Jane' },
    ];
    const result = keyBy(users, (u) => u.email);
    expect(result['john@example.com'].name).toBe('John');
    expect(result['jane@example.com'].name).toBe('Jane');
  });

  it('should handle empty array', () => {
    const result = keyBy([], 'id');
    expect(result).toEqual({});
  });

  it('should overwrite duplicate keys', () => {
    const items = [
      { id: 1, value: 'a' },
      { id: 1, value: 'b' },
    ];
    const result = keyBy(items, 'id');
    expect(result[1].value).toBe('b');
  });

  it('should work with numeric keys', () => {
    const items = [
      { code: 100, name: 'Item1' },
      { code: 200, name: 'Item2' },
    ];
    const result = keyBy(items, 'code');
    expect(result[100].name).toBe('Item1');
    expect(result[200].name).toBe('Item2');
  });
});
