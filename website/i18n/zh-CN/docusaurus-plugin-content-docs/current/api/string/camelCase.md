---
id: camelCase
title: camelCase
description: '将字符串转换为驼峰命名法 (firstName, lastName 等)'
---

# `camelCase`

将字符串转换为驼峰命名法格式（例如 firstName、lastName）。这在 JavaScript 变量名、对象属性和 API 字段名中很常见。

## 语法

```typescript
function camelCase(str: string): string;
```

## 参数

| 参数名 | 类型     | 必填 | 默认值 | 描述                     |
| ------ | -------- | ---- | ------ | ------------------------ |
| `str`  | `string` | ✅   | -      | 要转换为驼峰命名的字符串 |

## 返回值

- **类型**: `string`
- **描述**: 转换后的驼峰命名字符串。如果输入不是字符串，返回空字符串。

## 示例

### 基础用法

```typescript
import { camelCase } from '@rabjs/kit';

// 示例1: 转换空格分隔的单词
const str1 = camelCase('Foo Bar');
console.log(str1); // 'fooBar'

// 示例2: 将短横线命名转换为驼峰命名
const str2 = camelCase('--foo-bar--');
console.log(str2); // 'fooBar'

// 示例3: 将蛇形命名转换为驼峰命名
const str3 = camelCase('foo_bar');
console.log(str3); // 'fooBar'
```

### 高级用法

```typescript
// 示例4: 将 PascalCase 转换为驼峰命名
const str4 = camelCase('FooBar');
console.log(str4); // 'fooBar'

// 示例5: 混合分隔符
const str5 = camelCase('foo-bar_baz qux');
console.log(str5); // 'fooBarBazQux'

// 示例6: API 响应字段名转换
function normalizeApiResponse(data: Record<string, any>) {
  const normalized: Record<string, any> = {};
  for (const key in data) {
    normalized[camelCase(key)] = data[key];
  }
  return normalized;
}

const response = {
  first_name: '张三',
  last_name: '李四',
  'user-id': 123,
};
const normalized = normalizeApiResponse(response);
console.log(normalized);
// { firstName: '张三', lastName: '李四', userId: 123 }
```

### 实际应用场景

```typescript
// 示例7: TypeScript 接口字段命名
interface ApiUser {
  first_name: string;
  last_name: string;
  email_address: string;
}

function mapApiToModel(apiUser: ApiUser) {
  return {
    firstName: apiUser.first_name,
    lastName: apiUser.last_name,
    emailAddress: apiUser.email_address,
  };
}

// 示例8: 转换配置键名
const config = {
  'api-url': 'https://api.example.com',
  'api-timeout': 5000,
  'api-retries': 3,
};

const camelConfig = Object.fromEntries(Object.entries(config).map(([key, value]) => [camelCase(key), value]));
console.log(camelConfig);
// { apiUrl: 'https://api.example.com', apiTimeout: 5000, apiRetries: 3 }
```

## 交互式示例

```tsx live
function CamelCaseExample() {
  const [input, setInput] = React.useState('hello-world-foo-bar');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(camelCase(input));
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>camelCase 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>输入字符串:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入要转换的文本"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div>
        <strong>结果:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto', borderRadius: '4px' }}>
          {result}
        </pre>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **边界情况**: 非字符串输入返回空字符串
- ⚠️ **边界情况**: 空字符串保持为空
- 💡 **性能提示**: 该函数使用正则表达式操作，对于典型字符串长度效率很高
- 🔒 **类型安全**: 在转换过程中保持一致的字符串类型
- 📚 **最佳实践**: 用于 JavaScript 标识符、对象键和 API 字段名

## 相关函数

- [`pascalCase`](./pascalCase) - 转换为 PascalCase (FirstName)
- [`kebabCase`](./kebabCase) - 转换为短横线命名 (first-name)
- [`snakeCase`](./snakeCase) - 转换为蛇形命名 (first_name)
- [`capitalize`](./capitalize) - 首字符大写

## 版本历史

- **v1.0.0** - 初始版本
