/**
 * Type definitions for @rabjs/kit
 */

/**
 * Primitive types
 */
export type Primitive = string | number | boolean | symbol | null | undefined;

/**
 * Object type
 */
export type ObjectType = Record<string, unknown>;

/**
 * Function type
 */
export type FunctionType = (...args: never[]) => unknown;

/**
 * Iteratee function type
 */
export type IterateeFunction<T, R> = (item: T, index?: number, array?: T[]) => R;

/**
 * Comparator function type
 */
export type ComparatorFunction<T> = (a: T, b: T) => number;

/**
 * Predicate function type
 */
export type PredicateFunction<T> = (item: T, index?: number, array?: T[]) => boolean;

/**
 * Mapper function type
 */
export type MapperFunction<T, R> = (item: T, index?: number, array?: T[]) => R;

/**
 * Reducer function type
 */
export type ReducerFunction<T, R> = (accumulator: R, item: T, index?: number, array?: T[]) => R;

/**
 * Options for debounce/throttle
 */
export interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

/**
 * Options for retry
 */
export interface RetryOptions {
  maxAttempts?: number;
  delay?: number;
  backoff?: number;
  onRetry?: (attempt: number, error: Error) => void;
  signal?: AbortSignal;
}

/**
 * Options for timeout
 */
export interface TimeoutOptions {
  ms: number;
  message?: string;
}

/**
 * Options for truncate
 */
export interface TruncateOptions {
  length?: number;
  omission?: string;
  separator?: string | RegExp;
}

/**
 * Options for format/parse date
 */
export interface DateFormatOptions {
  locale?: string;
  timeZone?: string;
}
