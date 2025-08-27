module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
  },
  extends: ['eslint:recommended', '@supabase/eslint-config-supabase'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.d.ts'],
        paths: ['supabase/functions'],
      },
    },
  },
}
