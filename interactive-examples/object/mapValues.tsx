/**
 * Interactive example for mapValues function
 *
 * @category object
 * @functionName mapValues
 * @complexity medium
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { mapValues } from '@rabjs/kit';

export default function MapValuesExample() {
  const [obj] = useState({ a: 1, b: 2, c: 3 });
  const [result1] = useState(() => mapValues(obj, (value) => value * 2));
  const [result2] = useState(() => mapValues(obj, (value) => value ** 2));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>mapValues Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Creates a new object with values transformed by a function, keeping the same keys.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p>
          <strong>Input Object:</strong> {JSON.stringify(obj)}
        </p>
        <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #ddd' }}>
          <p style={{ marginBottom: '10px' }}>
            <strong>Example 1: Double all values</strong>
          </p>
          <p>mapValues(obj, (value) =&gt; value * 2)</p>
          <p style={{ marginTop: '10px' }}>
            <strong>Result:</strong> {JSON.stringify(result1)}
          </p>
        </div>
        <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #ddd' }}>
          <p style={{ marginBottom: '10px' }}>
            <strong>Example 2: Square all values</strong>
          </p>
          <p>mapValues(obj, (value) =&gt; value ** 2)</p>
          <p style={{ marginTop: '10px' }}>
            <strong>Result:</strong> {JSON.stringify(result2)}
          </p>
        </div>
      </div>
    </div>
  );
}