import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useI18n } from '../lib/i18n';
import { isPluginToolId, PLUGIN_TOOLS, pluginInstall, type PluginToolId } from '../lib/plugins';
import { CopyBlock } from './CopyBlock';

function toolFromHash(hash: string): PluginToolId {
  const id = hash.replace(/^#/, '');
  if (isPluginToolId(id)) return id;
  return 'claude';
}

export function PluginInstall() {
  const { t } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const tool = toolFromHash(location.hash);
  const recipe = pluginInstall[tool];

  useEffect(() => {
    if (!location.hash) return;
    document.getElementById('install')?.scrollIntoView({ block: 'start' });
  }, [location.hash]);

  function selectTool(id: PluginToolId) {
    navigate({ hash: id }, { replace: true });
  }

  return (
    <section id="install" className="plugin-install" aria-labelledby="plugin-install-label">
      <h2 id="plugin-install-label">{t.plugins.title}</h2>
      <p className="plugin-lead">{t.plugins.lead}</p>
      <div className="tool-tabs" role="tablist" aria-label={t.plugins.title}>
        {PLUGIN_TOOLS.map((id) => {
          const selected = id === tool;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`plugin-tab-${id}`}
              aria-selected={selected}
              aria-controls="plugin-panel"
              className={selected ? 'tool-tab is-active' : 'tool-tab'}
              onClick={() => selectTool(id)}
            >
              {t.plugins.tools[id].label}
            </button>
          );
        })}
      </div>
      <div id="plugin-panel" className="plugin-panel" role="tabpanel" aria-labelledby={`plugin-tab-${tool}`}>
        <CopyBlock code={recipe.code} copyLabel={t.plugins.copy} copiedLabel={t.plugins.copied} />
        <p className="plugin-note">{t.plugins.tools[tool].note}</p>
      </div>
    </section>
  );
}
