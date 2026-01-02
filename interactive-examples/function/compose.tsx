/**
 * Interactive example for compose function
 *
 * @category function
 * @functionName compose
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { compose } from '@rabjs/kit';

export default function ComposeExample() {
  const [input, setInput] = useState(5);

  // Create simple functions
  const add = (x: number) => x + 1;
  const multiply = (x: number) => x * 2;
  const square = (x: number) => x * x;

  // Compose functions (right to left: square, multiply, add)
  const composed = compose(square, multiply, add);
  const result = composed(input);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Function Compose Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Input: </label>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(Number(e.target.value))}
          style={{ padding: '5px', fontSize: '14px' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input:</strong> {input}
        </p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Execution order (right to left): add(x) → multiply(x) → square(x)
        </p>
        <p>
          <strong>Step 1 (add):</strong> {input} + 1 = {input + 1}
        </p>
        <p>
          <strong>Step 2 (multiply):</strong> {input + 1} * 2 = {(input + 1) * 2}
        </p>
        <p>
          <strong>Step 3 (square):</strong> {(input + 1) * 2}² = {((input + 1) * 2) * ((input + 1) * 2)}
        </p>
        <p>
          <strong>Result:</strong> {result}
        </p>
      </div>
    </div>
  );
}