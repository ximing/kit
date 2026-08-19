/**
 * Builds website/src/generated/catalog.ts and llms.txt from src/** JSDoc.
 * Usage: tsx scripts/generate-catalog.ts [--check]
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { format as formatWithPrettier, resolveConfig } from 'prettier';
import ts from 'typescript';

export interface CatalogItem {
  name: string;
  category: string;
  summary: string;
  signature: string;
  params: { name: string; text: string }[];
  examples: string[];
  path: string;
}

export const CATALOG_REL = 'website/src/generated/catalog.ts';
export const LLMS_REL = 'llms.txt';

const SKIP_REL = new Set(['src/promise/abort.ts']);

export function repoRoot(): string {
  return resolve(fileURLToPath(new URL('..', import.meta.url)));
}

function posixRel(from: string, to: string): string {
  return relative(from, to).split('\\').join('/');
}

function collapseWhitespace(text: string): string {
  return text.replace(/\r\n/g, '\n').replace(/\s+/g, ' ').trim();
}

function jsDocDisplayParts(comment: string | ts.NodeArray<ts.JSDocComment> | undefined): string {
  if (comment === undefined) {
    return '';
  }
  if (typeof comment === 'string') {
    return comment;
  }
  return comment.map((part) => part.text).join('');
}

function trimExample(text: string): string {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  while (lines.length > 0 && lines[0].trim() === '') {
    lines.shift();
  }
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
    lines.pop();
  }
  const indents = lines.filter((line) => line.trim().length > 0).map((line) => line.match(/^(\s*)/)?.[1].length ?? 0);
  const min = indents.length > 0 ? Math.min(...indents) : 0;
  return lines.map((line) => line.slice(min)).join('\n');
}

function entityNameToString(name: ts.EntityName): string {
  if (ts.isIdentifier(name)) {
    return name.text;
  }
  return `${entityNameToString(name.left)}.${name.right.text}`;
}

function getJsDocs(node: ts.Node): ts.JSDoc[] {
  const fromApi = ts.getJSDocCommentsAndTags(node).filter((entry): entry is ts.JSDoc => ts.isJSDoc(entry));
  if (fromApi.length > 0) {
    return fromApi;
  }
  return (node as ts.Node & { jsDoc?: ts.JSDoc[] }).jsDoc ?? [];
}

function functionSignature(fn: ts.FunctionDeclaration, sourceFile: ts.SourceFile): string {
  const start = fn.getStart(sourceFile);
  const end = fn.body ? fn.body.getStart(sourceFile) : fn.getEnd();
  let text = sourceFile.text.slice(start, end).trim();
  if (text.endsWith('{')) {
    text = text.slice(0, -1).trim();
  }
  return text.replace(/\s+/g, ' ');
}

function parameterName(param: ts.ParameterDeclaration): string {
  return ts.isIdentifier(param.name) ? param.name.text : param.name.getText();
}

function collectParams(fn: ts.FunctionDeclaration, jsDocs: ts.JSDoc[]): { name: string; text: string }[] {
  const tagText = new Map<string, string>();
  for (const doc of jsDocs) {
    for (const tag of doc.tags ?? []) {
      if (ts.isJSDocParameterTag(tag)) {
        tagText.set(entityNameToString(tag.name), collapseWhitespace(jsDocDisplayParts(tag.comment)));
      }
    }
  }

  const result: { name: string; text: string }[] = [];
  const seen = new Set<string>();

  for (const param of fn.parameters) {
    const bare = parameterName(param);
    const name = param.dotDotDotToken ? `...${bare}` : bare;
    seen.add(bare);
    seen.add(name);
    result.push({ name, text: tagText.get(bare) ?? tagText.get(name) ?? '' });
  }

  for (const [name, text] of tagText) {
    if (!seen.has(name)) {
      result.push({ name, text });
    }
  }

  return result;
}

function collectExamples(jsDocs: ts.JSDoc[]): string[] {
  const examples: string[] = [];
  for (const doc of jsDocs) {
    for (const tag of doc.tags ?? []) {
      if (tag.tagName.text === 'example') {
        const text = trimExample(jsDocDisplayParts(tag.comment));
        if (text) {
          examples.push(text);
        }
      }
    }
  }
  return examples;
}

function catalogFileMeta(sourceFile: ts.SourceFile, rootDir: string): { category: string; path: string } | undefined {
  const path = posixRel(rootDir, sourceFile.fileName);
  const match = /^src\/([^/]+)\/([^/]+)\.ts$/.exec(path);
  if (!match) {
    return undefined;
  }
  const [, category, fileName] = match;
  if (fileName === 'index' || category === 'types' || SKIP_REL.has(path)) {
    return undefined;
  }
  return { category, path };
}

function isExportedFunction(node: ts.Node): node is ts.FunctionDeclaration {
  return (
    ts.isFunctionDeclaration(node) &&
    node.name !== undefined &&
    Boolean(node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword))
  );
}

function createSrcProgram(rootDir: string): ts.Program {
  const configPath = join(rootDir, 'tsconfig.json');
  const configFile = ts.readConfigFile(configPath, (fileName) => ts.sys.readFile(fileName));
  if (configFile.error) {
    throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n'));
  }
  const parsed = ts.parseJsonConfigFileContent(
    configFile.config as { compilerOptions?: ts.CompilerOptions },
    ts.sys,
    rootDir,
  );
  return ts.createProgram({
    rootNames: parsed.fileNames,
    options: { ...parsed.options, noEmit: true },
  });
}

export function collectCatalog(rootDir: string = repoRoot()): CatalogItem[] {
  const program = createSrcProgram(rootDir);
  const items: CatalogItem[] = [];

  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.isDeclarationFile) {
      continue;
    }
    const meta = catalogFileMeta(sourceFile, rootDir);
    if (!meta) {
      continue;
    }

    for (const statement of sourceFile.statements) {
      if (!isExportedFunction(statement) || !statement.name) {
        continue;
      }
      const jsDocs = getJsDocs(statement);
      const summaries = jsDocs.map((doc) => collapseWhitespace(jsDocDisplayParts(doc.comment))).filter(Boolean);
      items.push({
        name: statement.name.text,
        category: meta.category,
        summary: summaries[0] ?? '',
        signature: functionSignature(statement, sourceFile),
        params: collectParams(statement, jsDocs),
        examples: collectExamples(jsDocs),
        path: meta.path,
      });
    }
  }

  items.sort((a, b) => a.category.localeCompare(b.category, 'en') || a.name.localeCompare(b.name, 'en'));
  return items;
}

export function renderCatalogTs(items: CatalogItem[]): string {
  return `/**
 * Auto-generated by scripts/generate-catalog.ts. Do not edit.
 */

