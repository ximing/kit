---
id: isBoolean
title: isBoolean
description: 'Checks if a value is a boolean'
---

# `isBoolean`

检查一个值是否为布尔类型（`true` 或 `false`）。

## 语法

```typescript
function isBoolean(value: unknown): value is boolean;
```

## 参数

| 参数名  | 类型      | 必填 | 默认值 | 描述       |
| ------- | --------- | ---- | ------ | ---------- |
| `value` | `unknown` | ✅   | -      | 要检查的值 |

## 返回值

- **类型**: `value is boolean`（类型守卫）
- **描述**: 如果值是布尔类型返回 `true`，否则返回 `false`

## 示例

### 基础用法

```typescript
import { isBoolean } from '@rabjs/kit';

// 布尔值
console.log(isBoolean(true)); // true
console.log(isBoolean(false)); // true

// 非布尔值
console.log(isBoolean(1)); // false
console.log(isBoolean(0)); // false
console.log(isBoolean('true')); // false
console.log(isBoolean(null)); // false
```

### 实际应用场景

```typescript
// 参数验证
function setEnabled(value: unknown) {
  if (isBoolean(value)) {
    console.log('启用状态:', value);
  } else {
    console.error('必须是布尔值');
  }
}

// 配置处理
interface Config {
  enabled?: unknown;
  debug?: unknown;
}

function processConfig(config: Config) {
  const enabled = isBoolean(config.enabled) ? config.enabled : true;
  const debug = isBoolean(config.debug) ? config.debug : false;
  return { enabled, debug };
}
```

## 注意事项

- ⚠️ **不包括 Boolean 对象**: `isBoolean(new Boolean(true))` 返回 `false`
- 💡 **原始类型检查**: 只检查原始布尔值，不检查包装对象

## 版本历史

- **v0.0.1** - 初始版本
