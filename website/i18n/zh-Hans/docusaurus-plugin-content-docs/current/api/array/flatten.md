---
id: flatten
title: flatten
description: '将数组展平到指定深度'
---

# `flatten`

将嵌套数组展平到指定深度级别。该函数包含 `flattenDeep` 用于完全展平深度嵌套的数组。

## 语法

```typescript
function flatten<T>(array: any[], depth?: number): T[];
function flattenDeep<T>(array: any[]): T[];
```

## 参数

### `flatten`

| 参数名  | 类型     | 必填 | 默认值 | 描述                           |
| ------- | -------- | ---- | ------ | ------------------------------ |
| `array` | `any[]`  | ✅   | -      | 要展平的数组                   |
| `depth` | `number` | ❌   | `1`    | 展平的深度级别（必须是非负数） |

### `flattenDeep`

| 参数名  | 类型    | 必填 | 默认值 | 描述             |
| ------- | ------- | ---- | ------ | ---------------- |
| `array` | `any[]` | ✅   | -      | 要完全展平的数组 |

## 返回值

- **类型**: `T[]`
- **描述**: 展平后的新数组。如果输入不是数组，返回空数组。

## 示例

### 基础用法

```typescript
import { flatten, flattenDeep } from '@rabjs/kit';

// 示例1: 单层展平（默认 depth = 1）
const nested1 = [1, [2, 3], [4, [5]]];
const flattened1 = flatten(nested1);
console.log(flattened1); // [1, 2, 3, 4, [5]]

// 示例2: 指定深度展平
const nested2 = [1, [2, [3, [4]]]];
const flattened2 = flatten(nested2, 2);
console.log(flattened2); // [1, 2, 3, [4]]

// 示例3: 深度展平
const deepNested = [1, [2, [3, [4, [5]]]]];
const deepFlattened = flattenDeep(deepNested);
console.log(deepFlattened); // [1, 2, 3, 4, 5]
```

### 高级用法

```typescript
// 示例4: 展平混合类型
const mixed = [1, [2, '三'], [[4, true], { five: 5 }]];
const flatMixed = flatten(mixed, 2);
console.log(flatMixed); // [1, 2, '三', 4, true, { five: 5 }]

// 示例5: 处理嵌套数据结构
interface Category {
  id: number;
  name: string;
  subcategories?: Category[];
}

function getAllCategoryIds(categories: Category[]): number[] {
  const nested = categories.map((cat) => [cat.id, cat.subcategories ? getAllCategoryIds(cat.subcategories) : []]);
  return flattenDeep(nested);
}

const categories: Category[] = [
  {
    id: 1,
    name: '电子产品',
    subcategories: [
      { id: 11, name: '笔记本电脑' },
      { id: 12, name: '手机' },
    ],
  },
  {
    id: 2,
    name: '图书',
    subcategories: [{ id: 21, name: '小说' }],
  },
];
console.log(getAllCategoryIds(categories)); // [1, 11, 12, 2, 21]

// 示例6: 与数组操作结合
const data = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const sum = flattenDeep(data).reduce((acc, num) => acc + num, 0);
console.log(sum); // 21
```

### 实际应用场景

```typescript
// 示例7: 展平 API 响应
interface ApiResponse {
  page: number;
  items: string[];
}

async function fetchAllPages(): Promise<string[]> {
  const pages = await Promise.all([
    fetch('/api/items?page=1').then((r) => r.json()),
    fetch('/api/items?page=2').then((r) => r.json()),
    fetch('/api/items?page=3').then((r) => r.json()),
  ]);

  const items = pages.map((page: ApiResponse) => page.items);
  return flattenDeep(items);
}

// 示例8: 处理树形结构
interface TreeNode {
  value: number;
  children?: TreeNode[];
}

function collectTreeValues(nodes: TreeNode[]): number[] {
  const values = nodes.map((node) => {
    const childValues = node.children ? collectTreeValues(node.children) : [];
    return [node.value, childValues];
  });
  return flattenDeep(values);
}

const tree: TreeNode[] = [
  {
    value: 1,
    children: [{ value: 2 }, { value: 3, children: [{ value: 4 }] }],
  },
  { value: 5 },
];
console.log(collectTreeValues(tree)); // [1, 2, 3, 4, 5]

// 示例9: 批量处理嵌套数组
function processBatches(batches: number[][]): number[] {
  return flatten(batches).filter((n) => n > 0);
}

const batches = [
  [1, 2, 3],
  [4, 5],
  [6, 7, 8],
];
console.log(processBatches(batches)); // [1, 2, 3, 4, 5, 6, 7, 8]
```

## 交互式示例

```tsx live
function FlattenExample() {
  const [input, setInput] = React.useState('[1,[2,3],[4,[5,6]]]');
  const [depth, setDepth] = React.useState(1);
  const [mode, setMode] = React.useState('flatten');
  const [result, setResult] = React.useState(null);

  const handleFlatten = () => {
    try {
      const array = JSON.parse(input);
      if (!Array.isArray(array)) {
        setResult('错误: 输入必须是数组');
        return;
      }

      const flattened = mode === 'deep' ? flattenDeep(array) : flatten(array, depth);

      setResult({
        original: array,
        flattened: flattened,
      });
    } catch (error) {
      setResult('错误: ' + error.message);
    }
  };

  React.useEffect(() => {
    handleFlatten();
  }, [input, depth, mode]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>flatten 交互式示例</h4>
      <div style={{ marginBottom: '10px' }}>
        <label>输入 (JSON 数组): </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '100%', padding: '5px', marginTop: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>模式: </label>
        <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ padding: '5px', marginRight: '10px' }}>
          <option value="flatten">flatten (指定深度)</option>
          <option value="deep">flattenDeep (完全展平)</option>
        </select>
        {mode === 'flatten' && (
          <>
            <label>深度: </label>
            <input
              type="number"
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value))}
              min="0"
              style={{ width: '60px', padding: '5px' }}
            />
          </>
        )}
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

- ⚠️ **边界情况**: 当 `depth` 为 0 或负数时，返回原数组
- ⚠️ **边界情况**: 当输入不是数组时，返回空数组
- 💡 **性能提示**: 递归实现，对于总元素数时间复杂度为 O(n)
- 🔒 **类型安全**: 泛型类型有助于在可能的情况下保持类型信息
- 📚 **最佳实践**: 单层展平使用 `flatten(arr, 1)`，完全展平使用 `flattenDeep(arr)`
- ⚡ **内存**: 创建新数组，不会改变原数组
- 🎯 **使用场景**: 适用于处理 API 响应、树形结构和嵌套数据转换

## 相关函数

- [`chunk`](./chunk) - 将数组拆分为分块（相反操作）
- [`compact`](./compact) - 移除数组中的虚假值
- [原生 `Array.prototype.flat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) - ES2019 替代方案

## 版本历史

- **v0.0.1** - 初始版本
