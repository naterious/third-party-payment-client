module.exports = {
  'parser': '@typescript-eslint/parser',
  'plugins': ['@typescript-eslint'],
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
  "rules": {
    'fp/no-nil': 'off',
    'fp/no-this': 'off',
    'fp/no-mutation': 'off',
    'no-invalid-this': 'off',
    'no-empty-function': 'off',
    'no-console': 'off',
    'no-unused-expressions': 'off',
  },
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
};
