import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

function readJson(rel: string): Record<string, unknown> {
  return JSON.parse(readFileSync(join(root, rel), 'utf8')) as Record<string, unknown>;
}

describe('coding-agent plugin manifests', () => {
  it('exposes kit as the plugin name across tool manifests', () => {
    expect(readJson('.claude-plugin/plugin.json').name).toBe('kit');
    expect(readJson('.codex-plugin/plugin.json').name).toBe('kit');
    expect(readJson('.cursor-plugin/plugin.json').name).toBe('kit');
    expect(readJson('.kimi-plugin/plugin.json').name).toBe('kit');
    expect(readJson('.grok-plugin/plugin.json').name).toBe('kit');
  });

  it('lists this repo as a Claude, Codex, and Grok marketplace source', () => {
    const claude = readJson('.claude-plugin/marketplace.json');
    const claudePlugins = claude.plugins as Array<Record<string, unknown>>;
    expect(claude.name).toBe('kit');
    expect(claudePlugins[0]?.name).toBe('kit');
    expect(claudePlugins[0]?.source).toBe('./');

    const codex = readJson('.agents/plugins/marketplace.json');
    const codexPlugins = codex.plugins as Array<Record<string, unknown>>;
    expect(codex.name).toBe('kit');
    expect(codexPlugins[0]?.name).toBe('kit');

    const grok = readJson('.grok-plugin/marketplace.json');
    const grokPlugins = grok.plugins as Array<Record<string, unknown>>;
    expect(grok.name).toBe('kit');
    expect(grokPlugins[0]?.name).toBe('kit');
    expect(grokPlugins[0]?.source).toBe('./');
  });

  it('points Codex, Cursor, and Kimi at ./skills/', () => {
    expect(readJson('.codex-plugin/plugin.json').skills).toBe('./skills/');
    expect(readJson('.cursor-plugin/plugin.json').skills).toBe('./skills/');
    expect(readJson('.kimi-plugin/plugin.json').skills).toBe('./skills/');
  });

  it('declares Pi skill discovery without hijacking package main', () => {
    const pkg = readJson('package.json');
    expect(pkg.main).toBe('./dist/index.cjs');
    expect(pkg.keywords).toEqual(expect.arrayContaining(['pi-package', 'skills']));
    expect((pkg.pi as { skills: string[] }).skills).toEqual(['./skills']);
  });

  it('ships an OpenCode plugin that registers the skills directory', () => {
    const plugin = join(root, '.opencode/plugins/kit.js');
    expect(existsSync(plugin)).toBe(true);
    const source = readFileSync(plugin, 'utf8');
    expect(source).toContain('../../skills');
    expect(source).toContain('KitPlugin');
  });
});
