import enGuide from '../content/en/guide.md?raw';
import zhGuide from '../content/zh/guide.md?raw';
import { Markdown } from '../components/Markdown';
import { useI18n } from '../lib/i18n';
import { useTitle } from '../lib/title';

export function Guide() {
  const { locale, t } = useI18n();
  useTitle(`${t.nav.guide} — ${t.meta.title}`);
  return <Markdown source={locale === 'zh' ? zhGuide : enGuide} />;
}
