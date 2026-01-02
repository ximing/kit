/**
 * Interactive example for cloneDeep function
 *
 * @category object
 * @functionName cloneDeep
 * @complexity medium
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { cloneDeep } from '@rabjs/kit';

export default function CloneDeepExample() {
  const [originalObj] = useState({ a: 1, b: { c: 2, d: { e: 3 } } });
  const [clonedObj] = useState(() => cloneDeep(originalObj));
  const [modifiedNestedValue, setModifiedNestedValue] = useState(2);

  const handleModifyDeepClone = () => {
    clonedObj.b.c = modifiedNestedValue;
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>cloneDeep Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Creates a deep copy of an object. Nested objects and arrays are also cloned recursively.
      </p>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>New value for cloned.b.c: </label>
        <input
          type="number"
          value={modifiedNestedValue}
          onChange={(e) => setModifiedNestedValue(Number(e.target.value))}
          style={{ padding: '5px', width: '80px' }}
        />
        <button
          onClick={handleModifyDeepClone}
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
          Modify Deep Clone
        </button>
      </div>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p>
          <strong>Original Object:</strong> {JSON.stringify(originalObj)}
        </p>
        <p>
          <strong>Deep Cloned Object:</strong> {JSON.stringify(clonedObj)}
        </p>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Even nested properties are completely independent. Modifying clonedObj.b.c does not affect originalObj.b.c.
        </p>
      </div>
    </div>
  );
}