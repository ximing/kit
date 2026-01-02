/**
 * Interactive example for parallel function
 *
 * @category promise
 * @functionName parallel
 * @complexity medium
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { parallel, delay } from '@rabjs/kit';

export default function ParallelExample() {
  const [concurrency, setConcurrency] = useState(2);
  const [result, setResult] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<string[]>([]);

  const tasks = [
    { name: 'Task A', duration: 1000 },
    { name: 'Task B', duration: 800 },
    { name: 'Task C', duration: 1200 },
    { name: 'Task D', duration: 600 },
  ];

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);
    setProgress([]);
    const startTime = Date.now();

    const results = await parallel(
      tasks.map((task) => async () => {
        const msg = `Started: ${task.name} (${task.duration}ms)`;
        setProgress((prev) => [...prev, msg]);
        
        await delay(task.duration);
        
        const resultMsg = `Completed: ${task.name}`;
        setProgress((prev) => [...prev, resultMsg]);
        
        return `${task.name} result`;
      }),
      concurrency
    );

    const elapsed = Date.now() - startTime;
    setResult(results);
    setProgress((prev) => [...prev, `\nTotal time: ${elapsed}ms`]);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Promise Parallel Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Concurrency: </label>
          <input
            type="number"
            min="1"
            max="4"
            value={concurrency}
            onChange={(e) => setConcurrency(Number(e.target.value))}
            disabled={loading}
            style={{ padding: '5px', fontSize: '14px', width: '60px' }}
          />
          <span style={{ marginLeft: '10px', fontSize: '14px', color: '#666' }}>
            (max {concurrency} at a time)
          </span>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Tasks:</strong>
          <ul style={{ margin: '5px 0', paddingLeft: '20px', fontSize: '14px' }}>
            {tasks.map((task, index) => (
              <li key={index}>
                {task.name}: {task.duration}ms
              </li>
            ))}
          </ul>
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
          {loading ? 'Executing...' : 'Execute Parallel Tasks'}
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
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
          <div style={{ marginTop: '10px' }}>
            <p>
              <strong>Results:</strong>
            </p>
            <pre style={{ backgroundColor: '#e3f2fd', padding: '10px', borderRadius: '4px' }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}