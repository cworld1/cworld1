// https://github.com/shikijs/shiki/tree/main/packages/transformers

import type { Element, Text } from 'hast'
import type { ShikiTransformer, ShikiTransformerContext } from 'shiki'

interface TransformerNotationMapOptions {
  classMap?: Record<string, string | string[]>
  /**
   * Class added to the <pre> element when the current code has diff
   */
  classActivePre?: string
}
function createCommentNotationTransformer(
  name: string,
  regex: RegExp,
  onMatch: (
    this: ShikiTransformerContext,
    match: string[],
    line: Element,
    commentNode: Element,
    lines: Element[],
    index: number
  ) => boolean,
  removeEmptyLines = false
): ShikiTransformer {
  return {
    name,
    code(code) {
      const lines = code.children.filter((i) => i.type === 'element') as Element[]
      const linesToRemove: (Element | Text)[] = []
      lines.forEach((line, idx) => {
        let nodeToRemove: Element | undefined

        for (const child of line.children) {
          if (child.type !== 'element') continue
          const text = child.children[0]
          if (text.type !== 'text') continue

          let replaced = false
          text.value = text.value.replace(regex, (...match) => {
            if (onMatch.call(this, match, line, child, lines, idx)) {
              replaced = true
              return ''
            }
            return match[0]
          })
          if (replaced && !text.value.trim()) nodeToRemove = child
        }

        if (nodeToRemove) {
          line.children.splice(line.children.indexOf(nodeToRemove), 1)

          // Remove if empty
          if (line.children.length === 0) {
            linesToRemove.push(line)
            if (removeEmptyLines) {
              const next = code.children[code.children.indexOf(line) + 1]
              if (next && next.type === 'text' && next.value === '\n') linesToRemove.push(next)
            }
          }
        }
      })

      for (const line of linesToRemove) code.children.splice(code.children.indexOf(line), 1)
    }
  }
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function transformerNotationMap(
  options: TransformerNotationMapOptions = {},
  name = '@shikijs/transformers:notation-map'
): ShikiTransformer {
  const { classMap = {}, classActivePre = undefined } = options

  return createCommentNotationTransformer(
    name,
    new RegExp(
      `\\s*(?://|/\\*|<!--|#|--|%{1,2}|;{1,2}|"|')\\s+\\[!code (${Object.keys(classMap).map(escapeRegExp).join('|')})(:\\d+)?\\]\\s*(?:\\*/|-->)?\\s*$`
    ),
    function ([, match, range = ':1'], _line, _comment, lines, index) {
      const lineNum = Number.parseInt(range.slice(1), 10)
      lines.slice(index, index + lineNum).forEach((line) => {
        this.addClassToHast(line, classMap[match])
      })
      if (classActivePre) this.addClassToHast(this.pre, classActivePre)
      return true
    }
  )
}

// === Transformers ===

// Add a diff notation to the code block
export interface TransformerNotationDiffOptions {
  /**
   * Class for added lines
   */
  classLineAdd?: string
  /**
   * Class for removed lines
   */
  classLineRemove?: string
  /**
   * Class added to the <pre> element when the current code has diff
   */
  classActivePre?: string
}
/**
 * Use `[!code ++]` and `[!code --]` to mark added and removed lines.
 */
export function transformerNotationDiff(
  options: TransformerNotationDiffOptions = {}
): ShikiTransformer {
  const {
    classLineAdd = 'diff add',
    classLineRemove = 'diff remove',
    classActivePre = 'has-diff'
  } = options

  return transformerNotationMap(
    {
      classMap: {
        '++': classLineAdd,
        '--': classLineRemove
      },
      classActivePre
    },
    '@shikijs/transformers:notation-diff'
  )
}

// Add a highlight notation to the code block
// https://github.com/shikijs/shiki/blob/main/packages/transformers/src/transformers/notation-highlight.ts
export interface TransformerNotationHighlightOptions {
  /**
   * Class for highlighted lines
   */
  classActiveLine?: string
  /**
   * Class added to the root element when the code has highlighted lines
   */
  classActivePre?: string
}
/**
 * Allow using `[!code highlight]` notation in code to mark highlighted lines.
 */
export function transformerNotationHighlight(
  options: TransformerNotationHighlightOptions = {}
): ShikiTransformer {
  const { classActiveLine = 'highlighted', classActivePre = 'has-highlighted' } = options

  return transformerNotationMap(
    {
      classMap: {
        highlight: classActiveLine,
        hl: classActiveLine
      },
      classActivePre
    },
    '@shikijs/transformers:notation-highlight'
  )
}
