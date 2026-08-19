import { Link } from 'react-router-dom';
import { useI18n } from '../lib/i18n';
import { homePath } from '../lib/paths';
import { useTitle } from '../lib/title';

export function NotFound() {
  const { prefix, t } = useI18n();
  useTitle(t.notFound.title);

  return (
    <div className="page-head">
      <h1>{t.notFound.title}</h1>
      <p>{t.notFound.body}</p>
      <p>
        <Link to={homePath(prefix)}>{t.notFound.home}</Link>
      </p>
    </div>
  );
}
