import { parse } from 'node-html-parser'
import readline from 'readline'

const sitemapUrls = [
  // CWorld Site
  'https://cworld.top/sitemap-0.xml',
  // CWorld Blog v2
  'https://blogv2.cworld.top/sitemap.xml',
  // Linux Learning
  'https://linux.cworld.top/sitemap.xml'
]

// Fetch sites of sitemap and return a url list
async function fetchSitemap(sitemapUrl) {
  try {
    const response = await fetch(sitemapUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch sitemap: ${response.status}`)
    }
    const html = await response.text()
    const root = parse(html, {
      lowerCaseTagName: false, // preserve case of tag names
      script: false, // discard script content
      style: false, // discard style content
      pre: false // preserve leading whitespace in text nodes
    })
    const urls = root.querySelectorAll('url loc')
    return urls.map((url) => url.text.trim())
  } catch (error) {
    console.error('Error fetching sitemap:', error)
    return []
  }
}

function askForConfirmation(prompt, onYes, onNo) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    rl.question(`-> ${prompt} (yes/no): `, (answer) => {
      rl.close()
      if (answer.toLowerCase().trim() === 'no' || answer.toLowerCase().trim() === 'n') {
        onNo().then(resolve) // Wait for onNo promise to resolve
      } else {
        onYes().then(resolve) // Wait for onYes promise to resolve
      }
    })
  })
}

export { fetchSitemap, askForConfirmation, sitemapUrls }
export default fetchSitemap
