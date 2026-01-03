// Interactive examples index
// This file exports all interactive example components for use in the documentation

// Array examples
import ChunkExample from './array/chunk';
import CompactExample from './array/compact';
import DifferenceExample from './array/difference';
import FindIndexExample from './array/findIndex';
import FlattenExample from './array/flatten';
import IntersectionExample from './array/intersection';
import UnionExample from './array/union';
import UniqExample from './array/uniq';
import ZipExample from './array/zip';

// Collection examples
import CountByExample from './collection/countBy';
import GroupByExample from './collection/groupBy';
import KeyByExample from './collection/keyBy';
import OrderByExample from './collection/orderBy';
import PartitionExample from './collection/partition';
import SampleExample from './collection/sample';
import SampleSizeExample from './collection/sampleSize';
import ShuffleExample from './collection/shuffle';
import SortByExample from './collection/sortBy';

// Date examples
import AddDaysExample from './date/addDays';
import AddMonthsExample from './date/addMonths';
import AddYearsExample from './date/addYears';
import DiffDaysExample from './date/diffDays';
import DiffMonthsExample from './date/diffMonths';
import DiffYearsExample from './date/diffYears';
import StartOfDayExample from './date/startOfDay';
import EndOfDayExample from './date/endOfDay';
import FormatExample from './date/format';
import ParseExample from './date/parse';

// Function examples
import BindExample from './function/bind';
import ComposeExample from './function/compose';
import CurryExample from './function/curry';
import DebounceExample from './function/debounce';
import MemoizeExample from './function/memoize';
import NegateExample from './function/negate';
import OnceExample from './function/once';
import PartialExample from './function/partial';
import PipeExample from './function/pipe';
import ThrottleExample from './function/throttle';

// Is examples
import IsArrayExample from './is/isArray';
import IsBooleanExample from './is/isBoolean';
import IsDateExample from './is/isDate';
import IsEmptyExample from './is/isEmpty';
import IsErrorExample from './is/isError';
import IsFunctionExample from './is/isFunction';
import IsMapExample from './is/isMap';
import IsNilExample from './is/isNil';
import IsNullExample from './is/isNull';
import IsNumberExample from './is/isNumber';
import IsObjectExample from './is/isObject';
import IsPlainObjectExample from './is/isPlainObject';
import IsPromiseExample from './is/isPromise';
import IsRegExpExample from './is/isRegExp';
import IsSetExample from './is/isSet';
import IsStringExample from './is/isString';
import IsSymbolExample from './is/isSymbol';
import IsUndefinedExample from './is/isUndefined';
import IsWeakMapExample from './is/isWeakMap';
import IsWeakSetExample from './is/isWeakSet';

// Math examples
import MaxExample from './math/max';
import MaxByExample from './math/maxBy';
import MeanByExample from './math/meanBy';
import MinExample from './math/min';
import MinByExample from './math/minBy';
import SumByExample from './math/sumBy';

// Object examples
import CloneExample from './object/clone';
import CloneDeepExample from './object/cloneDeep';
import EntriesExample from './object/entries';
import GetExample from './object/get';
import HasExample from './object/has';
import InvertExample from './object/invert';
import KeysExample from './object/keys';
import MapKeysExample from './object/mapKeys';
import MapValuesExample from './object/mapValues';
import MergeExample from './object/merge';
import MergeDeepExample from './object/mergeDeep';
import OmitExample from './object/omit';
import PickExample from './object/pick';
import SetExample from './object/set';
import ValuesExample from './object/values';

// Number examples
import CeilExample from './number/ceil';
import ClampExample from './number/clamp';
import FloorExample from './number/floor';
import InRangeExample from './number/inRange';
import MeanExample from './number/mean';
import MedianExample from './number/median';
import RandomExample from './number/random';
import RangeExample from './number/range';
import RoundExample from './number/round';
import SumExample from './number/sum';

// Promise examples
import DelayExample from './promise/delay';
import FilterExample from './promise/filter';
import MapExample from './promise/map';
import ParallelExample from './promise/parallel';
import ReduceExample from './promise/reduce';
import RetryExample from './promise/retry';
import SeriesExample from './promise/series';
import TimeoutExample from './promise/timeout';

// String examples
import CamelCaseExample from './string/camelCase';
import CapitalizeExample from './string/capitalize';
import KebabCaseExample from './string/kebabCase';
import LowerFirstExample from './string/lowerFirst';
import PadEndExample from './string/padEnd';
import PadStartExample from './string/padStart';
import PascalCaseExample from './string/pascalCase';
import RepeatExample from './string/repeat';
import SnakeCaseExample from './string/snakeCase';
import TemplateExample from './string/template';
import TrimExample from './string/trim';
import TrimEndExample from './string/trimEnd';
import TrimStartExample from './string/trimStart';
import TruncateExample from './string/truncate';
import UpperFirstExample from './string/upperFirst';

