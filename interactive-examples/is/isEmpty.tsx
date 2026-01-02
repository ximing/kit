/**
 * Interactive example for isEmpty function
 *
 * @category is
 * @functionName isEmpty
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { isEmpty } from '@rabjs/kit';

export default function IsEmptyExample() {
  const [testValues] = useState([
    { value: null, label: 'null' },
    { value: undefined, label: 'undefined' },
    { value: '', label: "'' (empty string)" },
    { value: [], label: '[] (empty array)' },
    { value: {}, label: '{} (empty object)' },
    { value: NaN, label: 'NaN' },
    { value: 0, label: '0' },
    { value: false, label: 'false' },
    { value: [0], label: '[0]' },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>isEmpty Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Checks if a value is empty (null, undefined, empty string/array/object, or NaN).
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        {testValues.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <code style={{ fontSize: '12px' }}>{item.label}</code>
              <span
                style={{
                  padding: '4px 8px',
                  backgroundColor: isEmpty(item.value) ? '#4CAF50' : '#f44336',
                  color: 'white',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {isEmpty(item.value) ? 'true' : 'false'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}