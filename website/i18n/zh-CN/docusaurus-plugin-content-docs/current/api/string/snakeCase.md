---
id: snakeCase
title: snakeCase
description: '将字符串转换为蛇形命名法 (first_name, last_name 等)'
---

# `snakeCase`

将字符串转换为蛇形命名法格式（例如 first_name、last_name）。这在数据库列名、API 参数和 Python 变量名中很常见。

## 语法

```typescript
function snakeCase(str: string): string;
```

## 参数

| 参数名 | 类型     | 必填 | 默认值 | 描述                     |
| ------ | -------- | ---- | ------ | ------------------------ |
| `str`  | `string` | ✅   | -      | 要转换为蛇形命名的字符串 |

## 返回值

- **类型**: `string`
- **描述**: 转换后的蛇形命名字符串。如果输入不是字符串，返回空字符串。

## 示例

### 基础用法

```typescript
import { snakeCase } from '@rabjs/kit';

// 示例1: 转换空格分隔的单词
const str1 = snakeCase('Foo Bar');
console.log(str1); // 'foo_bar'

// 示例2: 将驼峰命名转换为蛇形命名
const str2 = snakeCase('fooBar');
console.log(str2); // 'foo_bar'

// 示例3: 将短横线命名转换为蛇形命名
const str3 = snakeCase('foo-bar');
console.log(str3); // 'foo_bar'
```

### 高级用法

```typescript
// 示例4: 将 PascalCase 转换为蛇形命名
const str4 = snakeCase('FooBar');
console.log(str4); // 'foo_bar'

// 示例5: 混合分隔符
const str5 = snakeCase('foo-bar_baz qux');
console.log(str5); // 'foo_bar_baz_qux'

// 示例6: 数据库列名生成
function generateColumnName(name: string): string {
  return snakeCase(name);
}

console.log(generateColumnName('firstName')); // 'first_name'
console.log(generateColumnName('LastUpdated')); // 'last_updated'
```

### 实际应用场景

```typescript
// 示例7: API 参数命名
function createApiParam(name: string): string {
  return snakeCase(name);
}

console.log(createApiParam('pageSize')); // 'page_size'
console.log(createApiParam('sortOrder')); // 'sort_order'

// 示例8: 环境变量命名
function createEnvVarName(name: string): string {
  return snakeCase(name).toUpperCase();
}

console.log(createEnvVarName('apiKey')); // 'API_KEY'
console.log(createEnvVarName('dbPassword')); // 'DB_PASSWORD'

// 示例9: 数据库模式映射
const jsModel = {
  firstName: '张三',
  lastName: '李四',
  emailAddress: 'zhangsan@example.com',
};

const dbRecord = Object.fromEntries(Object.entries(jsModel).map(([key, value]) => [snakeCase(key), value]));
console.log(dbRecord);
// { first_name: '张三', last_name: '李四', email_address: 'zhangsan@example.com' }
```

## 交互式示例

```tsx live
function SnakeCaseExample() {
  const [input, setInput] = React.useState('helloWorldFooBar');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(snakeCase(input));
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>snakeCase 交互式示例</h4>
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
- 📚 **最佳实践**: 用于数据库列名、API 参数和环境变量

## 相关函数

- [`camelCase`](./camelCase) - 转换为驼峰命名 (firstName)
- [`pascalCase`](./pascalCase) - 转换为 PascalCase (FirstName)
- [`kebabCase`](./kebabCase) - 转换为短横线命名 (first-name)
- [`capitalize`](./capitalize) - 首字符大写

## 版本历史

- **v1.0.0** - 初始版本
