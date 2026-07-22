/**
 * Post-build IndexNow script
 * Reads the URLs already generated in dist/sitemap.xml and pushes them to
 * IndexNow so Bing (and other participating engines) can pick up changes
 * without waiting for their next crawl.
 */
import { readFileSync, existsSync } from 'fs'

const DIST_DIR = '.vitepress/dist'
const SITEMAP_PATH = `${DIST_DIR}/sitemap.xml`
const HOST = 'bluefox.email'
const KEY = 'a4545217ae9a9ef8718e31963117fef434f2714aa8c354efd4a06169b8e36dfb'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`

if (!existsSync(SITEMAP_PATH)) {
  console.log('IndexNow: no sitemap.xml found, skipping')
  process.exit(0)
}

const sitemap = readFileSync(SITEMAP_PATH, 'utf-8')
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])

if (urlList.length === 0) {
  console.log('IndexNow: sitemap.xml has no URLs, skipping')
  process.exit(0)
}

try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  })

  if (res.ok) {
    console.log(`IndexNow: submitted ${urlList.length} URLs (status ${res.status})`)
  } else {
    console.log(`IndexNow: submission failed with status ${res.status}`)
  }
} catch (err) {
  console.log(`IndexNow: submission errored, skipping (${err.message})`)
}
