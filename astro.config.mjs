import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import { remarkReadingTime } from './src/utils/remarkReadingTime.ts'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypeExternalLinks from 'rehype-external-links'
import expressiveCode from 'astro-expressive-code'
import { expressiveCodeOptions } from './src/site.config'
import icon from 'astro-icon'

import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  // Top-Level Options
  site: 'https://cworld.top',
  // base: '/docs',
  trailingSlash: 'never',
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true },
    imagesConfig: {
      sizes: [320, 640, 1280]
    }
    // imageService: true
    // isr: true // cache
  }),
  integrations: [
    expressiveCode(expressiveCodeOptions),
    tailwind({
      applyBaseStyles: false
    }),
    sitemap(),
    mdx(),
    icon()
  ],
  // root: './my-project-directory',

  // Prefetch Options
  prefetch: true,

  // Server Options
  server: { host: true },

  // Markdown Options
  markdown: {
    remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow, noopener, noreferrer']
        }
      ]
    ],
    remarkRehype: {
      footnoteLabelProperties: {
        className: ['']
      }
    }
  }
})
