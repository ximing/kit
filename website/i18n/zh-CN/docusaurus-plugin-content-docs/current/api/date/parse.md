---
id: parse
title: parse
description: 'Parses a date string according to the given format string.  Supported format tokens: - YYYY: 4-digit year - MM: 2-digit month (01-12) - DD: 2-digit day (01-31) - HH: 2-digit hour (00-23) - mm: 2-digit minute (00-59) - ss: 2-digit second (00-59) - SSS: 3-digit millisecond (000-999)'
---

# `parse`

Parses a date string according to the given format string.

Supported format tokens:

- YYYY: 4-digit year
- MM: 2-digit month (01-12)
- DD: 2-digit day (01-31)
- HH: 2-digit hour (00-23)
- mm: 2-digit minute (00-59)
- ss: 2-digit second (00-59)
- SSS: 3-digit millisecond (000-999)

## 参数

| 参数        | 类型  | 描述                                                 |
| ----------- | ----- | ---------------------------------------------------- |
| `dateStr`   | `any` | - The date string to parse                           |
| `formatStr` | `any` | - The format string (default: 'YYYY-MM-DD HH:mm:ss') |

## 返回值

- **类型**: `any`
- **描述**: The parsed Date object, or null if parsing fails

## 示例

```typescript
* parse('2024-01-15 14:30:45') // => Date object
 * parse('2024/01/15', 'YYYY/MM/DD') // => Date object
 * parse('15-01-2024', 'DD-MM-YYYY') // => Date object
```

## 交互式示例

```tsx live
function ParseExample() {
  const [dateStr, setDateStr] = useState('2024-01-15 14:30:45');
  const [formatStr, setFormatStr] = useState('YYYY-MM-DD HH:mm:ss');

  const parsedDate = parse(dateStr, formatStr);
  const isValid = parsedDate !== null && !isNaN(parsedDate.getTime());

  const formatOptions = ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD', 'YYYY/MM/DD', 'DD-MM-YYYY', 'MM/DD/YYYY HH:mm'];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Date Parse Example</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Date String: </label>
          <input
            type="text"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            style={{ width: '100%', padding: '5px', fontSize: '14px' }}
            placeholder="e.g., 2024-01-15 14:30:45"
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Format String: </label>
          <select
            value={formatStr}
            onChange={(e) => setFormatStr(e.target.value)}
            style={{ width: '100%', padding: '5px', fontSize: '14px' }}
          >
            {formatOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input String:</strong> {dateStr}
        </p>
        <p>
          <strong>Format:</strong> {formatStr}
        </p>
        <p>
          <strong>Status:</strong> {isValid ? '✅ Valid' : '❌ Invalid'}
        </p>
        {isValid && (
          <p>
            <strong>Parsed Date:</strong> {format(parsedDate!, 'YYYY-MM-DD HH:mm:ss')}
          </p>
        )}
      </div>
    </div>
  );
}
```
