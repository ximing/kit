---
sidebar_position: 4
---

# TypeScript 支持

@rabjs/kit 100% 使用 TypeScript 编写，提供完整的类型支持和类型推断。

## 类型推断

所有函数都提供了完整的类型推断，你可以获得自动完成和类型检查：

```typescript
import { chunk } from '@rabjs/kit';

// 类型自动推断
const result = chunk([1, 2, 3, 4], 2);
// result 的类型为: number[][]

const stringChunk = chunk(['a', 'b', 'c'], 2);
// stringChunk 的类型为: string[][]
```

## 通用类型

许多函数使用通用类型，允许你处理任何类型的数据：

```typescript
import { compact, isEmpty } from '@rabjs/kit';

// 处理任何类型的数组
const numbers = compact([1, null, 2, undefined, 3]);
// 类型: number[]

const strings = compact(['a', null, 'b', undefined, 'c']);
// 类型: string[]

// 处理任何类型的对象
isEmpty({}); // true
isEmpty([]); // true
isEmpty(''); // true
isEmpty(null); // false
isEmpty(undefined); // false
```

## 类型定义

所有类型定义都在 `dist/types` 目录中：

```typescript
import type { ChunkOptions, CompactOptions } from '@rabjs/kit';

interface ChunkOptions {
  size: number;
}

interface CompactOptions {
  falsy?: boolean;
}
```

## 条件类型

某些函数使用条件类型来提供更精确的类型推断：

```typescript
import { pick, omit } from '@rabjs/kit';

const obj = { a: 1, b: 'hello', c: true };

// pick 返回选中属性的子类型
const picked = pick(obj, 'a', 'b');
// 类型: { a: number; b: string }

// omit 返回排除属性后的类型
const omitted = omit(obj, 'c');
// 类型: { a: number; b: string }
```

## 严格模式

@rabjs/kit 完全支持 TypeScript 的严格模式：

```typescript
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

## 导入类型

你可以导入函数的类型定义：

```typescript
import type { Chunk, Compact, Pick, Omit } from '@rabjs/kit';

const myChunk: Chunk = (arr, size) => {
  // 实现
};
```

## 最佳实践

### 1. 使用类型推断

```typescript
import { chunk } from '@rabjs/kit';

// ✅ 好 - 让 TypeScript 推断类型
const result = chunk([1, 2, 3], 2);

// ❌ 不好 - 不必要的类型注解
const result: number[][] = chunk([1, 2, 3], 2);
```

### 2. 使用 as const 获得更精确的类型

```typescript
import { pick } from '@rabjs/kit';

const keys = ['a', 'b'] as const;
const obj = { a: 1, b: 2, c: 3 };

// 现在 picked 的类型是 { a: number; b: number }
const picked = pick(obj, ...keys);
```

### 3. 处理 null/undefined

```typescript
import { isNil, compact } from '@rabjs/kit';

const data = [1, null, 2, undefined, 3];

// 使用 compact 移除 null/undefined
const cleaned = compact(data);
// 类型: number[]

// 或者使用类型守卫
if (!isNil(data)) {
  // 现在 data 的类型不包括 null/undefined
}
```

## 下一步

- 🔧 浏览 [API 文档](/docs/api/array) 查看所有可用函数
- 💡 查看 [使用方法](./usage.md) 了解更多示例
