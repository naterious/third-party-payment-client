module.exports = {
  'parser': '@typescript-eslint/parser',
  'plugins': ['@typescript-eslint', 'eslint-plugin-import'],
  'settings': {
    "import/resolver": {
      // use <root>/tsconfig.json
      "typescript": {},
    }
  },
  'extends': [
    './core.js',
    './import.js',
    './fp.js',
  ],
  'env': {
    'browser': false,
    'es6': true,
    'node': true,
  },
  'parserOptions': {
    'ecmaVersion': 6,
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
    },
    'sourceType': 'module',
    'useJSXTextNode': false,
    'project': './tsconfig.json',
  },
  'overrides': [
    {
      'files': ['*.ts', '*.tsx'],
      'rules': {
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }]
      }
    }
  ]
};
