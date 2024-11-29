import type { AstroGlobal, ImageMetadata } from 'astro'
import rss from '@astrojs/rss'
import { getImage } from 'astro:assets'
import type { CollectionEntry } from 'astro:content'
import type { Root } from 'mdast'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'

import { getAllCollections, sortMDByDate } from '@/utils'
import { siteConfig } from '@/site-config'

// Get dynamic import of images as a map collection
const imagesGlob = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/post/**/*.{jpeg,jpg,png,gif}' // add more image formats if needed
)

const renderContent = async (post: CollectionEntry<'post'>, site: URL) => {
  // Replace image links with the correct path
  function remarkReplaceImageLink() {
    /**
     * @param {Root} tree
     */
    return async function (tree: Root) {
      const promises: Promise<void>[] = []
      visit(tree, 'image', (node) => {
        if (node.url.startsWith('/images')) {
          node.url = `${site}${node.url.replace('/', '')}`
        } else {
          const imagePathPrefix = `/src/content/post/${post.slug}/${node.url.replace('./', '')}`
          const promise = imagesGlob[imagePathPrefix]?.().then(async (res) => {
            const imagePath = res?.default
            if (imagePath) {
              node.url = `${site}${(await getImage({ src: imagePath })).src.replace('/', '')}`
            }
          })
          if (promise) promises.push(promise)
        }
      })
      await Promise.all(promises)
    }
  }

  const file = await unified()
    .use(remarkParse)
    .use(remarkReplaceImageLink)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(post.body)

  return String(file)
}

const GET = async (context: AstroGlobal) => {
  const allPostsByDate = sortMDByDate(await getAllCollections())
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
        customData: `<h:img src="${typeof post.data.heroImage?.src === 'string' ? post.data.heroImage?.src : post.data.heroImage?.src.src}" />
          <enclosure url="${typeof post.data.heroImage?.src === 'string' ? post.data.heroImage?.src : post.data.heroImage?.src.src}" />`,
        content: await renderContent(post, siteUrl),
        ...post.data
      }))
    )
  })
}

export { GET }
