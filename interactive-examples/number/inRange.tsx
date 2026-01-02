/**
 * Interactive example for inRange function
 *
 * @category number
 * @functionName inRange
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { inRange } from '@rabjs/kit';

export default function InRangeExample() {
  const [number, setNumber] = useState(3);
  const [start, setStart] = useState(2);
  const [end, setEnd] = useState(4);
  const result = inRange(number, start, end);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Number InRange Example</h3>
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
          <label style={{ marginRight: '10px' }}>Start: </label>
          <input
            type="number"
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
            style={{ padding: '5px', fontSize: '14px', width: '100px' }}
          />
        </div>
        <div>
          <label style={{ marginRight: '10px' }}>End: </label>
          <input
            type="number"
            value={end}
            onChange={(e) => setEnd(Number(e.target.value))}
            style={{ padding: '5px', fontSize: '14px', width: '100px' }}
          />
        </div>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input:</strong> inRange({number}, {start}, {end})
        </p>
        <p>
          <strong>Result:</strong>{' '}
          <span style={{ color: result ? 'green' : 'red', fontWeight: 'bold' }}>
            {String(result)}
          </span>
        </p>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Range: [{start}, {end}) - Start is inclusive, end is exclusive
        </p>
      </div>
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <p><strong>Examples:</strong></p>
        <ul>
          <li>inRange(3, 2, 4) → true (within range)</li>
          <li>inRange(4, 2, 4) → false (end is exclusive)</li>
          <li>inRange(2, 2, 4) → true (start is inclusive)</li>
        </ul>
      </div>
    </div>
  );
}