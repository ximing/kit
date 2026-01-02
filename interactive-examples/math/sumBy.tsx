/**
 * Interactive example for sumBy function
 *
 * @category math
 * @functionName sumBy
 * @complexity medium
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { sumBy } from '@rabjs/kit';

export default function SumByExample() {
  const [selectBy, setSelectBy] = useState('quantity');

  const orders = [
    { product: 'Laptop', quantity: 2, price: 999 },
    { product: 'Mouse', quantity: 5, price: 29 },
    { product: 'Keyboard', quantity: 3, price: 79 },
    { product: 'Monitor', quantity: 1, price: 299 },
    { product: 'USB Cable', quantity: 10, price: 9 }
  ];

  const iterateeMap: Record<string, (order: typeof orders[0]) => number> = {
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