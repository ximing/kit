/**
 * @rabjs/kit plugin for OpenCode.ai
 *
 * Registers the repository's skills/ directory via the config hook so
 * OpenCode discovers using-rabjs-kit, adding-kit-function, and
 * migrating-lodash-to-kit without symlinks or manual config edits.
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const kitSkillsDir = path.resolve(__dirname, '../../skills');

export const KitPlugin = async () => {
  return {
    config: async (config) => {
      if (Array.isArray(config.skills)) {
        if (!config.skills.includes(kitSkillsDir)) {
          config.skills.push(kitSkillsDir);
        }
        return;
      }
      config.skills = config.skills || {};
      config.skills.paths = config.skills.paths || [];
      if (!config.skills.paths.includes(kitSkillsDir)) {
        config.skills.paths.push(kitSkillsDir);
      }
    },
  };
};
