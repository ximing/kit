import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { apiSummary } from '../i18n';
import { catalog, featuredItems, groupedCatalog, searchCatalog } from '../lib/catalog';
import { useI18n } from '../lib/i18n';
import { apiPath } from '../lib/paths';
import { useTitle } from '../lib/title';

function Highlight({ text, query }: { text: string; query: string }) {
  const needle = query.trim();
  if (!needle) return text;
  const lower = text.toLowerCase();
  const index = lower.indexOf(needle.toLowerCase());
  if (index < 0) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark>{text.slice(index, index + needle.length)}</mark>
      {text.slice(index + needle.length)}
    </>
  );
}

export function Home() {
  const { locale, prefix, t } = useI18n();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  useTitle(t.meta.title);

  const hits = useMemo(() => searchCatalog(query), [query]);
  const groups = useMemo(() => groupedCatalog(), []);
  const featured = useMemo(() => featuredItems(), []);
  const searching = query.trim().length > 0;

  useEffect(() => {
    if (location.hash === '#search') {
      inputRef.current?.focus();
    }
  }, [location.hash]);

  async function copyInstall() {
    try {
      await navigator.clipboard.writeText(t.home.install);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="home">
      <p className="pitch">{t.home.pitch}</p>
      <div className="install">
        <code>{t.home.install}</code>
        <button type="button" className="btn btn-quiet" onClick={() => void copyInstall()}>
          {copied ? t.home.copied : t.home.copy}
        </button>
      </div>
      <p className="install-extra">
        <Link to={`${prefix}/skills#install`}>{t.home.agentsCta}</Link>
      </p>
      <div className="search-block" id="search">
        <label className="search-label" htmlFor="catalog-search">
          {t.home.searchLabel}
        </label>
        <input
          ref={inputRef}
          id="catalog-search"
          className="search-field"
          type="search"
          value={query}
          placeholder={t.home.searchPlaceholder}
          autoComplete="off"
          onChange={(event) => setQuery(event.target.value)}
        />
        {searching ? (
          <p className="search-meta">{hits.length ? t.home.searchCount(hits.length) : t.home.searchEmpty}</p>
        ) : (
          <p className="search-meta">{t.home.functions(catalog.length)}</p>
        )}
      </div>
      {searching ? (
        <ol className="search-hits">
          {hits.map((item) => (
            <li key={`${item.category}/${item.name}`}>
              <Link className="hit" to={apiPath(prefix, item.category, item.name)}>
                <span className="hit-name">
                  <Highlight text={item.name} query={query} />
                </span>
                <span className="hit-cat">{item.category}</span>
                <span className="hit-sig">{item.signature.replace(/^export function /, '')}</span>
                <span className="hit-sum">
                  <Highlight text={apiSummary(item, locale)} query={query} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <>
          <section className="featured" aria-labelledby="featured-label">
            <h2 id="featured-label">{t.home.featured}</h2>
            <ul className="chip-row">
              {featured.map((item) => (
                <li key={item.name}>
                  <Link className="chip" to={apiPath(prefix, item.category, item.name)}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="categories-label">
            <h2 id="categories-label">{t.home.categories}</h2>
            <ul className="category-grid">
              {groups.map((group) => (
                <li key={group.name}>
                  <Link className="category-card" to={apiPath(prefix, group.name)}>
                    <span className="category-name">{group.name}</span>
                    <span className="category-count">{group.items.length}</span>
                    <span className="category-preview">{group.items.map((item) => item.name).join(' ')}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
      <p className="home-more">
        <Link to={apiPath(prefix)}>{t.api.indexTitle}</Link>
        {' · '}
        <Link to={`${prefix}/guide`}>{t.nav.guide}</Link>
        {' · '}
        <Link to={`${prefix}/skills`}>{t.nav.skills}</Link>
      </p>
    </div>
  );
}
