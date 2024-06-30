import type { AstroGlobal } from 'astro'
import type { CollectionEntry } from 'astro:content'
import rss from '@astrojs/rss'
import { getImage } from 'astro:assets'

import { siteConfig } from '@/site-config'
import { getAllPosts, sortMDByDate } from '@/utils'

import { parse as htmlParser } from 'node-html-parser'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'
const parser = new MarkdownIt()

// Get dynamic import of images as a map collection
const imagesGlob = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/post/**/*.{jpeg,jpg,png,gif}' // add more image formats if needed
)

const renderContent = async (post: CollectionEntry<'post'>, site: URL) => {
  const html = htmlParser.parse(parser.render(post.body))

  for (const img of html.querySelectorAll('img')) {
    const src = img.getAttribute('src')!
    // Relative paths that are optimized by Astro build
    if (src.startsWith('/images')) {
      // Images starting with `/images/` is the public dir
      img.setAttribute('src', `${site}${src.replace('/', '')}`)
    } else {
      const imagePathPrefix = `/src/content/post/${post.slug}/${src.replace('./', '')}`
      // Call the dynamic import and return the module
      const imagePath = await imagesGlob[imagePathPrefix]?.()?.then((res) => res.default)
      if (imagePath) {
        img.setAttribute(
          'src',
          `${site}${(await getImage({ src: imagePath })).src.replace('/', '')}`
        )
      }
    }
  }

  return sanitizeHtml(html.toString(), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
  })
}

const GET = async (context: AstroGlobal) => {
  const allPostsByDate = sortMDByDate(await getAllPosts())
  const siteUrl = context.site ?? new URL(import.meta.env.SITE)

  return rss({
    // Basic configs
    trailingSlash: false,
    xmlns: { h: 'http://www.w3.org/TR/html4/' },
    stylesheet: '/scripts/pretty-feed-v3.xsl',

    // Contents
    title: siteConfig.title,
    description: siteConfig.description,
    site: import.meta.env.SITE,
    items: await Promise.all(
      allPostsByDate.map(async (post) => ({
        pubDate: post.data.publishDate,
        link: `/blog/${post.slug}`,
        customData: `
                <h:img src="${post.data.coverImage?.src.src}" />
                <enclosure url="${post.data.coverImage?.src.src}" />
            `,
        content: await renderContent(post, siteUrl),
        ...post.data
      }))
    )
  })
}

export { GET }
