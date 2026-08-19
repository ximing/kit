import { Link, useParams } from 'react-router-dom';
import { apiSummary } from '../i18n';
import { groupedCatalog } from '../lib/catalog';
import { useI18n } from '../lib/i18n';
import { apiPath } from '../lib/paths';
import { useTitle } from '../lib/title';

export function ApiCategory() {
  const { category = '' } = useParams();
  const { locale, prefix, t } = useI18n();
  const group = groupedCatalog().find((item) => item.name === category);
  useTitle(group ? `${group.name} — ${t.meta.title}` : t.meta.title);

  if (!group) {
    return (
      <div className="page-head">
        <h1>{t.api.categoryNotFound}</h1>
        <p>
          <Link to={apiPath(prefix)}>{t.api.breadcrumbApi}</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="api-category">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to={apiPath(prefix)}>{t.api.breadcrumbApi}</Link>
        <span aria-hidden="true">/</span>
        <span>{group.name}</span>
      </nav>
      <header className="page-head">
        <h1>{group.name}</h1>
        <p>{t.home.functions(group.items.length)}</p>
      </header>
      <ul className="fn-list">
        {group.items.map((item) => (
          <li key={item.name}>
            <Link className="fn-row" to={apiPath(prefix, item.category, item.name)}>
              <code className="fn-name">{item.name}</code>
              <span className="fn-sum">{apiSummary(item, locale)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
