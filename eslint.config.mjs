import astroParser from 'astro-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import astroPlugin from 'eslint-plugin-astro'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import js from '@eslint/js'

export default [
  // For JavaScript and TypeScript files in general
  {
    files: ['**/*.{js,cjs,mjs,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
        setTimeout: 'readonly',
        HTMLElement: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLElementTagNameMap: 'readonly',
        URL: 'readonly',
        Node: 'readonly',
        Response: 'readonly',
        module: 'readonly',
        require: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-require-imports': 'off' // allow import using require
    }
  },
  // For Astro files
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      globals: {
        astro: 'readonly'
      }
    },
    plugins: {
      astro: astroPlugin,
      '@typescript-eslint': tsPlugin
    },
    rules: {
      ...astroPlugin.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      'astro/no-unused-css-selector': 'off' // 禁用 CSS 未使用选择器规则
    }
  },

  // For Node.js specific configuration
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        require: 'readonly',
        module: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly'
      }
    },
    rules: {}
  },

  // Ignore files
  {
    ignores: ['public/scripts/*', 'scripts/*', '.astro/', 'src/env.d.ts']
  }
]
