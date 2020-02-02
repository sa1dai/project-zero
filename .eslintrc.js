module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'import/prefer-default-export': 'off',
    'react/prefer-stateless-function': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    camelcase: 'off',
    'no-restricted-syntax': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'global-require': 'off',
    'react/sort-comp': 'off',
    'import/order': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'import/no-named-as-default': 'off',
    'no-use-before-define': 'off'
  }
};
