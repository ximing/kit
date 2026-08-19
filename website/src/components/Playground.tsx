import { useEffect, useId, useState } from 'react';
import { runExample } from '../lib/eval';
import { useI18n } from '../lib/i18n';

export function Playground({ example }: { example: string }) {
  const { t } = useI18n();
  const id = useId();
  const [code, setCode] = useState(example);
  const [busy, setBusy] = useState(false);
  const [output, setOutput] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    setCode(example);
    setOutput(null);
  }, [example]);

  async function onRun() {
    setBusy(true);
    const result = await runExample(code);
    setBusy(false);
    setOutput(result.ok ? { ok: true, text: result.value } : { ok: false, text: result.error });
  }

  return (
    <section className="playground" aria-labelledby={`${id}-label`}>
      <div className="playground-bar">
        <h2 id={`${id}-label`}>{t.api.playground}</h2>
        <button type="button" className="btn" onClick={() => void onRun()} disabled={busy}>
          {busy ? t.playground.running : t.playground.run}
        </button>
      </div>
      <p className="hint">{t.playground.hint}</p>
      <label className="sr-only" htmlFor={`${id}-code`}>
        {t.api.playground}
      </label>
      <textarea
        id={`${id}-code`}
        className="playground-code"
        value={code}
        spellCheck={false}
        onChange={(event) => setCode(event.target.value)}
        onKeyDown={(event) => {
          if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
            event.preventDefault();
            void onRun();
          }
        }}
        rows={Math.min(18, Math.max(6, code.split('\n').length + 1))}
      />
      {output ? (
        <pre className={output.ok ? 'playground-out' : 'playground-out is-error'} aria-live="polite">
          <span className="playground-out-label">{output.ok ? t.playground.result : t.playground.error}</span>
          {output.text}
        </pre>
      ) : null}
    </section>
  );
}
