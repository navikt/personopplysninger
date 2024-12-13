export default {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 150,
  tabWidth: 4,
  overrides: [
      {
          files: ['*.yml', '*.yaml'],
          options: {
              bracketSpacing: false,
              tabWidth: 2,
          },
      },
  ],
}
