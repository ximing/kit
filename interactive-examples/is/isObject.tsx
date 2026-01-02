/**
 * Interactive example for isObject function
 *
 * @category is
 * @functionName isObject
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { isObject } from '@rabjs/kit';

export default function IsObjectExample() {
  const [testValues] = useState([
    { value: {}, label: '{}' },
    { value: [1, 2, 3], label: '[1, 2, 3]' },
    { value: () => {}, label: '() => {}' },
    { value: null, label: 'null' },
    { value: undefined, label: 'undefined' },
    { value: 'abc', label: "'abc'" },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>isObject Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Checks if a value is the language type of Object (arrays, functions, objects, etc.).
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        {testValues.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <code style={{ fontSize: '12px' }}>{item.label}</code>
              <span
                style={{
                  padding: '4px 8px',
                  backgroundColor: isObject(item.value) ? '#4CAF50' : '#f44336',
                  color: 'white',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {isObject(item.value) ? 'true' : 'false'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}