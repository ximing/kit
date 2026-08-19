import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  CATALOG_REL,
  collectCatalog,
  LLMS_REL,
  SKILL_INVENTORY_END,
  SKILL_INVENTORY_START,
  SKILL_REL,
  patchSkillInventory,
  renderCatalogTs,
  renderFunctionList,
  renderLlmsTxt,
  writeOrCheck,
  type CatalogItem,
} from '../../scripts/generate-catalog';

describe('generate-catalog', () => {
  const catalog = collectCatalog();
  const names = catalog.map((item) => `${item.category}/${item.name}`);

  it('collects public functions and skips abort, types, and index files', () => {
    expect(names).toContain('array/chunk');
    expect(names).toContain('array/remove');
    expect(names).toContain('array/flattenDeep');
    expect(names).toContain('promise/delay');
    expect(names).toContain('object/get');
    expect(names).not.toContain('promise/abort');
    expect(names).not.toContain('promise/abortError');
    expect(names).not.toContain('promise/onAbort');
    expect(catalog.some((item) => item.category === 'types')).toBe(false);
    expect(catalog.some((item) => item.name === 'index')).toBe(false);
    expect(catalog).toHaveLength(117);
  });

  it('sorts by category then name', () => {
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });

  it('reads JSDoc, signature, params, and examples for chunk', () => {
    const chunk = catalog.find((item) => item.category === 'array' && item.name === 'chunk');
    expect(chunk).toBeDefined();
    expect(chunk?.path).toBe('src/array/chunk.ts');
    expect(chunk?.summary).toBe('Splits an array into chunks of a specified size');
    expect(chunk?.params.map((param) => param.name)).toEqual(['array', 'size']);
    expect(chunk?.params[0]?.text).toMatch(/array to chunk/i);
    expect(chunk?.params[1]?.text).toMatch(/size of each chunk/i);
    expect(chunk?.examples.length).toBeGreaterThan(0);
    expect(chunk?.examples[0]).toContain('chunk([1, 2, 3, 4, 5], 2)');
    expect(chunk?.signature).toContain('chunk');
    expect(chunk?.signature).toContain('array: T[]');
    expect(chunk?.signature).toContain('size: number');
  });

  it('documents nested option params from JSDoc', () => {
    const debounce = catalog.find((item) => item.category === 'function' && item.name === 'debounce');
    expect(debounce?.params.map((param) => param.name)).toEqual(
      expect.arrayContaining(['func', 'wait', 'options', 'options.leading']),
    );
  });

  it('renders llms.txt with title, imports, categories, and immutable-remove sentence', () => {
    const txt = renderLlmsTxt(catalog);
    expect(txt).toContain('# @rabjs/kit');
    expect(txt).toContain('Named exports only. Immutable remove.');
    expect(txt).toContain("import { chunk, retry } from '@rabjs/kit'");
    expect(txt).toContain("import { chunk } from '@rabjs/kit/array/chunk'");
    expect(txt).toContain('### array');
    expect(txt).toContain('### promise');
    expect(txt).toMatch(/- chunk\(array, size\): Splits an array into chunks of a specified size/);
    expect(txt).toMatch(/- remove\(array, predicate\):/);
    expect(txt).toMatch(/- delay\(ms, value, signal\):/);
    expect(txt).toMatch(/- difference\(array, \.\.\.arrays\):/);
    expect(txt).toMatch(/- intersection\(\.\.\.arrays\):/);
    expect(txt).toMatch(/- compose\(\.\.\.funcs\):/);
    expect(txt).toMatch(/- bind\(func, thisArg, \.\.\.partialArgs\):/);
    expect(txt).toMatch(/- curry\(func, arity\): Creates a function that accepts arguments of func/);
    expect(
      txt
        .split('\n')
        .filter((line) => line.startsWith('- '))
        .every((line) => /: \S/.test(line)),
    ).toBe(true);
    expect(txt.endsWith('\n')).toBe(true);
  });

  it('renders a CatalogItem[] module sorted the same way as collectCatalog', () => {
    const source = renderCatalogTs(catalog);
    expect(source).toContain('export interface CatalogItem');
    expect(source).toContain('export const catalog: CatalogItem[]');
    expect(source.indexOf('array')).toBeLessThan(source.indexOf('collection'));
  });

  it('renders a skill inventory listing every public function', () => {
    const list = renderFunctionList(catalog);
    expect(list).toContain('### array');
    expect(renderFunctionList(catalog, true)).toContain('### array\n\n- chunk(');
    expect(list).toContain('### promise');
    expect(list).toContain('### string');
    expect(list).toMatch(/^- chunk\(array, size\): Splits an array into chunks of a specified size$/m);
    expect(list).toMatch(/^- remove\(array, predicate\):/m);
    expect(list).toMatch(/^- retry\(fn, options\):/m);
    expect(list.split('\n').filter((line) => line.startsWith('- '))).toHaveLength(117);
  });

  it('patches using-rabjs-kit between catalog inventory markers', () => {
    const markdown = ['# Using', '', SKILL_INVENTORY_START, 'stale', SKILL_INVENTORY_END, ''].join('\n');
    const patched = patchSkillInventory(markdown, catalog);
    expect(patched).toContain(SKILL_INVENTORY_START);
    expect(patched).toContain(SKILL_INVENTORY_END);
    expect(patched).not.toContain('stale');
    expect(patched).toContain('- chunk(array, size):');
    expect(patched).toContain('- timeout(promise, ms, message, signal):');
  });

  it('throws when skill inventory markers are missing', () => {
    expect(() => patchSkillInventory('# Using\n', catalog)).toThrow(/catalog-inventory/);
  });
});

