# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2026-01-02

### Added

#### Array Functions (10)

- `chunk(array, size)` - Split array into chunks of specified size
- `compact(array)` - Remove falsy values from array
- `flatten(array, depth)` - Flatten array to specified depth
- `flattenDeep(array)` - Recursively flatten array
- `uniq(array)` - Remove duplicate values from array
- `uniqBy(array, iteratee)` - Remove duplicates by custom iterator
- `difference(...arrays)` - Get array difference
- `intersection(...arrays)` - Get array intersection
- `union(...arrays)` - Get array union
- `zip(...arrays)` - Combine multiple arrays

#### Object Functions (15)

- `clone(obj)` - Shallow clone object
- `cloneDeep(obj)` - Deep clone object
- `merge(target, ...sources)` - Merge objects
- `mergeDeep(target, ...sources)` - Deep merge objects
- `pick(obj, keys)` - Pick specific properties
- `omit(obj, keys)` - Omit specific properties
- `get(obj, path, defaultValue)` - Safe property access
- `set(obj, path, value)` - Safe property assignment
- `has(obj, path)` - Check property existence
- `keys(obj)` - Get object keys
- `values(obj)` - Get object values
- `entries(obj)` - Get object entries
- `mapKeys(obj, iteratee)` - Map object keys
- `mapValues(obj, iteratee)` - Map object values
- `invert(obj)` - Invert key-value pairs

#### String Functions (15)

- `camelCase(str)` - Convert to camelCase
- `kebabCase(str)` - Convert to kebab-case
- `snakeCase(str)` - Convert to snake_case
- `pascalCase(str)` - Convert to PascalCase
- `capitalize(str)` - Capitalize first letter
- `upperFirst(str)` - Convert first letter to uppercase
- `lowerFirst(str)` - Convert first letter to lowercase
- `trim(str, chars)` - Trim characters from string
- `trimStart(str, chars)` - Trim from start
- `trimEnd(str, chars)` - Trim from end
- `truncate(str, options)` - Truncate string
- `padStart(str, length, chars)` - Pad start of string
- `padEnd(str, length, chars)` - Pad end of string
- `repeat(str, n)` - Repeat string
- `template(str, data)` - Template string replacement

#### Function Utilities (10)

- `debounce(func, wait, options)` - Debounce function execution
- `throttle(func, wait, options)` - Throttle function execution
- `once(func)` - Execute function only once
- `memoize(func, resolver)` - Cache function results
- `curry(func, arity)` - Curry function
- `partial(func, ...args)` - Partial function application
- `bind(func, thisArg, ...args)` - Bind function context
- `negate(predicate)` - Negate predicate function
- `compose(...funcs)` - Compose functions right-to-left
- `pipe(...funcs)` - Pipe functions left-to-right

#### Number Functions (10)

- `clamp(number, lower, upper)` - Clamp number to range
- `random(lower, upper, floating)` - Generate random number
- `round(number, precision)` - Round to precision
- `ceil(number, precision)` - Ceiling with precision
- `floor(number, precision)` - Floor with precision
- `sum(numbers)` - Sum array of numbers
- `mean(numbers)` - Calculate mean
- `median(numbers)` - Calculate median
- `range(start, end, step)` - Generate number range
- `inRange(number, start, end)` - Check if in range

#### Type Checking Functions (20)

- `isArray(value)` - Check if array
- `isObject(value)` - Check if object
- `isPlainObject(value)` - Check if plain object
- `isString(value)` - Check if string
- `isNumber(value)` - Check if number
- `isBoolean(value)` - Check if boolean
- `isFunction(value)` - Check if function
- `isNull(value)` - Check if null
- `isUndefined(value)` - Check if undefined
- `isNil(value)` - Check if null or undefined
- `isEmpty(value)` - Check if empty
- `isDate(value)` - Check if Date
- `isRegExp(value)` - Check if RegExp
- `isError(value)` - Check if Error
- `isPromise(value)` - Check if Promise
- `isSymbol(value)` - Check if Symbol
- `isMap(value)` - Check if Map
- `isSet(value)` - Check if Set
- `isWeakMap(value)` - Check if WeakMap
- `isWeakSet(value)` - Check if WeakSet

#### Date Functions (10)

- `format(date, formatStr)` - Format date string
- `parse(dateStr, formatStr)` - Parse date string
- `addDays(date, amount)` - Add days to date
- `addMonths(date, amount)` - Add months to date
- `addYears(date, amount)` - Add years to date
- `diffDays(date1, date2)` - Difference in days
- `diffMonths(date1, date2)` - Difference in months
- `diffYears(date1, date2)` - Difference in years
- `startOfDay(date)` - Get start of day
- `endOfDay(date)` - Get end of day

#### Promise Utilities (8)

- `delay(ms, value)` - Delay promise resolution
- `retry(fn, options)` - Retry failed promises
- `timeout(promise, ms, message)` - Add timeout to promise
- `parallel(tasks, concurrency)` - Run tasks in parallel
- `series(tasks)` - Run tasks in series
- `map(array, mapper, concurrency)` - Async map
- `filter(array, predicate, concurrency)` - Async filter
- `reduce(array, reducer, initial)` - Async reduce

#### Collection Operations (9)

- `groupBy(collection, iteratee)` - Group collection
- `keyBy(collection, iteratee)` - Create key-value map
- `sortBy(collection, iteratees)` - Sort collection
- `orderBy(collection, iteratees, orders)` - Multi-key sort
- `partition(collection, predicate)` - Partition collection
- `countBy(collection, iteratee)` - Count by property
- `sample(collection)` - Get random element
- `sampleSize(collection, n)` - Get n random elements
- `shuffle(collection)` - Shuffle collection

#### Math Functions (6)

- `max(numbers)` - Get maximum value
- `min(numbers)` - Get minimum value
- `maxBy(array, iteratee)` - Get max by condition
- `minBy(array, iteratee)` - Get min by condition
- `sumBy(array, iteratee)` - Sum by condition
- `meanBy(array, iteratee)` - Mean by condition

### Features

- Full TypeScript support with complete type definitions
- Tree-shaking friendly - only import what you need
- CommonJS and ES Module support
- 90%+ test coverage with 675+ test cases
- Source maps for debugging
- Support for modern browsers (Chrome 70+, Safari 12+)
- Support for Node.js 12+

### Build

- Rollup-based build system
- Separate CJS and ESM outputs
- TypeScript type declaration generation
- Source maps included
- Minification ready

### Documentation

- Comprehensive README with quick start guide
- API documentation for all 100+ functions
- Build guide for developers
- JSDoc comments in source code
