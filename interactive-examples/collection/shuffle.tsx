/**
 * Interactive example for shuffle function
 *
 * @category collection
 * @functionName shuffle
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { shuffle } from '@rabjs/kit';

export default function ShuffleExample() {
  const [shuffled, setShuffled] = useState<number[]>([]);
  
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleShuffle = () => {
    const shuffledItems = shuffle(items);
    setShuffled(shuffledItems);
  };

  const handleClear = () => {
    setShuffled([]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Collection Shuffle Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <p>
          <strong>Original Items:</strong> {JSON.stringify(items)}
        </p>
      </div>
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        <button
          onClick={handleShuffle}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Shuffle
        </button>
        <button
          onClick={handleClear}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Clear
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Shuffled Items:</strong>
        </p>
        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#2196F3' }}>
          {shuffled.length > 0 ? shuffled.join(', ') : 'Click "Shuffle" to shuffle items'}
        </p>
      </div>
    </div>
  );
}