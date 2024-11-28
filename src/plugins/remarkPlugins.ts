import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'
import type { Plugin } from 'unified'
import type { Root } from 'mdast'

export const remarkReadingTime: Plugin<[], Root> = function () {
  return function (tree, { data }) {
    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage)
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    const astroData = data as { astro: { frontmatter: { minutesRead: string } } }
    astroData.astro.frontmatter.minutesRead = readingTime.text
  }
}
