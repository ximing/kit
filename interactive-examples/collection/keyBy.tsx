/**
 * Interactive example for keyBy function
 *
 * @category collection
 * @functionName keyBy
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { keyBy } from '@rabjs/kit';

export default function KeyByExample() {
  const [keyField, setKeyField] = useState('id');
  
  const users = [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' },
    { id: 3, name: 'Bob', email: 'bob@example.com' },
  ];

  const result = keyBy(users, keyField as any);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Collection KeyBy Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Key by: </label>
        <select
          value={keyField}
          onChange={(e) => setKeyField(e.target.value)}
          style={{ padding: '5px', fontSize: '14px' }}
        >
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Users:</strong>
        </p>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
          {JSON.stringify(users, null, 2)}
        </pre>
        <p>
          <strong>Keyed by {keyField}:</strong>
        </p>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto', maxHeight: '300px' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}