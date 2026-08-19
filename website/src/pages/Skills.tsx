import { useI18n } from '../lib/i18n';
import { useTitle } from '../lib/title';

export function Skills() {
  const { t } = useI18n();
  useTitle(`${t.skills.title} — ${t.meta.title}`);

  return (
    <div className="skills-page">
      <header className="page-head">
        <h1>{t.skills.title}</h1>
        <p>{t.skills.lead}</p>
      </header>
      <ul className="skill-list">
        {t.skills.items.map((skill) => (
          <li key={skill.name} className="skill-card">
            <h2>
              <code>{skill.name}</code>
            </h2>
            <p className="skill-when">
              <span className="eyebrow">{t.skills.useWhen}</span>
              {skill.useWhen}
            </p>
            <a href={skill.href}>{t.skills.viewOnGithub}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
