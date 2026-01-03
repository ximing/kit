---
id: cloneDeep
title: cloneDeep
description: 'Creates a deep copy of value'
---

# `cloneDeep`

创建值的深拷贝。递归拷贝所有嵌套结构，并处理循环引用，确保完全独立的副本。

## 语法

```typescript
function cloneDeep<T>(value: T, hash?: WeakMap): T;
```

## 参数

| 参数名  | 类型      | 必填 | 默认值          | 描述                                   |
| ------- | --------- | ---- | --------------- | -------------------------------------- |
| `value` | `T`       | ✅   | -               | 要拷贝的值                             |
| `hash`  | `WeakMap` | ❌   | `new WeakMap()` | 用于处理循环引用的 WeakMap（内部使用） |

## 返回值

- **类型**: `T`
- **描述**: 值的深拷贝，完全独立

## 示例

### 基础用法

```typescript
import { cloneDeep } from '@rabjs/kit';

// 示例1: 深拷贝嵌套对象
const original = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
    },
  },
};

const cloned = cloneDeep(original);
cloned.b.d.e = 100;

console.log(original.b.d.e); // 2 (original unchanged)
console.log(cloned.b.d.e); // 100

// 示例2: 深拷贝数组
const arr = [1, 2, [3, 4, [5, 6]]];
const clonedArr = cloneDeep(arr);
clonedArr[2][2][1] = 999;

console.log(arr[2][2][1]); // 6 (original unchanged)
console.log(clonedArr[2][2][1]); // 999

// 示例3: 深拷贝 Date 对象
const date = new Date('2024-01-01');
const clonedDate = cloneDeep(date);
clonedDate.setDate(15);

console.log(date.getDate()); // 1 (original unchanged)
console.log(clonedDate.getDate()); // 15
```

### 高级用法

```typescript
// 示例4: 处理循环引用
const obj: any = { a: 1 };
obj.self = obj; // circular reference

const clonedObj = cloneDeep(obj);
console.log(clonedObj.self === clonedObj); // true (correctly handles circular reference)
console.log(clonedObj !== obj); // true (independent copy)

// 示例5: 深拷贝 Map 和 Set
const map = new Map([
  ['key1', { nested: 'value1' }],
  ['key2', { nested: 'value2' }],
]);
const clonedMap = cloneDeep(map);
clonedMap.get('key1').nested = 'modified';

console.log(map.get('key1').nested); // 'value1'
console.log(clonedMap.get('key1').nested); // 'modified'

// 示例6: 深拷贝复杂结构
const complex = {
  users: [
    { id: 1, name: 'Alice', tags: ['dev', 'designer'] },
    { id: 2, name: 'Bob', tags: ['dev'] },
  ],
  metadata: {
    created: new Date('2024-01-01'),
    updated: new Date('2024-01-02'),
    tags: new Set(['important', 'urgent']),
  },
};

const clonedComplex = cloneDeep(complex);
clonedComplex.users[0].tags.push('manager');
clonedComplex.metadata.tags.add('archived');

console.log(complex.users[0].tags); // ['dev', 'designer']
console.log(clonedComplex.users[0].tags); // ['dev', 'designer', 'manager']
```

### 实际应用场景

```typescript
// 示例7: 状态管理快照
function createStateSnapshot(state: any) {
  return cloneDeep(state);
}

const appState = {
  user: {
    id: 1,
    profile: {
      name: 'John',
      settings: {
        theme: 'dark',
        notifications: true,
      },
    },
  },
  data: [1, 2, 3],
};

const snapshot = createStateSnapshot(appState);
appState.user.profile.settings.theme = 'light';
appState.data.push(4);

console.log(snapshot.user.profile.settings.theme); // 'dark'
console.log(snapshot.data); // [1, 2, 3]

// 示例8: 撤销/重做系统
class UndoRedoManager {
  history: any[] = [];

  saveState(state: any) {
    this.history.push(cloneDeep(state));
  }

  getState(index: number) {
    return cloneDeep(this.history[index]);
  }
}

const manager = new UndoRedoManager();
const state1 = { value: 1, nested: { x: 10 } };
manager.saveState(state1);

state1.nested.x = 20;
const state2 = { value: 2, nested: { x: 20 } };
manager.saveState(state2);

const restored = manager.getState(0);
console.log(restored.nested.x); // 10 (independent copy)
```

## 交互式示例

```tsx live
function CloneDeepExample() {
  const [value, setValue] = React.useState(
    JSON.stringify(
      {
        a: 1,
        b: { c: 2, d: { e: 3 } },
      },
      null,
      2,
    ),
  );
  const [original, setOriginal] = React.useState(null);
  const [cloned, setCloned] = React.useState(null);

  const handleCloneDeep = () => {
    try {
      const obj = JSON.parse(value);
      const clonedObj = cloneDeep(obj);
      setOriginal(obj);
      setCloned(clonedObj);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleDeepModify = () => {
    if (cloned) {
      if (typeof cloned === 'object' && cloned !== null) {
        if (cloned.b && typeof cloned.b === 'object') {
          cloned.b.modified = true;
        }
        setCloned({ ...cloned });
      }
    }
  };

  React.useEffect(() => {
    handleCloneDeep();
  }, [value]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>cloneDeep 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>输入值 (JSON):</label>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ width: '100%', height: '100px', padding: '8px', boxSizing: 'border-box', fontFamily: 'monospace' }}
        />
      </div>
      <button onClick={handleDeepModify} style={{ marginBottom: '15px', padding: '8px 16px', cursor: 'pointer' }}>
        深层修改克隆对象
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div>
          <strong>原始对象:</strong>
          <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto', fontSize: '12px' }}>
            {original && JSON.stringify(original, null, 2)}
          </pre>
        </div>
        <div>
          <strong>深拷贝对象:</strong>
          <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto', fontSize: '12px' }}>
            {cloned && JSON.stringify(cloned, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **深拷贝**: 递归拷贝所有嵌套属性，创建完全独立的副本
- ⚠️ **循环引用**: 自动处理循环引用，避免无限递归
- ⚠️ **特殊类型支持**: 支持 Date、RegExp、Array、Map、Set 等特殊对象
- 💡 **性能提示**: 深拷贝性能消耗较大，O(n) 时间复杂度，其中 n 是对象中的属性总数
- 💡 **内存使用**: 深拷贝会增加内存使用，对于大型数据结构需要谨慎
- 🔒 **浅拷贝替代**: 如果只需要顶级属性独立，使用 `clone` 性能更好
- 📚 **最佳实践**: 仅在需要完全独立副本时使用，如状态管理和撤销/重做系统

## 相关函数

- [`clone`](./clone) - 创建对象的浅拷贝
- [`mergeDeep`](./mergeDeep) - 递归合并多个对象
- [`set`](./set) - 安全地设置对象中指定路径的值
- [`get`](./get) - 安全地获取对象中指定路径的值

## 版本历史

- **v0.0.1** - 初始版本
