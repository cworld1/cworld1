import type { Node, Root } from 'mdast'
import getReadingTime from 'reading-time'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

import toString from './mdastUtilToString'

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

export const remarkAddZoomable: Plugin<[string], Root> = function (className = 'zoomable') {
  return function (tree) {
    visit(tree, 'image', (node: Node) => {
      node.data = { hProperties: { class: className } }
    })
  }
}
