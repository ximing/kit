/**
 * Interactive example for addYears function
 *
 * @category date
 * @functionName addYears
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { addYears, format } from '@rabjs/kit';

export default function AddYearsExample() {
  const [yearsToAdd, setYearsToAdd] = useState(1);
  
  const baseDate = new Date('2024-01-15');
  const resultDate = addYears(baseDate, yearsToAdd);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Date AddYears Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Years to add: </label>
        <input
          type="number"
          value={yearsToAdd}
          onChange={(e) => setYearsToAdd(Number(e.target.value))}
          style={{ padding: '5px', fontSize: '14px', width: '80px' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Base Date:</strong> {format(baseDate, 'YYYY-MM-DD')}
        </p>
        <p>
          <strong>Years to Add:</strong> {yearsToAdd}
        </p>
        <p>
          <strong>Result Date:</strong> {format(resultDate, 'YYYY-MM-DD')}
        </p>
      </div>
    </div>
  );
}