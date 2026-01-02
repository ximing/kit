/**
 * Interactive example for meanBy function
 *
 * @category math
 * @functionName meanBy
 * @complexity medium
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { meanBy } from '@rabjs/kit';

export default function MeanByExample() {
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

  const result = meanBy(students, iterateeMap[selectBy]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Math MeanBy Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Calculate average: </label>
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
          <strong>Average {selectBy}:</strong>{' '}
          <span style={{ fontSize: '18px', color: '#1976d2', fontWeight: 'bold' }}>
            {result.toFixed(2)}
          </span>
        </p>
        <p style={{ fontSize: '14px', color: '#666' }}>
          <em>
            {selectBy === 'age' 
              ? `Sum of ages: ${students.reduce((sum, s) => sum + s.age, 0)} ÷ ${students.length} students`
              : `Sum of scores: ${students.reduce((sum, s) => sum + s.score, 0)} ÷ ${students.length} students`}
          </em>
        </p>
      </div>
    </div>
  );
}