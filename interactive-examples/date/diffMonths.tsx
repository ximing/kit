/**
 * Interactive example for diffMonths function
 *
 * @category date
 * @functionName diffMonths
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { diffMonths, format } from '@rabjs/kit';

export default function DiffMonthsExample() {
  const date1 = new Date('2024-04-15');
  const date2 = new Date('2024-01-15');
  const result = diffMonths(date1, date2);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Date DiffMonths Example</h3>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Date 1:</strong> {format(date1, 'YYYY-MM-DD')}
        </p>
        <p>
          <strong>Date 2:</strong> {format(date2, 'YYYY-MM-DD')}
        </p>
        <p>
          <strong>Months Difference (Date1 - Date2):</strong> {result} months
        </p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          (Positive means Date 1 is later than Date 2)
        </p>
      </div>
    </div>
  );
}