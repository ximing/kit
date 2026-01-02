/**
 * Interactive example for range function
 *
 * @category number
 * @functionName range
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { range } from '@rabjs/kit';

export default function RangeExample() {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);
  const [step, setStep] = useState(1);
  
  let result: number[] | string;
  let error = false;
  try {
    result = range(start, end, step);
  } catch (e) {
    result = (e as Error).message;
    error = true;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Range Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Start: </label>
          <input
            type="number"
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
            style={{ padding: '5px', fontSize: '14px', width: '100px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>End: </label>
          <input
            type="number"
            value={end}
            onChange={(e) => setEnd(Number(e.target.value))}
            style={{ padding: '5px', fontSize: '14px', width: '100px' }}
          />
        </div>
        <div>
          <label style={{ marginRight: '10px' }}>Step: </label>
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            style={{ padding: '5px', fontSize: '14px', width: '100px' }}
          />
        </div>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input:</strong> range({start}, {end}, {step})
        </p>
        <p style={{ color: error ? 'red' : 'inherit' }}>
          <strong>{error ? 'Error:' : 'Result:'}</strong>{' '}
          {Array.isArray(result) ? JSON.stringify(result) : result}
        </p>
        {!error && Array.isArray(result) && (
          <p style={{ fontSize: '14px', color: '#666' }}>
            Array length: {result.length}
          </p>
        )}
      </div>
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <p><strong>Examples:</strong></p>
        <ul>
          <li>range(0, 5) → [0, 1, 2, 3, 4]</li>
          <li>range(0, 10, 2) → [0, 2, 4, 6, 8]</li>
          <li>range(5, 0, -1) → [5, 4, 3, 2, 1]</li>
        </ul>
      </div>
    </div>
  );
}