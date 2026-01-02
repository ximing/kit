/**
 * Interactive example for memoize function
 *
 * @category function
 * @functionName memoize
 * @complexity medium
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { memoize } from '@rabjs/kit';

export default function MemoizeExample() {
  const [n, setN] = useState(5);
  const [callCount, setCallCount] = useState(0);

  // Create a fibonacci function with call counter
  const fibonacci = React.useMemo(() => {
    let internalCallCount = 0;

    const fib = memoize((num: number): number => {
      internalCallCount++;
      if (num <= 1) return num;
      return fib(num - 1) + fib(num - 2);
    });

    // Store the call count getter on the function
    (fib as any).getCallCount = () => internalCallCount;

    return fib;
  }, []);

  const handleCalculate = () => {
    const result = fibonacci(n);
    setCallCount((fibonacci as any).getCallCount());
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Function Memoize Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Fibonacci N: </label>
        <input
          type="number"
          min="0"
          max="20"
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          style={{ padding: '5px', fontSize: '14px', width: '80px' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={handleCalculate}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            cursor: 'pointer',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Calculate
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input (N):</strong> {n}
        </p>
        <p>
          <strong>Fibonacci({n}):</strong> {fibonacci(n)}
        </p>
        <p>
          <strong>Function Call Count:</strong> {callCount}
        </p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Try calling with the same number again - the cached result will be returned instantly without recalculating.
        </p>
      </div>
    </div>
  );
}