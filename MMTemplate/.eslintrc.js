module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  plugins: ['import', 'prettier'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: 'react+(|-native)',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@src/**',
            group: 'internal',
          },
          {
            pattern: '@assets/**',
            group: 'internal',
          },
          {
            pattern: '@components/**',
            group: 'internal',
          },
          {
            pattern: '@context/**',
            group: 'internal',
          },
          {
            pattern: '@locales/**',
            group: 'internal',
          },
          {
            pattern: '@mock/**',
            group: 'internal',
          },
          {
            pattern: '@navigation/**',
            group: 'internal',
          },
          {
            pattern: '@screens/**',
            group: 'internal',
          },
          {
            pattern: '@services/**',
            group: 'internal',
          },
          {
            pattern: '@theme/**',
            group: 'internal',
          },
          {
            pattern: '@app-types/**',
            group: 'internal',
          },
          {
            pattern: '@utils/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-unresolved': 'error',
  },
};
