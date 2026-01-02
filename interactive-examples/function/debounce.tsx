/**
 * Interactive example for debounce function
 *
 * @category function
 * @functionName debounce
 * @complexity complex
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { debounce } from '@rabjs/kit';

export default function DebounceExample() {
  const [count, setCount] = useState(0);
  const [callCount, setCallCount] = useState(0);
  const [lastCallTime, setLastCallTime] = useState<string | null>(null);
  const [wait, setWait] = useState(500);

  // Create a debounced function
  const debouncedFn = React.useMemo(() => {
    return debounce(
      () => {
        setCount((c) => c + 1);
        setLastCallTime(new Date().toLocaleTimeString());
      },
      wait,
      { leading: false, trailing: true }
    );
  }, [wait]);

  const handleClick = () => {
    setCallCount((c) => c + 1);
    debouncedFn();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Function Debounce Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Wait (ms): </label>
        <input
          type="number"
          min="100"
          step="100"
          value={wait}
          onChange={(e) => setWait(Number(e.target.value))}
          style={{ padding: '5px', fontSize: '14px', width: '80px' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={handleClick}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            cursor: 'pointer',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Click (Debounced)
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Total Clicks:</strong> {callCount}
        </p>
        <p>
          <strong>Executed Count:</strong> {count}
        </p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Try clicking multiple times quickly, the function will only execute once after you stop clicking for {wait}ms
        </p>
        {lastCallTime && (
          <p>
            <strong>Last Executed:</strong> {lastCallTime}
          </p>
        )}
      </div>
    </div>
  );
}