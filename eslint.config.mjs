import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),

  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // ─── Import ──────────────────────────────────────────────────────────
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // ─── 변수 / 스코프 ────────────────────────────────────────────────────
      'no-var': 'error',
      'no-shadow': 'off', // @typescript-eslint/no-shadow 로 대체
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // ─── 문법 선호 (Airbnb 핵심) ──────────────────────────────────────────
      'object-shorthand': ['error', 'always'],       // { fn } not { fn: fn }
      'prefer-template': 'error',                    // `${x}` not x + y
      'prefer-destructuring': ['warn', { object: true, array: false }],
      'no-else-return': ['error', { allowElseIf: false }],
      'spaced-comment': ['error', 'always', { markers: ['/', '!', '='] }],

      // ─── 비교 ─────────────────────────────────────────────────────────────
      'eqeqeq': ['error', 'always', { null: 'ignore' }],

      // ─── 파라미터 변조 방지 ────────────────────────────────────────────────
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: [
            'acc', 'accumulator',   // reduce 누적자
            'e',                    // 이벤트 객체
            'ctx', 'context',       // 컨텍스트
            'req', 'request',       // Express req
            'res', 'response',      // Express res
            'state', 'draft',       // Zustand / Immer
          ],
        },
      ],

      // ─── TypeScript ───────────────────────────────────────────────────────
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],

      // ─── React / JSX ──────────────────────────────────────────────────────
      'react/self-closing-comp': 'error',
      'react/no-array-index-key': 'warn',
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],

      // ─── 일반 ─────────────────────────────────────────────────────────────
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-nested-ternary': 'warn',
    },
  },
]);

export default eslintConfig;
