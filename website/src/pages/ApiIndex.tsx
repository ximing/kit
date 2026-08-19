import { Link } from 'react-router-dom';
import { apiSummary } from '../i18n';
import { groupedCatalog } from '../lib/catalog';
import { useI18n } from '../lib/i18n';
import { apiPath } from '../lib/paths';
import { useTitle } from '../lib/title';

export function ApiIndex() {
  const { locale, prefix, t } = useI18n();
  const groups = groupedCatalog();
  useTitle(`${t.api.indexTitle} — ${t.meta.title}`);

  return (
    <div className="api-index">
      <header className="page-head">
        <h1>{t.api.indexTitle}</h1>
        <p>{t.api.indexLead}</p>
      </header>
      <div className="api-columns">
        {groups.map((group) => (
          <section key={group.name} className="api-group">
            <h2>
              <Link to={apiPath(prefix, group.name)}>{group.name}</Link>
            </h2>
            <ul>
              {group.items.map((item) => (
                <li key={item.name}>
                  <Link to={apiPath(prefix, item.category, item.name)}>
                    <code>{item.name}</code>
                    <span>{apiSummary(item, locale)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
