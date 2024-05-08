import rss from '@astrojs/rss'
import { siteConfig } from '@/site-config'
import { getAllPosts } from '@/utils'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'
const parser = new MarkdownIt()

export const GET = async () => {
  const posts = await getAllPosts()

  return rss({
    // configs
    trailingSlash: false,
    stylesheet: '/pretty-feed-v3.xsl',

    // contents
    title: siteConfig.title,
    description: siteConfig.description,
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/blog/${post.slug}`,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
      })
    }))
  })
}
