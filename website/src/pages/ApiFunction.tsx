import { Link, useParams } from 'react-router-dom';
import { Playground } from '../components/Playground';
import { apiSummary } from '../i18n';
import { findFunction } from '../lib/catalog';
import { useI18n } from '../lib/i18n';
import { apiPath } from '../lib/paths';
import { useTitle } from '../lib/title';

export function ApiFunction() {
  const { category = '', name = '' } = useParams();
  const { locale, prefix, t } = useI18n();
  const item = findFunction(category, name);
  useTitle(item ? `${item.name} — ${t.meta.title}` : t.meta.title);

  if (!item) {
    return (
      <div className="page-head">
        <h1>{t.api.notFound}</h1>
        <p>
          <Link to={apiPath(prefix)}>{t.api.breadcrumbApi}</Link>
        </p>
      </div>
    );
  }

  const sourceHref = `https://github.com/ximing/kit/blob/main/${item.path}`;

  return (
    <article className="fn-page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to={apiPath(prefix)}>{t.api.breadcrumbApi}</Link>
        <span aria-hidden="true">/</span>
        <Link to={apiPath(prefix, item.category)}>{item.category}</Link>
        <span aria-hidden="true">/</span>
        <span>{item.name}</span>
      </nav>
      <header className="page-head">
        <h1>
          <code>{item.name}</code>
        </h1>
        <p>{apiSummary(item, locale)}</p>
      </header>
      <section>
        <h2>{t.api.signature}</h2>
        <pre>
          <code>{item.signature}</code>
        </pre>
      </section>
      {item.params.length > 0 ? (
        <section>
          <h2>{t.api.params}</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>{t.api.summary}</th>
                </tr>
              </thead>
              <tbody>
                {item.params.map((param) => (
                  <tr key={param.name}>
                    <td>
                      <code>{param.name}</code>
                    </td>
                    <td>{param.text.replace(/^- /, '')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
      {item.examples.length > 0 ? (
        <section>
          <h2>{t.api.examples}</h2>
          {item.examples.map((example) => (
            <pre key={example}>
              <code>{example}</code>
            </pre>
          ))}
        </section>
      ) : null}
      <Playground example={item.examples[0] ?? `${item.name}()`} />
      <p className="source-link">
        <a href={sourceHref}>{t.api.source}</a>
        <span className="mute"> {item.path}</span>
      </p>
    </article>
  );
}
