import fetch from 'node-fetch'
import { fetchSitemap, askForConfirmation, sitemapUrls } from './sitemap-lib.mjs'

const BATCH_SIZE = 20 // 设置每批次的大小
const API_ENDPOINT = `http://data.zz.baidu.com/urls?site=https://www.cworld.top&token=${process.env.BAIDU_API_KEY}`
// const API_ENDPOINT = `http://data.zz.baidu.com/urls?site=https://cworld.top&token=${process.env.BAIDU_API_KEY}`

async function main() {
  const urlList = []
  for (const sitemapUrl of sitemapUrls) {
    const urls = await fetchSitemap(sitemapUrl)
    if (urls.length === 0) {
      console.error('No URLs found in sitemap.')
      continue
    }
    urlList.push(...urls)
  }

  try {
    const batches = await submitUrlsInBatches(urlList)
    for (let i = 0; i < batches.length; i++) {
      const batchUrls = batches[i]
      console.log(`The ${i + 1} batch of URLs to submit:`)
      batchUrls.forEach((url) => console.log(url))

      await askForConfirmation(
        'Do you want to upload these URLs to Baidu?',
        async () => {
          await submitBatch(batchUrls)
        },
        () => {
          console.log('URLs were not uploaded to Baidu.')
        }
      )
    }
  } catch (error) {
    console.error('Error processing sitemap:', error)
  }
}

async function submitUrlsInBatches(urlList) {
  try {
    const totalBatches = Math.ceil(urlList.length / BATCH_SIZE)
    const batches = []

    for (let i = 0; i < totalBatches; i++) {
      const startIdx = i * BATCH_SIZE
      const endIdx = (i + 1) * BATCH_SIZE
      const batchUrls = urlList.slice(startIdx, endIdx)
      batches.push(batchUrls)
    }
    return batches
  } catch (error) {
    console.error('Error fetching sitemap URLs:', error)
    throw error
  }
}

async function submitBatch(urls) {
  try {
    const body = urls.join('\n')
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: body
    })

    if (response.ok) {
      console.log('Submission result:', await response.text())
    } else {
      console.error('Failed to submit batch:', response.status, await response.text())
    }
  } catch (error) {
    console.error('Error submitting batch:', error)
  }
}

main()
