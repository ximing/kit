import * as kit from '@rabjs/kit';

const kitRecord = kit as unknown as Record<string, unknown>;
const kitNames = Object.keys(kitRecord).filter((key) => key !== 'default' && key !== '__esModule');
const kitValues = kitNames.map((key) => kitRecord[key]);

function stripTypeScript(code: string): string {
  let source = code.replace(/^\s*import\s[\s\S]*?;?\s*$/gm, '').replace(/^\s*export\s+/gm, '');
  source = source.replace(/:\s*typeof\s+[A-Za-z_$][\w$]*(?:\[[^\]]*\])?/g, '');
  source = source.replace(/(\(|,\s*)([A-Za-z_$][\w$]*)\s*:\s*[^,)=]+/g, '$1$2');
  source = source.replace(/\)\s*:\s*[A-Za-z_$][\w$<>[\]|&\s]*(?=\s*(=>|{))/g, ')');
  source = source.replace(/\b(const|let|var)\s+([A-Za-z_$][\w$]*)\s*:\s*[A-Za-z_$][\w$<>[\]|&\s]*(?==)/g, '$1 $2 ');
  source = source.replace(/\s+as\s+[A-Za-z_$][\w$<>,\s[\]]+/g, '');
  return source;
}

function lastExpression(code: string): string {
  const lines = code.split('\n');
  let lastIdx = lines.length - 1;
  while (lastIdx >= 0 && (/^\s*$/.test(lines[lastIdx]) || /^\s*\/\//.test(lines[lastIdx]))) {
    lastIdx -= 1;
  }
  if (lastIdx < 0) return 'return undefined;';

  const trimmed = lines[lastIdx].replace(/;?\s*\/\/.*$/, '').trim();
  const assignment = trimmed.match(/^(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/);
  if (assignment) {
    return `${code}\nreturn ${assignment[1]};`;
  }
  if (/^(return|throw|function|if|for|while|class|switch)\b/.test(trimmed)) {
    return code;
  }
  lines[lastIdx] = `return (${trimmed.replace(/;$/, '')});`;
  return lines.join('\n');
}

export function stringify(value: unknown): string {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
    return String(value);
  }
  if (typeof value === 'symbol' || typeof value === 'function') return String(value);
  if (value instanceof Error) return `${value.name}: ${value.message}`;
  if (value instanceof Date) return value.toISOString();
  try {
    const json = JSON.stringify(value, (_key, nested) => (typeof nested === 'bigint' ? String(nested) : nested), 2);
    return json ?? String(value);
  } catch {
    return String(value);
  }
}

export async function runExample(code: string): Promise<{ ok: true; value: string } | { ok: false; error: string }> {
  const logs: string[] = [];
  const captured = {
    log: (...args: unknown[]) => {
      logs.push(args.map(stringify).join(' '));
    },
    info: (...args: unknown[]) => {
      logs.push(args.map(stringify).join(' '));
    },
    warn: (...args: unknown[]) => {
      logs.push(args.map(stringify).join(' '));
    },
    error: (...args: unknown[]) => {
      logs.push(args.map(stringify).join(' '));
    },
  };

  const body = lastExpression(stripTypeScript(code));
  const AsyncFunction = Object.getPrototypeOf(async function unnamed() {
    return undefined;
  }).constructor as new (...args: string[]) => (...args: unknown[]) => Promise<unknown>;

  try {
    const fn = new AsyncFunction('kit', 'console', ...kitNames, body);
    const result = await fn(kit, captured, ...kitValues);
    const parts = [...logs];
    if (result !== undefined || logs.length === 0) {
      parts.push(stringify(result));
    }
    return { ok: true, value: parts.join('\n') };
  } catch (error) {
    return { ok: false, error: stringify(error) };
  }
}
