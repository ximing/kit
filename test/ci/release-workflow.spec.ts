import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('release workflow', () => {
  const yml = readFileSync('.github/workflows/release.yml', 'utf8');

  it('publishes with changeset publish so already-released versions are skipped', () => {
    expect(yml).toMatch(/publish:\s*pnpm changeset publish/);
    expect(yml).not.toContain('pnpm publish --no-git-checks');
  });
});
