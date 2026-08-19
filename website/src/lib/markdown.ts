function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function inline(value: string): string {
  let out = escapeHtml(value);
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, text: string, href: string) => {
    const allowed = /^(https?:|\/|#|mailto:)/.test(href) ? href : '#';
    return `<a href="${escapeHtml(allowed)}">${text}</a>`;
  });
  return out;
}

function renderTable(rows: string[]): string {
  const cells = rows.map((row) =>
    row
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => cell.trim()),
  );
  if (cells.length < 2) return `<p>${inline(rows.join(' '))}</p>`;
  const header = cells[0];
  const body = cells.slice(2).length
    ? cells.slice(2)
    : cells.slice(1).filter((row) => !row.every((cell) => /^:?-+:?$/.test(cell)));
  const thead = `<thead><tr>${header.map((cell) => `<th>${inline(cell)}</th>`).join('')}</tr></thead>`;
  const tbody = `<tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${inline(cell)}</td>`).join('')}</tr>`).join('')}</tbody>`;
  return `<div class="table-wrap"><table>${thead}${tbody}</table></div>`;
}

export function markdownToHtml(source: string): string {
  const fences: string[] = [];
  const prepared = source.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, lang: string, code: string) => {
    const index = fences.length;
    fences.push(`<pre><code class="lang-${escapeHtml(lang)}">${escapeHtml(code.replace(/\n$/, ''))}</code></pre>`);
    return `\n\n%%FENCE${index}%%\n\n`;
  });

  const blocks = prepared.split(/\n{2,}/);
  const html: string[] = [];
  let list: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let table: string[] = [];

  const flushList = () => {
    if (!listType || list.length === 0) return;
    html.push(`<${listType}>${list.join('')}</${listType}>`);
    list = [];
    listType = null;
  };

  const flushTable = () => {
    if (table.length === 0) return;
    html.push(renderTable(table));
    table = [];
  };

  for (const rawBlock of blocks) {
    const block = rawBlock.trim();
    if (!block) continue;

    const fence = block.match(/^%%FENCE(\d+)%%$/);
    if (fence) {
      flushList();
      flushTable();
      html.push(fences[Number(fence[1])]);
      continue;
    }

    const lines = block.split('\n');
    if (lines.every((line) => line.trim().startsWith('|'))) {
      flushList();
      table.push(...lines);
      flushTable();
      continue;
    }

    if (lines.every((line) => /^\s*[-*]\s+/.test(line))) {
      flushTable();
      flushList();
      listType = 'ul';
      for (const line of lines) {
        list.push(`<li>${inline(line.replace(/^\s*[-*]\s+/, ''))}</li>`);
      }
      flushList();
      continue;
    }

    if (lines.every((line) => /^\s*\d+\.\s+/.test(line))) {
      flushTable();
      flushList();
      listType = 'ol';
      for (const line of lines) {
        list.push(`<li>${inline(line.replace(/^\s*\d+\.\s+/, ''))}</li>`);
      }
      flushList();
      continue;
    }

    flushList();
    flushTable();

    if (block.startsWith('# ')) {
      html.push(`<h1>${inline(block.slice(2))}</h1>`);
      continue;
    }
    if (block.startsWith('## ')) {
      html.push(`<h2>${inline(block.slice(3))}</h2>`);
      continue;
    }
    if (block.startsWith('### ')) {
      html.push(`<h3>${inline(block.slice(4))}</h3>`);
      continue;
    }

    html.push(`<p>${lines.map((line) => inline(line.trim())).join('<br />')}</p>`);
  }

  flushList();
  flushTable();
  return html.join('\n');
}
