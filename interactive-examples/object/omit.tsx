/**
 * Interactive example for omit function
 *
 * @category object
 * @functionName omit
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { omit } from '@rabjs/kit';

export default function OmitExample() {
  const [obj] = useState({ a: 1, b: 2, c: 3, d: 4 });
  const [keysToOmit, setKeysToOmit] = useState('a,c');
  const [result, setResult] = useState(() => omit(obj, ['a', 'c']));

  const handleOmit = () => {
    const keys = keysToOmit.split(',').map((k) => k.trim());
    setResult(omit(obj, keys));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>omit Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Creates a new object with specified properties removed.
      </p>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Keys to omit (comma-separated): </label>
        <input
          type="text"
          value={keysToOmit}
          onChange={(e) => setKeysToOmit(e.target.value)}
          style={{ padding: '5px', width: '150px' }}
          placeholder="e.g., a,c"
        />
        <button
          onClick={handleOmit}
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
          Omit Keys
        </button>
      </div>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p>
          <strong>Original Object:</strong> {JSON.stringify(obj)}
        </p>
        <p>
          <strong>Keys to Omit:</strong> {keysToOmit}
        </p>
        <p>
          <strong>Result:</strong> {JSON.stringify(result)}
        </p>
      </div>
    </div>
  );
}