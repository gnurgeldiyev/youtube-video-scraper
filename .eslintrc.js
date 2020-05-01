module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ['airbnb-base', 'plugin:node/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: ['promise'],
  rules: {
    'promise/always-return': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-native': 'off',
    'promise/no-nesting': 'error',
    'promise/no-promise-in-callback': 'error',
    'promise/no-callback-in-promise': 'error',
    'promise/no-return-in-finally': 'error',
    'prefer-arrow-callback': 'error',
    'no-use-before-define': ['error', {
      functions: false
    }],
    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true
    }],
    'no-else-return': ['error', {
      allowElseIf: true
    }],
    'no-underscore-dangle': ['error', {
      allowAfterThis: true
    }],
    'eqeqeq': 'off',
    'comma-dangle': 'off',
    'semi': 'off',
    'no-use-before-define': ['error', {
      'functions': false
    }],
    'no-var': 'off'
  }
}
