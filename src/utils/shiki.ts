import { h } from 'hastscript'
import type { ShikiTransformer } from 'shiki'

export const addCopyButton = (timeout?: number): ShikiTransformer => {
  const toggleMs = timeout || 3000

  return {
    name: 'shiki-transformer-copy-button',
    pre(node) {
      const button = h(
        'button',
        {
          class:
            'copy transition-opacity duration-300 opacity-0 absolute top-3 right-4 text-muted-foreground p-1 box-content border border-border rounded bg-primary-foreground',
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

// export const addFilename = (filename?: string): ShikiTransformer => {
//   return {
//     name: 'shiki-transformer-add-filename',
//     pre(node) {
//       if (!filename) return

//       const span = h(
//         'span',
//         {
//           class: 'filename'
//         },
//         filename
//       )

//       node.children.push(span)
//     }
//   }
// }

export const addLanguage = (): ShikiTransformer => {
  return {
    name: 'shiki-transformer-add-filename',
    pre(node) {
      const span = h(
        'span',
        {
          class:
            'language transition-opacity duration-300 absolute top-3 right-4 text-sm text-muted-foreground'
        },
        this.options.lang
      )

      node.children.push(span)
    }
  }
}
