/**
 * Interactive example for template function
 *
 * @category string
 * @functionName template
 * @complexity medium
 * @generatedBy AI
 * @lastReviewedAt 2024-01-03
 */

import React, { useState } from 'react';
import { template } from '@rabjs/kit';

export default function TemplateExample() {
  const [templateStr, setTemplateStr] = useState('Hello <%= name %>, you are <%= age %> years old');
  const [name, setName] = useState('John');
  const [age, setAge] = useState('30');
  
  const result = template(templateStr, { name, age });

  const templates = [
    'Hello <%= name %>',
    'Hello ${name}, you are ${age} years old',
    'Hello {name}',
    'Welcome <%= name %>!',
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Template String:
        </label>
        <textarea
          value={templateStr}
          onChange={(e) => setTemplateStr(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
            boxSizing: 'border-box',
            fontFamily: 'monospace',
            minHeight: '60px',
          }}
          placeholder="e.g., Hello <%= name %>"
        />
        <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
          Supports: &lt;%= name %&gt;, ${'${name}'}, {'{ name }'}
        </p>
      </div>

      <div style={{ marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: '8px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            age:
          </label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{
              padding: '8px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>Output:</p>
        <div
          style={{
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '14px',
            wordBreak: 'break-all',
          }}
        >
          {result}
        </div>
      </div>

      <div>
        <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>Quick Templates:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
          {templates.map((tmpl) => (
            <button
              key={tmpl}
              onClick={() => setTemplateStr(tmpl)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                textAlign: 'left',
                whiteSpace: 'normal',
                height: 'auto',
              }}
            >
              {tmpl}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}