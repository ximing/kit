export const PLUGIN_TOOLS = ['claude', 'codex', 'cursor', 'grok', 'kimi', 'opencode', 'pi', 'manual'] as const;

export type PluginToolId = (typeof PLUGIN_TOOLS)[number];

export function isPluginToolId(value: string): value is PluginToolId {
  return (PLUGIN_TOOLS as readonly string[]).includes(value);
}

export const pluginInstall: Record<PluginToolId, { language: string; code: string }> = {
  claude: {
    language: 'bash',
    code: `/plugin marketplace add ximing/kit
/plugin install kit@kit`,
  },
  codex: {
    language: 'bash',
    code: `codex plugin marketplace add ximing/kit
codex plugin add kit@kit`,
  },
  cursor: {
    language: 'bash',
    code: `/add-plugin kit

# Or copy skills into a project:
cp -r skills/using-rabjs-kit skills/adding-kit-function skills/migrating-lodash-to-kit your-project/.cursor/skills/`,
  },
  grok: {
    language: 'bash',
    code: `grok plugin marketplace add ximing/kit
grok plugin install kit --trust

# Direct install from the repo also works:
# grok plugin install ximing/kit --trust`,
  },
  kimi: {
    language: 'text',
    code: `/plugins install https://github.com/ximing/kit

# Then start a fresh session (/new) so the plugin loads.`,
  },
  opencode: {
    language: 'json',
    code: `{
  "plugin": ["kit@git+https://github.com/ximing/kit.git"]
}`,
  },
  pi: {
    language: 'bash',
    code: `pi install git:github.com/ximing/kit`,
  },
  manual: {
    language: 'bash',
    code: `git clone https://github.com/ximing/kit
cp -r kit/skills/using-rabjs-kit kit/skills/adding-kit-function kit/skills/migrating-lodash-to-kit <tool-skills-dir>/`,
  },
};
