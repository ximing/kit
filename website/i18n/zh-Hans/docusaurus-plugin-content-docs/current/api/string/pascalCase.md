---
id: pascalCase
title: pascalCase
description: '将字符串转换为 Pascal 命名法 (FirstName, LastName 等)'
---

# `pascalCase`

将字符串转换为 Pascal 命名法格式（例如 FirstName、LastName）。这在类名、组件名和类型定义中很常见。

## 语法

```typescript
function pascalCase(str: string): string;
```

## 参数

| 参数名 | 类型     | 必填 | 默认值 | 描述                         |
| ------ | -------- | ---- | ------ | ---------------------------- |
| `str`  | `string` | ✅   | -      | 要转换为 Pascal 命名的字符串 |

## 返回值

- **类型**: `string`
- **描述**: 转换后的 Pascal 命名字符串。如果输入不是字符串，返回空字符串。

## 示例

### 基础用法

```typescript
import { pascalCase } from '@rabjs/kit';

// 示例1: 转换空格分隔的单词
const str1 = pascalCase('foo bar');
console.log(str1); // 'FooBar'

// 示例2: 将短横线命名转换为 Pascal 命名
const str2 = pascalCase('--foo-bar--');
console.log(str2); // 'FooBar'

// 示例3: 将蛇形命名转换为 Pascal 命名
const str3 = pascalCase('foo_bar');
console.log(str3); // 'FooBar'
```

### 高级用法

```typescript
// 示例4: 将驼峰命名转换为 Pascal 命名
const str4 = pascalCase('fooBar');
console.log(str4); // 'FooBar'

// 示例5: 混合分隔符
const str5 = pascalCase('foo-bar_baz qux');
console.log(str5); // 'FooBarBazQux'

// 示例6: 组件名称生成
function generateComponentName(name: string): string {
  return pascalCase(name);
}

console.log(generateComponentName('user-profile')); // 'UserProfile'
console.log(generateComponentName('navigation_menu')); // 'NavigationMenu'
```

### 实际应用场景

```typescript
// 示例7: 类名生成
function createClassName(name: string): string {
  return `${pascalCase(name)}Component`;
}

console.log(createClassName('user-list')); // 'UserListComponent'
console.log(createClassName('data_table')); // 'DataTableComponent'

// 示例8: 类型/接口命名
function generateTypeName(name: string): string {
  return `I${pascalCase(name)}`;
}

console.log(generateTypeName('user-model')); // 'IUserModel'
console.log(generateTypeName('api_response')); // 'IApiResponse'

// 示例9: 枚举值生成
const apiEndpoints = {
  'get-users': '/api/users',
  'post-user': '/api/users',
  delete_user: '/api/users/:id',
};

const enumEndpoints = Object.fromEntries(Object.entries(apiEndpoints).map(([key, value]) => [pascalCase(key), value]));
console.log(enumEndpoints);
// { GetUsers: '/api/users', PostUser: '/api/users', DeleteUser: '/api/users/:id' }
```

## 交互式示例

```tsx live
function PascalCaseExample() {
  const [input, setInput] = React.useState('hello-world-foo-bar');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(pascalCase(input));
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>pascalCase 交互式示例</h4>
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
- 📚 **最佳实践**: 用于类名、组件名和类型定义

## 相关函数

- [`camelCase`](./camelCase) - 转换为驼峰命名 (firstName)
- [`kebabCase`](./kebabCase) - 转换为短横线命名 (first-name)
- [`snakeCase`](./snakeCase) - 转换为蛇形命名 (first_name)
- [`capitalize`](./capitalize) - 首字符大写

## 版本历史

- **v0.0.1** - 初始版本
