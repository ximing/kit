/**
 * Interactive example for diffDays function
 *
 * @category date
 * @functionName diffDays
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { diffDays, format } from '@rabjs/kit';

export default function DiffDaysExample() {
  const [daysDiff, setDaysDiff] = useState(5);
  
  const date1 = new Date('2024-01-20');
  const date2 = new Date('2024-01-15');
  const result = diffDays(date1, date2);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Date DiffDays Example</h3>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Date 1:</strong> {format(date1, 'YYYY-MM-DD')}
        </p>
        <p>
          <strong>Date 2:</strong> {format(date2, 'YYYY-MM-DD')}
        </p>
        <p>
          <strong>Days Difference (Date1 - Date2):</strong> {result} days
        </p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          (Positive means Date 1 is later than Date 2)
        </p>
      </div>
    </div>
  );
}