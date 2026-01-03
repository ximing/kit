---
id: merge
title: merge
description: '浅合并多个对象到目标对象中'
---

# `merge`

浅合并多个对象到目标对象中。仅合并顶级属性，嵌套对象会被完全替换而不是递归合并。

## 语法

```typescript
function merge<T extends object, S extends object>(target: T, ...sources: S[]): T & S;
```

## 参数

| 参数名    | 类型               | 必填 | 默认值 | 描述                                       |
| --------- | ------------------ | ---- | ------ | ------------------------------------------ |
| `target`  | `T extends object` | ✅   | -      | 目标对象，将被修改                         |
| `sources` | `S[]`              | ✅   | -      | 一个或多个源对象，其属性将被合并到目标对象 |

## 返回值

- **类型**: `T & S`
- **描述**: 返回修改后的目标对象

## 示例

### 基础用法

```typescript
import { merge } from '@rabjs/kit';

// 示例1: 合并两个对象
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const result = merge(obj1, obj2);
console.log(result); // { a: 1, b: 2, c: 3, d: 4 }

// 示例2: 后面的值覆盖前面的值
const user1 = { name: '张三', age: 25 };
const user2 = { age: 26, email: 'zhangsan@example.com' };
merge(user1, user2);
console.log(user1); // { name: '张三', age: 26, email: 'zhangsan@example.com' }

// 示例3: 合并多个对象
const defaults = { theme: 'light', lang: 'zh' };
const userConfig = { theme: 'dark' };
const systemConfig = { lang: 'en' };
const config = merge({}, defaults, userConfig, systemConfig);
console.log(config); // { theme: 'dark', lang: 'en' }
```

### 高级用法

```typescript
// 示例4: 浅合并的特点 - 嵌套对象被替换
const base = {
  server: { host: 'localhost', port: 3000 },
  debug: true,
};
const override = {
  server: { host: 'example.com' }, // 这会完全替换 base.server
};
merge(base, override);
console.log(base);
// {
//   server: { host: 'example.com' }, // port 属性丢失了!
//   debug: true
// }

// 示例5: 合并多个配置对象
const defaultOptions = {
  timeout: 5000,
  retries: 3,
  headers: { 'Content-Type': 'application/json' },
};
const userOptions = {
  timeout: 10000,
  headers: { Authorization: 'Bearer token' }, // 这会替换整个 headers 对象
};
const finalOptions = merge({}, defaultOptions, userOptions);
console.log(finalOptions);
// {
//   timeout: 10000,
//   retries: 3,
//   headers: { 'Authorization': 'Bearer token' } // Content-Type 丢失了!
// }

// 示例6: 合并用户设置
const appDefaults = {
  notifications: true,
  language: 'zh',
  theme: 'light',
};
const userSettings = {
  notifications: false,
  language: 'en',
};
const finalSettings = merge({}, appDefaults, userSettings);
console.log(finalSettings);
// { notifications: false, language: 'en', theme: 'light' }
```

### 实际应用场景

```typescript
// 示例7: API 请求配置合并
function createRequest(baseConfig: any, customConfig: any) {
  return merge(
    {
      method: 'GET',
      timeout: 5000,
      headers: {},
    },
    baseConfig,
    customConfig,
  );
}

const request = createRequest({ method: 'POST' }, { url: 'https://api.example.com/data' });
console.log(request);
// {
//   method: 'POST',
//   timeout: 5000,
//   headers: {},
//   url: 'https://api.example.com/data'
// }

// 示例8: 组件属性合并
function createComponent(defaultProps: any, userProps: any) {
  return merge({}, defaultProps, userProps);
}

const componentProps = createComponent(
  { size: 'medium', color: 'blue', disabled: false },
  { size: 'large', color: 'red' },
);
console.log(componentProps);
// { size: 'large', color: 'red', disabled: false }
```

## 交互式示例

```tsx live
function MergeExample() {
  const [obj1, setObj1] = React.useState(JSON.stringify({ a: 1, b: 2 }, null, 2));
  const [obj2, setObj2] = React.useState(JSON.stringify({ c: 3, d: 4 }, null, 2));
  const [result, setResult] = React.useState(null);

  const handleMerge = () => {
    try {
      const o1 = JSON.parse(obj1);
      const o2 = JSON.parse(obj2);
      const merged = merge({}, o1, o2);
      setResult(merged);
    } catch (error) {
      setResult({ error: error.message });
    }
  };

  React.useEffect(() => {
    handleMerge();
  }, [obj1, obj2]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>merge 交互式示例</h4>
      <div style={{ marginBottom: '15px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>对象 1:</label>
          <textarea
            value={obj1}
            onChange={(e) => setObj1(e.target.value)}
            style={{ width: '100%', height: '120px', padding: '8px', boxSizing: 'border-box', fontFamily: 'monospace' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>对象 2:</label>
          <textarea
            value={obj2}
            onChange={(e) => setObj2(e.target.value)}
            style={{ width: '100%', height: '120px', padding: '8px', boxSizing: 'border-box', fontFamily: 'monospace' }}
          />
        </div>
      </div>
      <div>
        <strong>合并结果:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto', fontSize: '12px' }}>
          {result && (result.error ? `错误: ${result.error}` : JSON.stringify(result, null, 2))}
        </pre>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **浅合并**: 仅合并顶级属性，嵌套对象会被完全替换
- ⚠️ **原对象修改**: 该函数直接修改目标对象，不创建新对象
- ⚠️ **属性覆盖**: 后面的对象属性会覆盖前面的属性
- ⚠️ **Null 处理**: 如果目标对象为 `null` 或 `undefined` 会抛出错误
- 💡 **性能提示**: 该函数具有 O(n\*m) 时间复杂度，其中 n 是源对象数量，m 是平均属性数量
- 🔒 **深层合并**: 如果需要递归合并嵌套对象，请使用 `mergeDeep`

## 相关函数

- [`mergeDeep`](./mergeDeep) - 递归合并多个对象
- [`assign`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) - 原生 Object.assign
- [`clone`](./clone) - 创建对象的浅拷贝
- [`pick`](./pick) - 选择对象的指定属性

## 版本历史

- **v1.0.0** - 初始版本
