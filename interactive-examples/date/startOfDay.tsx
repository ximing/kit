/**
 * Interactive example for startOfDay function
 *
 * @category date
 * @functionName startOfDay
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { startOfDay, format } from '@rabjs/kit';

export default function StartOfDayExample() {
  const baseDate = new Date('2024-01-15T14:30:45.123Z');
  const startDate = startOfDay(baseDate);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Date StartOfDay Example</h3>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Original Date:</strong> {format(baseDate, 'YYYY-MM-DD HH:mm:ss')}
        </p>
        <p>
          <strong>Start of Day (00:00:00):</strong> {format(startDate, 'YYYY-MM-DD HH:mm:ss')}
        </p>
      </div>
    </div>
  );
}