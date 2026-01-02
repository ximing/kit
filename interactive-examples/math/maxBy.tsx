/**
 * Interactive example for maxBy function
 *
 * @category math
 * @functionName maxBy
 * @complexity medium
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { maxBy } from '@rabjs/kit';

export default function MaxByExample() {
  const [selectBy, setSelectBy] = useState('score');

  const students = [
    { name: 'Alice', age: 25, score: 85 },
    { name: 'Bob', age: 30, score: 92 },
    { name: 'Charlie', age: 22, score: 78 },
    { name: 'David', age: 28, score: 95 },
    { name: 'Eve', age: 26, score: 88 }
  ];

  const iterateeMap: Record<string, (student: typeof students[0]) => number> = {
    age: (student) => student.age,
    score: (student) => student.score
  };

  const result = maxBy(students, iterateeMap[selectBy]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Math MaxBy Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Find student with maximum: </label>
        <select
          value={selectBy}
          onChange={(e) => setSelectBy(e.target.value)}
          style={{ padding: '5px', fontSize: '14px' }}
        >
          <option value="age">Age</option>
          <option value="score">Score</option>
        </select>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Students:</strong>
        </p>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
          {JSON.stringify(students, null, 2)}
        </pre>
        <p>
          <strong>Student with maximum {selectBy}:</strong>
        </p>
        <pre style={{ backgroundColor: '#e3f2fd', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}