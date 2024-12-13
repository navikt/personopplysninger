import cssModules from 'eslint-plugin-css-modules';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    ...compat.extends(
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/jsx-runtime',
        'plugin:jsx-a11y/recommended',
        'prettier',
    ),
    {
        plugins: {
            'css-modules': cssModules,
            '@typescript-eslint': typescriptEslint,
            import: importPlugin,
        },

        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: ['./tsconfig.json'],
            },
        },

        rules: {
            'import/order': [
                'warn',
                {
                    groups: [['builtin', 'external'], ['internal', 'parent', 'index', 'object', 'unknown', 'type'], 'sibling'],

                    pathGroups: [
                        {
                            pattern: './**/*.module.scss',
                            group: 'sibling',
                            position: 'after',
                        },
                    ],
                },
            ],

            'css-modules/no-unused-class': [
                'warn',
                {
                    camelCase: true,
                },
            ],

            'css-modules/no-undef-class': [
                'error',
                {
                    camelCase: true,
                },
            ],

            '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        },
    },
];
