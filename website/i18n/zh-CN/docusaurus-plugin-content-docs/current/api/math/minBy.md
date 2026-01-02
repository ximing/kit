---
id: minBy
title: minBy
description: "This method is like min except that it accepts iteratee which is invoked for each element in array to generate the criterion by which the value is ranked. The iteratee is invoked with one argument: (value)."
---

# `minBy`

This method is like min except that it accepts iteratee which is invoked for each element
in array to generate the criterion by which the value is ranked.
The iteratee is invoked with one argument: (value).

## 参数

| 参数 | 类型 | 描述 |
|---------|------|---------|
| `array` | `any` | - The array to iterate over |
| `iteratee` | `any` | - The iteratee invoked per element |

## 返回值

- **类型**: `any`
- **描述**: Returns the minimum value

## 示例

```typescript
* minBy([{ n: 1 }, { n: 2 }, { n: 3 }], (o) => o.n) // => { n: 1 }
 * minBy([], (o) => o.n) // => undefined
```

## 交互式示例

```tsx live
function MinByExample() {
  const [selectBy, setSelectBy] = useState('price');

  const products = [
    { name: 'Laptop', price, stock: 15 },
    { name: 'Mouse', price, stock: 100 },
    { name: 'Keyboard', price, stock: 50 },
    { name: 'Monitor', price, stock: 25 },
    { name: 'USB Cable', price, stock: 200 }
  ];

  const iterateeMap, (product) => number> = {
    price: (product) => product.price,
    stock: (product) => product.stock
  };

  const result = minBy(products, iterateeMap[selectBy]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Math MinBy Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Find product with minimum: </label>
        <select
          value={selectBy}
          onChange={(e) => setSelectBy(e.target.value)}
          style={{ padding: '5px', fontSize: '14px' }}
        >
          <option value="price">Price</option>
          <option value="stock">Stock</option>
        </select>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Products:</strong>
        </p>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
          {JSON.stringify(products, null, 2)}
        </pre>
        <p>
          <strong>Product with minimum {selectBy}:</strong>
        </p>
        <pre style={{ backgroundColor: '#e3f2fd', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

