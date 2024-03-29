module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  root: true,
  'extends': [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'overrides': [
  ],
  parser: 'vue-eslint-parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    ecmaFeatures: {
      jsx: true
    },

    parser: '@typescript-eslint/parser',
  },
  'plugins': [
    'vue',
    '@typescript-eslint'
  ],
  'rules': {
    '@typescript-eslint/no-var-requires': 0,
    'vue/multi-word-component-names': 0,
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ]
  }
}
