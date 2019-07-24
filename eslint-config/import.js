module.exports = {

  'plugins': [
    'import',
  ],

  'rules': {
    // Start Import
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/default': 'error',
    'import/namespace': 'error',
    'import/no-absolute-path': 'error',
    'import/no-dynamic-require': 'warn',
    'import/export': 'error',
    'import/no-named-as-default': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-commonjs': 'error',
    'import/no-amd': 'error',
    'import/no-nodejs-modules': 'off',
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/newline-after-import': 'error',
    'import/prefer-default-export': 'warn',
    // End Import
  },

};
