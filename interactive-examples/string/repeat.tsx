/**
 * Interactive example for repeat function
 *
 * @category string
 * @functionName repeat
 * @complexity simple
 * @generatedBy AI
 * @lastReviewedAt 2024-01-03
 */

import React, { useState } from 'react';
import { repeat } from '@rabjs/kit';

export default function RepeatExample() {
  const [input, setInput] = useState('*');
  const [count, setCount] = useState(3);
  const result = repeat(input, count);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          String to Repeat:
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
            boxSizing: 'border-box',
          }}
          placeholder="Enter string"
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Repeat Count: {count}
        </label>
        <input
          type="range"
          min="0"
          max="10"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div>
        <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>Output:</p>
        <div
          style={{
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '14px',
            wordBreak: 'break-all',
            minHeight: '40px',
          }}
        >
          {result}
        </div>
      </div>
    </div>
  );
}