---
id: sumBy
title: sumBy
description: 'This method is like sum except that it accepts iteratee which is invoked for each element in array to generate the value to be summed. The iteratee is invoked with one argument: (value).'
---

# `sumBy`

This method is like sum except that it accepts iteratee which is invoked for each element
in array to generate the value to be summed.
The iteratee is invoked with one argument: (value).

## 参数

| 参数       | 类型  | 描述                               |
| ---------- | ----- | ---------------------------------- |
| `array`    | `any` | - The array to iterate over        |
| `iteratee` | `any` | - The iteratee invoked per element |

## 返回值

- **类型**: `any`
- **描述**: Returns the sum

## 示例

```typescript
* sumBy([{ n: 1 }, { n: 2 }, { n: 3 }], (o) => o.n) // => 6
 * sumBy([], (o) => o.n) // => 0
```

## 交互式示例

```tsx live
function SumByExample() {
  const [selectBy, setSelectBy] = useState('quantity');

  const orders = [
    { product: 'Laptop', quantity, price: 999 },
    { product: 'Mouse', quantity, price: 29 },
    { product: 'Keyboard', quantity, price: 79 },
    { product: 'Monitor', quantity, price: 299 },
    { product: 'USB Cable', quantity, price: 9 }
  ];

  const iterateeMap, (order) => number> = {
    quantity: (order) => order.quantity,
    price: (order) => order.price,
    total: (order) => order.quantity * order.price
  };

  const result = sumBy(orders, iterateeMap[selectBy]);

  const getLabelText = () => {
    switch (selectBy) {
      case 'quantity':
        return 'Total Items';
      case 'price':
        return 'Sum of Prices';
      case 'total':
        return 'Total Order Value';
      default:
        return 'Sum';
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Math SumBy Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Calculate sum of: </label>
        <select
          value={selectBy}
          onChange={(e) => setSelectBy(e.target.value)}
          style={{ padding: '5px', fontSize: '14px' }}
        >
          <option value="quantity">Quantity</option>
          <option value="price">Price</option>
          <option value="total">Total (Quantity × Price)</option>
        </select>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Orders:</strong>
        </p>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
          {JSON.stringify(orders, null, 2)}
        </pre>
        <p>
          <strong>{getLabelText()}:</strong>{' '}
          <span style={{ fontSize: '18px', color: '#1976d2', fontWeight: 'bold' }}>
            {selectBy === 'quantity' ? result : `$${result.toFixed(2)}`}
          </span>
        </p>
      </div>
    </div>
  );
}
```
