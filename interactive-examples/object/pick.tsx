/**
 * Interactive example for pick function
 *
 * @category object
 * @functionName pick
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { pick } from '@rabjs/kit';

export default function PickExample() {
  const [obj] = useState({ a: 1, b: 2, c: 3, d: 4 });
  const [keysToPick, setKeysToPick] = useState('a,c');
  const [result, setResult] = useState(() => pick(obj, ['a', 'c']));

  const handlePick = () => {
    const keys = keysToPick.split(',').map((k) => k.trim());
    setResult(pick(obj, keys));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>pick Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Creates a new object with only the specified properties.
      </p>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Keys to pick (comma-separated): </label>
        <input
          type="text"
          value={keysToPick}
          onChange={(e) => setKeysToPick(e.target.value)}
          style={{ padding: '5px', width: '150px' }}
          placeholder="e.g., a,c"
        />
        <button
          onClick={handlePick}
          style={{
            marginLeft: '10px',
            padding: '5px 10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
          }}
        >
          Pick Keys
        </button>
      </div>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p>
          <strong>Original Object:</strong> {JSON.stringify(obj)}
        </p>
        <p>
          <strong>Keys to Pick:</strong> {keysToPick}
        </p>
        <p>
          <strong>Result:</strong> {JSON.stringify(result)}
        </p>
      </div>
    </div>
  );
}