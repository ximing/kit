---
id: parse
title: parse
description: 'Parses a date string according to the given format string and returns a Date object'
---

# `parse`

Parses a date string according to the given format string and returns a Date object. This function supports multiple format tokens to parse various date string formats.

## 语法

```typescript
function parse(dateStr: string, formatStr?: string): Date | null;
```

## 参数

| 参数名      | 类型     | 必填 | 默认值                  | 描述                                                                                            |
| ----------- | -------- | ---- | ----------------------- | ----------------------------------------------------------------------------------------------- |
| `dateStr`   | `string` | ✅   | -                       | 要解析的日期字符串                                                                              |
| `formatStr` | `string` | ❌   | `'YYYY-MM-DD HH:mm:ss'` | 格式字符串，支持的token: YYYY (年), MM (月), DD (日), HH (小时), mm (分钟), ss (秒), SSS (毫秒) |

## 返回值

- **类型**: `Date | null`
- **描述**: 解析成功返回 Date 对象，解析失败返回 null。

## 支持的格式 Token

| Token  | 说明              | 示例          |
| ------ | ----------------- | ------------- |
| `YYYY` | 4位年份           | 2024          |
| `MM`   | 2位月份 (01-12)   | 01, 12        |
| `DD`   | 2位日期 (01-31)   | 01, 15, 31    |
| `HH`   | 2位小时 (00-23)   | 00, 14, 23    |
| `mm`   | 2位分钟 (00-59)   | 00, 30, 59    |
| `ss`   | 2位秒 (00-59)     | 00, 45, 59    |
| `SSS`  | 3位毫秒 (000-999) | 000, 123, 999 |

## 示例

### 基础用法

```typescript
import { parse } from '@rabjs/kit';

// 示例1: 默认格式解析
const date1 = parse('2024-01-15 14:30:45');
console.log(date1); // => Date object for 2024-01-15 14:30:45

// 示例2: 自定义格式解析
const date2 = parse('2024/01/15', 'YYYY/MM/DD');
console.log(date2); // => Date object for 2024-01-15

// 示例3: 反向日期格式
const date3 = parse('15-01-2024', 'DD-MM-YYYY');
console.log(date3); // => Date object for 2024-01-15
```

### 高级用法

```typescript
// 示例4: 完整日期时间解析
const date = parse('2024-01-15 14:30:45.123', 'YYYY-MM-DD HH:mm:ss.SSS');
console.log(date);
// => Date object with milliseconds

// 示例5: 中文格式解析
const chineseDate = parse('2024年01月15日 14:30:45', 'YYYY年MM月DD日 HH:mm:ss');
console.log(chineseDate);
// => Date object for 2024-01-15 14:30:45

// 示例6: 处理解析失败
const invalidDate = parse('invalid-date', 'YYYY-MM-DD');
console.log(invalidDate); // => null

// 示例7: 验证日期有效性
function parseAndValidate(dateStr: string, format: string) {
  const date = parse(dateStr, format);
  if (!date) {
    return { success: false, error: '日期格式不正确' };
  }
  return { success: true, date };
}

console.log(parseAndValidate('2024-01-15', 'YYYY-MM-DD'));
// => { success: true, date: Date object }
```

### 实际应用场景

```typescript
// 示例8: 用户输入日期处理
function handleUserDateInput(inputStr: string) {
  // 尝试多种格式
  const formats = ['YYYY-MM-DD', 'DD-MM-YYYY', 'MM/DD/YYYY', 'YYYY/MM/DD'];

  for (const format of formats) {
    const date = parse(inputStr, format);
    if (date) {
      return date;
    }
  }
  return null;
}

console.log(handleUserDateInput('2024-01-15')); // => Date object
console.log(handleUserDateInput('15-01-2024')); // => Date object

// 示例9: API 响应日期转换
function processApiResponse(apiData: string) {
  const date = parse(apiData, 'YYYY-MM-DD HH:mm:ss');
  if (!date) {
    throw new Error('Invalid date format from API');
  }
  return date;
}

// 示例10: 日期范围查询
function parseDateRange(startStr: string, endStr: string) {
  const start = parse(startStr, 'YYYY-MM-DD');
  const end = parse(endStr, 'YYYY-MM-DD');

  if (!start || !end) {
    return null;
  }

  return { start, end };
}

const range = parseDateRange('2024-01-01', '2024-12-31');
console.log(range);
// => { start: Date(2024-01-01), end: Date(2024-12-31) }
```

## 交互式示例

```tsx live
function ParseExample() {
  const [dateStr, setDateStr] = React.useState('2024-01-15 14:30:45');
  const [formatStr, setFormatStr] = React.useState('YYYY-MM-DD HH:mm:ss');
  const [result, setResult] = React.useState(null);

  const handleParse = () => {
    try {
      const parsed = parse(dateStr, formatStr);
      setResult(parsed);
    } catch (error) {
      setResult(null);
    }
  };

  React.useEffect(() => {
    handleParse();
  }, [dateStr, formatStr]);

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>parse 交互式示例</h4>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>日期字符串:</label>
        <input
          type="text"
          value={dateStr}
          onChange={(e) => setDateStr(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          placeholder="e.g., 2024-01-15 14:30:45"
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>格式字符串:</label>
        <input
          type="text"
          value={formatStr}
          onChange={(e) => setFormatStr(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          placeholder="e.g., YYYY-MM-DD HH:mm:ss"
        />
      </div>
      <div>
        <strong>解析结果:</strong>
        <div style={{ background: 'white', padding: '10px', marginTop: '5px', borderRadius: '4px' }}>
          {result ? (
            <>
              <div>✅ 解析成功</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>{result.toString()}</div>
            </>
          ) : (
            <div>❌ 解析失败</div>
          )}
        </div>
      </div>
    </div>
  );
}
```

## 注意事项

- ⚠️ **边界情况**: 如果输入不是字符串，返回 null
- ⚠️ **边界情况**: 如果格式字符串无效，返回 null
- ⚠️ **边界情况**: 如果解析出的日期无效（如月份 > 12），返回 null
- 💡 **验证**: 总是检查返回值是否为 null 再使用
- 💡 **Token 区分**: `mm` 表示分钟，`MM` 表示月份，两者不可混淆
- 🔒 **不可变性**: 原始字符串不会被修改
- 📚 **最佳实践**: 使用 `format` 和 `parse` 配对，确保格式一致

## 相关函数

- [`format`](./format) - 格式化日期为字符串
- [`addDays`](./addDays) - 增加天数
- [`diffDays`](./diffDays) - 计算天数差
- [`startOfDay`](./startOfDay) - 获取当天开始时间
- [`endOfDay`](./endOfDay) - 获取当天结束时间

## 版本历史

- **v1.0.0** - 初始版本
