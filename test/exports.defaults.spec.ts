import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

describe('source exports', () => {
  it('has no export default in src/', () => {
    const hits = walk('src')
      .filter((f) => f.endsWith('.ts'))
      .filter((f) => /export\s+default\b/.test(readFileSync(f, 'utf8')));
    expect(hits).toEqual([]);
  });
});
