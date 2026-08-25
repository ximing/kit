import { useState } from 'react';

export function CopyBlock({ code, copyLabel, copiedLabel }: { code: string; copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="copy-block">
      <pre>
        <code>{code}</code>
      </pre>
      <button type="button" className="btn btn-quiet" onClick={() => void copy()}>
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  );
}
