/**
 * Interactive example for has function
 *
 * @category object
 * @functionName has
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { has } from '@rabjs/kit';

export default function HasExample() {
  const [obj] = useState({ a: { b: { c: 3 } }, x: 10 });
  const [testPaths] = useState([
    { path: 'a.b.c', label: 'a.b.c' },
    { path: 'a.b', label: 'a.b' },
    { path: 'x', label: 'x' },
    { path: 'a.b.d', label: 'a.b.d' },
    { path: 'y', label: 'y' },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>has Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Checks if a path exists in an object.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p style={{ marginBottom: '15px' }}>
          <strong>Object:</strong> {JSON.stringify(obj)}
        </p>
        <div>
          {testPaths.map((item, index) => (
            <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '3px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <code style={{ fontSize: '12px' }}>has(obj, '{item.label}')</code>
                <span
                  style={{
                    padding: '4px 8px',
                    backgroundColor: has(obj, item.path) ? '#4CAF50' : '#f44336',
                    color: 'white',
                    borderRadius: '3px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {has(obj, item.path) ? 'true' : 'false'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}