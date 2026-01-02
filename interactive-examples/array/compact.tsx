/**
 * Interactive example for compact function
 *
 * @category array
 * @functionName compact
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { compact } from '@rabjs/kit';

export default function CompactExample() {
  const [inputText, setInputText] = useState('0, 1, false, 2, "", 3, null, undefined, 4');
  
  const parseInput = (text: string) => {
    try {
      return eval(`[${text}]`);
    } catch {
      return [];
    }
  };

  const array = parseInput(inputText);
  const result = compact(array);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Array Compact Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Input Array (comma-separated):</label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '14px',
            fontFamily: 'monospace',
            minHeight: '60px',
          }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input:</strong> {JSON.stringify(array)}
        </p>
        <p>
          <strong>Falsy values removed:</strong> {JSON.stringify(result)}
        </p>
      </div>
    </div>
  );
}