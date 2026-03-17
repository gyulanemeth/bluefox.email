/**
 * Post-build PurgeCSS script
 * Removes unused CSS from the VitePress dist output by scanning all HTML/JS files.
 * Safelists Vuetify dynamic classes that are generated at runtime.
 */
import { PurgeCSS } from 'purgecss'
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'

const DIST_DIR = '.vitepress/dist'

function findFiles(dir, extensions) {
  const results = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      results.push(...findFiles(full, extensions))
    } else if (extensions.includes(extname(full))) {
      results.push(full)
    }
  }
  return results
}

const htmlFiles = findFiles(DIST_DIR, ['.html'])
const jsFiles = findFiles(join(DIST_DIR, 'assets'), ['.js'])
const cssFiles = findFiles(join(DIST_DIR, 'assets'), ['.css'])

const mainCss = cssFiles.find(f => f.includes('style.'))
if (!mainCss) {
  console.log('No main CSS file found, skipping PurgeCSS')
  process.exit(0)
}

const beforeSize = statSync(mainCss).size

const result = await new PurgeCSS().purge({
  content: [...htmlFiles, ...jsFiles].map(f => ({ raw: readFileSync(f, 'utf-8'), extension: extname(f).slice(1) })),
  css: [{ raw: readFileSync(mainCss, 'utf-8') }],
  safelist: {
    standard: [
      /^mdi-/,       // MDI icon classes
      /^theme--/,    // Vuetify theme classes
      /^VPDoc/,      // VitePress doc classes
      /^vp-/,        // VitePress classes
      'dark',
      /^fade-/,      // Vue transition classes
      /^slide-/,
    ],
    deep: [
      /data-v-/,     // Vue scoped style selectors
      /^\.v-theme/,  // Vuetify theme provider
      /^\.v-locale/, // Vuetify locale
    ],
    greedy: [
      /v-enter/,     // Vue transition classes
      /v-leave/,
      /v-move/,
    ],
  },
  fontFace: true,
  keyframes: true,
  variables: true,
})

if (result.length > 0) {
  writeFileSync(mainCss, result[0].css)
  const afterSize = statSync(mainCss).size
  const saved = beforeSize - afterSize
  console.log(`PurgeCSS: ${(beforeSize/1024).toFixed(1)} KiB → ${(afterSize/1024).toFixed(1)} KiB (saved ${(saved/1024).toFixed(1)} KiB, ${((saved/beforeSize)*100).toFixed(0)}%)`)
} else {
  console.log('PurgeCSS: no output generated')
}
