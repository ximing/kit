/**
 * Interactive example for mergeDeep function
 *
 * @category object
 * @functionName mergeDeep
 * @complexity medium
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { mergeDeep } from '@rabjs/kit';

export default function MergeDeepExample() {
  const [obj1] = useState({ a: 1, b: { c: 2, d: 3 } });
  const [obj2] = useState({ b: { d: 4, e: 5 }, f: 6 });
  const [result] = useState(() => mergeDeep({ ...obj1 }, obj2));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>mergeDeep Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Recursively merges source objects into a target object (deep merge). Nested objects are merged recursively.
      </p>
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
        <p>
          <strong>Object 1:</strong> {JSON.stringify(obj1)}
        </p>
        <p>
          <strong>Object 2:</strong> {JSON.stringify(obj2)}
        </p>
        <p style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #ddd' }}>
          <strong>Deep Merged Result:</strong> {JSON.stringify(result)}
        </p>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Note: Unlike shallow merge, nested objects are merged recursively. The property 'c' from obj1.b is preserved,
          while 'd' is updated and 'e' is added.
        </p>
      </div>
    </div>
  );
}