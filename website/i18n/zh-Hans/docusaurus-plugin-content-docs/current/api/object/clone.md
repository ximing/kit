---
id: clone
title: clone
description: '创建值的浅拷贝'
---

# `clone`

创建值的浅拷贝。支持多种数据类型包括 Date、RegExp、Array、Map、Set 等特殊对象。

## 语法

```typescript
function clone<T>(value: T): T;
```

## 参数

| 参数名  | 类型 | 必填 | 默认值 | 描述       |
| ------- | ---- | ---- | ------ | ---------- |
| `value` | `T`  | ✅   | -      | 要拷贝的值 |

## 返回值

- **类型**: `T`
- **描述**: 值的浅拷贝

## 示例

### 基础用法

```typescript
import { clone } from '@rabjs/kit';

// 示例1: 拷贝基本类型 (不需要拷贝，直接返回)
const num = 42;
const clonedNum = clone(num);
console.log(clonedNum); // 42
console.log(clonedNum === num); // true (基本类型不可变)

// 示例2: 拷贝对象
const obj = { a: 1, b: { c: 2 } };
const clonedObj = clone(obj);
clonedObj.a = 10;
console.log(obj.a); // 1 (原始对象未改变)
console.log(clonedObj.b === obj.b); // true (浅拷贝)

// 示例3: 拷贝数组
const arr = [1, 2, [3, 4]];
const clonedArr = clone(arr);
clonedArr[0] = 10;
console.log(arr[0]); // 1 (原始数组未改变)
console.log(clonedArr[2] === arr[2]); // true (浅拷贝)
```

### 高级用法

```typescript
// 示例4: 拷贝 Date 对象
const date = new Date('2024-01-01');
const clonedDate = clone(date);
clonedDate.setDate(15);
console.log(date.getDate()); // 1 (原始 Date 未改变)
console.log(clonedDate.getDate()); // 15

// 示例5: 拷贝 RegExp 对象
const regex = /test/gi;
const clonedRegex = clone(regex);
console.log(clonedRegex.source); // 'test'
console.log(clonedRegex.flags); // 'gi'
console.log(clonedRegex === regex); // false

// 示例6: 拷贝 Map 对象
const map = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);
const clonedMap = clone(map);
clonedMap.set('key1', 'modified');
console.log(map.get('key1')); // 'value1'
console.log(clonedMap.get('key1')); // 'modified'

// 示例7: 拷贝 Set 对象
const set = new Set([1, 2, 3]);
const clonedSet = clone(set);
clonedSet.add(4);
console.log(set.has(4)); // false
console.log(clonedSet.has(4)); // true
```

### 实际应用场景

```typescript
// 示例8: 表单数据快照
function saveFormSnapshot(formData: any) {
  return clone(formData);
}

const formData = {
  name: '张三',
  email: 'zhangsan@example.com',
  tags: ['开发者', '设计师'],
};

const snapshot = saveFormSnapshot(formData);
formData.name = '李四';
formData.tags.push('经理');

console.log(snapshot.name); // '张三' (未改变)
console.log(snapshot.tags); // ['开发者', '设计师', '经理'] (浅拷贝，共享数组!)

// 示例9: 数据库记录备份
function backupRecord(record: any) {
  const backup = clone(record);
  backup.lastModified = new Date();
  return backup;
}

const dbRecord = {
  id: 1,
  name: '商品',
  created: new Date('2024-01-01'),
  metadata: { color: 'red' },
};

const backup = backupRecord(dbRecord);
console.log(backup.created === dbRecord.created); // false (Date 被克隆)
console.log(backup.metadata === dbRecord.metadata); // true (浅拷贝)
```

## 交互式示例

```tsx live
function CloneExample() {
  const [value, setValue] = React.useState(JSON.stringify({ a: 1, b: { c: 2 } }, null, 2));
  const [original, setOriginal] = React.useState(null);
  const [cloned, setCloned] = React.useState(null);

  const handleClone = () => {
    try {
      const obj = JSON.parse(value);
      const clonedObj = clone(obj);
      setOriginal(obj);
      setCloned(clonedObj);
    } catch (error) {
      alert('错误: ' + error.message);
    }
  };

  const handleModify = () => {
    if (cloned) {
      if (typeof cloned === 'object' && cloned !== null) {
        if (Array.isArray(cloned)) {
          cloned.push('modified');
        } else {
          cloned.modified = true;
        }
        setCloned({ ...cloned });
      }
    }
  };

  React.useEffect(() => {
    handleClone();
  }, [value]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>clone 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>输入值 (JSON):</label>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ width: '100%', height: '100px', padding: '8px', boxSizing: 'border-box', fontFamily: 'monospace' }}
        />
      </div>
      <button onClick={handleModify} style={{ marginBottom: '15px', padding: '8px 16px', cursor: 'pointer' }}>
        修改克隆对象
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div>
          <strong>原始对象:</strong>
          <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto', fontSize: '12px' }}>
            {original && JSON.stringify(original, null, 2)}
          </pre>
        </div>
        <div>
          <strong>克隆对象:</strong>
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

- ⚠️ **浅拷贝**: 仅拷贝顶级属性，嵌套对象仍然是引用
- ⚠️ **特殊类型支持**: 支持 Date、RegExp、Array、Map、Set 等特殊对象
- ⚠️ **基本类型**: 基本类型（数字、字符串等）直接返回，不需要拷贝
- 💡 **性能提示**: 浅拷贝性能良好，O(n) 时间复杂度
- 🔒 **深层修改**: 如果需要完全独立的副本，使用 `cloneDeep`
- 📚 **最佳实践**: 对于包含嵌套对象的数据，需要小心共享引用的问题

## 相关函数

- [`cloneDeep`](./cloneDeep) - 创建对象的深拷贝
- [`merge`](./merge) - 浅合并多个对象
- [`set`](./set) - 安全地设置对象中指定路径的值
- [`pick`](./pick) - 选择对象的指定属性

## 版本历史

- **v1.0.0** - 初始版本
