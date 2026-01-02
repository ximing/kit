/**
 * Interactive example for uniq function
 *
 * @category array
 * @functionName uniq
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { uniq, uniqBy } from '@rabjs/kit';

export default function UniqExample() {
  const [inputText, setInputText] = useState('1, 2, 2, 3, 3, 3, 4, 4, 5');
  const [useUniqBy, setUseUniqBy] = useState(false);

  const parseInput = (text: string) => {
    try {
      return text.split(',').map((s) => Number(s.trim())).filter((n) => !isNaN(n));
    } catch {
      return [];
    }
  };

  const array = parseInput(inputText);
  const result = useUniqBy ? uniqBy(array, (item) => item % 2) : uniq(array);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Array Uniq Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Input Array (comma-separated):</label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ width: '100%', padding: '8px', fontSize: '14px' }}
          placeholder="e.g., 1, 2, 2, 3, 3, 3"
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>
          <input
            type="checkbox"
            checked={useUniqBy}
            onChange={(e) => setUseUniqBy(e.target.checked)}
          />
          Use uniqBy (by odd/even)
        </label>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input:</strong> {JSON.stringify(array)}
        </p>
        <p>
          <strong>Unique values:</strong> {JSON.stringify(result)}
        </p>
      </div>
    </div>
  );
}