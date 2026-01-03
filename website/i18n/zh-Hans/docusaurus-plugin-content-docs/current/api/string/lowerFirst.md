---
id: lowerFirst
title: lowerFirst
description: '将字符串的首字符转换为小写'
---

# `lowerFirst`

将字符串的首字符转换为小写，其余字符保持不变。这在将 PascalCase 标识符转换为 camelCase 或规范化大写字符串时很有用。

## 语法

```typescript
function lowerFirst(str: string): string;
```

## 参数

| 参数名 | 类型     | 必填 | 默认值 | 描述           |
| ------ | -------- | ---- | ------ | -------------- |
| `str`  | `string` | ✅   | -      | 要转换的字符串 |

## 返回值

- **类型**: `string`
- **描述**: 首字符小写的字符串。空字符串和非字符串按原样返回。

## 示例

### 基础用法

```typescript
import { lowerFirst } from '@rabjs/kit';

// 示例1: 小写首字符
const str1 = lowerFirst('Fred');
console.log(str1); // 'fred'

// 示例2: 已经是小写
const str2 = lowerFirst('fred');
console.log(str2); // 'fred'

// 示例3: 混合大小写
const str3 = lowerFirst('FRED');
console.log(str3); // 'fRED'
```

### 高级用法

```typescript
// 示例4: 将 PascalCase 转换为驼峰命名
const names = ['User', 'Admin', 'Product'];
const camelNames = names.map(lowerFirst);
console.log(camelNames); // ['user', 'admin', 'product']

// 示例5: 处理类名
function getInstanceName(className: string): string {
  return lowerFirst(className);
}

console.log(getInstanceName('UserService')); // 'userService'
console.log(getInstanceName('ApiClient')); // 'apiClient'
```

### 实际应用场景

```typescript
// 示例6: 将类型名转换为变量名
function createVariableName(typeName: string): string {
  return lowerFirst(typeName);
}

console.log(createVariableName('HttpRequest')); // 'httpRequest'
console.log(createVariableName('DatabaseConnection')); // 'databaseConnection'

// 示例7: 格式化错误类型
function formatErrorType(errorType: string): string {
  return lowerFirst(errorType);
}

console.log(formatErrorType('ValidationError')); // 'validationError'
console.log(formatErrorType('NetworkError')); // 'networkError'

// 示例8: 将枚举键转换为对象键
const StatusEnum = {
  Active: 'active',
  Inactive: 'inactive',
  Pending: 'pending',
};

const statusMap = Object.fromEntries(
  Object.keys(StatusEnum).map((key) => [lowerFirst(key), StatusEnum[key as keyof typeof StatusEnum]]),
);
console.log(statusMap);
// { active: 'active', inactive: 'inactive', pending: 'pending' }
```

## 交互式示例

```tsx live
function LowerFirstExample() {
  const [input, setInput] = React.useState('Hello World');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(lowerFirst(input));
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>lowerFirst 交互式示例</h4>
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

- ⚠️ **边界情况**: 空字符串按原样返回
- ⚠️ **边界情况**: 非字符串输入按原样返回
- ⚠️ **与 upperFirst 相反**: 此函数仅影响首字符，其余部分保持不变
- 💡 **性能提示**: 该函数效率很高，复杂度为 O(n)
- 🔒 **类型安全**: 在转换过程中保持一致的字符串类型
- 📚 **最佳实践**: 当将 PascalCase 转换为 camelCase 或规范化类名时使用

## 相关函数

- [`upperFirst`](./upperFirst) - 首字符转换为大写
- [`capitalize`](./capitalize) - 大写首字符，其余小写
- [`camelCase`](./camelCase) - 转换为驼峰命名 (firstName)
- [`pascalCase`](./pascalCase) - 转换为 PascalCase (FirstName)

## 版本历史

- **v1.0.0** - 初始版本
