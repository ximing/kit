/**
 * Interactive example for bind function
 *
 * @category function
 * @functionName bind
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { bind } from '@rabjs/kit';

export default function BindExample() {
  const [greeting, setGreeting] = useState('Hello');

  // Create an object with a method
  const obj = {
    name: 'Alice',
    greet: function (greeting: string) {
      return `${greeting}, ${this.name}!`;
    },
  };

  // Bind the method to the object with a partial argument
  const boundGreet = bind(obj.greet, obj, greeting);
  const result = boundGreet();

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Function Bind Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Greeting: </label>
        <input
          type="text"
          value={greeting}
          onChange={(e) => setGreeting(e.target.value)}
          style={{ padding: '5px', fontSize: '14px' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Object Name:</strong> {obj.name}
        </p>
        <p>
          <strong>Greeting:</strong> {greeting}
        </p>
        <p>
          <strong>Result:</strong> {result}
        </p>
      </div>
    </div>
  );
}