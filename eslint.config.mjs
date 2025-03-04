import babelParser from '@babel/eslint-parser';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

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
      'react/prop-types': ['error', { ignore: ['navigation'] }], //navigation prop 에러 무시
      'no-unused-vars': ['error', { varsIgnorePattern: '^_' }], // '_'로 시작하는 변수 사용되지 않아도 경고 무시
    },
  },
];
