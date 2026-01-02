/**
 * Interactive example for addDays function
 *
 * @category date
 * @functionName addDays
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { addDays, format } from '@rabjs/kit';

export default function AddDaysExample() {
  const [daysToAdd, setDaysToAdd] = useState(5);
  
  const baseDate = new Date('2024-01-15');
  const resultDate = addDays(baseDate, daysToAdd);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Date AddDays Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Days to add: </label>
        <input
          type="number"
          value={daysToAdd}
          onChange={(e) => setDaysToAdd(Number(e.target.value))}
          style={{ padding: '5px', fontSize: '14px', width: '80px' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Base Date:</strong> {format(baseDate, 'YYYY-MM-DD')}
        </p>
        <p>
          <strong>Days to Add:</strong> {daysToAdd}
        </p>
        <p>
          <strong>Result Date:</strong> {format(resultDate, 'YYYY-MM-DD')}
        </p>
      </div>
    </div>
  );
}