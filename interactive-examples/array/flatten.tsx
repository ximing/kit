/**
 * Interactive example for flatten function
 *
 * @category array
 * @functionName flatten
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { flatten } from '@rabjs/kit';

export default function FlattenExample() {
  const [depth, setDepth] = useState(1);
  const array = [1, [2, 3], [4, [5, 6]], [7, [8, [9]]]];
  const result = flatten(array, depth);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Array Flatten Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Flatten Depth: </label>
        <input
          type="number"
          min="0"
          max="5"
          value={depth}
          onChange={(e) => setDepth(Math.max(0, Number(e.target.value)))}
          style={{ padding: '5px', fontSize: '14px' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input Array:</strong> {JSON.stringify(array)}
        </p>
        <p>
          <strong>Flatten Depth:</strong> {depth}
        </p>
        <p>
          <strong>Result:</strong> {JSON.stringify(result)}
        </p>
      </div>
    </div>
  );
}