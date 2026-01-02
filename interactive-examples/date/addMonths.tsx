/**
 * Interactive example for addMonths function
 *
 * @category date
 * @functionName addMonths
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { addMonths, format } from '@rabjs/kit';

export default function AddMonthsExample() {
  const [monthsToAdd, setMonthsToAdd] = useState(3);
  
  const baseDate = new Date('2024-01-15');
  const resultDate = addMonths(baseDate, monthsToAdd);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Date AddMonths Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Months to add: </label>
        <input
          type="number"
          value={monthsToAdd}
          onChange={(e) => setMonthsToAdd(Number(e.target.value))}
          style={{ padding: '5px', fontSize: '14px', width: '80px' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Base Date:</strong> {format(baseDate, 'YYYY-MM-DD')}
        </p>
        <p>
          <strong>Months to Add:</strong> {monthsToAdd}
        </p>
        <p>
          <strong>Result Date:</strong> {format(resultDate, 'YYYY-MM-DD')}
        </p>
      </div>
    </div>
  );
}