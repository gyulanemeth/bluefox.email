import {
  SITE_NAME,
  DEFAULT_AUTHOR,
  asString,
  toIsoDate,
  pageUrl,
  resolveImageUrl
} from './shared'

function hasTag(head, tag, attrKey, attrValue) {
  return head.some(item => {
    if (!Array.isArray(item) || item.length < 2) {
      return false
    }
    if (item[0] !== tag) {
      return false
    }
    const attrs = item[1] || {}
    return attrs[attrKey] === attrValue
  })
}

function uniqueKey(attrs) {
  if (attrs.rel) {
    return 'rel'
  }
  if (attrs.property) {
    return 'property'
  }
  return 'name'
}

function appendUnique(head, entry) {
  const [tag, attrs] = entry
  const key = uniqueKey(attrs)
  if (hasTag(head, tag, key, attrs[key])) {
    return
  }
  head.push(entry)
}

function buildCoreEntries(context) {
  const { url, image, title, description, type } = context
  const entries = [
    ['link', { rel: 'canonical', href: url }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:type', content: type }],
    ['meta', { property: 'og:site_name', content: SITE_NAME }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:image', content: image }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: image }]
  ]
  if (title) {
    entries.push(['meta', { property: 'og:title', content: title }])
    entries.push(['meta', { name: 'twitter:title', content: title }])
  }
  if (description) {
    entries.push(['meta', { name: 'description', content: description }])
    entries.push(['meta', { property: 'og:description', content: description }])
    entries.push(['meta', { name: 'twitter:description', content: description }])
  }
  return entries
}

function buildArticleEntries(fm) {
  const publishedRaw = fm.published !== false ? toIsoDate(fm.published) : null
  const published = toIsoDate(fm.datePublished) || toIsoDate(fm.date) || publishedRaw
  const modified = toIsoDate(fm.dateModified) || toIsoDate(fm.lastUpdated)
  const author = asString(fm.author) || DEFAULT_AUTHOR

  const entries = [['meta', { property: 'article:author', content: author }]]
  if (published) {
    entries.push(['meta', { property: 'article:published_time', content: published }])
  }
  if (modified) {
    entries.push(['meta', { property: 'article:modified_time', content: modified }])
  }
  return entries
}

function buildSeoContext(pageData, fm) {
  const isArticle = pageData.relativePath.startsWith('posts/')
  return {
    url: asString(fm.canonicalUrl) || pageUrl(pageData.relativePath),
    image: resolveImageUrl(fm),
    title: asString(fm.ogTitle) || asString(fm.title),
    description: asString(fm.ogDescription) || asString(fm.description),
    type: asString(fm.ogType) || (isArticle ? 'article' : 'website')
  }
}

export function addSeoHead(pageData) {
  const fm = pageData.frontmatter || {}
  fm.head = fm.head || []
  pageData.frontmatter = fm

  if (fm.noindex === true) {
    appendUnique(fm.head, ['meta', { name: 'robots', content: 'noindex, nofollow' }])
    return
  }

  const context = buildSeoContext(pageData, fm)
  const entries = buildCoreEntries(context)
  if (context.type === 'article') {
    entries.push(...buildArticleEntries(fm))
  }

  entries.forEach(entry => appendUnique(fm.head, entry))
}
