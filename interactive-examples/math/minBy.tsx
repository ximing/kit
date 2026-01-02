/**
 * Interactive example for minBy function
 *
 * @category math
 * @functionName minBy
 * @complexity medium
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { minBy } from '@rabjs/kit';

export default function MinByExample() {
  const [selectBy, setSelectBy] = useState('price');

  const products = [
    { name: 'Laptop', price: 999, stock: 15 },
    { name: 'Mouse', price: 29, stock: 100 },
    { name: 'Keyboard', price: 79, stock: 50 },
    { name: 'Monitor', price: 299, stock: 25 },
    { name: 'USB Cable', price: 9, stock: 200 }
  ];

  const iterateeMap: Record<string, (product: typeof products[0]) => number> = {
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