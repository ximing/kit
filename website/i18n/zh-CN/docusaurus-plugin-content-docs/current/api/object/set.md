---
id: set
title: set
description: '安全地设置对象中指定路径的值'
---

# `set`

安全地设置对象中指定路径的值。如果路径的中间部分不存在，会自动创建所需的嵌套结构。

## 语法

```typescript
function set<T extends object>(obj: T, path: string | readonly (string | number)[], value: any): T;
```

## 参数

| 参数名  | 类型                                      | 必填 | 默认值 | 描述                                                             |
| ------- | ----------------------------------------- | ---- | ------ | ---------------------------------------------------------------- |
| `obj`   | `T extends object`                        | ✅   | -      | 要修改的对象                                                     |
| `path`  | `string \| readonly (string \| number)[]` | ✅   | -      | 属性路径，支持点符号 (`'a.b.c'`) 或数组 (`['a', 'b', 'c']`) 格式 |
| `value` | `any`                                     | ✅   | -      | 要设置的值                                                       |

## 返回值

- **类型**: `T`
- **描述**: 返回修改后的对象（直接修改原对象）

## 示例

### 基础用法

```typescript
import { set } from '@rabjs/kit';

// 示例1: 设置已存在的嵌套属性
const user = {
  id: 1,
  name: '张三',
  profile: {
    age: 28,
    address: {
      city: '北京',
    },
  },
};

set(user, 'profile.address.city', '上海');
console.log(user.profile.address.city); // '上海'

// 示例2: 使用数组格式的路径
const config = { server: { host: 'localhost' } };
set(config, ['server', 'port'], 3000);
console.log(config.server.port); // 3000

// 示例3: 创建不存在的嵌套结构
const obj = {};
set(obj, 'a.b.c', 'value');
console.log(obj); // { a: { b: { c: 'value' } } }
```

### 高级用法

```typescript
// 示例4: 处理数组索引
const data = { items: [] };
set(data, 'items[0].name', '商品 1');
console.log(data.items[0].name); // '商品 1'

// 示例5: 更新对象中的多个值
const userProfile = { name: '李四' };
set(userProfile, 'contact.email', 'lisi@example.com');
set(userProfile, 'contact.phone', '123-456-7890');
console.log(userProfile);
// {
//   name: '李四',
//   contact: {
//     email: 'lisi@example.com',
//     phone: '123-456-7890'
//   }
// }

// 示例6: 链式设置
const settings = {};
set(settings, 'ui.theme', 'dark');
set(settings, 'ui.fontSize', 14);
set(settings, 'ui.language', 'zh');
console.log(settings);
// {
//   ui: {
//     theme: 'dark',
//     fontSize: 14,
//     language: 'zh'
//   }
// }
```

### 实际应用场景

```typescript
// 示例7: 表单数据更新
function updateFormField(form: any, fieldPath: string, value: any) {
  return set(form, fieldPath, value);
}

const formData = { personal: { name: '王五' } };
updateFormField(formData, 'personal.email', 'wangwu@example.com');
updateFormField(formData, 'personal.phone', '123-456-7890');
updateFormField(formData, 'address.city', '北京');
updateFormField(formData, 'address.zip', '100000');

console.log(formData);
// {
//   personal: { name: '王五', email: 'wangwu@example.com', phone: '123-456-7890' },
//   address: { city: '北京', zip: '100000' }
// }

// 示例8: 应用配置管理
const appConfig = {
  development: {
    server: { host: 'localhost', port: 3000 },
  },
};

set(appConfig, 'development.database.host', 'localhost');
set(appConfig, 'development.database.port', 5432);
set(appConfig, 'development.database.name', 'myapp_dev');

console.log(appConfig.development.database);
// { host: 'localhost', port: 5432, name: 'myapp_dev' }
```

## 交互式示例

```tsx live
function SetExample() {
  const [obj, setObj] = React.useState({});
  const [path, setPath] = React.useState('user.profile.city');
  const [value, setValue] = React.useState('北京');

  const handleSet = () => {
    try {
      const newObj = JSON.parse(JSON.stringify(obj));
      set(newObj, path, value);
      setObj(newObj);
    } catch (error) {
      alert('错误: ' + error.message);
    }
  };

  const handleReset = () => {
    setObj({});
    setPath('user.profile.city');
    setValue('北京');
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>set 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>路径:</label>
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="例如: user.profile.city"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>值:</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="例如: 北京"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button onClick={handleSet} style={{ marginRight: '10px', padding: '8px 16px', cursor: 'pointer' }}>
          设置值
        </button>
        <button onClick={handleReset} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          重置
        </button>
      </div>
      <div>
        <strong>当前对象:</strong>
        <pre style={{ background: 'white', padding: '10px', marginTop: '5px', overflow: 'auto', fontSize: '12px' }}>
          {JSON.stringify(obj, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **原对象修改**: 该函数直接修改原对象，不创建新对象
- ⚠️ **路径格式**: 支持点符号 (`'a.b.c'`) 和数组索引 (`'items[0].name'`) 两种格式
- ⚠️ **自动创建**: 中间路径不存在时会自动创建为对象或数组
- 💡 **性能提示**: 该函数具有 O(n) 时间复杂度，其中 n 是路径深度
- 🔒 **类型安全**: 对象参数需要是 `object` 类型的子类型
- 📚 **最佳实践**: 如果需要保留原对象，先使用 `clone` 或 `cloneDeep` 创建副本再调用 `set`

## 相关函数

- [`get`](./get) - 安全地获取对象中指定路径的值
- [`has`](./has) - 检查对象是否包含指定路径的属性
- [`clone`](./clone) - 创建对象的浅拷贝
- [`cloneDeep`](./cloneDeep) - 创建对象的深拷贝

## 版本历史

- **v1.0.0** - 初始版本
