/**
 * Interactive example for curry function
 *
 * @category function
 * @functionName curry
 * @complexity medium
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { curry } from '@rabjs/kit';

export default function CurryExample() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);
  const [c, setC] = useState(3);

  // Create a function that takes 3 arguments
  const add = (x: number, y: number, z: number) => x + y + z;

  // Curry the function
  const curriedAdd = curry(add);

  // You can call it in multiple ways
  const result1 = curriedAdd(a)(b)(c); // All at once
  const result2 = curriedAdd(a, b)(c); // Mixed
  const result3 = curriedAdd(a, b, c); // All arguments

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Function Curry Example</h3>
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        <div>
          <label style={{ marginRight: '5px' }}>a: </label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            style={{ padding: '5px', fontSize: '14px', width: '60px' }}
          />
        </div>
        <div>
          <label style={{ marginRight: '5px' }}>b: </label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            style={{ padding: '5px', fontSize: '14px', width: '60px' }}
          />
        </div>
        <div>
          <label style={{ marginRight: '5px' }}>c: </label>
          <input
            type="number"
            value={c}
            onChange={(e) => setC(Number(e.target.value))}
            style={{ padding: '5px', fontSize: '14px', width: '60px' }}
          />
        </div>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Original Function:</strong> add(x, y, z) = x + y + z
        </p>
        <p>
          <strong>Curried Function Calls:</strong>
        </p>
        <p style={{ marginLeft: '20px' }}>
          curriedAdd({a})({b})({c}) = {result1}
        </p>
        <p style={{ marginLeft: '20px' }}>
          curriedAdd({a}, {b})({c}) = {result2}
        </p>
        <p style={{ marginLeft: '20px' }}>
          curriedAdd({a}, {b}, {c}) = {result3}
        </p>
      </div>
    </div>
  );
}