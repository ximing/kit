/**
 * Interactive example for findIndex function
 *
 * @category array
 * @functionName findIndex
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { findIndex } from '@rabjs/kit';

export default function FindIndexExample() {
  const [threshold, setThreshold] = useState(2);
  const array = [1, 2, 3, 4, 5];
  const result = findIndex(array, (item) => item > threshold);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Array FindIndex Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Find first element greater than: </label>
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          style={{ padding: '5px', fontSize: '14px' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Array:</strong> {JSON.stringify(array)}
        </p>
        <p>
          <strong>Threshold:</strong> {threshold}
        </p>
        <p>
          <strong>Index of first element &gt; {threshold}:</strong> {result}
        </p>
        {result !== -1 && (
          <p>
            <strong>Element:</strong> {array[result]}
          </p>
        )}
      </div>
    </div>
  );
}