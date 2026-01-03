---
id: format
title: format
description: 'Formats a date according to the given format string.  Supported format tokens: - YYYY: 4-digit year - MM: 2-digit month (01-12) - DD: 2-digit day (01-31) - HH: 2-digit hour (00-23) - mm: 2-digit minute (00-59) - ss: 2-digit second (00-59) - SSS: 3-digit millisecond (000-999)'
---

# `format`

Formats a date according to the given format string.

Supported format tokens:

- YYYY: 4-digit year
- MM: 2-digit month (01-12)
- DD: 2-digit day (01-31)
- HH: 2-digit hour (00-23)
- mm: 2-digit minute (00-59)
- ss: 2-digit second (00-59)
- SSS: 3-digit millisecond (000-999)

## Parameters

| Parameter   | Type  | Description                                          |
| ----------- | ----- | ---------------------------------------------------- |
| `date`      | `any` | - The date to format                                 |
| `formatStr` | `any` | - The format string (default: 'YYYY-MM-DD HH:mm:ss') |

## Returns

- **Type**: `any`
- **Description**: The formatted date string

## Examples

```typescript
* format(new Date('2024-01-15T14:30:45.123Z')) // => '2024-01-15 14:30:45'
 * format(new Date('2024-01-15'), 'YYYY/MM/DD') // => '2024/01/15'
 * format(new Date('2024-01-15T14:30:45.123Z'), 'DD-MM-YYYY') // => '15-01-2024'
```

## Interactive Example

```tsx live
function FormatExample() {
  const [formatStr, setFormatStr] = useState('YYYY-MM-DD HH:mm:ss');

  const date = new Date('2024-01-15T14:30:45.123Z');

  const formatOptions = [
    'YYYY-MM-DD',
    'YYYY-MM-DD HH:mm:ss',
    'YYYY/MM/DD',
    'DD-MM-YYYY',
    'MM/DD/YYYY HH:mm',
    'DD.MM.YYYY',
  ];

  const result = format(date, formatStr);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Date Format Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Format String: </label>
        <select
          value={formatStr}
          onChange={(e) => setFormatStr(e.target.value)}
          style={{ padding: '5px', fontSize: '14px', width: '100%' }}
        >
          {formatOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Date:</strong> {date.toISOString()}
        </p>
        <p>
          <strong>Format String:</strong> {formatStr}
        </p>
        <p>
          <strong>Result:</strong> {result}
        </p>
      </div>
    </div>
  );
}
```
