/**
 * Interactive example for map function
 *
 * @category promise
 * @functionName map
 * @complexity medium
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { map, delay } from '@rabjs/kit';

export default function MapExample() {
  const [concurrency, setConcurrency] = useState(2);
  const [result, setResult] = useState<number[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<string[]>([]);

  const numbers = [1, 2, 3, 4, 5];

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);
    setProgress([]);
    const startTime = Date.now();

    const mapped = await map(
      numbers,
      async (num) => {
        const msg = `Processing ${num}...`;
        setProgress((prev) => [...prev, msg]);
        
        // Simulate async operation
        await delay(400);
        
        const doubled = num * 2;
        const resultMsg = `${num} → ${doubled} ✓`;
        setProgress((prev) => [...prev, resultMsg]);
        
        return doubled;
      },
      concurrency
    );

    const elapsed = Date.now() - startTime;
    setResult(mapped);
    setProgress((prev) => [...prev, `\nCompleted in ${elapsed}ms`]);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Promise Map Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Concurrency: </label>
          <input
            type="number"
            min="1"
            max="5"
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
          {loading ? 'Mapping...' : 'Double All Numbers'}
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