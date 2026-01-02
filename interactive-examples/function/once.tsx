/**
 * Interactive example for once function
 *
 * @category function
 * @functionName once
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { once } from '@rabjs/kit';

export default function OnceExample() {
  const [count, setCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  // Create a function that increments count
  const increment = React.useMemo(() => {
    return once(() => {
      setCount((c) => c + 1);
    });
  }, []);

  const handleClick = () => {
    setClickCount((c) => c + 1);
    increment();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Function Once Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={handleClick}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            cursor: 'pointer',
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Click Me
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Total Clicks:</strong> {clickCount}
        </p>
        <p>
          <strong>Function Executed Count:</strong> {count}
        </p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          No matter how many times you click, the function will only execute once. All subsequent calls return the cached result.
        </p>
      </div>
    </div>
  );
}