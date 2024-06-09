module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    sourceType: 'module',
  },
  env: {
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'airbnb-typescript',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/consistent-type-assertions': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/ban-ts-comment': 'error',
    'array-callback-return': 'error',
    'no-const-assign': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'error',
    'no-dupe-args': 'error',
    'no-dupe-else-if': 'error',
    'no-empty-pattern': 'error',
    'no-import-assign': 'error',
    'no-inner-declarations': 'error',
    'no-irregular-whitespace': 'warn',
    'no-loss-of-precision': 'error',
    'no-misleading-character-class': 'warn',
    'no-obj-calls': 'error',
    'no-param-reassign': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-setter-return': 'error',
    'no-sparse-arrays': 'error',
    'no-template-curly-in-string': 'error',
    'no-undef': 'error',
    'no-unreachable-loop': 'error',
    'no-unsafe-finally': 'warn',
    'no-unsafe-negation': 'error',
    'no-unsafe-optional-chaining': 'warn',
    'no-use-before-define': 'error',
    'use-isnan': 'error',
    'valid-typeof': 'error',
    'arrow-body-style': ['warn', 'as-needed'],
    'block-scoped-var': 'error',
    camelcase: 'error',
    complexity: ['warn', 5],
    'consistent-return': 'error',
    'default-case-last': 'error',
    'default-param-last': 'warn',
    'dot-notation': 'warn',
    eqeqeq: ['error', 'always'],
    'import/prefer-default-export': 'warn',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-cycle': 'error',
    "react/jsx-filename-extension": "off",
    "import/extensions": "off"
  },
  ignorePatterns: [
    '.eslintrc.cjs',
    '.husky',
    '**/*.json',
    '**/*.md',
    'commitlint.config.ts',
    'build',
    'config',
    'dist',
    'jest.config.ts',
    'node_modules',
  ],
};
