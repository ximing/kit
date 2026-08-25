import { Link, NavLink, useLocation } from 'react-router-dom';
import { useI18n } from '../lib/i18n';
import { homePath, withLocale } from '../lib/paths';

export function Header() {
  const { locale, prefix, t } = useI18n();
  const { pathname, hash } = useLocation();
  const navClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'nav-link is-active' : 'nav-link');

  return (
    <header className="site-header">
      <a className="skip-link" href="#content">
        {t.nav.skip}
      </a>
      <Link className="wordmark" to={homePath(prefix)}>
        <span className="wordmark-ns">@rabjs/</span>
        kit
      </Link>
      <nav className="nav" aria-label="Primary">
        <Link className="nav-link" to={`${homePath(prefix)}#search`}>
          {t.nav.search}
        </Link>
        <NavLink to={`${prefix}/guide`} className={navClass}>
          {t.nav.guide}
        </NavLink>
        <NavLink to={`${prefix}/api`} className={navClass}>
          {t.nav.api}
        </NavLink>
        <NavLink to={`${prefix}/skills`} className={navClass}>
          {t.nav.skills}
        </NavLink>
        <span className="lang-toggle" role="group" aria-label="Language">
          <Link
            className={locale === 'en' ? 'lang is-active' : 'lang'}
            to={`${withLocale(pathname, 'en')}${hash}`}
            lang="en"
          >
            {t.nav.langEn}
          </Link>
          <span className="lang-slash" aria-hidden="true">
            /
          </span>
          <Link
            className={locale === 'zh' ? 'lang is-active' : 'lang'}
            to={`${withLocale(pathname, 'zh')}${hash}`}
            lang="zh"
          >
            {t.nav.langZh}
          </Link>
        </span>
      </nav>
    </header>
  );
}
