import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'

export const remarkReadingTime: Plugin<[], Root> = function () {
  return function (tree, { data }) {
    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage)
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    const typedData = data as { astro: { frontmatter: { minutesRead: string } } }
    typedData.astro.frontmatter.minutesRead = readingTime.text
    data.astro.frontmatter.minutesRead = readingTime.text
  }
}
