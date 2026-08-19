export function abortError(signal: AbortSignal): unknown {
  return signal.reason ?? new DOMException('This operation was aborted', 'AbortError');
}

export function onAbort(signal: AbortSignal, cb: () => void): () => void {
  if (signal.aborted) {
    cb();
    return () => undefined;
  }
  const handler = () => cb();
  signal.addEventListener('abort', handler, { once: true });
  return () => signal.removeEventListener('abort', handler);
}
