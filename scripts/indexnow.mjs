/**
 * Post-build IndexNow script
 * Reads the URLs already generated in dist/sitemap.xml and pushes them to
 * IndexNow so Bing (and other participating engines) can pick up changes
 * without waiting for their next crawl.
 */
import { readFileSync, existsSync, readdirSync } from 'fs'

const DIST_DIR = '.vitepress/dist'
const SITEMAP_PATH = `${DIST_DIR}/sitemap.xml`
const HOST = 'bluefox.email'

// The IndexNow key file (public/<key>.txt) is the single source of truth for
// the key — its filename IS the key, so we derive it instead of duplicating
// the value here.
const keyFile = readdirSync('public').find((f) => /^[0-9a-f]{64}\.txt$/.test(f))
if (!keyFile) {
  console.log('IndexNow: no key file found in public/, skipping')
  process.exit(0)
}
const KEY = keyFile.replace(/\.txt$/, '')
const KEY_LOCATION = `https://${HOST}/${keyFile}`

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