export const INTERACTIVE_EXAMPLES = {
  // Array examples
  'array/chunk': ChunkExample,
  'array/compact': CompactExample,
  'array/difference': DifferenceExample,
  'array/findIndex': FindIndexExample,
  'array/flatten': FlattenExample,
  'array/intersection': IntersectionExample,
  'array/union': UnionExample,
  'array/uniq': UniqExample,
  'array/zip': ZipExample,

  // Collection examples
  'collection/countBy': CountByExample,
  'collection/groupBy': GroupByExample,
  'collection/keyBy': KeyByExample,
  'collection/orderBy': OrderByExample,
  'collection/partition': PartitionExample,
  'collection/sample': SampleExample,
  'collection/sampleSize': SampleSizeExample,
  'collection/shuffle': ShuffleExample,
  'collection/sortBy': SortByExample,

  // Date examples
  'date/addDays': AddDaysExample,
  'date/addMonths': AddMonthsExample,
  'date/addYears': AddYearsExample,
  'date/diffDays': DiffDaysExample,
  'date/diffMonths': DiffMonthsExample,
  'date/diffYears': DiffYearsExample,
  'date/startOfDay': StartOfDayExample,
  'date/endOfDay': EndOfDayExample,
  'date/format': FormatExample,
  'date/parse': ParseExample,

  // Function examples
  'function/bind': BindExample,
  'function/compose': ComposeExample,
  'function/curry': CurryExample,
  'function/debounce': DebounceExample,
  'function/memoize': MemoizeExample,
  'function/negate': NegateExample,
  'function/once': OnceExample,
  'function/partial': PartialExample,
  'function/pipe': PipeExample,
  'function/throttle': ThrottleExample,

  // Is examples
  'is/isArray': IsArrayExample,
  'is/isBoolean': IsBooleanExample,
  'is/isDate': IsDateExample,
  'is/isEmpty': IsEmptyExample,
  'is/isError': IsErrorExample,
  'is/isFunction': IsFunctionExample,
  'is/isMap': IsMapExample,
  'is/isNil': IsNilExample,
  'is/isNull': IsNullExample,
  'is/isNumber': IsNumberExample,
  'is/isObject': IsObjectExample,
  'is/isPlainObject': IsPlainObjectExample,
  'is/isPromise': IsPromiseExample,
  'is/isRegExp': IsRegExpExample,
  'is/isSet': IsSetExample,
  'is/isString': IsStringExample,
  'is/isSymbol': IsSymbolExample,
  'is/isUndefined': IsUndefinedExample,
  'is/isWeakMap': IsWeakMapExample,
  'is/isWeakSet': IsWeakSetExample,

  // Math examples
  'math/max': MaxExample,
  'math/maxBy': MaxByExample,
  'math/meanBy': MeanByExample,
  'math/min': MinExample,
  'math/minBy': MinByExample,
  'math/sumBy': SumByExample,

  // Object examples
  'object/clone': CloneExample,
  'object/cloneDeep': CloneDeepExample,
  'object/entries': EntriesExample,
  'object/get': GetExample,
  'object/has': HasExample,
  'object/invert': InvertExample,
  'object/keys': KeysExample,
  'object/mapKeys': MapKeysExample,
  'object/mapValues': MapValuesExample,
  'object/merge': MergeExample,
  'object/mergeDeep': MergeDeepExample,
  'object/omit': OmitExample,
  'object/pick': PickExample,
  'object/set': SetExample,
  'object/values': ValuesExample,

  // Number examples
  'number/ceil': CeilExample,
  'number/clamp': ClampExample,
  'number/floor': FloorExample,
  'number/inRange': InRangeExample,
  'number/mean': MeanExample,
  'number/median': MedianExample,
  'number/random': RandomExample,
  'number/range': RangeExample,
  'number/round': RoundExample,
  'number/sum': SumExample,

  // Promise examples
  'promise/delay': DelayExample,
  'promise/filter': FilterExample,
  'promise/map': MapExample,
  'promise/parallel': ParallelExample,
  'promise/reduce': ReduceExample,
  'promise/retry': RetryExample,
  'promise/series': SeriesExample,
  'promise/timeout': TimeoutExample,

  // String examples
  'string/camelCase': CamelCaseExample,
  'string/capitalize': CapitalizeExample,
  'string/kebabCase': KebabCaseExample,
  'string/lowerFirst': LowerFirstExample,
  'string/padEnd': PadEndExample,
  'string/padStart': PadStartExample,
  'string/pascalCase': PascalCaseExample,
  'string/repeat': RepeatExample,
  'string/snakeCase': SnakeCaseExample,
  'string/template': TemplateExample,
  'string/trim': TrimExample,
  'string/trimEnd': TrimEndExample,
  'string/trimStart': TrimStartExample,
  'string/truncate': TruncateExample,
  'string/upperFirst': UpperFirstExample,
} as const;

export type ExampleKey = keyof typeof INTERACTIVE_EXAMPLES;

export function getExample(key: ExampleKey) {
  return INTERACTIVE_EXAMPLES[key];
}
