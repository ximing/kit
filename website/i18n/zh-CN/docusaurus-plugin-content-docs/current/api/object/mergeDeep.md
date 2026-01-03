---
id: mergeDeep
title: mergeDeep
description: '递归合并多个对象到目标对象中'
---

# `mergeDeep`

递归合并多个对象到目标对象中。与 `merge` 不同，嵌套对象会被递归合并而不是完全替换。

## 语法

```typescript
function mergeDeep<T extends object, S extends object>(target: T, ...sources: S[]): T & S;
```

## 参数

| 参数名    | 类型               | 必填 | 默认值 | 描述                                           |
| --------- | ------------------ | ---- | ------ | ---------------------------------------------- |
| `target`  | `T extends object` | ✅   | -      | 目标对象，将被修改                             |
| `sources` | `S[]`              | ✅   | -      | 一个或多个源对象，其属性将被递归合并到目标对象 |

## 返回值

- **类型**: `T & S`
- **描述**: 返回修改后的目标对象

## 示例

### 基础用法

```typescript
import { mergeDeep } from '@rabjs/kit';

// 示例1: 深层合并嵌套对象
const base = {
  server: { host: 'localhost', port: 3000 },
  debug: true,
};
const override = {
  server: { host: 'example.com' },
};
mergeDeep(base, override);
console.log(base);
// {
//   server: { host: 'example.com', port: 3000 }, // port 被保留
//   debug: true
// }

// 示例2: 深层合并多个对象
const defaults = {
  api: { timeout: 5000, retries: 3 },
  cache: { enabled: true, ttl: 3600 },
};
const userConfig = {
  api: { timeout: 10000 },
};
const systemConfig = {
  cache: { ttl: 7200 },
};
const config = mergeDeep({}, defaults, userConfig, systemConfig);
console.log(config);
// {
//   api: { timeout: 10000, retries: 3 },
//   cache: { enabled: true, ttl: 7200 }
// }

// 示例3: 深层合并数组和对象
const obj1 = { settings: { colors: ['red', 'blue'] } };
const obj2 = { settings: { colors: ['green'] } };
mergeDeep(obj1, obj2);
console.log(obj1.settings.colors); // ['green'] (数组被替换)
```

### 高级用法

```typescript
// 示例4: 复杂嵌套结构的合并
const template = {
  ui: {
    theme: {
      colors: { primary: 'blue', secondary: 'gray' },
      fonts: { base: 'Arial', heading: 'Georgia' },
    },
    layout: { width: 1200, padding: 20 },
  },
  features: { auth: true, api: true },
};

const customization = {
  ui: {
    theme: {
      colors: { primary: 'red' },
    },
  },
};

mergeDeep(template, customization);
console.log(template.ui.theme.colors);
// { primary: 'red', secondary: 'gray' } (深层合并保留了 secondary)

// 示例5: 多层级深合并
const level1 = { a: { b: { c: 1, d: 2 } } };
const level2 = { a: { b: { c: 100 } } };
const level3 = { a: { b: { d: 200, e: 3 } } };

mergeDeep(level1, level2, level3);
console.log(level1);
// { a: { b: { c: 100, d: 200, e: 3 } } }
```

### 实际应用场景

```typescript
// 示例6: 应用配置管理
const appConfig = {
  development: {
    server: { host: 'localhost', port: 3000, ssl: false },
    database: { host: 'localhost', port: 5432, name: 'dev_db' },
    logging: { level: 'debug', format: 'json' },
  },
};

const userOverrides = {
  development: {
    server: { port: 8080 },
    logging: { level: 'info' },
  },
};

const finalConfig = mergeDeep({}, appConfig, userOverrides);
console.log(finalConfig.development);
// {
//   server: { host: 'localhost', port: 8080, ssl: false },
//   database: { host: 'localhost', port: 5432, name: 'dev_db' },
//   logging: { level: 'info', format: 'json' }
// }

// 示例7: GraphQL 查询配置合并
const baseQuery = {
  user: {
    fields: ['id', 'name', 'email'],
    fragments: {
      profile: ['age', 'avatar'],
      settings: ['theme', 'notifications'],
    },
  },
};

const customQuery = {
  user: {
    fragments: {
      settings: ['language'], // 这会替换整个 settings 数组
    },
  },
};

const merged = mergeDeep({}, baseQuery, customQuery);
console.log(merged.user.fields); // ['id', 'name', 'email']
console.log(merged.user.fragments.settings); // ['language']
```

## 交互式示例

```tsx live
function MergeDeepExample() {
  const [obj1, setObj1] = React.useState(
    JSON.stringify(
      {
        a: { b: 1, c: 2 },
        d: 3,
      },
      null,
      2,
    ),
  );
  const [obj2, setObj2] = React.useState(
    JSON.stringify(
      {
        a: { b: 100 },
        e: 4,
      },
      null,
      2,
    ),
  );
  const [result, setResult] = React.useState(null);

  const handleMergeDeep = () => {
    try {
      const o1 = JSON.parse(obj1);
      const o2 = JSON.parse(obj2);
      const merged = mergeDeep({}, o1, o2);
      setResult(merged);
    } catch (error) {
      setResult({ error: error.message });
    }
  };

  React.useEffect(() => {
    handleMergeDeep();
  }, [obj1, obj2]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>mergeDeep 交互式示例</h4>
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
        <strong>深层合并结果:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto', fontSize: '12px' }}>
          {result && (result.error ? `错误: ${result.error}` : JSON.stringify(result, null, 2))}
        </pre>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **递归合并**: 嵌套对象会被递归合并，不是完全替换
- ⚠️ **原对象修改**: 该函数直接修改目标对象，不创建新对象
- ⚠️ **属性覆盖**: 后面的对象属性会覆盖前面的属性
- ⚠️ **数组处理**: 数组会被完全替换而不是合并
- ⚠️ **Null 处理**: 如果目标对象为 `null` 或 `undefined` 会抛出错误
- 💡 **性能提示**: 该函数具有 O(n\*m) 时间复杂度，其中 n 是源对象数量，m 是平均属性数量
- 📚 **最佳实践**: 常用于配置管理、主题合并等需要保留嵌套属性的场景

## 相关函数

- [`merge`](./merge) - 浅合并多个对象
- [`cloneDeep`](./cloneDeep) - 创建对象的深拷贝
- [`set`](./set) - 安全地设置对象中指定路径的值
- [`get`](./get) - 安全地获取对象中指定路径的值

## 版本历史

- **v1.0.0** - 初始版本
