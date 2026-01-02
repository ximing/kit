/**
 * Interactive example for mapKeys function
 *
 * @category object
 * @functionName mapKeys
 * @complexity medium
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { mapKeys } from '@rabjs/kit';

export default function MapKeysExample() {
  const [obj] = useState({ a: 1, b: 2, c: 3 });
  const [result1] = useState(() => mapKeys(obj, (value, key) => key + value));
  const [result2] = useState(() => mapKeys(obj, (value, key) => key.toUpperCase()));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>mapKeys Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Creates a new object with keys transformed by a function, keeping the same values.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p>
          <strong>Input Object:</strong> {JSON.stringify(obj)}
        </p>
        <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #ddd' }}>
          <p style={{ marginBottom: '10px' }}>
            <strong>Example 1: Concatenate key and value</strong>
          </p>
          <p>mapKeys(obj, (value, key) =&gt; key + value)</p>
          <p style={{ marginTop: '10px' }}>
            <strong>Result:</strong> {JSON.stringify(result1)}
          </p>
        </div>
        <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #ddd' }}>
          <p style={{ marginBottom: '10px' }}>
            <strong>Example 2: Convert keys to uppercase</strong>
          </p>
          <p>mapKeys(obj, (value, key) =&gt; key.toUpperCase())</p>
          <p style={{ marginTop: '10px' }}>
            <strong>Result:</strong> {JSON.stringify(result2)}
          </p>
        </div>
      </div>
    </div>
  );
}