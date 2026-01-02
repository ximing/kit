/**
 * Interactive example for random function
 *
 * @category number
 * @functionName random
 * @complexity medium
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { random } from '@rabjs/kit';

export default function RandomExample() {
  const [lower, setLower] = useState(5);
  const [upper, setUpper] = useState(10);
  const [floating, setFloating] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const generateRandom = () => {
    const value = random(lower, upper, floating);
    setResult(value);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Random Number Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Lower Bound: </label>
          <input
            type="number"
            value={lower}
            onChange={(e) => setLower(Number(e.target.value))}
            style={{ padding: '5px', fontSize: '14px', width: '100px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Upper Bound: </label>
          <input
            type="number"
            value={upper}
            onChange={(e) => setUpper(Number(e.target.value))}
            style={{ padding: '5px', fontSize: '14px', width: '100px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={floating}
              onChange={(e) => setFloating(e.target.checked)}
            />
            {' '}Floating-point number
          </label>
        </div>
        <button
          onClick={generateRandom}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Generate Random Number
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input:</strong> random({lower}, {upper}, {String(floating)})
        </p>
        {result !== null && (
          <p>
            <strong>Result:</strong>{' '}
            <span style={{ fontSize: '18px', color: '#28a745' }}>{result}</span>
          </p>
        )}
      </div>
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <p><strong>Examples:</strong></p>
        <ul>
          <li>random(5) → random integer between 0 and 5</li>
          <li>random(5, 10) → random integer between 5 and 10</li>
          <li>random(5, 10, true) → random float between 5 and 10</li>
        </ul>
      </div>
    </div>
  );
}