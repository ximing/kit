/**
 * Interactive example for intersection function
 *
 * @category array
 * @functionName intersection
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { intersection } from '@rabjs/kit';

export default function IntersectionExample() {
  const [array1, setArray1] = useState('1, 2, 3, 4');
  const [array2, setArray2] = useState('2, 3, 4, 5');

  const parseInput = (text: string) => {
    try {
      return text.split(',').map((s) => Number(s.trim())).filter((n) => !isNaN(n));
    } catch {
      return [];
    }
  };

  const arr1 = parseInput(array1);
  const arr2 = parseInput(array2);
  const result = intersection(arr1, arr2);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Array Intersection Example</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Array 1:</label>
          <input
            type="text"
            value={array1}
            onChange={(e) => setArray1(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '14px' }}
            placeholder="e.g., 1, 2, 3, 4"
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Array 2:</label>
          <input
            type="text"
            value={array2}
            onChange={(e) => setArray2(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '14px' }}
            placeholder="e.g., 2, 3, 4, 5"
          />
        </div>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Array 1:</strong> {JSON.stringify(arr1)}
        </p>
        <p>
          <strong>Array 2:</strong> {JSON.stringify(arr2)}
        </p>
        <p>
          <strong>Common elements:</strong> {JSON.stringify(result)}
        </p>
      </div>
    </div>
  );
}