export function getTheme() {
  return localStorage.getItem('theme')
}

export function listenThemeChange(theme?: string) {
  if (!theme || theme === 'system') return // if theme is specified, no need to listen window theme change
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    setTheme(e.matches ? 'dark' : 'light')
  })
}

export function setTheme(theme?: string, save = false) {
  const themes = ['system', 'dark', 'light']
  if (theme) {
    if (!themes.includes(theme)) return
    if (theme === 'system') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    if (save) localStorage.setItem('theme', theme)
  } else {
    theme = getTheme() ?? undefined

    if (save) {
      // System equals null, switch cycle in ['system', 'dark', 'light']
      const currentIndex = themes.indexOf(theme ?? 'system')
      theme = themes[(currentIndex + 1) % themes.length]
      localStorage.setItem('theme', theme) // save theme
    }
  }

  // Set theme
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#0B0B10' : '#FCFCFD')

  // Listen theme change
  listenThemeChange(theme)

  return theme
}
