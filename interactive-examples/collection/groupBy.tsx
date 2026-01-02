/**
 * Interactive example for groupBy function
 *
 * @category collection
 * @functionName groupBy
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { groupBy } from '@rabjs/kit';

export default function GroupByExample() {
  const [groupBy, setGroupBy] = useState('age');
  
  const users = [
    { name: 'John', age: 30, dept: 'Engineering' },
    { name: 'Jane', age: 30, dept: 'Marketing' },
    { name: 'Bob', age: 25, dept: 'Engineering' },
    { name: 'Alice', age: 25, dept: 'Marketing' },
  ];

  const result = groupBy(users, groupBy as any);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Collection GroupBy Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Group by: </label>
        <select
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          style={{ padding: '5px', fontSize: '14px' }}
        >
          <option value="age">Age</option>
          <option value="dept">Department</option>
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
          <strong>Grouped by {groupBy}:</strong>
        </p>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto', maxHeight: '300px' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}