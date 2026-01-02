/**
 * Interactive example for sortBy function
 *
 * @category collection
 * @functionName sortBy
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { sortBy } from '@rabjs/kit';

export default function SortByExample() {
  const [sortField, setSortField] = useState('age');
  
  const users = [
    { name: 'John', age: 30, salary: 60000 },
    { name: 'Jane', age: 25, salary: 75000 },
    { name: 'Bob', age: 35, salary: 55000 },
    { name: 'Alice', age: 28, salary: 70000 },
  ];

  const result = sortBy(users, sortField as any);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Collection SortBy Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Sort by: </label>
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          style={{ padding: '5px', fontSize: '14px' }}
        >
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="salary">Salary</option>
        </select>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Original Users:</strong>
        </p>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
          {JSON.stringify(users, null, 2)}
        </pre>
        <p>
          <strong>Sorted by {sortField} (ascending):</strong>
        </p>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto', maxHeight: '300px' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}