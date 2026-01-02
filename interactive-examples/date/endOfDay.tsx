/**
 * Interactive example for endOfDay function
 *
 * @category date
 * @functionName endOfDay
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { endOfDay, format } from '@rabjs/kit';

export default function EndOfDayExample() {
  const baseDate = new Date('2024-01-15T14:30:45.123Z');
  const endDate = endOfDay(baseDate);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Date EndOfDay Example</h3>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Original Date:</strong> {format(baseDate, 'YYYY-MM-DD HH:mm:ss')}
        </p>
        <p>
          <strong>End of Day (23:59:59):</strong> {format(endDate, 'YYYY-MM-DD HH:mm:ss')}
        </p>
      </div>
    </div>
  );
}