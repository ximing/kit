/**
 * Interactive example for invert function
 *
 * @category object
 * @functionName invert
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { invert } from '@rabjs/kit';

export default function InvertExample() {
  const [obj] = useState({ a: 1, b: 2, c: 1 });
  const [result] = useState(() => invert(obj));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>invert Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Creates an object with keys and values swapped. Keys become values and values become keys.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p>
          <strong>Input Object:</strong> {JSON.stringify(obj)}
        </p>
        <p>
          <strong>Inverted Object:</strong> {JSON.stringify(result)}
        </p>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Note: When multiple keys have the same value, the last one wins (e.g., both 'a' and 'c' have value 1, so '1' maps to 'c').
        </p>
      </div>
    </div>
  );
}