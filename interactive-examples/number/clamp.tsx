/**
 * Interactive example for clamp function
 *
 * @category number
 * @functionName clamp
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { clamp } from '@rabjs/kit';

export default function ClampExample() {
  const [number, setNumber] = useState(10);
  const [lower, setLower] = useState(5);
  const [upper, setUpper] = useState(15);
  
  let result: number | string;
  let error = false;
  try {
    result = clamp(number, lower, upper);
  } catch (e) {
    result = (e as Error).message;
    error = true;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Number Clamp Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Number: </label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
            style={{ padding: '5px', fontSize: '14px', width: '100px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Lower Bound: </label>
          <input
            type="number"
            value={lower}
            onChange={(e) => setLower(Number(e.target.value))}
            style={{ padding: '5px', fontSize: '14px', width: '100px' }}
          />
        </div>
        <div>
          <label style={{ marginRight: '10px' }}>Upper Bound: </label>
          <input
            type="number"
            value={upper}
            onChange={(e) => setUpper(Number(e.target.value))}
            style={{ padding: '5px', fontSize: '14px', width: '100px' }}
          />
        </div>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input:</strong> clamp({number}, {lower}, {upper})
        </p>
        <p style={{ color: error ? 'red' : 'inherit' }}>
          <strong>{error ? 'Error:' : 'Result:'}</strong> {String(result)}
        </p>
      </div>
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <p><strong>Examples:</strong></p>
        <ul>
          <li>clamp(10, 5, 15) → 10 (within bounds)</li>
          <li>clamp(3, 5, 15) → 5 (below lower)</li>
          <li>clamp(20, 5, 15) → 15 (above upper)</li>
        </ul>
      </div>
    </div>
  );
}