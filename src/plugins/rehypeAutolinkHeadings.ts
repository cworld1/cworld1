import type { Element, ElementContent, Root } from 'hast'
import { visit } from 'unist-util-visit'

const headingRank = (tag: string) =>
  tag.startsWith('h') && tag.length === 2 && +tag[1] >= 1 && +tag[1] <= 6

export default function rehypeAutolinkHeadings({
  properties = { ariaHidden: 'true', tabIndex: -1 },
  behavior = 'prepend',
  content = { type: 'text', value: '#' } as ElementContent
} = {}) {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (headingRank(node.tagName) && node.properties?.id) {
        const link: Element = {
          type: 'element',
          tagName: 'a',
          properties: { ...properties, href: `#${node.properties.id}` },
          children: Array.isArray(content) ? content : [content]
        }
        if (behavior === 'wrap') {
          node.children = [link]
        } else if (behavior === 'prepend') {
          node.children.unshift(link)
        } else if (behavior === 'append') {
          node.children.push(link)
        }
      }
    })
  }
}
