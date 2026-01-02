/**
 * Interactive example for chunk function
 *
 * @category array
 * @functionName chunk
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { chunk } from '@rabjs/kit';

export default function ChunkExample() {
  const [size, setSize] = useState(2);
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const result = chunk(array, size);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Array Chunk Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Chunk Size: </label>
        <input
          type="number"
          min="1"
          max="9"
          value={size}
          onChange={(e) => setSize(Math.max(1, Number(e.target.value)))}
          style={{ padding: '5px', fontSize: '14px' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input Array:</strong> {JSON.stringify(array)}
        </p>
        <p>
          <strong>Chunk Size:</strong> {size}
        </p>
        <p>
          <strong>Result:</strong> {JSON.stringify(result)}
        </p>
      </div>
    </div>
  );
}