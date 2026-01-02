/**
 * Interactive example for parse function
 *
 * @category date
 * @functionName parse
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { parse, format } from '@rabjs/kit';

export default function ParseExample() {
  const [dateStr, setDateStr] = useState('2024-01-15 14:30:45');
  const [formatStr, setFormatStr] = useState('YYYY-MM-DD HH:mm:ss');
  
  const parsedDate = parse(dateStr, formatStr);
  const isValid = parsedDate !== null && !isNaN(parsedDate.getTime());

  const formatOptions = [
    'YYYY-MM-DD HH:mm:ss',
    'YYYY-MM-DD',
    'YYYY/MM/DD',
    'DD-MM-YYYY',
    'MM/DD/YYYY HH:mm',
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Date Parse Example</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Date String: </label>
          <input
            type="text"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            style={{ width: '100%', padding: '5px', fontSize: '14px' }}
            placeholder="e.g., 2024-01-15 14:30:45"
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Format String: </label>
          <select
            value={formatStr}
            onChange={(e) => setFormatStr(e.target.value)}
            style={{ width: '100%', padding: '5px', fontSize: '14px' }}
          >
            {formatOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Input String:</strong> {dateStr}
        </p>
        <p>
          <strong>Format:</strong> {formatStr}
        </p>
        <p>
          <strong>Status:</strong> {isValid ? '✅ Valid' : '❌ Invalid'}
        </p>
        {isValid && (
          <p>
            <strong>Parsed Date:</strong> {format(parsedDate!, 'YYYY-MM-DD HH:mm:ss')}
          </p>
        )}
      </div>
    </div>
  );
}