/**
 * Interactive example for format function
 *
 * @category date
 * @functionName format
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { format } from '@rabjs/kit';

export default function FormatExample() {
  const [formatStr, setFormatStr] = useState('YYYY-MM-DD HH:mm:ss');
  
  const date = new Date('2024-01-15T14:30:45.123Z');

  const formatOptions = [
    'YYYY-MM-DD',
    'YYYY-MM-DD HH:mm:ss',
    'YYYY/MM/DD',
    'DD-MM-YYYY',
    'MM/DD/YYYY HH:mm',
    'DD.MM.YYYY',
  ];

  const result = format(date, formatStr);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Date Format Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Format String: </label>
        <select
          value={formatStr}
          onChange={(e) => setFormatStr(e.target.value)}
          style={{ padding: '5px', fontSize: '14px', width: '100%' }}
        >
          {formatOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Date:</strong> {date.toISOString()}
        </p>
        <p>
          <strong>Format String:</strong> {formatStr}
        </p>
        <p>
          <strong>Result:</strong> {result}
        </p>
      </div>
    </div>
  );
}