export interface CatalogItem {
  name: string;
  category: string;
  summary: string;
  signature: string;
  params: { name: string; text: string }[];
  examples: string[];
  path: string;
}

export const catalog: CatalogItem[] = ${JSON.stringify(items, null, 2)};
`;
}

function isNestedDocParam(name: string): boolean {
  const bare = name.startsWith('...') ? name.slice(3) : name;
  return bare.includes('.');
}

function llmsArgs(item: CatalogItem): string {
  return item.params
    .filter((param) => !isNestedDocParam(param.name))
    .map((param) => param.name)
    .join(', ');
}

export function renderLlmsTxt(items: CatalogItem[]): string {
  const lines = [
    '# @rabjs/kit',
    'Typed lodash-shaped utilities. Named exports only. Immutable remove.',
    '',
    '## Import',
    "import { chunk, retry } from '@rabjs/kit'",
    "import { chunk } from '@rabjs/kit/array/chunk'",
    '',
    '## Functions',
  ];

  let currentCategory = '';
  for (const item of items) {
    if (item.category !== currentCategory) {
      currentCategory = item.category;
      lines.push(`### ${item.category}`);
    }
    lines.push(`- ${item.name}(${llmsArgs(item)}): ${item.summary}`);
  }
  lines.push('');
  return lines.join('\n');
}

async function formatCatalogTs(code: string, filepath: string): Promise<string> {
  const config = (await resolveConfig(filepath)) ?? (await resolveConfig(repoRoot()));
  return formatWithPrettier(code, { ...config, filepath, parser: 'typescript' });
}

export async function writeOrCheck(options: {
  rootDir: string;
  check: boolean;
  items?: CatalogItem[];
}): Promise<{ changed: boolean; wrote: boolean }> {
  const items = options.items ?? collectCatalog(options.rootDir);
  const catalogPath = join(options.rootDir, CATALOG_REL);
  const llmsPath = join(options.rootDir, LLMS_REL);
  const catalogTs = await formatCatalogTs(renderCatalogTs(items), catalogPath);
  const llmsTxt = renderLlmsTxt(items);

  const existingCatalog = existsSync(catalogPath) ? readFileSync(catalogPath, 'utf8') : null;
  const existingLlms = existsSync(llmsPath) ? readFileSync(llmsPath, 'utf8') : null;
  const changed = existingCatalog !== catalogTs || existingLlms !== llmsTxt;

  if (options.check || !changed) {
    return { changed, wrote: false };
  }

  mkdirSync(dirname(catalogPath), { recursive: true });
  writeFileSync(catalogPath, catalogTs);
  writeFileSync(llmsPath, llmsTxt);
  return { changed: true, wrote: true };
}

export async function main(argv: string[] = process.argv.slice(2)): Promise<number> {
  const check = argv.includes('--check');
  const result = await writeOrCheck({ rootDir: repoRoot(), check });
  if (check && result.changed) {
    console.error('Generated catalog is stale. Run `pnpm docs:catalog` and commit the result.');
    return 1;
  }
  return 0;
}

const invokedFromCli =
  process.argv[1] !== undefined && /generate-catalog\.(cjs|js|ts)$/.test(process.argv[1].split('\\').join('/'));

if (invokedFromCli) {
  void main().then(
    (code) => {
      process.exit(code);
    },
    (error: unknown) => {
      console.error(error);
      process.exit(1);
    },
  );
}
