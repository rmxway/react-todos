import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
	{
		ignores: [
			'dist/**',
			'node_modules/**',
			'.DS_Store',
			'Thumbs.db',
			'*.log',
			'npm-debug.log*',
			'yarn-debug.log*',
			'yarn-error.log*',
			'coverage/**',
		],
	},
	js.configs.recommended,
	{
		files: ['**/*.{js,mjs,cjs,ts,tsx}'],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
			globals: {
				...globals.browser,
				...globals.node,
				React: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': tseslint,
			import: importPlugin,
			'jsx-a11y': jsxA11y,
			react,
			'react-hooks': reactHooks,
			'simple-import-sort': simpleImportSort,
			'unused-imports': unusedImports,
			prettier,
		},
		rules: {
			...tseslint.configs.recommended.rules,
			...react.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			...eslintConfigPrettier.rules,

			'no-unused-vars': 'off',
			'no-shadow': 'off',

			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-shadow': 'error',

			'react/react-in-jsx-scope': 'off',
			'react/display-name': 'off',
			'react/prop-types': 'off',
			'react/jsx-props-no-spreading': 'off',
			'react/require-default-props': 'off',
			'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
			'react/function-component-definition': 'off',

			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			'import/prefer-default-export': 'off',
			'import/no-mutable-exports': 'off',
			'import/first': 'error',
			'import/newline-after-import': 'error',
			'import/no-duplicates': 'error',
			'import/no-named-as-default': 'error',
			'import/extensions': [
				'error',
				'ignorePackages',
				{ ts: 'never', tsx: 'never' },
			],

			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',

			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],

			'jsx-a11y/label-has-associated-control': 'off',
			'jsx-a11y/label-has-for': 'off',

			'class-methods-use-this': 'off',
			'no-param-reassign': 'off',
			'no-underscore-dangle': 'off',
			camelcase: 1,
			'no-console': 1,

			'prefer-destructuring': ['error', { object: true, array: false }],

			'@typescript-eslint/no-redundant-type-constituents': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',

			'prettier/prettier': 'error',
		},
		settings: {
			'import/resolver': {
				typescript: {},
				node: {
					extensions: ['.ts', '.tsx', '.js'],
				},
			},
			react: { version: 'detect' },
		},
	},
	{
		files: ['*.js'],
		rules: {
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-misused-promises': 'off',
		},
	},
    {
        files: ['**/vite-env.d.ts'],
        rules: {
            '@typescript-eslint/triple-slash-reference': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'import/extensions': 'off',
        },
    },
];
