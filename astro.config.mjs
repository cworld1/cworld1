// @ts-check

import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
// Adapter
import vercelServerless from '@astrojs/vercel/serverless'
// Integrations
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
// Rehype & remark packages
import rehypeExternalLinks from 'rehype-external-links'

// Local rehype & remark plugins
import rehypeAutolinkHeadings from './src/plugins/rehypeAutolinkHeadings.ts'
// Markdown
import {
  remarkAddZoomable,
  remarkReadingTime
} from './src/plugins/remarkPlugins.ts'
// Shiki
import {
  addCopyButton,
  addLanguage,
  addTitle,
  transformerNotationDiff,
  transformerNotationHighlight,
  updateStyle
} from './src/plugins/shikiTransformers.ts'
import { integrationConfig, siteConfig } from './src/site.config.ts'

// https://astro.build/config
export default defineConfig({
  // Top-Level Options
  site: siteConfig.site,
  // base: '/docs',
  trailingSlash: 'never',
  output: 'server',

  // Adapter
  // 1. Vercel (serverless)
  adapter: vercelServerless(),
  // 2. Vercel (static)
  // adapter: vercelStatic(),
  // 3. Local (standalone)
  // adapter: node({ mode: 'standalone' }),
  // ---

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    domains: ['ghchart.rshah.org']
  },

  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    mdx(),
    icon(),
    (await import('@playform/compress')).default({
      SVG: false,
      Exclude: ['index.*.js']
    })
  ],
  // root: './my-project-directory',

  // Prefetch Options
  prefetch: true,
  // Server Options
  server: {
    host: true
  },
  // Markdown Options
  markdown: {
    remarkPlugins: [
      remarkReadingTime,
      // @ts-ignore
      ...(integrationConfig.mediumZoom.enable
        ? [[remarkAddZoomable, integrationConfig.mediumZoom.options]] // Wrap in array to ensure it's iterable
        : [])
    ],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          ...(siteConfig.content.externalLinkArrow && { content: { type: 'text', value: ' ↗' } }),
          target: '_blank',
          rel: ['nofollow, noopener, noreferrer']
        }
      ],
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['anchor'] },
          content: { type: 'text', value: '#' }
        }
      ]
    ],
    // https://docs.astro.build/en/guides/syntax-highlighting/
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        updateStyle(),
        addTitle(),
        addLanguage(),
        addCopyButton(2000)
      ]
    }
  }
})
