import babelParser from '@babel/eslint-parser';
import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false, // Babel 설정 파일이 없어도 동작하도록 설정
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true, // JSX 문법 지원
        },
        babelOptions: {
          plugins: ['@babel/plugin-syntax-jsx'], // JSX 문법 지원을 위한 Babel 플러그인 추가
        },
      },
      globals: globals.node,
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
    },
    settings: {
      react: {
        version: 'detect', // React 버전을 자동으로 감지
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // React in scope 규칙 비활성화
    },
  },
];
