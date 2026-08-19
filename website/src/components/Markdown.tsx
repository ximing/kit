import { markdownToHtml } from '../lib/markdown';

export function Markdown({ source }: { source: string }) {
  return <div className="prose" dangerouslySetInnerHTML={{ __html: markdownToHtml(source) }} />;
}
