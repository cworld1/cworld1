import { h } from 'hastscript'
import type { ShikiTransformer } from 'shiki'

function parseMetaString(str = '') {
  return Object.fromEntries(
    str.split(' ').reduce((acc: [string, string | true][], cur) => {
      const matched = cur.match(/(.+)?=("(.+)"|'(.+)')$/)
      if (matched === null) return acc
      const key = matched[1]
      const value = matched[3] || matched[4] || true
      acc = [...acc, [key, value]]
      return acc
    }, [])
  )
}

export const updateStyle = (): ShikiTransformer => {
  return {
    name: 'shiki-transformer-update-style',
    pre(node) {
      const container = h(
        'pre',
        {
          class: 'code-container overflow-x-scroll'
        },
        node.children
      )
      node.children = [container]
      node.tagName = 'div'
    }
  }
}

export const processMeta = (): ShikiTransformer => {
  return {
    name: 'shiki-transformer-process-meta',
    preprocess() {
      if (!this.options.meta) return
      const rawMeta = this.options.meta?.__raw
      if (!rawMeta) return
      const meta = parseMetaString(rawMeta)
      Object.assign(this.options.meta, meta)
    }
  }
}

export const addTitle = (): ShikiTransformer => {
  return {
    name: 'shiki-transformer-add-title',
    pre(node) {
      const rawMeta = this.options.meta?.__raw
      if (!rawMeta) return
      const meta = parseMetaString(rawMeta)
      if (this.options.meta) {
        Object.assign(this.options.meta, meta)
      }
      console.log(this.options.meta)

      if (!meta.title) return

      const div = h(
        'div',
        {
          class:
            'title absolute top-2 left-3 text-sm text-foreground px-2 py-0.5 bg-primary-foreground rounded-lg border border-border'
        },
        meta.title.toString()
      )
      node.children.unshift(div)
    }
  }
}

export const addLanguage = (): ShikiTransformer => {
  return {
    name: 'shiki-transformer-add-language',
    pre(node) {
      const span = h(
        'span',
        {
          class:
            'language transition-opacity duration-300 absolute top-3 right-3 text-sm text-muted-foreground'
        },
        this.options.lang
      )
      node.children.push(span)
    }
  }
}

export const addCopyButton = (timeout?: number): ShikiTransformer => {
  const toggleMs = timeout || 3000

  return {
    name: 'shiki-transformer-copy-button',
    pre(node) {
      const button = h(
        'button',
        {
          class:
            'copy transition-opacity duration-300 opacity-0 absolute top-3 right-3 text-muted-foreground p-1 box-content border border-border rounded bg-primary-foreground',
          'data-code': this.source,
          onclick: `
          navigator.clipboard.writeText(this.dataset.code);
          this.classList.add('copied');
          setTimeout(() => this.classList.remove('copied'), ${toggleMs})
        `
        },
        [
          h('div', { class: 'ready' }, [
            h(
              'svg',
              {
                class: 'size-5'
              },
              [
                h('use', {
                  href: '/icons/code.svg#mingcute-clipboard-line'
                })
              ]
            )
          ]),
          h('div', { class: 'success hidden' }, [
            h(
              'svg',
              {
                class: 'size-5'
              },
              [
                h('use', {
                  href: '/icons/code.svg#mingcute-file-check-line'
                })
              ]
            )
          ])
        ]
      )

      node.children.push(button)
    }
  }
}
