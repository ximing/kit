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

## Parameters

| Parameter   | Type  | Description                                          |
| ----------- | ----- | ---------------------------------------------------- |
| `dateStr`   | `any` | - The date string to parse                           |
| `formatStr` | `any` | - The format string (default: 'YYYY-MM-DD HH:mm:ss') |

## Returns

- **Type**: `any`
- **Description**: The parsed Date object, or null if parsing fails

## Examples

```typescript
* parse('2024-01-15 14:30:45') // => Date object
 * parse('2024/01/15', 'YYYY/MM/DD') // => Date object
 * parse('15-01-2024', 'DD-MM-YYYY') // => Date object
```

## Interactive Example

```tsx live
function parseExample() {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h4>`parse` Example</h4>
      <p>
        Parses a date string according to the given format string. Supported format tokens: - YYYY: 4-digit year - MM:
        2-digit month (01-12) - DD: 2-digit day (01-31) - HH: 2-digit hour (00-23) - mm: 2-digit minute (00-59) - ss:
        2-digit second (00-59) - SSS: 3-digit millisecond (000-999)
      </p>
    </div>
  );
}
```
