/**
 * Interactive example for partial function
 *
 * @category function
 * @functionName partial
 * @complexity simple
 * @generatedBy AI
 * @reviewedBy Human
 * @lastReviewedAt 2026-01-03
 */

import React, { useState } from 'react';
import { partial } from '@rabjs/kit';

export default function PartialExample() {
  const [greeting, setGreeting] = useState('Hello');
  const [name, setName] = useState('Alice');

  // Define a function that takes multiple arguments
  const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;

  // Create a partial function with greeting pre-filled
  const sayHelloTo = partial(greet, greeting);

  // Test with different names
  const result1 = sayHelloTo(name);
  const result2 = sayHelloTo('Bob');
  const result3 = sayHelloTo('Charlie');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Function Partial Example</h3>
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        <div>
          <label style={{ marginRight: '5px' }}>Greeting: </label>
          <input
            type="text"
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
            style={{ padding: '5px', fontSize: '14px' }}
          />
        </div>
        <div>
          <label style={{ marginRight: '5px' }}>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '5px', fontSize: '14px' }}
          />
        </div>
      </div>
      <div style={{ marginTop: '15px' }}>
        <p>
          <strong>Original Function:</strong> greet(greeting, name)
        </p>
        <p>
          <strong>Partial Function:</strong> sayHelloTo = partial(greet, '{greeting}')
        </p>
        <p>
          <strong>sayHelloTo('{name}'):</strong> {result1}
        </p>
        <p>
          <strong>sayHelloTo('Bob'):</strong> {result2}
        </p>
        <p>
          <strong>sayHelloTo('Charlie'):</strong> {result3}
        </p>
      </div>
    </div>
  );
}