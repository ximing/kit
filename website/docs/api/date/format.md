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
function formatExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`format` Example</h4>
      <p>
        Formats a date according to the given format string. Supported format tokens: - YYYY: 4-digit year - MM: 2-digit
        month (01-12) - DD: 2-digit day (01-31) - HH: 2-digit hour (00-23) - mm: 2-digit minute (00-59) - ss: 2-digit
        second (00-59) - SSS: 3-digit millisecond (000-999)
      </p>
    </div>
  );
}
```
