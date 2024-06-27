import fetch from 'node-fetch'

import { fetchSitemap, askForConfirmation, sitemapUrls } from './sitemap-lib.mjs'

async function main() {
  for (const sitemapUrl of sitemapUrls) {
    const urlList = await fetchSitemap(sitemapUrl)
    if (urlList.length === 0) {
      console.error('No URLs found in sitemap.')
      continue
    }

    console.log('URLs found in sitemap:')
    urlList.forEach((url) => console.log(url))

    await askForConfirmation(
      'Do you want to upload these URLs to IndexNow?',
      async () => {
        await sendIndexNowRequest(urlList)
      },
      () => {
        console.log('URLs were not uploaded to IndexNow.')
      }
    )
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

main()
