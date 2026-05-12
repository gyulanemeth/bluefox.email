export const SITE_ORIGIN = 'https://bluefox.email'
export const ORG_ID = `${SITE_ORIGIN}/#organization`
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/assets/share.png`
export const SITE_NAME = 'BlueFox Email'
export const DEFAULT_AUTHOR = 'Gyula Németh'

export function asString(value) {
  if (typeof value === 'string') {
    return value
  }
  return null
}

export function toIsoDate(value) {
  if (typeof value === 'string') {
    return value
  }
  if (value instanceof Date) {
    return value.toISOString()
  }
  return null
}

export function absoluteUrl(value) {
  if (!value) {
    return null
  }
  if (value.startsWith('http')) {
    return value
  }
  const separator = value.startsWith('/') ? '' : '/'
  return `${SITE_ORIGIN}${separator}${value}`
}

export function resolveImageUrl(fm) {
  const candidate = asString(fm.ogImage) || asString(fm.image) || asString(fm.thumbnail)
  return absoluteUrl(candidate) || DEFAULT_OG_IMAGE
}

export function pageUrl(relativePath) {
  if (!relativePath || relativePath === 'index.md') {
    return `${SITE_ORIGIN}/`
  }
  const slug = relativePath
    .replace(/\/index\.md$/, '/')
    .replace(/\.md$/, '')
  return `${SITE_ORIGIN}/${slug}`
}

export function buildBreadcrumbList(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function appendJsonLd(pageData, jsonLd) {
  const fm = pageData.frontmatter || {}
  fm.head = fm.head || []
  pageData.frontmatter = fm
  fm.head.push(['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd)])
}
