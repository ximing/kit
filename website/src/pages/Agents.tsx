import enAgents from '../content/en/agents.md?raw';
import zhAgents from '../content/zh/agents.md?raw';
import { Markdown } from '../components/Markdown';
import { useI18n } from '../lib/i18n';
import { useTitle } from '../lib/title';

export function Agents() {
  const { locale, t } = useI18n();
  useTitle(`${t.nav.guide} — ${t.meta.title}`);
  return <Markdown source={locale === 'zh' ? zhAgents : enAgents} />;
}
