---
id: kebabCase
title: kebabCase
description: '将字符串转换为短横线命名法 (first-name, last-name 等)'
---

# `kebabCase`

将字符串转换为短横线命名法格式（例如 first-name、last-name）。这在 CSS 类名、URL slug 和连字符标识符中很常见。

## 语法

```typescript
function kebabCase(str: string): string;
```

## 参数

| 参数名 | 类型     | 必填 | 默认值 | 描述                       |
| ------ | -------- | ---- | ------ | -------------------------- |
| `str`  | `string` | ✅   | -      | 要转换为短横线命名的字符串 |

## 返回值

- **类型**: `string`
- **描述**: 转换后的短横线命名字符串。如果输入不是字符串，返回空字符串。

## 示例

### 基础用法

```typescript
import { kebabCase } from '@rabjs/kit';

// 示例1: 转换空格分隔的单词
const str1 = kebabCase('Foo Bar');
console.log(str1); // 'foo-bar'

// 示例2: 将驼峰命名转换为短横线命名
const str2 = kebabCase('fooBar');
console.log(str2); // 'foo-bar'

// 示例3: 将蛇形命名转换为短横线命名
const str3 = kebabCase('foo_bar');
console.log(str3); // 'foo-bar'
```

### 高级用法

```typescript
// 示例4: 将 PascalCase 转换为短横线命名
const str4 = kebabCase('FooBar');
console.log(str4); // 'foo-bar'

// 示例5: 混合分隔符
const str5 = kebabCase('foo-bar_baz qux');
console.log(str5); // 'foo-bar-baz-qux'

// 示例6: CSS 类名生成
function generateClassName(name: string): string {
  return `btn-${kebabCase(name)}`;
}

console.log(generateClassName('primaryButton')); // 'btn-primary-button'
console.log(generateClassName('DisabledState')); // 'btn-disabled-state'
```

### 实际应用场景

```typescript
// 示例7: URL slug 生成
function createUrlSlug(title: string): string {
  return kebabCase(title);
}

console.log(createUrlSlug('欢迎来到我的博客')); // '欢迎来到我的博客'
console.log(createUrlSlug('JavaScript 技巧')); // 'javascript-技巧'

// 示例8: HTML 数据属性命名
function createDataAttribute(name: string): string {
  return `data-${kebabCase(name)}`;
}

console.log(createDataAttribute('userId')); // 'data-user-id'
console.log(createDataAttribute('userName')); // 'data-user-name'

// 示例9: 事件名称格式化
const eventNames = {
  onUserClick: 'on-user-click',
  onDataUpdate: 'on-data-update',
  onFormSubmit: 'on-form-submit',
};

const normalizedEvents = Object.fromEntries(Object.entries(eventNames).map(([key, _]) => [key, kebabCase(key)]));
console.log(normalizedEvents);
// { onUserClick: 'on-user-click', onDataUpdate: 'on-data-update', onFormSubmit: 'on-form-submit' }
```

## 交互式示例

```tsx live
function KebabCaseExample() {
  const [input, setInput] = React.useState('helloWorldFooBar');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(kebabCase(input));
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>kebabCase 交互式示例</h4>
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
- 📚 **最佳实践**: 用于 CSS 类名、URL slug 和数据属性

## 相关函数

- [`camelCase`](./camelCase) - 转换为驼峰命名 (firstName)
- [`pascalCase`](./pascalCase) - 转换为 PascalCase (FirstName)
- [`snakeCase`](./snakeCase) - 转换为蛇形命名 (first_name)
- [`capitalize`](./capitalize) - 首字符大写

## 版本历史

- **v0.0.1** - 初始版本
