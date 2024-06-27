const fetch = require('node-fetch')
const { parse } = require('node-html-parser')
const readline = require('readline')

// CWorld Site
const sitemapUrl = 'https://cworld.top/sitemap-0.xml'
// CWorld Blog v2
// const sitemapUrl = 'https://blogv2.cworld.top/sitemap.xml'
// Linux Learning
// const sitemapUrl = 'https://linux.cworld.top/sitemap.xml'

async function main() {
  const urlList = await fetchSitemap(sitemapUrl)
  if (urlList.length > 0) {
    console.log('URLs found in sitemap:')
    urlList.forEach((url) => console.log(url))

    const answer = await askForConfirmation()
    if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
      await sendIndexNowRequest(urlList)
    } else {
      console.log('URLs were not uploaded to IndexNow.')
    }
  } else {
    console.error('No URLs found in sitemap.')
  }
}

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

// commit url list request to indexnow
async function sendIndexNowRequest(urlList) {
  const url = 'https://api.indexnow.org/indexnow'
  const headers = {
    'Content-Type': 'application/json; charset=utf-8'
  }
  const data = {
    host: 'cworld.top',
    key: 'c93c5640499046bc950c4a547923b519',
    keyLocation: 'https://cworld.top/c93c5640499046bc950c4a547923b519.txt',
    urlList
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    })
    console.log('Response status:', response.status)
    if (!response.ok) {
      console.error('Error:', await response.text())
    } else {
      console.log('Response headers:', JSON.stringify(response.headers.raw()))
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

function askForConfirmation() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    rl.question('-> Do you want to upload these URLs to IndexNow? (yes/no): ', (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

main()
