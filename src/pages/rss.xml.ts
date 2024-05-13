import rss from '@astrojs/rss'
import { siteConfig } from '@/site-config'
import { getAllPosts, sortMDByDate } from '@/utils'

import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'
const parser = new MarkdownIt()

export const GET = async () => {
  const allPosts = await getAllPosts()
  const allPostsByDate = sortMDByDate(allPosts)

  return rss({
    // configs
    trailingSlash: false,
    xmlns: { h: 'http://www.w3.org/TR/html4/' },
    stylesheet: '/pretty-feed-v3.xsl',

    // contents
    title: siteConfig.title,
    description: siteConfig.description,
    site: import.meta.env.SITE,
    items: allPostsByDate.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blog/${post.slug}`,
      customData: `
                <h:img src="${post.data.coverImage?.src.src}" />
                <enclosure url="${post.data.coverImage?.src.src}" />
            `,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        transformTags: {
          img: (tagName, attribs) => ({
            tagName: tagName,
            attribs: {
              src: `_astro/${attribs.src}`
            }
          })
        }
      })
    }))
  })
}
