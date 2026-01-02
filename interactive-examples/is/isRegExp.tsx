/**
 * Interactive example for isRegExp function
 *
 * @category is
 * @functionName isRegExp
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { isRegExp } from '@rabjs/kit';

export default function IsRegExpExample() {
  const [testValues] = useState([
    { value: /abc/, label: '/abc/' },
    { value: new RegExp('abc'), label: "new RegExp('abc')" },
    { value: '/abc/', label: "'/abc/'" },
    { value: {}, label: '{}' },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>isRegExp Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Checks if a value is a RegExp object.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        {testValues.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <code style={{ fontSize: '12px' }}>{item.label}</code>
              <span
                style={{
                  padding: '4px 8px',
                  backgroundColor: isRegExp(item.value) ? '#4CAF50' : '#f44336',
                  color: 'white',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {isRegExp(item.value) ? 'true' : 'false'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}