describe('writeOrCheck', () => {
  const temps: string[] = [];

  afterEach(() => {
    for (const dir of temps) {
      rmSync(dir, { recursive: true, force: true });
    }
    temps.length = 0;
  });

  function tempRoot(): string {
    const dir = mkdtempSync(join(tmpdir(), 'kit-catalog-'));
    temps.push(dir);
    return dir;
  }

  const items: CatalogItem[] = [
    {
      name: 'chunk',
      category: 'array',
      summary: 'Splits an array into chunks of a specified size',
      signature: 'export function chunk<T>(array: T[], size: number): T[][]',
      params: [
        { name: 'array', text: 'The array to chunk' },
        { name: 'size', text: 'The size of each chunk' },
      ],
      examples: ['chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]'],
      path: 'src/array/chunk.ts',
    },
  ];

  it('writes catalog.ts and llms.txt', async () => {
    const root = tempRoot();
    const result = await writeOrCheck({ rootDir: root, check: false, items });
    expect(result.changed).toBe(true);
    expect(result.wrote).toBe(true);
    expect(readFileSync(join(root, CATALOG_REL), 'utf8')).toContain('export const catalog');
    expect(readFileSync(join(root, LLMS_REL), 'utf8')).toContain('Named exports only. Immutable remove.');
  });

  it('writes the using-rabjs-kit inventory when the skill file exists', async () => {
    const root = tempRoot();
    mkdirSync(join(root, 'skills/using-rabjs-kit'), { recursive: true });
    writeFileSync(join(root, SKILL_REL), `# Using\n\n${SKILL_INVENTORY_START}\nstale\n${SKILL_INVENTORY_END}\n`);
    await writeOrCheck({ rootDir: root, check: false, items });
    const skill = readFileSync(join(root, SKILL_REL), 'utf8');
    expect(skill).toContain('### array');
    expect(skill).toContain('- chunk(array, size): Splits an array into chunks of a specified size');
    expect(skill).not.toContain('stale');
  });

  it('exits check mode without writing when outputs would change', async () => {
    const root = tempRoot();
    mkdirSync(join(root, 'website/src/generated'), { recursive: true });
    writeFileSync(join(root, CATALOG_REL), 'stale\n');
    writeFileSync(join(root, LLMS_REL), 'stale\n');
    const result = await writeOrCheck({ rootDir: root, check: true, items });
    expect(result.changed).toBe(true);
    expect(result.wrote).toBe(false);
    expect(readFileSync(join(root, CATALOG_REL), 'utf8')).toBe('stale\n');
    expect(readFileSync(join(root, LLMS_REL), 'utf8')).toBe('stale\n');
  });

  it('check mode is clean when outputs already match', async () => {
    const root = tempRoot();
    await writeOrCheck({ rootDir: root, check: false, items });
    const result = await writeOrCheck({ rootDir: root, check: true, items });
    expect(result.changed).toBe(false);
    expect(result.wrote).toBe(false);
  });
});
