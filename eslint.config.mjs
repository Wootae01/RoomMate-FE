import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks'; // react-hooks 플러그인 추가

export default [
  {
    // 파일 패턴 설정
    files: ['**/*.{js,mjs,cjs,jsx}'],

    // 언어 옵션 설정
    languageOptions: {
      globals: globals.node,
    },

    // 플러그인의 추천 규칙 적용
    ...pluginJs.configs.recommended,
    ...pluginReact.configs.flat.recommended,
    ...pluginReact.configs.flat.jsxRuntime,
    ...pluginReactHooks.configs.recommended,

    rules: {
      'no-console': 'warn', // console.log 사용 시 경고
    },
  },
];
