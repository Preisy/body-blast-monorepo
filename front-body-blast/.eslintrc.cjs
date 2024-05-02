module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,

  // https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
  // Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
  // `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
  parserOptions: {
    extraFileExtensions: ['.vue'],
  },

  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },

  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true,
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    '../.eslintrc.json',
    './.eslintrc-auto-import.json',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:prettier-vue/recommended',
    '@unocss',
    '@feature-sliced',
  ],

  plugins: ['vue'],

  globals: {
    ga: 'readonly', // Google Analytics
    cordova: 'readonly',
    __statics: 'readonly',
    __QUASAR_SSR__: 'readonly',
    __QUASAR_SSR_SERVER__: 'readonly',
    __QUASAR_SSR_CLIENT__: 'readonly',
    __QUASAR_SSR_PWA__: 'readonly',
    process: 'readonly',
    Capacitor: 'readonly',
    chrome: 'readonly',
  },

  rules: {
    'import/no-unresolved': ['error', { ignore: ['^virtual:'] }],
    '@typescript-eslint/no-namespace': 0,
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/padding-line-between-blocks': ['error'],
    'vue/require-explicit-emits': 0,
    'arrow-body-style': 2,
  },
};
