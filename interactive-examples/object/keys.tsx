/**
 * Interactive example for keys function
 *
 * @category object
 * @functionName keys
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { keys } from '@rabjs/kit';

export default function KeysExample() {
  const [obj] = useState({ a: 1, b: 2, c: 3 });
  const [result] = useState(() => keys(obj));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>keys Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Creates an array of all enumerable property names in an object.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p>
          <strong>Input Object:</strong> {JSON.stringify(obj)}
        </p>
        <p>
          <strong>Keys:</strong> {JSON.stringify(result)}
        </p>
        <div style={{ marginTop: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '3px' }}>
          {result.map((key, index) => (
            <div key={index} style={{ marginBottom: '5px', fontSize: '14px' }}>
              [{index}] {JSON.stringify(key)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}