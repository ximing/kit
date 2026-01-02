/**
 * Interactive example for mean function
 *
 * @category number
 * @functionName mean
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { mean } from '@rabjs/kit';

export default function MeanExample() {
  const [input, setInput] = useState('1, 2, 3, 4');
  
  const numbers = input
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s !== '')
    .map(Number)
    .filter((n) => !isNaN(n));
  
  const result = mean(numbers);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Mean (Average) Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px', display: 'block', marginBottom: '5px' }}>
          Enter numbers (comma-separated):
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., 1, 2, 3, 4"
          style={{ padding: '5px', fontSize: '14px', width: '300px' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input Array:</strong> {JSON.stringify(numbers)}
        </p>
        <p>
          <strong>Mean (Average):</strong> {result}
        </p>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Sum: {numbers.reduce((a, b) => a + b, 0)} ÷ Count: {numbers.length} = {result}
        </p>
      </div>
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <p><strong>Examples:</strong></p>
        <ul>
          <li>mean([1, 2, 3, 4]) → 2.5</li>
          <li>mean([]) → 0</li>
          <li>mean([5]) → 5</li>
        </ul>
      </div>
    </div>
  );
}