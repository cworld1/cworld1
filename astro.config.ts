import { defineConfig } from 'astro/config'
// Adapter
import vercel from '@astrojs/vercel/serverless'
// Integrations
import expressiveCode from 'astro-expressive-code'
import { expressiveCodeOptions } from './src/site.config.ts'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import icon from 'astro-icon'
import playformCompress from '@playform/compress'
// Markdown
import { remarkReadingTime } from './src/utils/remarkReadingTime.ts'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypeExternalLinks from 'rehype-external-links'

// https://astro.build/config
export default defineConfig({
  // Top-Level Options
  site: 'https://cworld.top',
  // base: '/docs',
  trailingSlash: 'never',
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
    // imagesConfig: {
    //   sizes: [320, 640, 1280]
    // }
    // imageService: true
    // isr: true // cache
  }),
  integrations: [
    expressiveCode(expressiveCodeOptions),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    mdx(),
    icon(),
    playformCompress({ SVG: false })
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
