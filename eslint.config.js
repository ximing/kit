import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import vitest from 'eslint-plugin-vitest';
import prettierConfig from 'eslint-config-prettier';

const typeCheckedConfigs =
  tseslint.configs['recommended-requiring-type-checking'] ?? tseslint.configs['recommended-type-checked'];

const sharedOffRules = {
  '@typescript-eslint/explicit-member-accessibility': 'off',
  '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
  '@typescript-eslint/no-parameter-properties': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/member-delimiter-style': 'off',
  '@typescript-eslint/no-inferrable-types': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      args: 'none',
    },
  ],
  // TODO: Remove these and fixed issues once we merged all the current PRs.
  '@typescript-eslint/ban-types': 'off',
  '@typescript-eslint/no-unsafe-return': 'off',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-unsafe-call': 'off',
  '@typescript-eslint/no-unsafe-member-access': 'off',
  '@typescript-eslint/no-unsafe-argument': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-this-alias': 'off',
  '@typescript-eslint/prefer-promise-reject-errors': 'off',
  '@typescript-eslint/no-unnecessary-type-assertion': 'off',
};

export default [
  {
    ignores: ['dist/**', 'coverage/**', 'website/dist/**', 'website/build/**', 'build/**', 'node_modules/**'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.spec.json'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      vitest,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...sharedOffRules,
    },
  },
  {
    files: ['src/**/*.ts'],
    rules: {
      ...(typeCheckedConfigs?.rules ?? {}),
      ...sharedOffRules,
    },
  },
  {
    files: ['test/**/*.ts'],
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
  prettierConfig,
];
