/**
 * Interactive example for floor function
 *
 * @category number
 * @functionName floor
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { floor } from '@rabjs/kit';

export default function FloorExample() {
  const [number, setNumber] = useState(4.006);
  const [precision, setPrecision] = useState(0);
  const result = floor(number, precision);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Number Floor Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Number: </label>
          <input
            type="number"
            step="0.001"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
            style={{ padding: '5px', fontSize: '14px', width: '120px' }}
          />
        </div>
        <div>
          <label style={{ marginRight: '10px' }}>Precision: </label>
          <input
            type="number"
            value={precision}
            onChange={(e) => setPrecision(Number(e.target.value))}
            style={{ padding: '5px', fontSize: '14px', width: '120px' }}
          />
        </div>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input:</strong> floor({number}, {precision})
        </p>
        <p>
          <strong>Result:</strong> {result}
        </p>
      </div>
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <p><strong>Examples:</strong></p>
        <ul>
          <li>floor(4.006) → 4</li>
          <li>floor(4.006, 2) → 4.00</li>
          <li>floor(4060, -2) → 4000</li>
        </ul>
      </div>
    </div>
  );
}