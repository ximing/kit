---
id: compact
title: compact
description: '移除数组中的虚假值'
---

# `compact`

移除数组中的所有虚假值。虚假值包括 `false`、`null`、`0`、`""`、`undefined` 和 `NaN`。

## 语法

```typescript
function compact<T>(array: (T | null | undefined | false | 0 | '')[]): T[];
```

## 参数

| 参数名  | 类型                                             | 必填 | 默认值 | 描述         |
| ------- | ------------------------------------------------ | ---- | ------ | ------------ |
| `array` | `(T \| null \| undefined \| false \| 0 \| '')[]` | ✅   | -      | 要压缩的数组 |

## 返回值

- **类型**: `T[]`
- **描述**: 移除所有虚假值后的新数组。如果输入不是数组，返回空数组。

## 示例

### 基础用法

```typescript
import { compact } from '@rabjs/kit';

// 示例1: 从混合数组中移除虚假值
const mixed = [0, 1, false, 2, '', 3, null, undefined, 4, NaN];
const cleaned = compact(mixed);
console.log(cleaned); // [1, 2, 3, 4]

// 示例2: 清理字符串数组
const strings = ['你好', '', '世界', null, 'foo', undefined];
const cleanStrings = compact(strings);
console.log(cleanStrings); // ['你好', '世界', 'foo']

// 示例3: 过滤数字
const numbers = [0, 10, 0, 20, null, 30];
const validNumbers = compact(numbers);
console.log(validNumbers); // [10, 20, 30]
```

### 高级用法

```typescript
// 示例4: 处理表单数据
interface FormData {
  name?: string;
  email?: string;
  phone?: string;
}

function collectFormFields(data: FormData): string[] {
  const fields = [data.name, data.email, data.phone];
  return compact(fields);
}

const form1 = { name: '张三', email: '', phone: '123456' };
console.log(collectFormFields(form1)); // ['张三', '123456']

const form2 = { name: '李四' };
console.log(collectFormFields(form2)); // ['李四']

// 示例5: 清理 API 响应
interface ApiResponse {
  id: number;
  name: string;
  description?: string | null;
  tags?: string[] | null;
}

function cleanApiData(items: ApiResponse[]) {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    metadata: compact([item.description, item.tags]),
  }));
}
```

### 实际应用场景

```typescript
// 示例6: 过滤验证错误
function validateUser(user: any): string[] {
  const errors: (string | undefined)[] = [
    !user.name ? '姓名必填' : undefined,
    !user.email ? '邮箱必填' : undefined,
    user.age && user.age < 18 ? '必须年满18岁' : undefined,
  ];
  return compact(errors);
}

const user1 = { name: '', email: 'test@example.com', age: 16 };
console.log(validateUser(user1)); // ['姓名必填', '必须年满18岁']

// 示例7: 与数组操作结合
const userInputs = ['苹果', '', '香蕉', null, '樱桃', undefined, ''];
const processedInputs = compact(userInputs)
  .map((s) => s.trim())
  .filter((s) => s.length > 0);
console.log(processedInputs); // ['苹果', '香蕉', '樱桃']

// 示例8: 清理数据库查询结果
interface QueryResult {
  userId: number | null;
  userName: string | null;
  userEmail: string | null;
}

function extractValidIds(results: QueryResult[]): number[] {
  const ids = results.map((r) => r.userId);
  return compact(ids);
}
```

## 交互式示例

```tsx live
function CompactExample() {
  const [input, setInput] = React.useState('1,0,2,false,3,null,,4,undefined');
  const [result, setResult] = React.useState(null);

  const handleCompact = () => {
    try {
      // 解析输入字符串为包含各种虚假值的数组
      const array = input.split(',').map((item) => {
        const trimmed = item.trim();
        if (trimmed === '') return '';
        if (trimmed === 'null') return null;
        if (trimmed === 'undefined') return undefined;
        if (trimmed === 'false') return false;
        if (trimmed === '0') return 0;
        if (trimmed === 'NaN') return NaN;
        if (!isNaN(Number(trimmed))) return Number(trimmed);
        return trimmed;
      });
      const compacted = compact(array);
      setResult({
        original: array,
        compacted: compacted,
      });
    } catch (error) {
      setResult('错误: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleCompact();
  }, [input]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>compact 交互式示例</h4>
      <div style={{ marginBottom: '10px' }}>
        <label>输入 (逗号分隔，可尝试: null, undefined, false, 0, ''): </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '100%', padding: '5px', marginTop: '5px' }}
        />
      </div>
      <div>
        <strong>结果:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **虚假值**: 函数会移除: `false`、`null`、`0`、`""`、`undefined` 和 `NaN`
- ⚠️ **边界情况**: 空数组 `[]` 和空对象 `{}` 不被视为虚假值，会被保留
- ⚠️ **边界情况**: 当输入不是数组时，返回空数组
- 💡 **性能提示**: O(n) 时间复杂度，对大数组性能良好
- 🔒 **类型安全**: TypeScript 确保返回数组的类型推断正确
- 📚 **最佳实践**: 适用于清理用户输入、API 响应和表单数据
- ⚡ **使用场景**: 当需要一次性移除所有虚假值时，优先使用 `compact` 而不是手动过滤

## 相关函数

- [`filter`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) - JavaScript 原生的过滤方法，用于自定义条件
- [`uniq`](./uniq) - 移除数组中的重复值
- [`flatten`](./flatten) - 展平嵌套数组

## 版本历史

- **v0.0.1** - 初始版本
