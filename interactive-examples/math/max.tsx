/**
 * Interactive example for max function
 *
 * @category math
 * @functionName max
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { max } from '@rabjs/kit';

export default function MaxExample() {
  const [numbers, setNumbers] = useState([5, 2, 8, 1, 9, 3]);
  const [newNumber, setNewNumber] = useState('');
  const result = max(numbers);

  const handleAddNumber = () => {
    const num = Number(newNumber);
    if (!isNaN(num) && newNumber.trim() !== '') {
      setNumbers([...numbers, num]);
      setNewNumber('');
    }
  };

  const handleRemoveNumber = (index: number) => {
    setNumbers(numbers.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setNumbers([5, 2, 8, 1, 9, 3]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Math Max Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <input
          type="number"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddNumber()}
          placeholder="Enter a number"
          style={{ padding: '5px', fontSize: '14px', marginRight: '10px' }}
        />
        <button
          onClick={handleAddNumber}
          style={{ padding: '5px 15px', fontSize: '14px', marginRight: '10px' }}
        >
          Add
        </button>
        <button
          onClick={handleReset}
          style={{ padding: '5px 15px', fontSize: '14px' }}
        >
          Reset
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Numbers:</strong>{' '}
          {numbers.map((num, index) => (
            <span key={index}>
              {num}
              <button
                onClick={() => handleRemoveNumber(index)}
                style={{
                  marginLeft: '5px',
                  marginRight: '10px',
                  padding: '2px 8px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </span>
          ))}
          {numbers.length === 0 && <span style={{ color: '#999' }}>Empty array</span>}
        </p>
        <p>
          <strong>Maximum Value:</strong>{' '}
          <span style={{ fontSize: '18px', color: '#1976d2', fontWeight: 'bold' }}>
            {result !== undefined ? result : 'undefined'}
          </span>
        </p>
      </div>
    </div>
  );
}