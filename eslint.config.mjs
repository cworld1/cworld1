// @ts-check

import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

import eslintPluginAstro from 'eslint-plugin-astro'

export default [
  // For JavaScript and TypeScript files in general
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,

  // Ignore files
  {
    ignores: ['public/scripts/*', 'scripts/*', '.astro/', 'src/env.d.ts']
  }
]
