/**
 * Interactive example for entries function
 *
 * @category object
 * @functionName entries
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { entries } from '@rabjs/kit';

export default function EntriesExample() {
  const [obj] = useState({ a: 1, b: 2, c: 3 });
  const [result] = useState(() => entries(obj));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>entries Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Creates an array of key-value pairs from an object.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p>
          <strong>Input Object:</strong> {JSON.stringify(obj)}
        </p>
        <p>
          <strong>Output (entries):</strong>
        </p>
        <div style={{ marginLeft: '20px', backgroundColor: 'white', padding: '10px', borderRadius: '3px' }}>
          {result.map((entry, index) => (
            <div key={index} style={{ marginBottom: '5px', fontSize: '14px' }}>
              [{JSON.stringify(entry[0])}, {JSON.stringify(entry[1])}]
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}