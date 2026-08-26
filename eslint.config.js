import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    ignores: [
      'dist',
      'node_modules',
      '.next',
      '.github',
      'types.generated.d.ts',
      'next-env.d.ts',
      '.claude/worktrees/**',
    ],
  },
];
