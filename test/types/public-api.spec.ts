import { describe, expectTypeOf, it } from 'vitest';
import { groupBy } from '../../src/collection/groupBy';
import { debounce } from '../../src/function/debounce';
import { get } from '../../src/object/get';
import { omit } from '../../src/object/omit';
import { pick } from '../../src/object/pick';
import { retry } from '../../src/promise/retry';

describe('public types', () => {
  it('get returns the default type when provided', () => {
    const value = get({ a: 1 }, 'b', 'fallback');
    // Path walks cannot infer nested value types from a string path, so T stays unknown.
    expectTypeOf(value).toEqualTypeOf<unknown>();

    const typed = get<number, string>({ a: 1 }, 'b', 'fallback');
    expectTypeOf(typed).toEqualTypeOf<number | string>();
  });

  it('pick preserves value types for known keys', () => {
    const picked = pick({ a: 1, b: 'x' }, ['a']);
    expectTypeOf(picked).toMatchTypeOf<{ a: number }>();
  });

  it('omit preserves remaining value types', () => {
    const omitted = omit({ a: 1, b: 'x' }, ['b']);
    expectTypeOf(omitted).toMatchTypeOf<{ a: number }>();
  });

  it('debounce preserves the function signature and adds cancel/flush', () => {
    const fn = (n: number) => n;
    const d = debounce(fn, 10);
    expectTypeOf(d).toBeCallableWith(1);
    expectTypeOf(d.cancel).toBeCallableWith();
    expectTypeOf(d.flush).toBeCallableWith();
  });

  it('groupBy values stay the item type', () => {
    const grouped = groupBy([{ id: 1 }], 'id');
    expectTypeOf(grouped).toMatchTypeOf<Record<string | number, { id: number }[]>>();
  });

  it('retry resolves to the function return type', () => {
    const result = retry(() => 1);
    expectTypeOf(result).toEqualTypeOf<Promise<number>>();
  });
});
