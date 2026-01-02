/**
 * Interactive example for filter function
 *
 * @category promise
 * @functionName filter
 * @complexity medium
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { filter, delay } from '@rabjs/kit';

export default function FilterExample() {
  const [concurrency, setConcurrency] = useState(2);
  const [result, setResult] = useState<number[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<string[]>([]);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);
    setProgress([]);
    const startTime = Date.now();

    const filtered = await filter(
      numbers,
      async (num) => {
        const msg = `Checking ${num}...`;
        setProgress((prev) => [...prev, msg]);
        
        // Simulate async operation
        await delay(300);
        
        const isEven = num % 2 === 0;
        const resultMsg = `${num} is ${isEven ? 'even ✓' : 'odd ✗'}`;
        setProgress((prev) => [...prev, resultMsg]);
        
        return isEven;
      },
      concurrency
    );

    const elapsed = Date.now() - startTime;
    setResult(filtered);
    setProgress((prev) => [...prev, `\nCompleted in ${elapsed}ms`]);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Promise Filter Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Concurrency: </label>
          <input
            type="number"
            min="1"
            max="8"
            value={concurrency}
            onChange={(e) => setConcurrency(Number(e.target.value))}
            disabled={loading}
            style={{ padding: '5px', fontSize: '14px', width: '60px' }}
          />
          <span style={{ marginLeft: '10px', fontSize: '14px', color: '#666' }}>
            (max {concurrency} at a time)
          </span>
        </div>
        <button
          onClick={handleExecute}
          disabled={loading}
          style={{
            padding: '8px 20px',
            fontSize: '14px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Filtering...' : 'Filter Even Numbers'}
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input:</strong> {JSON.stringify(numbers)}
        </p>
        {progress.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            <strong>Progress:</strong>
            <pre style={{
              backgroundColor: '#f5f5f5',
              padding: '10px',
              borderRadius: '4px',
              fontSize: '12px',
              maxHeight: '200px',
              overflow: 'auto'
            }}>
              {progress.join('\n')}
            </pre>
          </div>
        )}
        {result && (
          <p style={{ marginTop: '10px' }}>
            <strong>Result:</strong>{' '}
            <span style={{ color: '#1976d2', fontWeight: 'bold' }}>
              {JSON.stringify(result)}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}