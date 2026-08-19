import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { messages } from '../i18n';
import { I18nProvider } from '../lib/i18n';
import { localeFromPath, prefixFor } from '../lib/paths';
import { Header } from './Header';

export function Layout() {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  const prefix = prefixFor(locale);
  const t = messages[locale];

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', t.meta.description);
    }
  }, [locale, t.meta.description]);

  return (
    <I18nProvider value={{ locale, prefix, t }}>
      <div className="shell">
        <Header />
        <main id="content" className="content">
          <Outlet />
        </main>
        <footer className="site-footer">
          <span>{t.footer.license}</span>
          <a href="https://github.com/ximing/kit">{t.footer.github}</a>
          <a href="https://www.npmjs.com/package/@rabjs/kit">{t.footer.npm}</a>
        </footer>
      </div>
    </I18nProvider>
  );
}
